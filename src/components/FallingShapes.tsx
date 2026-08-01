import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

type ShapeKind = "square" | "circle" | "triangle" | "diamond" | "pentagon" | "hexagon" | "star" | "cross";

interface Piece {
  id: number;
  kind: ShapeKind;
  size: number;
  color: string;
  startXPercent: number;
}

const DEFAULT_SHAPES: ShapeKind[] = ["square", "circle", "triangle", "diamond", "pentagon", "hexagon", "star", "cross"];
const DEFAULT_COLORS = ["#D9B054", "#C99A3E", "#2A2360"];

interface FallingShapesProps {
  count?: number;
  shapes?: ShapeKind[];
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  gravity?: number;
  height?: number | string;
  className?: string;
}

export default function FallingShapes({
  count = 8,
  shapes = DEFAULT_SHAPES,
  colors = DEFAULT_COLORS,
  minSize = 60,
  maxSize = 114,
  gravity = 0.8,
  height = 160,
  className = "",
}: FallingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      kind: shapes[i % shapes.length],
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[i % colors.length],
      startXPercent: 8 + Math.random() * 84,
    })),
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const h = container.clientHeight;
    if (width <= 0 || h <= 0) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("matter-js").then((mod) => {
      if (cancelled) return;
      const MatterLib = (mod.default ?? mod) as typeof Matter;
      const { Engine, Runner, Bodies, World, Body, Mouse, MouseConstraint } = MatterLib;

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const boundary = { isStatic: true, render: { visible: false } };
      const floor = Bodies.rectangle(width / 2, h + 25, width, 50, boundary);
      const leftWall = Bodies.rectangle(-25, h / 2, 50, h * 2, boundary);
      const rightWall = Bodies.rectangle(width + 25, h / 2, 50, h * 2, boundary);

      const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-shape]"));
      const bodies = elements.map((elem, i) => {
        const piece = pieces[i];
        const startX = (piece.startXPercent / 100) * width;
        const startY = -40 - i * 26;
        const body =
          piece.kind === "circle"
            ? Bodies.circle(startX, startY, piece.size / 2, { restitution: 0.7, friction: 0.3, frictionAir: 0.02 })
            : Bodies.rectangle(startX, startY, piece.size, piece.size, { restitution: 0.7, friction: 0.3, frictionAir: 0.02 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
        elem.style.position = "absolute";
        elem.style.left = `${startX}px`;
        elem.style.top = `${startY}px`;
        elem.style.transform = "translate(-50%, -50%)";
        return { elem, body };
      });

      const mouse = Mouse.create(container);

      // Matter registers its own touch and wheel listeners that call
      // preventDefault, which hijacks the page's ability to scroll (touch swipe
      // or mouse wheel) anywhere over this section. We only want desktop
      // mouse-drag interaction, so drop the listeners it just added for those.
      container.removeEventListener("touchstart", mouse.mousedown);
      container.removeEventListener("touchmove", mouse.mousemove);
      container.removeEventListener("touchend", mouse.mouseup);
      container.removeEventListener("wheel", mouse.mousewheel);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      // If the mouse button is released outside this container (dragged fast
      // past its edge), the container never sees the mouseup and the shape
      // stays "stuck" to the cursor forever. Force-release on any window-level
      // mouseup regardless of where it happened.
      const forceRelease = () => {
        mouse.button = -1;
      };
      window.addEventListener("mouseup", forceRelease);

      World.add(engine.world, [floor, leftWall, rightWall, mouseConstraint, ...bodies.map((b) => b.body)]);

      const runner = Runner.create();
      Runner.run(runner, engine);

      let frame: number;
      const update = () => {
        bodies.forEach(({ elem, body }) => {
          elem.style.left = `${body.position.x}px`;
          elem.style.top = `${body.position.y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        frame = requestAnimationFrame(update);
      };
      update();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("mouseup", forceRelease);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [started, gravity, pieces]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} style={{ height }} aria-hidden="true">
      {pieces.map((p) => {
        const strokeWidth = Math.max(4, Math.round(p.size * 0.09));
        return (
          <svg
            key={p.id}
            data-shape
            className="cursor-pointer"
            width={p.size}
            height={p.size}
            viewBox="0 0 100 100"
          >
            {p.kind === "circle" && (
              <circle cx="50" cy="50" r={50 - strokeWidth} fill="none" stroke={p.color} strokeWidth={strokeWidth} />
            )}
            {p.kind === "square" && (
              <rect
                x={strokeWidth / 2}
                y={strokeWidth / 2}
                width={100 - strokeWidth}
                height={100 - strokeWidth}
                rx="14"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
              />
            )}
            {p.kind === "triangle" && (
              <polygon
                points="50,8 8,92 92,92"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
            {p.kind === "diamond" && (
              <polygon
                points="50,5 95,50 50,95 5,50"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
            {p.kind === "pentagon" && (
              <polygon
                points="50,5 92.8,36.1 76.5,86.4 23.5,86.4 7.2,36.1"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
            {p.kind === "hexagon" && (
              <polygon
                points="95,50 72.5,89 27.5,89 5,50 27.5,11 72.5,11"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
            {p.kind === "star" && (
              <polygon
                points="50,2 61.76,33.82 95.6,35.2 69.02,56.18 78.2,88.8 50,70 21.8,88.8 30.98,56.18 4.4,35.2 38.24,33.82"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
            {p.kind === "cross" && (
              <polygon
                points="35,5 65,5 65,35 95,35 95,65 65,65 65,95 35,95 35,65 5,65 5,35 35,35"
                fill="none"
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}
