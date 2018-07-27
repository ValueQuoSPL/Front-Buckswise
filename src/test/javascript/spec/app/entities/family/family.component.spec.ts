/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuckswiseFrontEndTestModule } from '../../../test.module';
import { FamilyComponent } from 'app/entities/family/family.component';
import { FamilyService } from 'app/entities/family/family.service';
import { Family } from 'app/entities/family/family.model';

describe('Component Tests', () => {

    describe('Family Management Component', () => {
        let comp: FamilyComponent;
        let fixture: ComponentFixture<FamilyComponent>;
        let service: FamilyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuckswiseFrontEndTestModule],
                declarations: [FamilyComponent],
                providers: [
                    FamilyService
                ]
            })
            .overrideTemplate(FamilyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Family(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.families[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
