import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransFileComponent } from './trans-file.component';

describe('TransFileComponent', () => {
  let component: TransFileComponent;
  let fixture: ComponentFixture<TransFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
