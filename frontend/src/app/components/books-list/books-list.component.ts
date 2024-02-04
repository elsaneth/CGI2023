import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import { Book } from '../../models/book';
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})

export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;

  dataSource!: MatTableDataSource<any>

  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 10,
    sort: "dueDate",
    direction: "asc"
  }

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});
    this.books$.subscribe(data => console.log('Books data:', data));
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
    this.books$ = this.bookService.getBooks(this.pageRequest)
    this.books$.subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data.content)
    });
  }
}

