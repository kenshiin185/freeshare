import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiquecfComponent } from './politiquecf.component';

describe('PolitiquecfComponent', () => {
  let component: PolitiquecfComponent;
  let fixture: ComponentFixture<PolitiquecfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitiquecfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitiquecfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
