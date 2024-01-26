import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorboardComponent } from './moderatorboard.component';

describe('ModeratorboardComponent', () => {
  let component: ModeratorboardComponent;
  let fixture: ComponentFixture<ModeratorboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
