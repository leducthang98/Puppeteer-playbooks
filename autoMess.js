const puppeteer = require('puppeteer');
const { installMouseHelper } = require('./mousehelper');
const moment = require('moment');
const { FACEBOOK } = require('./secret');
const run = async () => {
    let nameTarget = 'con gà';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1600 })
    await page.goto('https://www.facebook.com/messages');
    await page.type('#email', FACEBOOK.USER_NAME);
    await page.type('#pass', FACEBOOK.PASSWORD);
    await page.click('#loginbutton');
    await page.waitForNavigation();
    await page.waitFor(2000)
    await page.evaluate(({ nameTarget }) => {
        // document.querySelector('[class="q5bimw55 rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 eg9m0zos l9j0dhe7 du4w35lb ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d c3g1iek1 k4xni2cv"]').scroll(0, 10000)
        let temp = document.querySelectorAll('[role="grid"]')[0];
        let listContactDOM = temp.childNodes;
        let matchIndex = -1;
        for (let i = 0; i < listContactDOM.length; i++) {
            if (listContactDOM[i].innerText.includes(nameTarget)) {
                matchIndex = i;
                break;
            }
        }
        listContactDOM[matchIndex].getElementsByTagName('a')[0].click()
    }, { nameTarget })

    let i = 0;
    while (i < 30) {
        await page.evaluate(() => {
            document.querySelector('[class="ecm0bbzt e5nlhep0 buofh1pr jq4qci2q a3bd9o3v iko8p5ub eg9m0zos ni8dbmo4 rq0escxv lexh0w6q"]').click()
        })
        let mess = moment() + ': Bạn đã bị hack facebook bởi Lê Đức Thắng';
        await page.keyboard.type(mess);
        await page.screenshot({ path: i + '__type.png' })
        await page.evaluate(() => {
            document.querySelector('[aria-label="Nhấn Enter để gửi"]')?.click()
        })
        i++;
    }


    await browser.close();
}


run();
