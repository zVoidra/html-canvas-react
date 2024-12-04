import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  particleTrailWidth: number;
  strokeColor: string;
  theta: number;
  rotateSpeed: number;
  t: number;
  rotate: () => void;
};

const Line: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesArray = useRef<Particle[]>([]);
  const cursor = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.globalAlpha = 0.5;

    const setSize = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    };

    const generateParticles = (amount: number) => {
      for (let i = 0; i < amount; i++) {
        particlesArray.current[i] = new Particle(
          window.innerWidth / 2,
          window.innerHeight / 2,
          4,
          generateColor(),
          0.02,
          context
        );
      }
    };

    const generateColor = (): string => {
      const hexSet = "0123456789ABCDEF";
      let finalHexString = "#";
      for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.floor(Math.random() * 16)];
      }
      return finalHexString;
    };

    class Particle {
      x: number;
      y: number;
      particleTrailWidth: number;
      strokeColor: string;
      theta: number;
      rotateSpeed: number;
      t: number;
      context: CanvasRenderingContext2D;

      constructor(
        x: number,
        y: number,
        particleTrailWidth: number,
        strokeColor: string,
        rotateSpeed: number,
        context: CanvasRenderingContext2D
      ) {
        this.x = x;
        this.y = y;
        this.particleTrailWidth = particleTrailWidth;
        this.strokeColor = strokeColor;
        this.theta = Math.random() * Math.PI * 2;
        this.rotateSpeed = rotateSpeed;
        this.t = Math.random() * 150;
        this.context = context;
      }

      rotate = () => {
        const lastPosition = { x: this.x, y: this.y };
        this.theta += this.rotateSpeed;
        this.x = cursor.current.x + Math.cos(this.theta) * this.t;
        this.y = cursor.current.y + Math.sin(this.theta) * this.t;
        this.context.beginPath();
        this.context.lineWidth = this.particleTrailWidth;
        this.context.strokeStyle = this.strokeColor;
        this.context.moveTo(lastPosition.x, lastPosition.y);
        this.context.lineTo(this.x, this.y);
        this.context.stroke();
      };
    }

    const anim = () => {
      requestAnimationFrame(anim);
      context.fillStyle = "rgb(0 0 0 / 5%)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      particlesArray.current.forEach((particle) => particle.rotate());
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      cursor.current.x = e.touches[0].clientX;
      cursor.current.y = e.touches[0].clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", setSize);

    setSize();
    generateParticles(101);
    anim();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} id="cw" style={{ display: "block" }} />;
};

export default Line;
