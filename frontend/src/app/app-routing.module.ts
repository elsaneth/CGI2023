import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import {CheckoutsListComponent} from "./components/checkouts-list/checkouts-list.component";
import {CheckoutBookComponent} from "./components/checkout-book/checkout-book.component";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'checkouts', component: CheckoutsListComponent},
  {path: 'books/:id/checkout', component: CheckoutBookComponent},
  {path: 'checkouts/:id/checkout', component: CheckoutBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
