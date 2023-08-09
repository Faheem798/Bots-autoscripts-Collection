const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: false
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a URL
  await page.goto('https://www.google.com/search?sxsrf=AB5stBgaHidXX6x1PIAj1m7OmDMFWyb_mQ:1691545229426&q=kingkong&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjUzJWEuc6AAxX9i_0HHR5GBzoQ0pQJegQIDRAB');
  await page.on('request',(request)=>{
    const url = (request.url())
    if (url.includes('https://encrypted-tbn0.gstatic.com/images?q=')){
      console.log(url)
    }
  })
  // Close the browser
//   await browser.close();

})();
