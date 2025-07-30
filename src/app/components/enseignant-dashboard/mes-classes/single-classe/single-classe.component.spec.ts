import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleClasseComponent } from './single-classe.component';

describe('SingleClasseComponent', () => {
  let component: SingleClasseComponent;
  let fixture: ComponentFixture<SingleClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleClasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
