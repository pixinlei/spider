const pictureData = require('./pictureData')

async function picture (currentPage, type) {
    const puppeteer = require('puppeteer');
    // const fs = require("fs");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultTimeout(6000000) //超时时间改成100分钟吧
    let url = currentPage == 1 ? `https://www.jpxgmn.top/${type}/` : `https://www.jpxgmn.top/${type}/page_2.html`
    await page.goto(url);
    await page.waitForSelector('body > section > div.content-wrap > div > div.widget-title > div > ul img')

    // 总页数
    let totalPage = await page.$$eval('.pagination strong',
        (links) => links.map(x => x.innerText));
    // 标题
    totalPage = totalPage[0]
    let title = await page.$$eval('.related_box a',
        (links) => links.map(x => x.title));
    let href = await page.$$eval('.related_box a',
        (links) => links.map(x => x.href));
    // 封面图片
    let cover = await page.$$eval('.related_box img',
        (links) => links.map(x => x.src));

    let pageCoverData = [] // 存放一页封面
    title.forEach((v, i) => {
        pageCoverData.push({
            title: title[i],
            cover: cover[i],
            href: href[i]
        })
    })

    await browser.close();
    for await (let item of pageCoverData) {
        await pictureData(1, item.href)
    }
    // console.log(totalPage, '总页数');
    // console.log(pageCoverData, '一页封面数据');
    // await browser.close();
}

module.exports = picture
