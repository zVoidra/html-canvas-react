import { useEffect, useRef } from "react";
import sunImage from "../../assets/canvas_sun.png";
import moonImage from "../../assets/canvas_moon.png";
import earthImage from "../../assets/canvas_earth.png";

export default function Sol() {
  const sun = new Image();
  const moon = new Image();
  const earth = new Image();
  const animationFrameId = useRef<number | null>(null);

  function setImageSources() {
    // sun.src = "assets/canvas_sun.png";
    // moon.src = "assets/canvas_moon.png";
    // earth.src = "assets/canvas_earth.png";
    sun.src = sunImage;
    moon.src = moonImage;
    earth.src = earthImage;
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    setImageSources();

    const draw = () => {
      console.log("Draw");
      context.globalCompositeOperation = "destination-over";
      context.clearRect(0, 0, 300, 300);

      context.fillStyle = "rgb(0 0 0 / 40%)";
      context.strokeStyle = "rgb(0 153 255 / 40%)";
      context.save();
      context.translate(150, 150);

      const time = new Date();
      context.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      context.translate(105, 0);
      context.fillRect(0, -12, 40, 24); // Shadow of Earth
      context.drawImage(earth, -12, -12);

      context.save();
      context.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      context.translate(0, 28.5);
      context.drawImage(moon, -3.5, -3.5);
      context.restore();

      context.restore();

      context.beginPath();
      context.arc(150, 150, 105, 0, Math.PI * 2, false);
      context.stroke();

      context.drawImage(sun, 0, 0, 300, 300);

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
      <h1>Sol</h1>
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
  );
}
