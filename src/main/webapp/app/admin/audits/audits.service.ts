import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Audit } from 'app/admin/audits/audit.model';
import { createRequestOption} from 'app/shared/model/request-util';

@Injectable()
export class AuditsService  {
    constructor(private http: HttpClient) { }

    query(req: any): Observable<HttpResponse<Audit[]>> {
        const params: HttpParams = createRequestOption(req);

        const requestURL = SERVER_API_URL + 'management/audits';

        return this.http.get<Audit[]>(requestURL, {
            params,
            observe: 'response'
        });
    }
}
