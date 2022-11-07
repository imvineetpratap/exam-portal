import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreQuizInstructionsComponent } from './pre-quiz-instructions.component';

describe('PreQuizInstructionsComponent', () => {
  let component: PreQuizInstructionsComponent;
  let fixture: ComponentFixture<PreQuizInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreQuizInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreQuizInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
