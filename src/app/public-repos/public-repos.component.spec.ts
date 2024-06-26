import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReposComponent } from './public-repos.component';

describe('PublicReposComponent', () => {
  let component: PublicReposComponent;
  let fixture: ComponentFixture<PublicReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicReposComponent]
    });
    fixture = TestBed.createComponent(PublicReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
