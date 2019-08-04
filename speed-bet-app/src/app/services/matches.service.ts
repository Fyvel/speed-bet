import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const STATUS = {
  upcoming: 'Upcoming',
  ended: 'Ended',
};

const matches = [
  {
    id: 1,
    sport: '🥋',
    teamA: { name: 'Chuck Norris', cote: 97 },
    teamB: { name: 'Sangoku', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 2,
    sport: '🥊',
    teamA: { name: 'John Wick', cote: 97 },
    teamB: { name: 'Superman', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 3,
    sport: '🥌',
    teamA: { name: 'Deadpool', cote: 97 },
    teamB: { name: 'Darth Maul', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 1,
    sport: '🥋',
    teamA: { name: 'Chuck Norris', cote: 97 },
    teamB: { name: 'Sangoku', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 2,
    sport: '🥊',
    teamA: { name: 'John Wick', cote: 97 },
    teamB: { name: 'Superman', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 3,
    sport: '🥌',
    teamA: { name: 'Deadpool', cote: 97 },
    teamB: { name: 'Darth Maul', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 1,
    sport: '🥋',
    teamA: { name: 'Chuck Norris', cote: 97 },
    teamB: { name: 'Sangoku', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 2,
    sport: '🥊',
    teamA: { name: 'John Wick', cote: 97 },
    teamB: { name: 'Superman', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
  {
    id: 3,
    sport: '🥌',
    teamA: { name: 'Deadpool', cote: 97 },
    teamB: { name: 'Darth Maul', cote: 42 },
    status: STATUS.upcoming,
    winner: null
  },
];

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) {
  }

  getLatestMatches(page: number = 1) {
    return of(matches);
    // return this.http.get(`${BASE_URL}/matches?page=${page}`);
  }
}
