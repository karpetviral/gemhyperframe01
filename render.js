const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  console.log('Mula menjana video promosi Moshi Moshi Takoyaki (20 saat)...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });

  // Template HyperFrames Multi-Scene (20 Saat)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <style>
        body {
          margin: 0; padding: 0;
          width: 1080px; height: 1920px;
          background: linear-gradient(135deg, #0f172a, #4c1d95);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', Arial, sans-serif;
          color: white;
          overflow: hidden;
        }
        .scene {
          position: absolute;
          width: 900px;
          text-align: center;
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .badge {
          background: rgba(244, 63, 94, 0.25);
          border: 4px solid #f43f5e;
          padding: 15px 45px;
          border-radius: 50px;
          font-size: 40px;
          font-weight: bold;
          color: #fb7185;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(244, 63, 94, 0.4);
        }
        h1 {
          font-size: 80px;
          line-height: 1.25;
          margin: 0 0 25px 0;
          font-weight: 800;
          text-shadow: 0 5px 15px rgba(0,0,0,0.5);
        }
        p {
          font-size: 48px;
          line-height: 1.4;
          color: #e2e8f0;
          margin: 0;
          text-shadow: 0 3px 10px rgba(0,0,0,0.5);
        }
        .highlight {
          color: #38bdf8;
          font-weight: bold;
        }
        .tagline {
          margin-top: 40px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          padding: 35px 50px;
          border-radius: 30px;
          border: 3px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .emoji {
          font-size: 140px;
          margin-bottom: 25px;
          display: inline-block;
        }
      </style>
    </head>
    <body>

      <!-- Scene 1: Hook Kuat (0 - 5 saat) -->
      <div class="scene" id="scene1">
        <div class="emoji">🐙🔥</div>
        <h1>CARI TAKOYAKI PALING SEDAP DI GOMBAK?</h1>
        <p>Gebu, panas & penuh rasa umami! 🤤✨</p>
      </div>

      <!-- Scene 2: Nama Kedai & Lokasi (5 - 11 saat) -->
      <div class="scene" id="scene2">
        <div class="badge">📍 TAMAN SERI GOMBAK</div>
        <h1>MOSHI MOSHI TAKOYAKI</h1>
        <p>MyKiosk K03, Jalan SG 3/1<br><span class="highlight">(Berhadapan BHPetrol Seri Gombak)</span></p>
      </div>

      <!-- Scene 3: Kelebihan & Produk (11 - 16 saat) -->
      <div class="scene" id="scene3">
        <div class="emoji">🥢😋</div>
        <h1>KULIT RANGUP & ISI PADU!</h1>
        <p>Sos terangkat & taburan katsuobushi melimpah!</p>
      </div>

      <!-- Scene 4: Call to Action / Penutup (16 - 20 saat) -->
      <div class="scene" id="scene4">
        <div class="emoji">🏃‍♂️💨</div>
        <h1>JEMPUT DATANG SINGGAH!</h1>
        <div class="tagline">
          <p>📞 WhatsApp: <span class="highlight">017-323 7404</span></p>
          <p style="font-size: 38px; margin-top: 15px; color: #f43f5e; font-weight: bold;">Buka Setiap Hari! ❤️</p>
        </div>
      </div>

      <script>
        const tl = gsap.timeline();

        // Scene 1 (0s - 4.5s)
        tl.to('#scene1', { duration: 0.8, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' })
          .to('#scene1', { duration: 0.6, opacity: 0, scale: 0.9, y: -50, delay: 2.5 });

        // Scene 2 (4.5s - 10.5s)
        tl.to('#scene2', { duration: 0.8, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' })
          .to('#scene2', { duration: 0.6, opacity: 0, scale: 0.9, y: -50, delay: 3.8 });

        // Scene 3 (10.5s - 15.5s)
        tl.to('#scene3', { duration: 0.8, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' })
          .to('#scene3', { duration: 0.6, opacity: 0, scale: 0.9, y: -50, delay: 3.0 });

        // Scene 4 (15.5s - 20s)
        tl.to('#scene4', { duration: 0.8, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' });
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  if (!fs.existsSync('./frames')) fs.mkdirSync('./frames');

  // Rakam 600 frame (20 saat pada 30fps)
  console.log('Merakam 600 frame animasi (20 saat)...');
  for (let i = 0; i < 600; i++) {
    const frameNumber = String(i).padStart(4, '0');
    await page.evaluate((frame) => {
      if (window.gsap) {
        window.gsap.globalTimeline.time(frame / 30);
      }
    }, i);
    await page.screenshot({ path: `./frames/frame_${frameNumber}.png` });
  }

  await browser.close();

  console.log('Menukar 600 frame kepada fail output.mp4 menggunakan FFmpeg...');
  execSync('ffmpeg -y -framerate 30 -i ./frames/frame_%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4');
  console.log('Video Moshi Moshi Takoyaki SIAP!');
})();
