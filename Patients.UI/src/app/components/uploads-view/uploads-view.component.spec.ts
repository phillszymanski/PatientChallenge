import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsViewComponent } from './uploads-view.component';

describe('UploadsViewComponent', () => {
  let component: UploadsViewComponent;
  let fixture: ComponentFixture<UploadsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
