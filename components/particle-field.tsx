"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  depth: number;
  orbitRadius: number;
  phase: number;
};

type PointerState = {
  x: number;
  y: number;
  energy: number;
  pressed: boolean;
};

const ACCENT = "185,255,71";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: PointerState = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      energy: 0,
      pressed: false,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let previousScrollY = window.scrollY;
    let scrollVelocity = 0;
    let frame = 0;

    const particleCount = () => {
      const cores = navigator.hardwareConcurrency ?? 4;
      const areaCount = Math.floor((width * height) / 7800);
      const ceiling = width < 640 ? 82 : width < 1024 ? 118 : cores <= 4 ? 135 : 180;
      return Math.max(48, Math.min(ceiling, areaCount));
    };

    const createParticle = (): Particle => {
      const depth = 0.35 + Math.random() * 0.95;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18 * depth,
        vy: (Math.random() - 0.5) * 0.18 * depth,
        size: 0.55 + Math.random() * 1.35 * depth,
        alpha: 0.18 + Math.random() * 0.5,
        depth,
        orbitRadius: Math.min(width, height) * (0.12 + Math.random() * 0.42),
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 760 ? 1.5 : 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nextCount = particleCount();
      if (particles.length > nextCount) {
        particles = particles.slice(0, nextCount);
      } else {
        while (particles.length < nextCount) particles.push(createParticle());
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.energy = Math.max(pointer.energy, event.pointerType === "touch" ? 1 : 0.58);
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.pressed = true;
      pointer.energy = 1.65;
    };

    const onPointerUp = () => {
      pointer.pressed = false;
    };

    const onScroll = () => {
      const nextY = window.scrollY;
      scrollVelocity += Math.max(-90, Math.min(90, nextY - previousScrollY));
      previousScrollY = nextY;
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "lighter";

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const heroInfluence = Math.max(0, 1 - scrollProgress * 5.4);
      const mobile = width < 760;
      const coreX = width * (mobile ? 0.5 : 0.72);
      const coreY = height * (mobile ? 0.7 : 0.5);
      const interactionRadius = pointer.pressed ? 250 : mobile ? 150 : 190;

      scrollVelocity *= 0.9;
      pointer.energy *= 0.93;

      for (const particle of particles) {
        particle.phase += 0.0018 * particle.depth;

        if (heroInfluence > 0.001) {
          const dx = coreX - particle.x;
          const dy = coreY - particle.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const radialError = distance - particle.orbitRadius;
          const pull = radialError * 0.000012 * heroInfluence * particle.depth;
          const tangent = 0.0028 * heroInfluence * particle.depth;

          particle.vx += (dx / distance) * pull - (dy / distance) * tangent;
          particle.vy += (dy / distance) * pull + (dx / distance) * tangent;

          if (distance < Math.min(width, height) * 0.48 && frame % 2 === 0) {
            const lineAlpha = Math.max(0, 0.055 * heroInfluence * (1 - distance / (Math.min(width, height) * 0.48)));
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(coreX, coreY);
            context.strokeStyle = `rgba(${ACCENT},${lineAlpha})`;
            context.lineWidth = 0.45;
            context.stroke();
          }
        }

        const pointerDx = pointer.x - particle.x;
        const pointerDy = pointer.y - particle.y;
        const pointerDistance = Math.max(1, Math.hypot(pointerDx, pointerDy));

        if (pointerDistance < interactionRadius && pointer.energy > 0.01) {
          const force = (1 - pointerDistance / interactionRadius) * pointer.energy * particle.depth;
          particle.vx -= (pointerDx / pointerDistance) * force * 0.075;
          particle.vy -= (pointerDy / pointerDistance) * force * 0.075;
        }

        particle.vy += scrollVelocity * 0.000018 * particle.depth;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.x += particle.vx * (1 + Math.abs(scrollVelocity) * 0.0025);
        particle.y += particle.vy * (1 + Math.abs(scrollVelocity) * 0.0025);

        if (particle.x < -24) particle.x = width + 24;
        if (particle.x > width + 24) particle.x = -24;
        if (particle.y < -24) particle.y = height + 24;
        if (particle.y > height + 24) particle.y = -24;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 0.38) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(
            particle.x - particle.vx * Math.min(15, 4 + speed * 5),
            particle.y - particle.vy * Math.min(15, 4 + speed * 5),
          );
          context.strokeStyle = `rgba(${ACCENT},${Math.min(0.18, particle.alpha * 0.18)})`;
          context.lineWidth = Math.max(0.4, particle.size * 0.55);
          context.stroke();
        }

        const shimmer = 0.72 + Math.sin(particle.phase * 7 + frame * 0.008) * 0.28;
        const alpha = particle.alpha * shimmer * (0.72 + particle.depth * 0.28);

        if (particle.size > 1.15) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size * 3.8, 0, Math.PI * 2);
          context.fillStyle = `rgba(${ACCENT},${alpha * 0.055})`;
          context.fill();
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${ACCENT},${alpha})`;
        context.fill();
      }

      if (pointer.energy > 0.04) {
        const pulseRadius = 34 + (1.7 - Math.min(1.7, pointer.energy)) * 90;
        context.beginPath();
        context.arc(pointer.x, pointer.y, pulseRadius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${ACCENT},${Math.min(0.16, pointer.energy * 0.08)})`;
        context.lineWidth = 1;
        context.stroke();
      }

      context.restore();

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100svh",
        pointerEvents: "none",
        opacity: 0.92,
        mixBlendMode: "screen",
      }}
    />
  );
}
