const puppeteer = require('puppeteer');

async function getBunnies(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null
    })


    const page = await browser.newPage();
    const url = 'https://losangeles.craigslist.org/search/sss?query=bunnies&sort=rel'
 
    await page.goto(url);

    await page.waitFor('.result-row');

    const results = await page.$$eval('.result-row', rows=> {
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector('.result-title');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            const priceElement = row.querySelector('.result-price')
            properties.price = priceElement ? priceElement.innerText : "";
            const imageElement = row.querySelector('.swipe [data-index="0"] img');
            properties.imageUrl = imageElement ?imageElement.src : "";
            const infoElement = row.querySelector('.slider-info')
            properties.info = infoElement ? "promise" : "await";
            return properties;
        })
    })

    console.log(results);

    browser.close();
}

getBunnies();