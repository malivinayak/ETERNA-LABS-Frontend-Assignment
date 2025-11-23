import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export const useCursorTrail = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const isHovering = useRef(false);
  const reducedMotion = useSelector((state: RootState) => state.preferences.reducedMotion);
  const cursorEnabled = useSelector((state: RootState) => state.preferences.cursorEnabled);

  useEffect(() => {
    if (!canvasRef.current || !cursorEnabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      isHovering.current = target.closest('button, [role="button"], tr, a, [role="heading"]') !== null;

      if (!reducedMotion && Math.random() < 0.4) {
        particles.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 25,
          y: mousePos.current.y + (Math.random() - 0.5) * 25,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1,
          size: Math.random() * 4 + 1.5,
        });
      }
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Core cursor
      const coreGradient = ctx.createRadialGradient(
        mousePos.current.x,
        mousePos.current.y,
        0,
        mousePos.current.x,
        mousePos.current.y,
        14
      );
      coreGradient.addColorStop(0, 'rgba(200, 150, 255, 1)');
      coreGradient.addColorStop(0.6, 'rgba(168, 85, 247, 0.8)');
      coreGradient.addColorStop(1, 'rgba(148, 113, 247, 0.4)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, 14, 0, Math.PI * 2);
      ctx.fill();

      // Glow ring
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Hover expansion
      if (isHovering.current) {
        const hoverGradient = ctx.createRadialGradient(
          mousePos.current.x,
          mousePos.current.y,
          0,
          mousePos.current.x,
          mousePos.current.y,
          30
        );
        hoverGradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
        hoverGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = hoverGradient;
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particles
      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.015;

        const opacity = Math.max(0, p.life);
        ctx.fillStyle = `rgba(200, 150, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * opacity + 1.5, 0, Math.PI * 2);
        ctx.stroke();

        return p.life > 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, reducedMotion, cursorEnabled]);
};