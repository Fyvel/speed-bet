import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchTileComponent } from './match-tile.component';
import { MatchModel } from 'src/app/models/interfaces';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MatchTileComponent', () => {
  let component: MatchTileComponent;
  let fixture: ComponentFixture<MatchTileComponent>;
  const dummyInput = {
    matchId: 123
  } as MatchModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchTileComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTileComponent);
    component = fixture.componentInstance;
    component.match = dummyInput;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the match route API segment', () => {
    // arrange
    const expectedRoute = `/match/${dummyInput.matchId}`;
    // act
    component.ngOnInit();
    // assert
    expect(component.matchRoute).toEqual(expectedRoute);
  });
});
