const puppeteer = require('puppeteer');
const { installMouseHelper } = require('./mousehelper');
const moment = require('moment');
// const { FACEBOOK } = require('./secret');
const run = async () => {
    let nameTarget = 'Ha Ngoc Anh';
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/messages');
    await page.type('#email', 'leducthang98@gmail.com');
    await page.type('#pass', 'leducthangyeuhangocanh');
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
    await page.waitFor(1000)
    //click icon
    //document.querySelector('[class="uiScrollableAreaContent"]').parentNode.parentNode.getElementsByTagName('img')[0].alt
    await page.evaluate(() => {
        document.querySelector('[aria-label="Chọn biểu tượng cảm xúc"]').click()

    })
    console.log('clicked')
    await page.waitFor(4000);

    await page.evaluate(() => {
        let listIcon = document.querySelector('[class="uiScrollableAreaWrap scrollable"]')
        listIcon.scroll(0, 20000)
    })
    await page.waitFor(2000);

    let listIcon = await page.evaluate(() => {
        let listIconData = []
        let scrollable = document.querySelector('[class="uiScrollableAreaWrap scrollable"]');
        let listIcon = scrollable.getElementsByTagName('img');
        for (let i = 0; i < listIcon.length; i++) {
            listIconData.push({
                name: listIcon[i].alt
            })
        }
        return listIconData;
    })

    console.log(listIcon)
    await browser.close();
}


run();
