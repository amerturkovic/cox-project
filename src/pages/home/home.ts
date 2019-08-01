import { Component } from '@angular/core';
import { Events, NavController, NavParams} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: any [];
  sortedCards: any [];
  page: any = 1;
  itemsPerPage: any = 5;
  sortby: string = 'Heading';
  sortByData: any = [
		{ key: "Heading", value: "Heading" },
    { key: "Subheading", value: "Subheading" },
    { key: "Price", value: "Price" }
	];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public events: Events) {
  }

  ionViewWillEnter() {
    this.getData();
  }

  onSortChange(){
    
  }
  
  /**
   * Load mock data
   */
  getData() {
    this.events.publish("loading", "show");
    this.api.getCardData().subscribe(data => {
      this.cards = data;
      this.sortCards();
      this.events.publish("loading", "dismiss");
    }, error => {
      this.events.publish("loading", "dismiss");
      this.events.publish("console", { level: "ERROR", message: "getOrganisations", json: error });
    });
    
  }

  get pageCards(){
    let spliced: any = []
    if (this.sortedCards) {
      let start = (this.page - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      spliced = this.sortedCards.slice(start, end);
    }
    return spliced;
  }

  sortCards() {
    this.page = 1;
    this.sortedCards = this.sort(this.cards, this.sortby)
  }
  /**
   * 
   * @param arr Array to be sorted
   * @param objProp Object property to ne used for sorting
   * @return order num
   */
  sort(arr: any, objProp: string): any {
    let propArr = objProp.indexOf(".") != -1 ? objProp.split(".") : [];
    let sortA: string;
    let sortB: string;
    return arr.sort(function (a, b) {
      sortA = propArr.length > 1 ? a[propArr[0]][propArr[1]] : a[objProp];
      sortB = propArr.length > 1 ? b[propArr[0]][propArr[1]] : b[objProp];
      if (sortA < sortB) {
        return -1;
      } else if (sortA > sortB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  /**
   * Called from Pagination component
   * @param event 
   */
  pageChange(event) {
    this.page = event;
  }
}
