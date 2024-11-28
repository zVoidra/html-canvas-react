import { useEffect } from "react";

export default function Sol() {
  const sun = new Image();
  const moon = new Image();
  const earth = new Image();

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
  }, []);

  return (
    <div>
      <h1>Sol</h1>
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
  );
}
