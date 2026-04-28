"use client";

import { useEffect, useRef, useState } from "react";

// Roadmap tracks — each is a timeline bar with milestone markers
// Represents a product roadmap: something PM-specific and meaningful
const TRACKS = [
  {
    id: "discovery", label: "Discovery",
    y: 80, x: 40, width: 320,
    milestones: [0.15, 0.45, 0.78],
    color: "rgba(28,61,110,0.55)", speed: 0.8,
  },
  {
    id: "design", label: "Design",
    y: 150, x: 120, width: 260,
    milestones: [0.2, 0.55, 0.85],
    color: "rgba(28,61,110,0.45)", speed: 0.6,
  },
  {
    id: "build", label: "Build",
    y: 220, x: 60, width: 380,
    milestones: [0.1, 0.35, 0.6, 0.9],
    color: "rgba(28,61,110,0.5)", speed: 1.0,
  },
  {
    id: "research", label: "Research",
    y: 290, x: 200, width: 200,
    milestones: [0.3, 0.7],
    color: "rgba(45,106,79,0.45)", speed: 0.5,
  },
  {
    id: "launch", label: "Launch",
    y: 360, x: 80, width: 300,
    milestones: [0.2, 0.5, 0.8],
    color: "rgba(28,61,110,0.4)", speed: 0.7,
  },
  {
    id: "growth", label: "Growth",
    y: 430, x: 160, width: 240,
    milestones: [0.25, 0.65],
    color: "rgba(45,106,79,0.4)", speed: 0.55,
  },
];

// Connecting arrows between tracks (dependency lines)
const DEPS = [
  { from: "discovery", to: "design",   fromM: 0, toM: 0 },
  { from: "design",    to: "build",    fromM: 1, toM: 0 },
  { from: "research",  to: "discovery",fromM: 0, toM: 1 },
  { from: "build",     to: "launch",   fromM: 2, toM: 0 },
  { from: "launch",    to: "growth",   fromM: 1, toM: 0 },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function HeroNetwork(_props?: { fullPage?: boolean }) {
  const [phase, setPhase] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    function tick() {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setPhase(elapsed);
      setMouse(prev => ({
        x: lerp(prev.x, targetMouse.x, 0.03),
        y: lerp(prev.y, targetMouse.y, 0.03),
      }));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetMouse]);

  function handleMouseMove(e: React.MouseEvent<SVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTargetMouse({
      x: (e.clientX - rect.left) / rect.width  - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  }

  const breathe = Math.sin(phase * (2 * Math.PI / 20)) * 6;

  return (
    <svg
      viewBox="0 0 700 520"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      style={{ width: "100%", height: "100%", overflow: "visible", transform: `translateY(${breathe}px)`, transition: "transform 0.15s linear" }}
    >
      <defs>
        <radialGradient id="rd-fade" cx="50%" cy="50%" r="55%">
          <stop offset="25%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="rd-mask">
          <rect x="0" y="0" width="700" height="520" fill="url(#rd-fade)" />
        </mask>
        {/* Arrowhead marker */}
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(28,61,110,0.25)" />
        </marker>
      </defs>

      <g mask="url(#rd-mask)">
        {/* Dependency arrows between milestones */}
        {DEPS.map((dep) => {
          const from = TRACKS.find(t => t.id === dep.from)!;
          const to   = TRACKS.find(t => t.id === dep.to)!;
          const px = from.x + from.milestones[dep.fromM] * from.width + mouse.x * 3;
          const py = from.y + mouse.y * 2;
          const tx = to.x   + to.milestones[dep.toM]   * to.width   + mouse.x * 3;
          const ty = to.y   + mouse.y * 2;
          const mx = (px + tx) / 2;
          return (
            <path key={dep.from + dep.to}
              d={`M ${px} ${py} C ${mx} ${py}, ${mx} ${ty}, ${tx} ${ty}`}
              stroke="rgba(28,61,110,0.15)" strokeWidth="1" fill="none"
              strokeDasharray="3 5"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* Timeline tracks */}
        {TRACKS.map((track) => {
          const px = mouse.x * 2;
          const py = mouse.y * 1.5;
          const x1 = track.x + px;
          const x2 = track.x + track.width + px;
          const y  = track.y + py;
          // Animated fill progress — each track fills up slowly then resets
          const fillCycle = ((phase * 0.08 * track.speed) % 1);
          const fillWidth = track.width * fillCycle;

          return (
            <g key={track.id}>
              {/* Track label */}
              <text x={x1 - 8} y={y + 4}
                textAnchor="end"
                fontSize="9"
                fontFamily="var(--font-jetbrains-mono)"
                fill="rgba(107,95,84,0.6)"
                letterSpacing="0.04em"
              >
                {track.label.toUpperCase()}
              </text>

              {/* Track background line */}
              <line x1={x1} y1={y} x2={x2} y2={y}
                stroke="rgba(28,61,110,0.08)" strokeWidth="1.5"
              />

              {/* Animated fill */}
              <line x1={x1} y1={y} x2={x1 + Math.min(fillWidth, track.width)} y2={y}
                stroke={track.color} strokeWidth="1.5"
              />

              {/* Milestone dots */}
              {track.milestones.map((pos, mi) => {
                const mx = x1 + pos * track.width;
                const isPast = pos <= fillCycle;
                const pulsePh = (phase * 1.2 + mi * 0.8 + track.id.length * 0.3) % (Math.PI * 2);
                const pulse = isPast ? 0.6 + 0.4 * Math.sin(pulsePh) : 0.25;
                return (
                  <g key={mi}>
                    {isPast && (
                      <circle cx={mx} cy={y} r={6}
                        fill={track.color.replace(/[\d.]+\)$/, "0.08)")}
                      />
                    )}
                    <circle cx={mx} cy={y} r={isPast ? 3.5 : 2.5}
                      fill={isPast ? track.color.replace(/[\d.]+\)$/, "1)") : "rgba(224,214,202,1)"}
                      stroke={isPast ? "none" : "rgba(28,61,110,0.15)"}
                      strokeWidth="1"
                      style={{ opacity: pulse }}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Vertical "today" marker */}
        <line
          x1={280 + mouse.x * 2} y1={60}
          x2={280 + mouse.x * 2} y2={460}
          stroke="rgba(28,61,110,0.12)" strokeWidth="1"
          strokeDasharray="4 6"
        />
        <text x={280 + mouse.x * 2 + 6} y={55}
          fontSize="9" fontFamily="var(--font-jetbrains-mono)"
          fill="rgba(28,61,110,0.4)" letterSpacing="0.04em">
          TODAY
        </text>
      </g>
    </svg>
  );
}
