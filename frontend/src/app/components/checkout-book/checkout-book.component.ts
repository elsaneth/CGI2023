import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-checkout-book',
  templateUrl: './checkout-book.component.html',
  styleUrls: ['./checkout-book.component.css'],
  providers: [DatePipe]
})
export class CheckoutBookComponent implements OnInit {
  book$!: Observable<Book>;
  dueDate: string | null | undefined;
  currentDate: string | null;
  checkoutForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private resultMessage: MatSnackBar
  ) {
    const date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    date.setDate(date.getDate() + 30);
    this.dueDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    this.checkoutForm = this.formBuilder.group({
      borrowerFirstName: ['', Validators.required],
      borrowerLastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
  }

  onSubmit() {
    this.book$.subscribe(bookData => {
      if (bookData.status === 'AVAILABLE') {
        this.onCheckout();
      } else if (bookData.status === 'BORROWED') {
        this.onReturn();
      }
    });
  }

  onCheckout() {
    if (this.checkoutForm.valid) {
      const {borrowerFirstName, borrowerLastName} = this.checkoutForm.value;
      this.book$.subscribe(bookData => {
        // if (bookData.status != "AVAILABLE") {
        //   this.showResultMessage('Sorry, this book is not available', 'X', 7000);
        //   return;
        // }
        bookData.status = "BORROWED";
        const newCheckout: Checkout = {
          id: uuidv4(),
          borrowerFirstName,
          borrowerLastName,
          borrowedBook: bookData,
          checkedOutDate: this.currentDate || '',
          dueDate: this.dueDate || '',
        };

        console.log('new checkout:', newCheckout);

        this.checkoutService.saveCheckout(newCheckout)
          .pipe(
            catchError((error: { status: string; }) => {
              console.error("Error saving checkout:", error);
              this.showResultMessage('Error saving checkout. Status code: ' + error.status, 'X', 7000);
              throw error;
            })
          )
          .subscribe();
        this.showResultMessage('Successfully borrowed! Due date: ' + newCheckout.dueDate, 'X', 7000)
      });
    } else {
      this.showResultMessage('Please fill in the blanks', 'X', 7000);
    }
  }


  onReturn() {
    if (this.checkoutForm.valid) {
      const {borrowerFirstName, borrowerLastName} = this.checkoutForm.value;

    }
  }

  showResultMessage(message: string, action: string, duration: number): void {
    this.resultMessage.open(message, action, {
      duration: duration
    });
  }

}
