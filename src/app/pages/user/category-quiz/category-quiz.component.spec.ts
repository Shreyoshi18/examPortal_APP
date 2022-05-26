import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuizComponent } from './category-quiz.component';

describe('CategoryQuizComponent', () => {
  let component: CategoryQuizComponent;
  let fixture: ComponentFixture<CategoryQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
