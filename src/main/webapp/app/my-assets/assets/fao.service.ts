import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FAO } from 'app/my-assets/assets/fao.model';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class FAOService {

  constructor(private http: HttpClient) { }
 public SubmitFaO(fao) {

     return this.http.post<FAO[]>(SERVER_API_URL + 'api/', fao);
 }
}
