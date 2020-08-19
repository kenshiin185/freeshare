import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAndroidComponent } from './application-android.component';

describe('ApplicationAndroidComponent', () => {
  let component: ApplicationAndroidComponent;
  let fixture: ComponentFixture<ApplicationAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
