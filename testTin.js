
import {remote} from 'webdriverio'

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'com.android.chrome',
    'appium:appActivity': 'com.google.android.apps.chrome.Main',
    'appium:noReset':true
  };
  
const wdOpts = {
    hostname: process.env.APPIUM_HOST || '192.168.0.2',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};


    async function pay(){
        let dto={
          url:'https://qr.nspk.ru/AD10002O6J4LS2SD98CBJGAML0P94GO2?type=02&bank=100000000004&sum=20600&cur=RUB&crc=D547'
        }
        console.log(dto.url);
        // return 'ok'
        const driver = await remote({
            hostname: '192.168.0.2',
            port: 4723,
            logLevel: 'info',
            capabilities: {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:appPackage': 'com.android.chrome',
                'appium:appActivity': 'com.google.android.apps.chrome.Main',
                'appium:noReset':true
              }
        });

      // await clickToXpath('//android.widget.ImageButton[@content-desc="1 open tab, tap to switch tabs"]');
      

        await driver.navigateTo(dto.url)
    

    // Переходим в тиньков
    await clickToXpath('//android.view.View[@content-desc="Тинькофф Банк"]/android.widget.TextView',4500);
    
    //Проверка ввода пар!
    await driver.pause(2000);

    let button = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.TextView');
    //Вводить ли пароль ?
    if(await button.isDisplayed()){
      //7
      await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[7]');

      //0
      await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[10]');

      //8
      await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[8]');

      //3
      await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Button[3]');
    
    }

    
  
    //Оплатить.
    
    // await clickToXpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout[3]/android.widget.LinearLayout/android.view.ViewGroup/android.widget.Button');
    console.log('end');

    async function clickToXpath(xPath,sleep=300, sleepIteration=300, iteration=25){
  
      await driver.pause(sleep);
    
    
      for(let i=0;i<iteration;i++){
        
        let button = await driver.$(xPath);
    
        if(await button.isDisplayed()){
          return await button.click()
        }
        await driver.pause(sleepIteration);
    
      }
    }
        return 'goot'
    }

    

pay();