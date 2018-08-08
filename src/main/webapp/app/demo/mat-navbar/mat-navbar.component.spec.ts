
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavbarComponent } from 'app/demo/mat-navbar/mat-navbar.component';

describe('MatNavbarComponent', () => {
  let component: MatNavbarComponent;
  let fixture: ComponentFixture<MatNavbarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [MatNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
