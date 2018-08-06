// import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { SERVER_API_URL } from '../../app.constants';

// import { createRequestOption } from '../../shared';

// export type EntityResponseType = HttpResponse<Stocks>;

// @Injectable()
// export class StocksService {

//     private resourceUrl =  SERVER_API_URL + 'api/stocks';

//     constructor(private http: HttpClient) { }

//     create(stocks: Stocks): Observable<EntityResponseType> {
//         const copy = this.convert(stocks);
//         return this.http.post<Stocks>(this.resourceUrl, copy, { observe: 'response' })
//             .map((res: EntityResponseType) => this.convertResponse(res));
//     }

//     update(stocks: Stocks): Observable<EntityResponseType> {
//         const copy = this.convert(stocks);
//         return this.http.put<Stocks>(this.resourceUrl, copy, { observe: 'response' })
//             .map((res: EntityResponseType) => this.convertResponse(res));
//     }

//     find(id: number): Observable<EntityResponseType> {
//         return this.http.get<Stocks>(`${this.resourceUrl}/${id}`, { observe: 'response'})
//             .map((res: EntityResponseType) => this.convertResponse(res));
//     }

//     query(req?: any): Observable<HttpResponse<Stocks[]>> {
//         const options = createRequestOption(req);
//         return this.http.get<Stocks[]>(this.resourceUrl, { params: options, observe: 'response' })
//             .map((res: HttpResponse<Stocks[]>) => this.convertArrayResponse(res));
//     }

//     delete(id: number): Observable<HttpResponse<any>> {
//         return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
//     }

//     private convertResponse(res: EntityResponseType): EntityResponseType {
//         const body: Stocks = this.convertItemFromServer(res.body);
//         return res.clone({body});
//     }

//     private convertArrayResponse(res: HttpResponse<Stocks[]>): HttpResponse<Stocks[]> {
//         const jsonResponse: Stocks[] = res.body;
//         const body: Stocks[] = [];
//         for (let i = 0; i < jsonResponse.length; i++) {
//             body.push(this.convertItemFromServer(jsonResponse[i]));
//         }
//         return res.clone({body});
//     }

//     /**
//      * Convert a returned JSON object to Stocks.
//      */
//     private convertItemFromServer(stocks: Stocks): Stocks {
//         const copy: Stocks = Object.assign({}, stocks);
//         return copy;
//     }

//     /**
//      * Convert a Stocks to a JSON which can be sent to the server.
//      */
//     private convert(stocks: Stocks): Stocks {
//         const copy: Stocks = Object.assign({}, stocks);
//         return copy;
//     }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Stocks } from 'app/my-assets/assets/stocks.model';

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }
 public SaveStocks(stocks) {

     return this.http.post<Stocks[]>(SERVER_API_URL + 'api/', stocks);
 }
}
