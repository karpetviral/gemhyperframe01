const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  console.log('Mula melancarkan sistem HyperFrames...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });

  // Template HyperFrames HTML/CSS sederhana (1080x1920 Story format)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1080px;
          height: 1920px;
          background: linear-gradient(135deg, #0f172a, #1e1b4b);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          color: white;
        }
        .box {
          text-align: center;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        h1 { font-size: 70px; margin-bottom: 10px; color: #38bdf8; }
        p { font-size: 40px; color: #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>HyperFrames AI 🚀</h1>
        <p>Ujian Render Video .MP4</p>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  
  if (!fs.existsSync('./frames')) fs.mkdirSync('./frames');

  console.log('Merakam fasa HyperFrames (60 frame)...');
  // Rakam 60 frame (sekitar 2 saat video)
  for (let i = 0; i < 60; i++) {
    const frameNumber = String(i).padStart(4, '0');
    await page.screenshot({ path: `./frames/frame_${frameNumber}.png` });
  }

  await browser.close();

  console.log('Menukar frame imej ke fail output.mp4 guna FFmpeg...');
  execSync('ffmpeg -framerate 30 -i ./frames/frame_%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4');
  console.log('Video HyperFrames SIAP!');
})();
