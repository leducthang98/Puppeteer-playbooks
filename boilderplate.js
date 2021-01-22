const puppeteer = require('puppeteer');

let sampleUrl = 'https://google.com';

const crawlFunctA = async (url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    let data = []
    try {
        
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
        return data;
    }
}

const run = async () => {
    let crawlFunctAData = await crawlFunctA(sampleUrl);
    console.log(crawlFunctAData)
}

run();



