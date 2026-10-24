const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  console.log('Mula melancarkan HyperFrames dengan animasi GSAP...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });

  // Template HyperFrames dengan Animasi CSS & GSAP (Karakter & Teks Joget)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1080px;
          height: 1920px;
          background: radial-gradient(circle at center, #2e1065, #0f172a);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          color: white;
          overflow: hidden;
        }

        /* Karakter Emoji Joget */
        .dancer {
          font-size: 180px;
          display: inline-block;
          transform-origin: bottom center;
        }

        /* Kad Promosi */
        .card {
          margin-top: 40px;
          text-align: center;
          padding: 50px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 3px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        h1 {
          font-size: 80px;
          margin: 0;
          background: linear-gradient(to right, #f43f5e, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          font-size: 45px;
          color: #e2e8f0;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="dancer" id="dancer">🕺</div>
      
      <div class="card" id="card">
        <h1>POWER GILA! 🔥</h1>
        <p>Video HyperFrames Dah Joget</p>
      </div>

      <script>
        // GSAP Timeline untuk efek joget & animasi masuk
        const tl = gsap.timeline();

        // Kad masuk dari bawah
        tl.from('#card', { duration: 1, y: 300, opacity: 0, ease: 'back.out(1.7)' });

        // Animasi joget berulang untuk karakter
        gsap.to('#dancer', {
          duration: 0.4,
          rotation: 15,
          y: -30,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  
  if (!fs.existsSync('./frames')) fs.mkdirSync('./frames');

  console.log('Merakam 90 frame animasi joget (3 saat)...');
  // Rakam 90 frame (3 saat pada 30fps)
  for (let i = 0; i < 90; i++) {
    const frameNumber = String(i).padStart(4, '0');
    await page.screenshot({ path: `./frames/frame_${frameNumber}.png` });
  }

  await browser.close();

  console.log('Menukar frame ke video .MP4...');
  execSync('ffmpeg -y -framerate 30 -i ./frames/frame_%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4');
  console.log('Video Joget HyperFrames SIAP!');
})();
