const puppeteer = require('puppeteer');
const { FACEBOOK } = require('./secret');

const run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://facebook.com');
    await page.type('#email', FACEBOOK.USER_NAME);
    await page.type('#pass', FACEBOOK.PASSWORD);
    await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
    await page.waitForNavigation();

    console.log('in home screen')
    await page.waitFor(2000)
    await page.click('[aria-label="Messenger"]');
    console.log('click mess')
    await page.waitFor(10000)

    let ngocanhClassName = '[class="ow4ym5g4 auili1gw rq0escxv j83agx80 buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 nnctdnn4 hpfvmrgz qt6c0cv9 jb3vyjys l9j0dhe7 du4w35lb bp9cbjyn btwxx1t3 dflh9lhu scb9dxdr"]';
    await page.click(ngocanhClassName)
    await page.waitFor(2000)
    await page.evaluate(() => {
        document.querySelector('[class="_1mf _1mj"]').click();
        document.querySelector('[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db gfeo3gy3 a3bd9o3v ekzkrbhg oo9gr5id hzawbc8m"]').click()
    })
    await page.waitFor(5000);
    await page.screenshot({ path: 'ngocanhxinh.png' })
    for (let i = 0; i < 100; i++) {
        await page.evaluate(() => {
            
            document.querySelectorAll('[data-text=true]')[0].innerText = 'Anh yêu em' + i
            document.querySelectorAll('[aria-label="Nhấn Enter để gửi"]')[0].click()
        })
    }
    await browser.close();
}

run();
