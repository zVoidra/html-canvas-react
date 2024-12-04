import { useEffect } from "react";
import PanoramaImageSource from "../../assets/capitan_meadows_yosemite_national_park.jpg";

export default function Panorama() {
  const img = new Image();
  const canvasXSize = 800;
  const canvasYSize = 200;
  const speed = 30;
  const scale = 1.05;
  const y = -4.5;

  function initializeImageSource() {
    img.src = PanoramaImageSource;
  }

  useEffect(() => {
    const dx = 0.75;
    let imgW: number;
    let imgH: number;
    let x = 0;
    let clearX: any;
    let clearY: any;
    let ctx: any;

    img.onload = () => {
      imgW = img.width * scale;
      imgH = img.height * scale;

      if (imgW > canvasXSize) {
        // Image larger than canvas
        x = canvasXSize - imgW;
      }

      // Check if image dimension is larger than canvas
      clearX = Math.max(imgW, canvasXSize);
      clearY = Math.max(imgH, canvasYSize);

      // Get canvas context
      let canvas = document.getElementById(
        "PanoramaCanvas"
      ) as HTMLCanvasElement;
      if (!canvas) return;

      ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set refresh rate
      return setInterval(draw, speed);
    };

    function draw() {
      ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

      // If image is <= canvas size
      if (imgW <= canvasXSize) {
        // Reset, start from beginning
        if (x > canvasXSize) {
          x = -imgW + x;
        }

        // Draw additional image1
        if (x > 0) {
          ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }

        // Draw additional image2
        if (x - imgW > 0) {
          ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
      } else {
        // Image is > canvas size
        // Reset, start from beginning
        if (x > canvasXSize) {
          x = canvasXSize - imgW;
        }

        // Draw additional image
        if (x > canvasXSize - imgW) {
          ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
      }

      // Draw image
      ctx.drawImage(img, x, y, imgW, imgH);

      // Amount to move
      x += dx;
    }
    initializeImageSource();
  }, []);

  return (
    <div>
      <h1>Panorama</h1>
      <canvas id="PanoramaCanvas" width="800" height="200" />
    </div>
  );
}
