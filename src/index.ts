import express from 'express';
import puppeteer from 'puppeteer';
const app = express();

app.get('/facebook', async (req: any, res: any) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [ "--disable-notifications" ]
    }
    );
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com');

    await page.evaluate((text) => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.textContent === text) {
                button.click();
            }
        });
    }, "Decline optional cookies");
    await page.type("#email", req.query.email);
    await page.type("#pass", req.query.password);
    await page.evaluate((text) => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.textContent === text) {
                button.click();
            }
        });
    }, "Log In");
    await page.waitForNavigation();
    await page.goto("https://www.facebook.com/dyi/?referrer=yfi_settings")
    await page.evaluate((text) => {
        const spans = document.querySelectorAll('span');
        spans.forEach((span) => {
            if (span.textContent === text) {
                span.click();
            }
        });
    }, "Anmod om download");
    console.log("Looking for Komplet kopi span")
    
    await page.evaluate((text) => {
        const spans = document.querySelectorAll('span');
        console.log("found spans" + spans.length)
        spans.forEach((span) => {
            if (span.textContent?.includes(text)) {
                span.click();
                console.log("found button")
            }
        });
    }, "Komplet kopi");
    console.log("Not a lot of luck")
    res.send(await page.content());


});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});