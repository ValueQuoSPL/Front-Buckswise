/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BuckswiseFrontEndTestModule } from '../../../test.module';
import { FamilyDetailComponent } from 'app/entities/family/family-detail.component';
import { FamilyService } from 'app/entities/family/family.service';
import { Family } from 'app/entities/family/family.model';

describe('Component Tests', () => {

    describe('Family Management Detail Component', () => {
        let comp: FamilyDetailComponent;
        let fixture: ComponentFixture<FamilyDetailComponent>;
        let service: FamilyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BuckswiseFrontEndTestModule],
                declarations: [FamilyDetailComponent],
                providers: [
                    FamilyService
                ]
            })
            .overrideTemplate(FamilyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Family(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.family).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
