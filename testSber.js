const {remote, Key} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  // 'appium:deviceName': 'Android',
//   'appium:appPackage': 'com.android.settings',
  'appium:appPackage': 'com.android.chrome',
  'appium:appActivity': 'com.google.android.apps.chrome.Main',
  // 'appium:appActivity': '.Settings',
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

    // await driver.pressKeyCode(3);
    await driver.navigateTo('https://qr.nspk.ru/AD10007G66CG666S9NROEHM8IEM90B0T?type=02&bank=100000000014&sum=399&cur=RUB&crc=D590')
    // await driver.pressKeyCode(3);
    // await driver.pause(1000);

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
    
    
    
    // const sberbankApp = await driver.$('//android.widget.TextView[@content-desc="СберБанк"]');
    // await sberbankApp.click();
    // await driver.pause(1000);

    
    
    let button = await driver.$('//android.widget.FrameLayout[@content-desc="7"]/android.widget.LinearLayout');
    //Вводить ли пароль ?
    if(await button.isDisplayed()){
      
      //click 7
      await button.click();
      await driver.pause(500);

      //click 4
      button = await driver.$('//android.widget.FrameLayout[@content-desc="4"]/android.widget.LinearLayout/android.widget.TextView[1]');
      await button.click();
      await driver.pause(500);

      //click1
      button = await driver.$('//android.widget.FrameLayout[@content-desc="1"]');
      await button.click();
      await driver.pause(500);

      //click 2
      button = await driver.$('//android.widget.FrameLayout[@content-desc="2"]');
      await button.click();
      await driver.pause(500);

      //click 3
      button = await driver.$('//android.widget.FrameLayout[@content-desc="3"]/android.widget.LinearLayout/android.widget.TextView[1]');
      await button.click();
      await driver.pause(500);

    }
    // button = await driver.findElementByXPath('//android.widget.FrameLayout[@content-desc="7"]/android.widget.LinearLayout');
    
    //Проверяем главную страницу
    await (async function checkMain(){
      let icon = await driver.$('//android.widget.FrameLayout[@content-desc="Ассистент, вкладка, 3 из 5"]/android.view.ViewGroup/android.view.View');
      if(await icon.isDisplayed()){
        return
      }
      await driver.pause(300);
      return await checkMain();
      

    })()


    //click Оплата по qr
    await driver.touchAction({
      action: 'tap',
      x: 200,
      y:770
    })
    await driver.pause(1000);
    
    
    //Загрузить изобр.
    button = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.Button');
    await button.click();
    await driver.pause(500);


    //Галерея    
    button = await driver.$('//android.view.View[@content-desc="Галерея,"]/android.view.ViewGroup/android.widget.TextView');
    await button.click();
    await driver.pause(500);


//     ./data/media/0/Pictures/IMG_20230911_192723.jpg
// ./mnt/pass_through/0/emulated/0/Pictures/IMG_20230911_192723.jpg
// ./mnt/androidwritable/0/emulated/0/Pictures/IMG_20230911_192723.jpg
// ./mnt/installer/0/emulated/0/Pictures/IMG_20230911_192723.jpg
// ./mnt/user/0/emulated/0/Pictures/IMG_20230911_192723.jpg
// ./storage/emulated/0/Pictures/IMG_20230911_192723.jpg


  } finally {
    // await driver.pause(10000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);