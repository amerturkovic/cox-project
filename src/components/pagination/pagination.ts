import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.html'
})
export class PaginationComponent  {
  	@Input('page') page: any;
	@Input('itemsPerPage') itemsPerPage: any;
	@Input('data') data: any;
	@Output() paginationChange: EventEmitter<any> = new EventEmitter<any>();

	constructor() {}
	
	/**
	 * Triggered by nav arrow or input directly
	 * @param event 
	 */
	pageChangeAction(event) {
		let currentPage = this.page;
		if (event == 'up') {
			currentPage += 1;
		} else if (event == 'down') {
			currentPage -= 1;
		} else {
			if ( event <= 0 ) {
				currentPage = 1;
			} else if (event > this.totalPages) {
				currentPage = this.totalPages;
			}
		}
		this.paginationChange.emit(currentPage);
	}

	/**
	 * disable arrows if page number is outside of the range
	 * @param direction 
	 * @return boolean
	 */
	disablePageNav(direction) {
		let returnVal = false;
		if (this.page >= 1 && this.totalPages > 0) {
			if (direction == "back" ) {
				if (this.page == 1) {
					returnVal = true;
				}
			}
			if (direction == "next") {
				if (this.page == this.totalPages) {
					returnVal = true;
				}
			}
		} else {
			returnVal = true;
		}
		return returnVal;
	}
	
	/**
	 * Calculate Total Pages value
	 */
	get totalPages() {
		let total = 0;
		if ( this.data && this.data.length > 0 ) {
			total = Math.ceil(this.data.length / this.itemsPerPage);
		}
		return total;
	}

}
