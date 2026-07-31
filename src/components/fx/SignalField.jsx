import React, { useEffect, useRef } from 'react';
import { readThemeColors } from '../../theme/themes';

/**
 * Full-page ambient: network packets + frequency + time flow.
 * Colors follow active site theme (data-theme).
 */
export default function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    if (reduced) canvas.style.opacity = '0.3';

    let raf = 0;
    let running = true;
    let t = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    let theme = readThemeColors();
    const refreshTheme = () => {
      theme = readThemeColors();
    };

    const ICE = () => theme.packet1;
    const CYAN = () => theme.packet2;
    const EMERALD = () => theme.packet3;
    const SKY = () => theme.accentRgb;
    const hexToRgb = (hex) => {
      const h = (hex || '').replace('#', '').trim();
      if (h.length < 6) return [100, 116, 139];
      return [
        parseInt(h.slice(0, 2), 16) || 100,
        parseInt(h.slice(2, 4), 16) || 116,
        parseInt(h.slice(4, 6), 16) || 139,
      ];
    };
    const MUTED = () => hexToRgb(theme.muted);
    const SHADOW = () => hexToRgb(theme.text);

    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    // --- Network topology nodes (routers / peers) ---
    const nodeCount = mobile ? 5 : 8;
    let nodes = [];

    const rebuildNodes = () => {
      nodes = Array.from({ length: nodeCount }, (_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const cols = mobile ? 2 : 3;
        const rows = Math.ceil(nodeCount / cols);
        return {
          x: w * (0.12 + (col / Math.max(cols - 1, 1)) * 0.76) + (Math.random() - 0.5) * 30,
          y: h * (0.18 + (row / Math.max(rows - 1, 1)) * 0.55) + (Math.random() - 0.5) * 24,
          r: 4 + (i % 2),
          label: i === 0 ? 'src' : i === nodeCount - 1 ? 'dst' : `n${i}`,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    // Links between nearby nodes
    let links = [];
    const rebuildLinks = () => {
      links = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < Math.min(w, h) * 0.42) {
            links.push({ a: i, b: j, d });
          }
        }
        // always connect sequential for a backbone
        if (i < nodes.length - 1) {
          const exists = links.some(
            (l) => (l.a === i && l.b === i + 1) || (l.a === i + 1 && l.b === i)
          );
          if (!exists) links.push({ a: i, b: i + 1, d: 1 });
        }
      }
    };

    // Packets = actual PDU-looking chips with header + payload bars
    const packets = [];
    const spawnPacket = () => {
      if (!links.length) return;
      const link = links[Math.floor(Math.random() * links.length)];
      const reverse = Math.random() > 0.5;
      packets.push({
        link,
        reverse,
        p: Math.random() * 0.2,
        speed: 0.00008 + Math.random() * 0.00018,
        kind: Math.random() > 0.55 ? 'data' : Math.random() > 0.4 ? 'rtp' : 'ack',
        size: 10 + Math.random() * 8,
        seq: Math.floor(Math.random() * 900) + 100,
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildNodes();
      rebuildLinks();
      packets.length = 0;
      const n = mobile ? 6 : 10;
      for (let i = 0; i < n; i++) spawnPacket();
    };

    // Frequency spectrum bins
    const BINS = mobile ? 24 : 40;
    const bins = Array.from({ length: BINS }, (_, i) => ({
      phase: Math.random() * Math.PI * 2,
      freq: 0.6 + (i / BINS) * 3.5,
      amp: 0.3 + Math.random() * 0.7,
    }));

    const TARGET_MS = mobile ? 40 : 33;

    const drawPacket = (x, y, angle, pkt) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const pw = pkt.size * 1.8;
      const ph = pkt.size * 0.75;

      // shadow (theme-aware — ink on paper, black on dark)
      ctx.fillStyle = rgba(SHADOW(), 0.18);
      ctx.fillRect(-pw / 2 + 1, -ph / 2 + 1, pw, ph);

      // body by kind
      const body =
        pkt.kind === 'rtp' ? CYAN() : pkt.kind === 'ack' ? EMERALD() : ICE();
      ctx.fillStyle = rgba(body, 0.88);
      ctx.strokeStyle = rgba(body, 1);
      ctx.lineWidth = 1;
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
      }

      // header strip (protocol look)
      ctx.fillStyle = rgba([15, 23, 42], 0.75);
      ctx.fillRect(-pw / 2, -ph / 2, pw * 0.32, ph);

      // payload bars
      ctx.fillStyle = rgba([15, 23, 42], 0.45);
      const barN = 3;
      for (let b = 0; b < barN; b++) {
        ctx.fillRect(-pw / 2 + pw * 0.38 + b * (pw * 0.16), -ph / 2 + ph * 0.25, pw * 0.1, ph * 0.5);
      }

      // tiny flag bit
      ctx.fillStyle = rgba(SKY(), 0.9);
      ctx.fillRect(pw / 2 - 3, -ph / 2 + 1, 2, ph - 2);

      ctx.restore();
    };

    const draw = (now) => {
      if (!running) return;
      const elapsed = now - last;
      if (elapsed < TARGET_MS) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const dt = Math.min(50, elapsed || TARGET_MS);
      last = now;
      t += dt * 0.001;

      const scrollY = window.scrollY || 0;
      const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollP = scrollY / docH;

      // --- TIME FLOW (top band) ---
      // continuous time axis: t → scrolling markers
      const timeY = h * 0.08;
      ctx.clearRect(0, 0, w, h);

      // soft wash from theme accent
      const ar = theme.accentRgb;
      const wash = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      wash.addColorStop(0, `rgba(${ar[0]},${ar[1]},${ar[2]},0.05)`);
      wash.addColorStop(0.5, `rgba(${ar[0]},${ar[1]},${ar[2]},0.03)`);
      wash.addColorStop(1, 'rgba(0,0,0,0)'); // transparent end
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      // time axis line
      ctx.beginPath();
      ctx.moveTo(w * 0.06, timeY);
      ctx.lineTo(w * 0.94, timeY);
      ctx.strokeStyle = rgba(MUTED(), 0.35);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = `${mobile ? 9 : 10}px "JetBrains Mono", monospace`;
      ctx.fillStyle = rgba(MUTED(), 0.55);
      ctx.fillText('t →', w * 0.06, timeY - 8);
      ctx.fillText(`time · ${(t + scrollP * 10).toFixed(1)}s`, w * 0.06, timeY + 16);

      // scrolling tick marks (time flow)
      const tickPeriod = 80;
      const offset = ((t * 40) % tickPeriod);
      for (let x = w * 0.06 - offset; x < w * 0.94; x += tickPeriod) {
        if (x < w * 0.06) continue;
        const major = Math.round((x + offset) / tickPeriod) % 4 === 0;
        ctx.beginPath();
        ctx.moveTo(x, timeY - (major ? 6 : 3));
        ctx.lineTo(x, timeY + (major ? 6 : 3));
        ctx.strokeStyle = rgba(CYAN(), major ? 0.45 : 0.2);
        ctx.stroke();
        if (major) {
          ctx.fillStyle = rgba(ICE(), 0.35);
          ctx.fillText(`${((x + t * 10) % 1000) | 0}ms`, x - 10, timeY + 18);
        }
      }

      // playhead (now)
      const playX = w * 0.06 + ((t * 55 + scrollY * 0.05) % (w * 0.88));
      ctx.beginPath();
      ctx.moveTo(playX, timeY - 10);
      ctx.lineTo(playX, timeY + 10);
      ctx.strokeStyle = rgba(EMERALD(), 0.7);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(playX, timeY, 3, 0, Math.PI * 2);
      ctx.fillStyle = rgba(EMERALD(), 0.85);
      ctx.fill();

      // --- NETWORK LAYER ---
      // links
      links.forEach((l) => {
        const A = nodes[l.a];
        const B = nodes[l.b];
        if (!A || !B) return;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = rgba(MUTED(), 0.22);
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // nodes
      nodes.forEach((n, i) => {
        n.pulse += dt * 0.003;
        const glow = 0.35 + 0.25 * Math.sin(n.pulse + i);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CYAN(), 0.06 * glow);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(ICE(), 0.75);
        ctx.fill();
        ctx.strokeStyle = rgba(CYAN(), 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();
        if (!mobile) {
          ctx.fillStyle = rgba(MUTED(), 0.5);
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      });

      // packets along links
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.p += pkt.speed * dt;
        if (pkt.p >= 1) {
          packets.splice(i, 1);
          spawnPacket();
          continue;
        }
        const A = nodes[pkt.link.a];
        const B = nodes[pkt.link.b];
        if (!A || !B) continue;
        const from = pkt.reverse ? B : A;
        const to = pkt.reverse ? A : B;
        const x = from.x + (to.x - from.x) * pkt.p;
        const y = from.y + (to.y - from.y) * pkt.p;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);

        // short motion trail
        ctx.beginPath();
        ctx.moveTo(x - Math.cos(angle) * 14, y - Math.sin(angle) * 14);
        ctx.lineTo(x, y);
        ctx.strokeStyle = rgba(
          pkt.kind === 'rtp' ? CYAN() : pkt.kind === 'ack' ? EMERALD() : ICE(),
          0.25
        );
        ctx.lineWidth = 2;
        ctx.stroke();

        drawPacket(x, y, angle, pkt);

        // seq label occasionally
        if (!mobile && pkt.p > 0.35 && pkt.p < 0.65) {
          ctx.fillStyle = rgba(MUTED(), 0.4);
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(
            `${pkt.kind}#${pkt.seq}`,
            x + 10,
            y - 10
          );
        }
      }

      // --- FREQUENCY FLOW (middle waveform strip) ---
      const waveY = h * 0.52 + Math.sin(scrollP * Math.PI) * 12;
      ctx.font = `${mobile ? 9 : 10}px "JetBrains Mono", monospace`;
      ctx.fillStyle = rgba(MUTED(), 0.5);
      ctx.fillText('ƒ frequency', w * 0.06, waveY - 36);

      // multi-harmonic live signal (Fourier sum)
      const drawWave = (harmonics, color, width, alpha) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += mobile ? 3 : 2) {
          const nx = x / w;
          let y = waveY;
          harmonics.forEach((hm) => {
            y +=
              Math.sin(nx * Math.PI * 2 * hm.f + t * hm.spd + hm.ph) *
              hm.a *
              h *
              (0.9 + 0.1 * Math.sin(t + hm.ph));
          });
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = rgba(color, alpha);
        ctx.lineWidth = width;
        ctx.lineJoin = 'round';
        ctx.stroke();
      };

      drawWave(
        [
          { f: 1.2, a: 0.028, spd: 1.4, ph: 0 },
          { f: 2.7, a: 0.014, spd: 2.1, ph: 1 },
          { f: 5.1, a: 0.007, spd: 1.1, ph: 2 },
        ],
        CYAN(),
        1.6,
        0.4
      );
      drawWave(
        [
          { f: 1.8, a: 0.018, spd: 1.7, ph: 0.5 },
          { f: 3.4, a: 0.009, spd: 2.4, ph: 1.5 },
        ],
        EMERALD(),
        1.2,
        0.28
      );

      // flowing phase particles on the wave
      const phaseN = mobile ? 6 : 12;
      for (let i = 0; i < phaseN; i++) {
        const u = (i / phaseN + t * 0.08) % 1;
        const x = u * w;
        const nx = u;
        let y = waveY;
        y += Math.sin(nx * Math.PI * 2 * 1.2 + t * 1.4) * h * 0.028;
        y += Math.sin(nx * Math.PI * 2 * 2.7 + t * 2.1) * h * 0.014;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(ICE(), 0.5);
        ctx.fill();
      }

      // --- SPECTRUM (frequency domain) bottom ---
      const spectrumY = h * 0.82;
      const spectrumH = mobile ? 40 : 58;
      ctx.fillStyle = rgba(MUTED(), 0.5);
      ctx.fillText('F(ω) spectrum', w * 0.06, spectrumY - spectrumH - 8);

      ctx.beginPath();
      ctx.moveTo(w * 0.06, spectrumY);
      ctx.lineTo(w * 0.94, spectrumY);
      ctx.strokeStyle = rgba(MUTED(), 0.3);
      ctx.lineWidth = 1;
      ctx.stroke();

      const binW = (w * 0.88) / BINS;
      const baseX = w * 0.06;
      for (let i = 0; i < BINS; i++) {
        const b = bins[i];
        const envelope = Math.exp(-((i - BINS * 0.28) ** 2) / (2 * (BINS * 0.2) ** 2));
        const pulse =
          0.4 +
          0.6 *
            Math.abs(Math.sin(t * b.freq * 0.5 + b.phase) * Math.cos(t * 0.35 + i * 0.07));
        const barH = spectrumH * envelope * pulse * b.amp;
        const x = baseX + i * binW;
        const col = i / BINS < 0.35 ? CYAN() : i / BINS < 0.7 ? EMERALD() : SKY();
        const grad = ctx.createLinearGradient(0, spectrumY, 0, spectrumY - barH);
        grad.addColorStop(0, rgba(col, 0.05));
        grad.addColorStop(1, rgba(col, 0.55));
        ctx.fillStyle = grad;
        ctx.fillRect(x, spectrumY - barH, binW * 0.65, barH);
      }

      // ω axis label
      ctx.fillStyle = rgba(MUTED(), 0.45);
      ctx.fillText('ω →', w * 0.9, spectrumY + 14);

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    if (!reduced) start();
    else {
      last = performance.now();
      running = true;
      draw(last);
      stop();
    }

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    const onTheme = () => refreshTheme();

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('themechange', onTheme);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('themechange', onTheme);
    };
  }, []);

  return (
    <div
      className="signal-field pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-void/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/45 via-void/25 to-void/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-void/50" />
    </div>
  );
}
