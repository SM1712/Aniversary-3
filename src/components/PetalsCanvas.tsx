import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export const PetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for romantic rose petals
    const petalColors = [
      '#f43f5e', // Vibrant Rose
      '#fb7185', // Soft Pink
      '#fda4af', // Light Pink
      '#be123c', // Deep Rose Red
      '#eab308', // Gold sparkle
    ];

    // Create initial petals pool
    const petalCount = window.innerWidth < 768 ? 35 : 65;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.2 + 0.5,
        speedX: Math.random() * 1 - 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.7 + 0.3,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Draw single petal path
    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      ctx.beginPath();
      // Draw organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      ctx.fill();

      // Subtle gold highlight
      if (color !== '#eab308') {
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    // Burst of petals on click/tap
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clickX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clickY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 15; i++) {
        petals.push({
          x: clickX,
          y: clickY,
          size: Math.random() * 10 + 6,
          speedY: (Math.random() - 0.5) * 4,
          speedX: (Math.random() - 0.5) * 4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          opacity: 1,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
        });
      }

      // Keep max pool size under 120
      if (petals.length > 120) {
        petals.splice(0, petals.length - 120);
      }
    };

    window.addEventListener('click', handleClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p, index) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset when falling out of bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
    />
  );
};
