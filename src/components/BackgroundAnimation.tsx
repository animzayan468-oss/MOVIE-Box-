import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Reel {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speedX: number;
  speedY: number;
  thickness: number;
  alpha: number;
  color: string;
}

interface Flame {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Spark {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

interface LightningSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function BackgroundAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDarkModeRef = useRef(isDarkMode);

  // Sync isDarkMode to live ref to avoid tearing or resetting canvas loops
  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    // Canvas fluid resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // --- State Pools ---
    const stars: Star[] = [];
    const reels: Reel[] = [];
    const meteors: Meteor[] = [];
    const flames: Flame[] = [];
    const sparks: Spark[] = [];

    // Lightning State
    let lightningFlash = 0; // 0 to 1
    let lightningSegments: LightningSegment[] = [];
    let lightningCooldown = 120; // frames before possible strike
    let lightningStrikeDuration = 0; // frames actively showing bolt

    // 1. Initialize Stars ✨
    const maxStars = 30;
    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 1,
        speed: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    // 2. Initialize Emojis 🎬
    const maxReels = 4;
    for (let i = 0; i < maxReels; i++) {
      reels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 14,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: -(Math.random() * 0.2 + 0.1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.008 - 0.004,
        opacity: Math.random() * 0.08 + 0.04,
      });
    }

