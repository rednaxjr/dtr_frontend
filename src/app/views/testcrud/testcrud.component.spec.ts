import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcrudComponent } from './testcrud.component';

describe('TestcrudComponent', () => {
  let component: TestcrudComponent;
  let fixture: ComponentFixture<TestcrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
