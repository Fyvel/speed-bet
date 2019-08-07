import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';
import { MatchesService } from 'src/app/services/matches.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;
  let service: MatchesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MatchesComponent],
      providers: [MatchesService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MatchesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get latest matches', () => {
    // arrange
    const spy = spyOn(service, 'getLatestMatches');
    // act
    component.ngOnInit();
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
