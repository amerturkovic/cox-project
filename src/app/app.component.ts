import { Component } from '@angular/core';
import { Events, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = HomePage;
  loadingBlock: boolean = false;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public events: Events,
      public loadingCtrl: LoadingController
    ) {
      platform.ready().then(() => {
        //
      });
      events.subscribe('console', (logData) => {
        /* logData format
          level: ERROR, WARNING, INFO, DEBUG, DEV
          message: text message
          json: object
        */
        if (logData.level == "ERROR") {
          try { console.log("ERROR:", logData.message, logData.json ? logData.json : ""); } catch (e) { }
        } else if (logData.level == "WARNING") {
          try { console.log("WARNING:", logData.message, logData.json ? logData.json : ""); } catch (e) { }
        } else if (logData.level == "INFO") {
          try { console.log("INFO:", logData.message, logData.json ? logData.json : ""); } catch (e) { }
        } else if (logData.level == "DEBUG") {
          try { console.log("DEBUG:", logData.message, logData.json ? logData.json : ""); } catch (e) { }
        } else {
          // add check for DEV environment
          try { console.log("DEV:", logData.message, logData.json ? logData.json : "");
          } catch (e) { }
        }
      });
      events.subscribe('loading', (msg) => {
        if (msg == "show") {
          this.loadingBlock = true;
        } else {
          this.loadingBlock = false;
        }
      });
  }
}

