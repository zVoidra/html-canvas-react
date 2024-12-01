import { useEffect, useRef } from "react";

export default function Clock() {
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("ClockCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const now = new Date();
      context.save();
      context.clearRect(0, 0, 150, 150);
      context.translate(75, 75);
      context.scale(0.4, 0.4);
      context.rotate(-Math.PI / 2);
      context.strokeStyle = "black";
      context.fillStyle = "white";
      context.lineWidth = 8;
      context.lineCap = "round";

      // Hour marks
      context.save();
      for (let i = 0; i < 12; i++) {
        context.beginPath();
        context.rotate(Math.PI / 6);
        context.moveTo(100, 0);
        context.lineTo(120, 0);
        context.stroke();
      }
      context.restore();

      // Minute marks
      context.save();
      context.lineWidth = 5;
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          context.beginPath();
          context.moveTo(117, 0);
          context.lineTo(120, 0);
          context.stroke();
        }
        context.rotate(Math.PI / 30);
      }
      context.restore();

      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hr = now.getHours() % 12;

      context.fillStyle = "black";

      canvas.innerText = `The time is: ${hr}:${min}`;

      context.save();
      context.rotate(
        (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
      );
      context.lineWidth = 14;
      context.beginPath();
      context.moveTo(-20, 0);
      context.lineTo(80, 0);
      context.stroke();
      context.restore();

      // Write Minutes
      context.save();
      context.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(-28, 0);
      context.lineTo(112, 0);
      context.stroke();
      context.restore();

      // Write seconds
      context.save();
      context.rotate((sec * Math.PI) / 30);
      context.strokeStyle = "#D40000";
      context.fillStyle = "#D40000";
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(-30, 0);
      context.lineTo(83, 0);
      context.stroke();
      context.beginPath();
      context.arc(0, 0, 10, 0, Math.PI * 2, true);
      context.fill();
      context.beginPath();
      context.arc(95, 0, 10, 0, Math.PI * 2, true);
      context.stroke();
      context.fillStyle = "rgb(0 0 0 / 0%)";
      context.arc(0, 0, 3, 0, Math.PI * 2, true);
      context.fill();
      context.restore();

      context.beginPath();
      context.lineWidth = 14;
      context.strokeStyle = "#325FA2";
      context.arc(0, 0, 142, 0, Math.PI * 2, true);
      context.stroke();

      context.restore();

      animationFrameId.current = window.requestAnimationFrame(draw);
    };

    animationFrameId.current = window.requestAnimationFrame(draw);

    return () => {
      if (animationFrameId.current !== null) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Clock</h1>
      <canvas id="ClockCanvas" width="800" height="200" />
    </div>
  );
}
