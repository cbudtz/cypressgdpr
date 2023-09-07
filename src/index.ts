import express from 'express';
import puppeteer from 'puppeteer';
const app = express();

app.get('/facebook', async (req: any, res: any) => {
    const browser = await puppeteer.launch({
        headless: false
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

    res.send(await page.content());


});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});