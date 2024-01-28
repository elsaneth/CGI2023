import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Page, PageRequest} from "../../models/page";
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})

export class CheckoutsListComponent implements OnInit {
  checkouts$!: Observable<Page<Checkout>>
  dataSource!: MatTableDataSource<any>

  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 10,
    sort: "dueDate",
    direction: "asc"
  }

  constructor(
    private checkOutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    this.loadCheckouts()
  }

  onPageChange(event: PageEvent): void {
    this.pageRequest.pageSize = event.pageSize
    this.pageRequest.pageIndex = event.pageIndex
    this.loadCheckouts();
  }

  onSortChange(event: Sort): void {
    this.pageRequest.sort = event.active
    this.pageRequest.direction = event.direction
    this.loadCheckouts()
  }

  loadCheckouts(): void {
    this.checkouts$ = this.checkOutService.getCheckouts(this.pageRequest)
    this.checkouts$.subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data.content)
    });
  }
}
