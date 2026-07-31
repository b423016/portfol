import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, ContactShadows, Stars } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Optimized hero 3D — same look, less GPU/CPU.
 * - Adaptive quality (mobile / reduced-motion / FPS)
 * - Shared materials, fewer segments
 * - Pause when offscreen or tab hidden
 * - ~30fps cap when not interacting
 */

const MATH_EQS = [
  'ℱ{f}(ξ)=∫ f(t)e^{-2πiξt} dt',
  'Σ cₙ e^{2πint/T}',
  'e^{iωt}=cos(ωt)+i sin(ωt)',
  'Xₖ=Σ xₙ e^{-2πikn/N}',
  'sinc(x)=sin(πx)/(πx)',
  'H(f)·X(f)',
];

const ORBITS = [
  {
    label: 'SDE',
    r: 1.35,
    speed: 0.32,
    phase: 0.4,
    size: 0.09,
    rx: Math.PI / 2.15,
    ry: 0.15,
    rz: 0.05,
    body: '#2a3441',
    glow: '#475569',
  },
  {
    label: 'EPHEMERIS',
    r: 1.75,
    speed: 0.22,
    phase: 1.8,
    size: 0.085,
    rx: Math.PI / 2.15 - 0.35,
    ry: 0.45,
    rz: -0.12,
    body: '#3f3a36',
    glow: '#78716c',
  },
  {
    label: 'VOICE',
    r: 2.15,
    speed: 0.38,
    phase: 3.2,
    size: 0.08,
    rx: Math.PI / 2.15 + 0.28,
    ry: -0.3,
    rz: 0.1,
    body: '#1a3a42',
    glow: '#0f766e',
  },
  {
    label: 'EVALS',
    r: 2.55,
    speed: 0.26,
    phase: 4.6,
    size: 0.085,
    rx: Math.PI / 2.15 - 0.5,
    ry: 0.55,
    rz: 0.08,
    body: '#252040',
    glow: '#4338ca',
  },
];

// Frame throttle helper (~30fps when idle)
function useThrottleFrame(cb, fps = 30) {
  const acc = useRef(0);
  const interval = 1 / fps;
  useFrame((state, delta) => {
    acc.current += delta;
    if (acc.current < interval) return;
    // absorb multi-frames
    const steps = Math.min(acc.current, interval * 2);
    acc.current = 0;
    cb(state, steps);
  });
}

function Core({ mouse }) {
  const ref = useRef();
  useThrottleFrame((s) => {
    const t = s.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.08 + mouse.current.x * 0.08;
    ref.current.rotation.x = mouse.current.y * 0.05;
  }, 30);

  return (
    <mesh ref={ref}>
      {/* 32 segs enough for matte sphere at this size */}
      <sphereGeometry args={[0.48, 32, 32]} />
      <meshStandardMaterial color="#0c0c0e" metalness={0.08} roughness={0.95} />
    </mesh>
  );
}

