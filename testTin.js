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
    

    // Переходим в тиньков
    await clickToXpath('//android.view.View[@content-desc="Тинькофф Банк"]/android.widget.TextView',2500);
    
    //Проверка ввода пар!
    //Ввод пароль

    //7
    await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[7]');

    //0
    await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[10]');

    //8
    await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[8]');

    //3
    await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[3]');

  
    //Оплатить.
    // await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout[3]/android.widget.LinearLayout/android.view.ViewGroup/android.widget.Button');


    async function clickToXpath(xPath,sleep=300, sleepIteration=300, iteration=35){
  
      await driver.pause(sleep);
    
    
      for(let i=0;i<iteration;i++){
        
        let button = await driver.$(xPath);
    
        if(await button.isDisplayed()){
          return await button.click()
        }
        await driver.pause(sleepIteration);
    
      }
    
    
    }

  } finally {
    // await driver.pause(10000);
    await driver.closeApp();
  }
}


runTest().catch(console.error);