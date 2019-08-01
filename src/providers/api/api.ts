
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//-- rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiProvider {

  constructor(
    public http: Http) {
  }

  getCardData() {
		return this.loadStaticData("../../assets/data/UIE-InterviewProject.json");
  }
  
  loadStaticData(file: string) {
		return this.http.get(file).map(res => res.json());
	}

}
