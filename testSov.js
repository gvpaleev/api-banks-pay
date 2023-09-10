const {remote, Key} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
//   'appium:appPackage': 'ru.sberbankmobile',
//   'appium:appActivity': 'ru.sberbank.moru.sberbankmobile',
  'appium:appActivity': '.Settings',
  'appium:noReset':true
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || '192.168.0.2',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};
// driver = await remote(wdOpts);

async function runTest() {
    const driver = await remote(wdOpts);
  try {
    await driver.pause(1000);
    await driver.pressKeyCode(4);
    await driver.pause(1000);
    const sberbankApp = await driver.$('//android.widget.TextView[@content-desc="Альфа-Банк"]');
    await sberbankApp.click();
    await driver.pause(1000);

    let button = await driver.$('//android.widget.FrameLayout[@content-desc="7"]/android.widget.LinearLayout');
    await button.click();

    await driver.pause(500);

    button = await driver.$('//android.widget.FrameLayout[@content-desc="4"]/android.widget.LinearLayout/android.widget.TextView[1]');
    await button.click();


    await driver.pause(500);

    button = await driver.$('//android.widget.FrameLayout[@content-desc="1"]');
    await button.click();


    await driver.pause(500);

    button = await driver.$('//android.widget.FrameLayout[@content-desc="2"]');
    await button.click();


    await driver.pause(500);

    button = await driver.$('//android.widget.FrameLayout[@content-desc="3"]/android.widget.LinearLayout/android.widget.TextView[1]');
    await button.click();


    await driver.pause(1000);
    

  } finally {
    // await driver.pause(10000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);