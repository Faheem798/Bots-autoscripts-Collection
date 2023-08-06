const puppeteer = require("puppeteer-extra");
const fs = require("fs").promises;
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

(async () => {
  puppeteer.use(StealthPlugin());

  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    args: ["--window-size=1366,768"], // Set browser window size
  });

  // Set a user-agent to mimic a regular browser
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
  );

  // Emulate viewport
  await page.setViewport({ width: 1366, height: 768 });

  // Navigate to the desired webpage
  await page.goto("https://accounts.google.com/signin/v2/identifier", {
    waitUntil: "networkidle2",
  });

// Type in the email
await page.type("#identifierId", "Email");
await page.click("#identifierNext");
await page.waitForNavigation({
  waitUntil: "networkidle2",
});

  await page.waitForSelector('[name="Passwd"]');
  await page.type('[name="Passwd"]', "Password");

  // Click on <div> .VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb
  await page.waitForSelector('.VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb');
  await page.click('.VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb');
await page.waitForNavigation({
  waitUntil: "networkidle2", // Correcting the 'waitUntil' value
});
  // Add random delays to mimic human-like behavior
  const randomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Wait for a random time before taking a screenshot (you can adjust the range)
  await page.waitForTimeout(randomDelay(3000, 8000));
  const cookies = await page.cookies();
  await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

  // Close the browser
  await browser.close();
})();
