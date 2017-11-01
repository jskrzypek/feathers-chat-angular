import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSelectComponent } from './chat-select.component';

describe('ChatSelectComponent', () => {
  let component: ChatSelectComponent;
  let fixture: ComponentFixture<ChatSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