    // Spawn a meteor 🌠
    const spawnMeteor = () => {
      const startOnTop = Math.random() > 0.4;
      const x = startOnTop ? Math.random() * canvas.width : canvas.width + 50;
      const y = startOnTop ? -50 : Math.random() * (canvas.height * 0.6);
      
      const angle = Math.PI * 0.8 + Math.random() * 0.1; // Diagonal down-left
      const speed = Math.random() * 6 + 6; // High velocity
      
      const colors = [
        "rgba(251, 146, 60, ", // Orange/Amber 🌠
        "rgba(147, 51, 234, ", // Cinematic Violet
        "rgba(59, 130, 246, ", // Cosmic Cyan/Blue
      ];

      meteors.push({
        x,
        y,
        length: Math.random() * 80 + 50,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        thickness: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Spawn explosion sparks 💥
    const triggerExplosionAt = (ex: number, ey: number) => {
      const particleCount = Math.floor(Math.random() * 15 + 15);
      const colors = [
        "rgba(239, 68, 68, ",   // Red
        "rgba(249, 115, 22, ",  // Orange
        "rgba(234, 179, 8, ",   // Yellow
        "rgba(147, 51, 234, "   // Cinematic purple action spark
      ];
      for (let i = 0; i < particleCount; i++) {
        const speed = Math.random() * 3 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        sparks.push({
          x: ex,
          y: ey,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    // Calculate recursive lightning segments
    const generateLightningSegments = (startX: number, startY: number, endY: number, displacement: number) => {
      const segs: LightningSegment[] = [];
      const steps = 12;
      let currX = startX;
      let currY = startY;
      const segmentHeight = endY / steps;

      for (let i = 0; i < steps; i++) {
        const nextY = currY + segmentHeight;
        const nextX = currX + (Math.random() * 2 - 1) * displacement;
        segs.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });
        currX = nextX;
        currY = nextY;
      }
      return segs;
    };

    // --- Optional Mouse interactivity: trigger explosion on click ---
    const handleCanvasClick = (e: MouseEvent) => {
      triggerExplosionAt(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleCanvasClick);

    // --- Frame Render Logic ---
    const render = () => {
      const isDark = isDarkModeRef.current;

      // 1. Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "#08080c");
        gradient.addColorStop(0.5, "#0d0c12"); // Slightly purple/magenta tinted
        gradient.addColorStop(1, "#050507");
      } else {
        gradient.addColorStop(0, "#f3f4f6"); // slate-100/200
        gradient.addColorStop(0.5, "#e5e7eb");
        gradient.addColorStop(1, "#d1d5db");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Action Lightning Strike effect logic ⚡
      lightningCooldown--;
      if (lightningCooldown <= 0 && Math.random() < 0.004 && isDark) {
        // Trigger lightning bolt
        lightningFlash = Math.random() * 0.25 + 0.15; // Ambient flash strength
        const startX = Math.random() * canvas.width;
        lightningSegments = generateLightningSegments(startX, 0, canvas.height * (0.6 + Math.random() * 0.3), 35);
        lightningStrikeDuration = Math.floor(Math.random() * 6 + 4);
        lightningCooldown = Math.floor(Math.random() * 200 + 150); // Cooldown to save performance
      }

      // Draw Screen flash
      if (lightningFlash > 0.01) {
        ctx.fillStyle = `rgba(186, 230, 253, ${lightningFlash})`; // Light sky blue light flash
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lightningFlash *= 0.88; // Quick decay
      }

      // Draw Jagged Lightning line
      if (lightningStrikeDuration > 0 && lightningSegments.length > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = Math.random() * 3 + 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)"; // bright electric blue glow
        ctx.beginPath();
        
        lightningSegments.forEach((seg) => {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        });
        
        ctx.stroke();
        ctx.restore();
        lightningStrikeDuration--;
      }

      // 3. Falling Stars background atmosphere ✨
      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }

        s.opacity += (Math.random() * 0.04 - 0.02);
        if (s.opacity < 0.2) s.opacity = 0.2;
        if (s.opacity > 0.8) s.opacity = 0.8;

        ctx.save();
        ctx.fillStyle = isDark 
          ? `rgba(255, 255, 255, ${s.opacity})` 
          : `rgba(100, 116, 139, ${s.opacity * 0.6})`;
          
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Movie Reels (🎬 Emoji) - Ambient slow drifters
      reels.forEach((r) => {
        r.x += r.speedX;
        r.y += r.speedY;
        r.rotation += r.rotationSpeed;

        if (r.y < -30) {
          r.y = canvas.height + 30;
          r.x = Math.random() * canvas.width;
        }
        if (r.x < -30) r.x = canvas.width + 30;
        if (r.x > canvas.width + 30) r.x = -30;

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);
        ctx.globalAlpha = isDark ? r.opacity : r.opacity * 0.5;
        ctx.font = `${r.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🎬", 0, 0);
        ctx.restore();
      });

      // 5. Meteors/Shooting Stars 🌠 (Spawns and updates)
      if (Math.random() < 0.02 && meteors.length < 5) {
        spawnMeteor();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.speedX;
        m.y += m.speedY;

        // Check bounds
        if (m.x < -100 || m.y > canvas.height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        // Draw meteor trail
        ctx.save();
        const trailGrd = ctx.createLinearGradient(m.x, m.y, m.x - m.speedX * 3, m.y - m.speedY * 3);
        trailGrd.addColorStop(0, `${m.color}${m.alpha})`);
        trailGrd.addColorStop(0.5, `${m.color}${m.alpha * 0.4})`);
        trailGrd.addColorStop(1, `${m.color}0)`);

        ctx.strokeStyle = trailGrd;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.speedX * 1.5, m.y - m.speedY * 1.5);
        ctx.stroke();

        // Meteor Head sparkle
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Action-packed Ground Flames 🔥 (Bottom rising particles)
      const fireBaseHeight = canvas.height - 4;
      // Spawn new flames every frame
      if (flames.length < (canvas.width > 768 ? 60 : 30)) {
        const redOrange = Math.random() > 0.4 ? "rgba(249, 115, 22, " : "rgba(239, 68, 68, "; // orange or red tint
        const yellowWhite = Math.random() > 0.8 ? "rgba(253, 224, 71, " : redOrange;
        
        flames.push({
          x: Math.random() * canvas.width,
          y: fireBaseHeight + Math.random() * 10,
          radius: Math.random() * 12 + 6,
          speedY: -(Math.random() * 1.4 + 0.6), // float up
          speedX: Math.random() * 0.6 - 0.3,
          alpha: Math.random() * 0.35 + 0.25,
          color: yellowWhite,
          life: 0,
          maxLife: Math.random() * 40 + 30, // frames alive
        });
      }

      for (let i = flames.length - 1; i >= 0; i--) {
        const f = flames[i];
        f.x += f.speedX;
        f.y += f.speedY;
        f.life++;
        // Gradually shrink fire particle size
        const ratio = (f.maxLife - f.life) / f.maxLife;

        if (ratio <= 0) {
          flames.splice(i, 1);
          continue;
        }

        const currentRadius = f.radius * ratio;
        const currentAlpha = f.alpha * ratio;

        ctx.save();
        // Fire blend mode
        ctx.globalCompositeOperation = "screen";
        const flameGrd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, currentRadius);
        flameGrd.addColorStop(0, `${f.color}${currentAlpha})`);
        flameGrd.addColorStop(0.7, `${f.color}${currentAlpha * 0.2})`);
        flameGrd.addColorStop(1, `${f.color}0)`);

        ctx.fillStyle = flameGrd;
        ctx.beginPath();
        ctx.arc(f.x, f.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 7. Ambient Explosion Bursts 💥
      // Occasionally trigger random explosions dynamically
      if (Math.random() < 0.007 && sparks.length < 80) {
        const randX = Math.random() * canvas.width;
        const randY = Math.random() * (canvas.height * 0.7); // explosion in sky/middle area
        triggerExplosionAt(randX, randY);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.speedX;
        sp.y += sp.speedY;
        sp.speedY += 0.04; // Gravity pulling sparks downwards lightly!
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `${sp.color}${sp.alpha})`;
        
        // Draw sparking particle
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius * (0.3 + sp.alpha * 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up Event Listeners
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: isDarkMode ? "screen" : "normal" }}
    />
  );
}
