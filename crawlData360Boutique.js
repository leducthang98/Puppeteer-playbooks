const puppeteer = require('puppeteer');


const run = async () => {
    // news
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://360boutique.vn/danh-muc/new/');
    let data = [] // [{name, img, price, desc}]
    try {
        // 1 page
        data = await page.evaluate(() => {
            let dataItems = [];
            let listItem = document.getElementsByClassName("item-col");
            for (let i = 0; i < listItem.length; i++) {
                let itemName = listItem[i].querySelector('[class="product-name"]').innerText;
                let imgSrc = listItem[i].getElementsByTagName('img')[0].dataset.lazySrc;
                let price = listItem[i].querySelector('[class="woocommerce-Price-amount amount"]').innerText;
                price = price.substring(0, price.length - 2).replace('.', '');
                dataItems.push({
                    name: itemName,
                    image: imgSrc,
                    price: price
                })
            }
            return dataItems;
        })
        for (let i = 0; i < data.length; i++) {
            console.log(i)
            await page.evaluate(({ data, i }) => {
                document.querySelector('[title="' + data[i].name + '"]').click();
            }, { data, i });
            await page.waitForNavigation();
            let desc = await page.evaluate(async () => {
                return document.querySelector('[id="tab-description"]').innerText;
            })
            page.goBack();
            await page.waitForNavigation();
            data[i] = {
                ...data[i],
                description: desc
            }
        }
        console.log(data)
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
        return data;
    }

}

run();
