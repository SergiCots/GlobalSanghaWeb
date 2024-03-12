import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolFormComponent } from './add-tool-form.component';

describe('AddToolFormComponent', () => {
  let component: AddToolFormComponent;
  let fixture: ComponentFixture<AddToolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToolFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