function OrbitSystem({ mouse, lowPower }) {
  const root = useRef();
  const angles = useRef(ORBITS.map((o) => o.phase));
  const planetRefs = useRef([]);
  const packetCount = lowPower ? 1 : 2;
  const packetRefs = useRef([]);
  const segs = lowPower ? 48 : 72;

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#34d399',
        emissive: '#047857',
        emissiveIntensity: 0.22,
        metalness: 0.4,
        roughness: 0.45,
        transparent: true,
        opacity: 0.65,
      }),
    []
  );

  const packetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d1fae5',
        emissive: '#34d399',
        emissiveIntensity: 0.35,
        metalness: 0.3,
        roughness: 0.4,
      }),
    []
  );

  useThrottleFrame((_, delta) => {
    if (root.current) {
      root.current.rotation.y = mouse.current.x * 0.12;
      root.current.rotation.x = mouse.current.y * 0.08;
    }
    ORBITS.forEach((o, i) => {
      angles.current[i] += delta * o.speed;
      const a = angles.current[i];
      const planet = planetRefs.current[i];
      if (planet) planet.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      for (let k = 0; k < packetCount; k++) {
        const pkt = packetRefs.current[i * packetCount + k];
        if (!pkt) continue;
        const b = a + (k + 1) * ((Math.PI * 2) / (packetCount + 1));
        pkt.position.set(Math.cos(b) * o.r, Math.sin(b) * o.r, 0);
      }
    });
  }, lowPower ? 24 : 30);

  return (
    <group ref={root}>
      {ORBITS.map((o, i) => (
        <group key={o.label} rotation={[o.rx, o.ry, o.rz]}>
          <mesh material={ringMat}>
            <torusGeometry args={[o.r, 0.008, 8, segs]} />
          </mesh>

          <group
            ref={(el) => {
              planetRefs.current[i] = el;
            }}
          >
            <mesh>
              <sphereGeometry args={[o.size, 16, 16]} />
              <meshStandardMaterial
                color={o.body}
                metalness={0.5}
                roughness={0.5}
                emissive={o.glow}
                emissiveIntensity={0.08}
              />
            </mesh>
            <Text
              position={[0, -o.size - 0.14, 0]}
              fontSize={0.09}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.003}
              outlineColor="#05070B"
              frustumCulled
            >
              {o.label}
            </Text>
          </group>

          {Array.from({ length: packetCount }, (_, k) => (
            <mesh
              key={k}
              ref={(el) => {
                packetRefs.current[i * packetCount + k] = el;
              }}
              material={packetMat}
            >
              <boxGeometry args={[0.05, 0.022, 0.022]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function NetworkPackets({ lowPower }) {
  const count = lowPower ? 6 : 10;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const paths = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const a0 = Math.random() * Math.PI * 2;
        const a1 = a0 + 0.9 + Math.random() * 1.8;
        const r0 = 1.3 + Math.random() * 1.5;
        const r1 = 1.3 + Math.random() * 1.5;
        return {
          from: new THREE.Vector3(Math.cos(a0) * r0, (Math.random() - 0.5) * 1.2, Math.sin(a0) * r0 * 0.65),
          to: new THREE.Vector3(Math.cos(a1) * r1, (Math.random() - 0.5) * 1.2, Math.sin(a1) * r1 * 0.65),
          speed: 0.18 + Math.random() * 0.28,
          phase: Math.random(),
        };
      }),
    [count]
  );

  const geo = useMemo(() => new THREE.BoxGeometry(0.065, 0.026, 0.026), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#99f6e4',
        emissive: '#2dd4bf',
        emissiveIntensity: 0.22,
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  useThrottleFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    paths.forEach((p, i) => {
      const u = (t * p.speed + p.phase) % 1;
      dummy.position.lerpVectors(p.from, p.to, u);
      dummy.position.y += Math.sin(t * 2 + i) * 0.015;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, lowPower ? 20 : 28);

  return <instancedMesh ref={meshRef} args={[geo, mat, count]} />;
}

function SoftWave({ mouse, lowPower }) {
  const group = useRef();
  const n = lowPower ? 48 : 72;
  const { line, pos } = useMemo(() => {
    const pos = new Float32Array(n * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#2dd4bf',
      transparent: true,
      opacity: 0.28,
    });
    return { line: new THREE.Line(geo, mat), pos };
  }, [n]);

  useThrottleFrame((s) => {
    const t = s.clock.elapsedTime;
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const a = u * Math.PI * 2;
      const r =
        2.95 +
        Math.sin(u * Math.PI * 6 + t * 1.6) * 0.05 +
        Math.sin(u * Math.PI * 12 + t * 2.4) * 0.02;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.28;
      pos[i * 3 + 2] = Math.sin(a) * r * 0.42;
    }
    line.geometry.attributes.position.needsUpdate = true;
    if (group.current) {
      group.current.rotation.y = t * 0.06 + mouse.current.x * 0.05;
      group.current.rotation.x = 0.5 + mouse.current.y * 0.04;
    }
  }, lowPower ? 20 : 28);

  return (
    <group ref={group}>
      <primitive object={line} />
    </group>
  );
}

function FloatingMath({ lowPower }) {
  const group = useRef();
  const n = lowPower ? 3 : 5;
  const items = useMemo(
    () =>
      MATH_EQS.slice(0, n).map((eq, i) => {
        const a = (i / n) * Math.PI * 2;
        const r = 3.15 + (i % 2) * 0.25;
        return {
          eq,
          base: new THREE.Vector3(
            Math.cos(a) * r * 0.85,
            (i % 2 === 0 ? 0.75 : -0.65) * (0.7 + i * 0.08),
            Math.sin(a) * r * 0.5
          ),
          speed: 0.12 + i * 0.03,
          phase: i * 0.8,
        };
      }),
    [n]
  );
  const refs = useRef([]);

  useThrottleFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.025;
    items.forEach((item, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.x = item.base.x + Math.sin(t * item.speed + item.phase) * 0.15;
      m.position.y = item.base.y + Math.cos(t * item.speed * 0.7 + item.phase) * 0.1;
      m.position.z = item.base.z;
    });
  }, 20);

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <group
          key={item.eq}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={item.base}
        >
          <Text
            fontSize={0.1}
            color="#64748b"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            outlineWidth={0.002}
            outlineColor="#05070B"
            frustumCulled
          >
            {item.eq}
          </Text>
        </group>
      ))}
    </group>
  );
}

