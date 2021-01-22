const puppeteer = require('puppeteer');

const run = async () => {
    let data = await crawlPhimHanhDong();
    console.log('haha', data);
}

const crawlPhimHanhDong = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.phimmoizz.net/the-loai/phim-hanh-dong/');
    let data = []
    try {
        data = await page.evaluate(async () => {
            let dataMovies = []
            let listMoviesElement = document.querySelectorAll('[class="movie-item"]');
            for (let i = 0; i < listMoviesElement.length; i++) {
                let image = listMoviesElement[i].querySelector('[class="movie-thumbnail"]').style.backgroundImage;
                let title = listMoviesElement[i].querySelector('[class="block-wrapper"]').title;
                dataMovies.push({
                    image: image,
                    title: title,
                })
            }
            return dataMovies;
        })
        for (let i = 0; i < data.length; i++) {
            await page.evaluate(({ data, i }) => {
                document.querySelector('[title="' + data[i].title + '"]').click();
            }, { data, i });
            await page.waitForNavigation();
            let desc = await page.evaluate(async () => {
                let ads = document.querySelectorAll('[class="close"]')[0];
                if (ads) {
                    ads.click();
                }
                return document.querySelectorAll('[id="film-content"]')[0].innerText;
            })
            page.goBack();
            await page.waitForNavigation();
            data[i] = {
                ...data[i],
                description: desc
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
        return data;
    }
}

run();
