import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterRpmComponent } from './scatter-rpm.component';

describe('ScatterRpmComponent', () => {
  let component: ScatterRpmComponent;
  let fixture: ComponentFixture<ScatterRpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterRpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterRpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
