const puppeteer = require('puppeteer');
const fs = require('fs');

const pages = [
  { name: 'login', url: 'http://localhost:3000/login' },
  { name: 'login-admin', url: 'http://localhost:3000/login?role=admin' },
  { name: 'signup', url: 'http://localhost:3000/signup' },
  { name: 'admin-dashboard', url: 'http://localhost:3000/admin' },
  { name: 'guide-dashboard', url: 'http://localhost:3000/guide' },
  { name: 'student-dashboard', url: 'http://localhost:3000/student' },
  { name: 'component-showcase', url: 'http://localhost:3000/showcase' }
];

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to standard desktop size
  await page.setViewport({ width: 1440, height: 900 });
  
  // Create screenshots directory
  if (!fs.existsSync('./screenshots')) {
    fs.mkdirSync('./screenshots');
  }
  
  for (const pageInfo of pages) {
    try {
      console.log(`Taking screenshot of ${pageInfo.name}...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
      
      // Wait for any animations to complete
      await page.waitForTimeout(2000);
      
      // Take full page screenshot
      await page.screenshot({
        path: `./screenshots/${pageInfo.name}.png`,
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ ${pageInfo.name}.png saved`);
    } catch (error) {
      console.error(`❌ Error taking screenshot of ${pageInfo.name}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('\n🎉 All screenshots completed!');
  console.log('📁 Check the ./screenshots folder');
}

takeScreenshots();
