const { remote } = require('webdriverio');
const { expect } = require('chai');
const path = require('path');
const electron = require('electron');
const chromedriver = require('chromedriver');

describe('Application launch', function() {
    this.timeout(30000);
    let browser;

    beforeEach(async function() {
        browser = await remote({
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    binary: electron,
                    args: [`app=${path.join(__dirname, '..')}`]
                }
            },
            logLevel: 'error',
            automationProtocol: 'devtools',
            path: '/',
            services: [
                ['chromedriver', {
                    chromedriverCustomPath: chromedriver.path
                }]
            ]
        });
    });

    afterEach(async function() {
        if (browser) {
            await browser.deleteSession();
        }
    });

    it('показывает кнопку Start', async function() {
        // Ждем появления кнопки
        const button = await browser.$('#startButton');
        await button.waitForExist({ timeout: 5000 });

        // Проверяем текст кнопки
        const text = await button.getText();
        expect(text).to.equal('Start');

        // Проверяем видимость кнопки
        const isVisible = await button.isDisplayed();
        expect(isVisible).to.be.true;
    });
});
