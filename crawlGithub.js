const puppeteer = require('puppeteer');

let sampleUrl = 'https://github.com/anhthu127';

const crawlFunctA = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    let data = []
    try {
        await page.click('[class="UnderlineNav-item "]');
        await page.waitForSelector('.col-12.d-flex.width-full.py-4.border-bottom.color-border-secondary');
        
        //get all data one page
        firstPageData = await page.evaluate(() => {
            let listRepo = document.querySelectorAll('.col-12.d-flex.width-full.py-4.border-bottom.color-border-secondary')
            let listRepoData = []

            for (let i = 0; i < listRepo.length; i++) {
                let innerText = listRepo[i].getElementsByTagName('a')[0].innerText;
                listRepoData.push({
                    name: innerText,
                    page: 1
                })
            }
            return listRepoData;
        })
        data = [
            ...firstPageData
        ]
        
        //click next
        let countLoop = 2;
        while (true) {
            console.log(countLoop)
            let canClick = await page.evaluate(() => {
                let nextBtn = document.querySelectorAll('[class="btn btn-outline BtnGroup-item"]')[1];
                let isDisabled = nextBtn.disabled;
                if (isDisabled) {
                    return false;
                } else {
                    document.querySelectorAll('[class="btn btn-outline BtnGroup-item"]')[1].click();
                    return true;
                }
            })
            if (!canClick) {
                return
            }
            await page.waitForNavigation();
            tempData = await page.evaluate(({ countLoop }) => {
                let listRepo = document.querySelectorAll('.col-12.d-flex.width-full.py-4.border-bottom.color-border-secondary')
                let listRepoData = []

                for (let i = 0; i < listRepo.length; i++) {
                    let innerText = listRepo[i].getElementsByTagName('a')[0].innerText;
                    listRepoData.push({
                        name: innerText,
                        page: countLoop
                    })
                }
                return listRepoData;
            }, { countLoop })
            data = [
                ...data,
                ...tempData,
            ]
            countLoop++;
        }
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
    console.log(crawlFunctAData.length)
}

run();



