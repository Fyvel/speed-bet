import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTileComponent } from './match-tile.component';

describe('MatchTileComponent', () => {
  let component: MatchTileComponent;
  let fixture: ComponentFixture<MatchTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
