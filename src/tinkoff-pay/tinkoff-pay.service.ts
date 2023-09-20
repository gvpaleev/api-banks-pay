import { Injectable } from '@nestjs/common';
import { TinkoffPayDto } from './dto/tinkoff-pay.dto';
import {remote} from 'webdriverio'
import { ConfigService } from '@nestjs/config';

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

@Injectable()
export class TinkoffPayService {

  
    constructor(private configService: ConfigService){
      
    }
    paramsAppium=[
      {
        access:true,
        hostname: this.configService.get('EMULATOR_IP'),
        port: parseInt(this.configService.get('EMULATOR_PORT_ONE')),
      },
      {
        access:true,
        
          hostname: this.configService.get('EMULATOR_IP'),
          port: parseInt(this.configService.get('EMULATOR_PORT_TWO')),
        
  
  
      },
      {
        access:true,
          hostname: this.configService.get('EMULATOR_IP'),
          port: parseInt(this.configService.get('EMULATOR_PORT_THREE')),
  
      }
    ];
    async pay(dto : TinkoffPayDto){
        // console.log(dto.url);
        // return 'ok'
        // let a = this.configService.get('EMULATOR_IP');
    const driverObj = await this.getDriverAndroid();


    // await clickToXpath('//android.widget.ImageButton[@content-desc="1 open tab, tap to switch tabs"]');
    

      await driverObj.driver.navigateTo(dto.url)
  

  // Переходим в тиньков
  await clickToXpath('//android.view.View[@content-desc="Тинькофф Банк"]/android.widget.TextView',4500);
  
  //Проверка ввода пар!
  await driverObj.driver.pause(2000);

  let button = await driverObj.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.TextView');
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
  driverObj.paramAppium.access=true
  console.log('end');

  async function clickToXpath(xPath,sleep=300, sleepIteration=300, iteration=25){

    await driverObj.driver.pause(sleep);
  
  
    for(let i=0;i<iteration;i++){
      
      let button = await driverObj.driver.$(xPath);
  
      if(await button.isDisplayed()){
        return await button.click()
      }
      await driverObj.driver.pause(sleepIteration);
  
    }
  }
      return 'goot'
    }

    async getDriverAndroid(){
      
      for(let i=0;i<this.paramsAppium.length;i++){
        if(this.paramsAppium[i].access){
          this.paramsAppium[i].access=false;
          return {
            paramAppium:this.paramsAppium[i],
            driver:await remote({
              hostname:this.paramsAppium[i].hostname,
              port: this.paramsAppium[i].port,
              logLevel: 'info',
              capabilities: {
                  platformName: 'Android',
                  'appium:automationName': 'UiAutomator2',
                  'appium:appPackage': 'com.android.chrome',
                  'appium:appActivity': 'com.google.android.apps.chrome.Main',
                  'appium:noReset':true
                }
           }) 
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 5000));

      return await this.getDriverAndroid();
    }
}
