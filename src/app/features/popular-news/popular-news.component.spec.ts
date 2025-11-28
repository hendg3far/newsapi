import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularNewsComponent } from './popular-news.component';

describe('PopularNewsComponent', () => {
  let component: PopularNewsComponent;
  let fixture: ComponentFixture<PopularNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
