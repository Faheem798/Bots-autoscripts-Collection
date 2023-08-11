const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: false
  });

  // Open a new page
  const page = await browser.newPage();

  // Intercept requests and respond to image requests
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    if (request.resourceType() === 'image') {
   
      await request.respond({
        status: 200,
        contentType: 'image/jpeg',
        body: fs.readFileSync('./image.jpg')
      });
    } else {
      request.continue();
    }
  });

  // Navigate to a URL
  await page.goto('https://www.google.com/search?sxsrf=AB5stBgaHidXX6x1PIAj1m7OmDMFWyb_mQ:1691545229426&q=kingkong&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjUzJWEuc6AAxX9i_0HHR5GBzoQ0pQJegQIDRAB');

  // You can uncomment this part to handle responses and log headers
  // page.on('response', (response) => {
  //   const url = response.url();
  //   if (url.includes('https://www.google.com/log?format=json')) {
  //     console.log(`url: ${url}`);
  //     console.log(`method: ${response.method()}`);
  //     console.log(`header: ${JSON.stringify(response.headers())}`);
  //   }
  // });

  // Close the browser when done
  // await browser.close();
})();
