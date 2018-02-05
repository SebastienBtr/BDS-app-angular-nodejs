import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllosComponent } from './allos.component';

describe('AllosComponent', () => {
  let component: AllosComponent;
  let fixture: ComponentFixture<AllosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
