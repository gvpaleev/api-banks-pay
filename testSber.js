const {remote, Key} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  // 'appium:deviceName': 'Android',
//   'appium:appPackage': 'com.android.settings',
// //   'appium:appPackage': 'ru.sberbankmobile',
// //   'appium:appActivity': 'ru.sberbank.moru.sberbankmobile',
//   'appium:appActivity': '.Settings',
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

    await driver.pressKeyCode(3);
    await driver.pause(1000);

    // //Вход в сбер
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 188,
    //   y:2552
    // })
    // await driver.pause(5000);
    // //пин

    // //7
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 265,
    //   y:1820
    // })
    // await driver.pause(300);

    // //4
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 265,
    //   y:1520
    // })
    // await driver.pause(300);

    // //1
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 265,
    //   y:1180
    // })
    // await driver.pause(300);

    // //2
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 720,
    //   y:1180
    // })
    // await driver.pause(300);

    // //3
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 1185,
    //   y:1180
    // })
    // await driver.pause(5000);




    // //Оплата по qr
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 200,
    //   y:770
    // })
    // await driver.pause(1000);
    
    
    // //Загрузить фото  
    // await driver.touchAction({
    //   action: 'tap',
    //   x: 700,
    //   y:2900
    // })
    // await driver.pause(1000);
    
    
    
    const sberbankApp = await driver.$('//android.widget.TextView[@content-desc="СберБанк"]');
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


    await driver.pause(3000);
    

  } finally {
    // await driver.pause(10000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);