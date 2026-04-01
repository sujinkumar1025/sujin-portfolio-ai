const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const PARTICLE_COUNT = 80; // keep same

// 🔥 Increase spread (virtual width area)
const SPREAD = 2; // increase this (1 = normal, 2 = wider, 3 = very wide)

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width * SPREAD,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // ✅ Infinite horizontal movement (wrap smoothly)
        if (p.x > canvas.width * SPREAD) p.x = 0;
        if (p.x < 0) p.x = canvas.width * SPREAD;

        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // Draw only visible area
        if (p.x <= canvas.width) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "rgb(241, 240, 245)";
            ctx.fill();
        }
    });

    // Draw lines (only visible ones)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            // Only draw if both inside screen
            if (particles[i].x <= canvas.width && particles[j].x <= canvas.width) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "rgba(0,255,255,0.2)";
                    ctx.lineWidth = 1.5; // increase thickness
                    ctx.strokeStyle = "rgba(212, 0, 255, 0.32)";
                    ctx.stroke();
                }
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();
