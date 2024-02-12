import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Page, PageRequest} from "../models/page";
import {Observable} from "rxjs";
import {RestUtil} from "./rest-util";
import { Checkout } from '../models/checkout';
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {}

  // http://localhost:8080/api/checkout/getCheckouts?page=0&size=3&sort=checkedOutDate&direction=DESC
  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter)
    return this.http.get<Page<Checkout>>(url, {params})
  }
  saveCheckout(checkout: Checkout): Observable<void> {
    const url = this.baseUrl + '/checkout';
    return this.http.post<void>(url, checkout);
  }

  getCheckout(checkoutId: string): Observable<Checkout> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('checkoutId', checkoutId);
    return this.http.get<Checkout>(url, {params});
  }
}
