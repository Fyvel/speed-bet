import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchDetailsComponent } from './match-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatchModel, BetModel, TeamModel } from 'src/app/models/interfaces';
import { STATUS } from 'src/app/enums/enums';

describe('MatchDetailsComponent', () => {
  const mockActivatedRoute = {
    paramMap: of(convertToParamMap({ id: 123 }))
  } as ActivatedRoute;

  const mockMatch: MatchModel = {
    matchId: 123,
    sport: 'dance',
    status: STATUS.upcoming,
    type: 'Duel',
    teams: [
      {
        name: 'TeamA',
        odds: 12.1,
        teamId: 111
      },
      {
        name: 'TeamB',
        odds: 2.1,
        teamId: 222
      }
    ],
    winner: null,
    currentBet: null
  };

  const mockMatchWithBet: MatchModel = {
    matchId: 123,
    sport: 'dance',
    status: STATUS.upcoming,
    type: 'Duel',
    teams: [
      {
        name: 'TeamA',
        odds: 12.1,
        teamId: 111
      },
      {
        name: 'TeamB',
        odds: 2.1,
        teamId: 222
      }
    ],
    winner: null,
    currentBet: {
      amount: 30000,
      betId: 333,
      matchId: 123,
      odds: 12.1,
      teamId: 111
    }
  };

  const mockBet: BetModel = {
    betId: 0,
    matchId: 123,
    teamId: 111,
    odds: 12.1,
    amount: 30000
  };

  const mockBetWithId: BetModel = {
    betId: 333,
    matchId: 123,
    teamId: 111,
    odds: 12.1,
    amount: 30000
  };

  const mockWinnerTeamA: TeamModel = {
    name: 'TeamA',
    odds: 12.1,
    teamId: 111
  };

  const mockWinnerTeamB: TeamModel = {
    name: 'TeamB',
    odds: 2.1,
    teamId: 222
  }

  let component: MatchDetailsComponent;
  let fixture: ComponentFixture<MatchDetailsComponent>;
  let service: MatchesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [MatchDetailsComponent],
      providers: [
        MatchesService,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MatchesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call assign mathc$ on init', () => {
    // arrange
    component.match$ = undefined;
    // act
    component.ngOnInit();
    // assert
    expect(component.match$).toBeDefined();
  });

  it('should set the match details on subscription', () => {
    // arrange
    component['match'] = null;
    const expectedMatch = { ...mockMatch };
    const spy = spyOn(service, 'getMatch').and.callFake(() => of(mockMatch));
    component.ngOnInit();
    // act
    component.match$.subscribe();
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(123);
    expect(component['match']).toEqual(expectedMatch);
  });

  it('should not update the form if there isn\'t any bet', () => {
    // arrange
    component.formGroup.reset();
    const expectedValues = { team: '', amount: '' };
    spyOn(service, 'getMatch').and.callFake(() => of(mockMatch));
    component.ngOnInit();
    // act
    component.match$.subscribe();
    // assert
    expect(component.formGroup.value).toEqual(expectedValues);
    expect(component.formGroup.disabled).toBeFalsy();
  });

  it('should update and disable the formGroup if there is a bet for the match', () => {
    // arrange
    component.formGroup.reset();
    const expectedValues = {
      team: mockMatchWithBet.teams[0],
      amount: mockMatchWithBet.currentBet.amount
    };
    spyOn(service, 'getMatch').and.callFake(() => of(mockMatchWithBet));
    component.ngOnInit();
    // act
    component.match$.subscribe();
    // assert
    expect(component.formGroup.value).toEqual(expectedValues);
    expect(component.formGroup.disabled).toBeTruthy();
  });

  it('should place the bet on form submit', () => {
    // arrange
    component['match'] = mockMatch;
    const spy = spyOn(service, 'placeBet').and.callFake(() => of(mockBetWithId));
    component.formGroup.patchValue({
      team: mockMatchWithBet.teams[0],
      amount: mockMatchWithBet.currentBet.amount
    });
    const expectedRequest = mockBet;
    // act
    component.onFormSubmit();
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedRequest);
    expect(component.formGroup.disabled).toBeTruthy();
  });

  it('should end the match and set the winner', () => {
    // arrange
    component['match'] = mockMatch;
    const spy = spyOn(service, 'endMatch').and.callFake(() => of(mockWinnerTeamA));
    // act
    component.endMatch(123);
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(123);
    expect(component['match'].winner).toEqual(mockWinnerTeamA);
  });

  it('should update the user balance if the bet is won', () => {
    // arrange
    component['match'] = mockMatchWithBet;
    spyOn(service, 'endMatch').and.callFake(() => of(mockWinnerTeamA));
    const spy = spyOn(service, 'setBalance');
    const expectedBalance = {
      amountBet: 0,
      amountWon: +(mockMatchWithBet.currentBet.amount * mockMatchWithBet.currentBet.odds).toFixed(2)
    };
    // act
    component.endMatch(123);
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedBalance);
  });

  it('should not update the user balance if the bet is lost', () => {
    // arrange
    component['match'] = mockMatchWithBet;
    spyOn(service, 'endMatch').and.callFake(() => of(mockWinnerTeamB));
    const spy = spyOn(service, 'setBalance');
    // act
    component.endMatch(123);
    // assert
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should update potential gains when the form has a new value', () => {
    // arrange
    component['match'] = mockMatch;
    component.toWin = '0';
    component.cashout = '0';
    const amountToBet = 10;
    const expectedToWinWithTeamA = '111.00';
    const expectedCashoutWithTeamA = '121.00';
    const expectedToWinWithTeamB = '11.00';
    const expectedCashoutWithTeamB = '21.00';
    // act
    component.formGroup.patchValue({
      team: mockMatch.teams[0],
      amount: amountToBet
    }, { emitEvent: true });
    // assert
    expect(component.toWin).toEqual(expectedToWinWithTeamA);
    expect(component.cashout).toEqual(expectedCashoutWithTeamA);
    // act
    component.formGroup.patchValue({
      team: mockMatch.teams[1],
      amount: amountToBet
    }, { emitEvent: true });
    // assert
    expect(component.toWin).toEqual(expectedToWinWithTeamB);
    expect(component.cashout).toEqual(expectedCashoutWithTeamB);
  });
});
