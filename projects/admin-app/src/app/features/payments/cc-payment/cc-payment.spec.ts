import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcPayment } from './cc-payment';

describe('CcPayment', () => {
  let component: CcPayment;
  let fixture: ComponentFixture<CcPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
