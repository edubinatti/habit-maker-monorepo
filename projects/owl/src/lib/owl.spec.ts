import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Owl } from './owl';

describe('Owl', () => {
  let component: Owl;
  let fixture: ComponentFixture<Owl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Owl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Owl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
