<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ConfettiAnimation",
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let context: CanvasRenderingContext2D | null = null;
    let W = window.innerWidth;
    let H = window.innerHeight;
    const maxConfettis = 150;
    const particles: ConfettiParticle[] = [];

    const possibleColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ];

    class ConfettiParticle {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;

      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = randomFromTo(11, 33);
        this.d = Math.random() * maxConfettis + 11;
        this.color =
          possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
      }

      draw() {
        if (!context) return;
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        context.stroke();
      }
    }

    function randomFromTo(from: number, to: number) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function draw() {
      if (!context) return;
      const results: void[] = [];

      requestAnimationFrame(draw);

      context.clearRect(0, 0, W, H);

      for (let i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }

      let particle: ConfettiParticle;
      for (let i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
    }

    onMounted(() => {
      if (canvas.value) {
        canvas.value.width = W;
        canvas.value.height = H;
        context = canvas.value.getContext("2d");
        window.addEventListener("resize", () => {
          W = window.innerWidth;
          H = window.innerHeight;
          if (canvas.value) {
            canvas.value.width = W;
            canvas.value.height = H;
          }
        });

        for (let i = 0; i < maxConfettis; i++) {
          particles.push(new ConfettiParticle());
        }

        draw();
      }
    });

    return {
      canvas,
    };
  },
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.15;
}
</style>
