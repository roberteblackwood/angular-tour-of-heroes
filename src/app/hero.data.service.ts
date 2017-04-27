import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Hero } from './hero';
import { HeroHttpService } from "./hero.http.service";

@Injectable()
export class HeroDataService {
  private heroesUrl = 'app/heroes';  // URL to web api
  private _heroes = new BehaviorSubject<Hero[]>([]);
  public heroes = this._heroes.asObservable();
  constructor(private heroHttpService: HeroHttpService) {
    this.load();
  }

  reload(): void{
    this.load();
  }

  getHero(id: number): Observable<Hero> {
    return this.heroes.map(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Observable<Hero> {
    return this.heroHttpService.save(hero).mergeMap(savedHero => {
      let heroes = this._heroes.value;

      let idx = heroes.findIndex(h => h.id === savedHero.id);
      if(idx > -1) {
        heroes[idx] = savedHero;
      }
      else {
        heroes.push(savedHero);
      }

      this._heroes.next(heroes);
      return Observable.of(savedHero);
    });
  }

  delete(hero: Hero): Observable<Response> {
    return this.heroHttpService.delete(hero).mergeMap((response, index) =>{
      let heroes = this._heroes.value;

      let idx = heroes.findIndex(h => h.id === hero.id);
      if(idx > -1){
        heroes.splice(idx, 1);
      }

      this._heroes.next(heroes);
      return Observable.of(response);
    });
  }

  private load(): void {
    this.heroHttpService.getHeroes()
      .subscribe((heroes) => {
        this._heroes.next(heroes);
      });
  }
}
