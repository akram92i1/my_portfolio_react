import { useEffect, useRef } from "react";

const ConnectedGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const numParticles = 200;
    const maxDistance = 150;
    const keywords = [
      { word: "AI", quote: "The future belongs to those who harness artificial intelligence." },
      { word: "IoT", quote: "Connecting the world, one device at a time." },
      { word: "DevOps", quote: "Speed, stability, and scale—DevOps is the key to modern engineering." },
      { word: "Cloud", quote: "Infinite scalability starts in the cloud." },
      { word: "Optimization", quote: "Efficiency is doing better what is already being done." },
      { word: "Heuristics", quote: "Good heuristics are like good instincts: they lead to better decisions faster." },
      { word: "ML", quote: "Machine learning: turning data into insights, and insights into action." },
      { word: "Security", quote: "In cybersecurity, the strongest link is an informed user." },
      { word: "Big Data", quote: "Data is the new oil, and big data is its refinery." }
    ];

    class Particle {
      constructor(index) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = (Math.random() - 0.5) * 2.5;
        this.radius = 3;
        this.keyword = keywords[index % keywords.length];
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= height * 0.7 || this.y >= height) this.vy *= -1; // Limit animation to left, right, and bottom
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#10ed00";
        ctx.fill();
        ctx.closePath();

        ctx.font = "12px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.keyword.word, this.x + 5, this.y - 5);

        ctx.font = "2px consolas";
        ctx.fillStyle = "rgba(86, 135, 214, 0.7)";
        ctx.fillText(this.keyword.quote, this.x + 5, this.y + 10);
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(i));
    }

    function drawLines() {
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.move();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animate);
    }
    if (window.innerWidth>=1100) {
      animate();
    }
    else{
       // Optional: still clear the canvas once if needed
       ctx.clearRect(0, 0, width, height);
    }
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 blur-sm left-0 w-full h-full z-[-1]" />
  );
};

export default ConnectedGraph;
