const puppeteer = require('puppeteer');

async function getVal(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null
    })


    const page = await browser.newPage();
    const url = 'http://valentineayim.com.ng/resume'
 
    await page.goto(url);

    await page.waitFor('.mdl-grid');

    const results = await page.$x('.mdl-grid')
    

    console.log(results);

    browser.close();
}

getVal();