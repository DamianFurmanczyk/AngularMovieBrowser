import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAndUpFormComponent } from './sign-in-and-up-form.component';

describe('SignInAndUpFormComponent', () => {
  let component: SignInAndUpFormComponent;
  let fixture: ComponentFixture<SignInAndUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInAndUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAndUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
