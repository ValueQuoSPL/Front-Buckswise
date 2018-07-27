import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';

import { Family } from 'app/entities/family/family.model';
import { createRequestOption } from 'app/shared';

export type EntityResponseType = HttpResponse<Family>;

@Injectable()
export class FamilyService {

    private resourceUrl =  SERVER_API_URL + 'api/families';

    constructor(private http: HttpClient) { }

    create(family: Family): Observable<EntityResponseType> {
        const copy = this.convert(family);
        return this.http.post<Family>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(family: Family): Observable<EntityResponseType> {
        const copy = this.convert(family);
        return this.http.put<Family>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Family>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Family[]>> {
        const options = createRequestOption(req);
        return this.http.get<Family[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Family[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Family = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Family[]>): HttpResponse<Family[]> {
        const jsonResponse: Family[] = res.body;
        const body: Family[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Family.
     */
    private convertItemFromServer(family: Family): Family {
        const copy: Family = Object.assign({}, family);
        return copy;
    }

    /**
     * Convert a Family to a JSON which can be sent to the server.
     */
    private convert(family: Family): Family {
        const copy: Family = Object.assign({}, family);
        return copy;
    }
}
