import {Component, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {Page, PageRequest} from "../../models/page";
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})

export class CheckoutsListComponent implements OnInit {

  @ViewChild(MatSort) sort = new MatSort();

  checkouts$!: Observable<Page<Checkout>>

  pageIndex: number = 0

  pageSize: number = 10

  constructor(
    private checkOutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    console.log("Sort: ", this.sort);
    this.loadCheckouts()
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    console.log("Page event: ", event);
    this.loadCheckouts();
  }

  // onSortChange(event: Sort): void {
  //   this.sort.active = event.active
  //   this.sort.direction = event.direction
  //   console.log(this.sort);
  //   this.loadCheckouts()
  // }

  loadCheckouts(): void {
    const pageFilter: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sort: this.sort.active,
      direction: this.sort.direction
    }
    this.checkouts$ = this.checkOutService.getCheckouts(pageFilter)
    this.checkouts$.subscribe(data => console.log('Checkouts data: ', data));
  }
}
