async function picture (currentPage, url) {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultTimeout(6000000) //超时时间改成100分钟吧
    await page.goto(url);
    await page.waitForSelector('.article-content img')
    await page.waitForSelector('.pagination a')

    console.log('先走到了这里');
    // 总页数
    let totalPage = await page.$$eval('.pagination a',
        (links) => links.map(x => x.href));
    totalPage = totalPage.length / 2

    // 图片
    let title = await page.$$eval('.article-content img',
        (links) => links.map(x => x.src));

    await browser.close();
}

module.exports = picture