function Scene({ mouse, lowPower }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.28} color="#99f6e4" />
      <hemisphereLight args={['#e2e8f0', '#0f172a', 0.3]} />

      <Stars
        radius={36}
        depth={40}
        count={lowPower ? 280 : 550}
        factor={2}
        saturation={0}
        fade
        speed={0.25}
      />

      {/* No Float wrapper — saves a transform layer every frame */}
      <Core mouse={mouse} />
      <OrbitSystem mouse={mouse} lowPower={lowPower} />
      <SoftWave mouse={mouse} lowPower={lowPower} />
      <NetworkPackets lowPower={lowPower} />
      <FloatingMath lowPower={lowPower} />

      {!lowPower && (
        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={0.35}
          scale={10}
          blur={2.5}
          far={5}
          color="#000"
          frames={1}
        />
      )}
    </>
  );
}

export default function Scene3D({ className = '' }) {
  const mouse = useRef({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const [lowPower, setLowPower] = useState(false);
  const [active, setActive] = useState(true);
  const interacting = useRef(false);
  const interactTimer = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)');
    const cores = navigator.hardwareConcurrency || 4;
    const apply = () => setLowPower(mq.matches || cores <= 4);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && e.intersectionRatio > 0.05),
      { threshold: [0, 0.05, 0.15] }
    );
    io.observe(el);
    const onVis = () => {
      if (document.hidden) setActive(false);
      else {
        const r = el.getBoundingClientRect();
        setActive(r.bottom > 0 && r.top < window.innerHeight);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full min-h-[280px] ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
        interacting.current = true;
        window.clearTimeout(interactTimer.current);
        interactTimer.current = window.setTimeout(() => {
          interacting.current = false;
        }, 800);
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#07090e]" />
      <Canvas
        dpr={lowPower ? 1 : [1, 1.25]}
        camera={{ position: [0, 0.35, 5.6], fov: 40 }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.touchAction = 'none';
        }}
        style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
        frameloop={active ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} lowPower={lowPower} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 z-[2] rounded-2xl ring-1 ring-inset ring-white/[0.08]" />
      <div className="pointer-events-none absolute inset-0 z-[2] rounded-2xl bg-gradient-to-t from-[#05070B]/50 via-transparent to-transparent" />
    </div>
  );
}
