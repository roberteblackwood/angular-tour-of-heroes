import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import { HeroHttpService } from "./hero.http.service";

@Injectable()
export class HeroDataService {
  private heroesUrl = 'app/heroes';  // URL to web api
  private _heroes = new BehaviorSubject<Hero[]>([]);
  public heroes = this._heroes.asObservable();
  constructor(private heroHttpService: HeroHttpService) { 
    this.reload();
  }

  reload(): void {
    this.heroHttpService.getHeroes()
      .subscribe((heroes) => {
        this._heroes.next(heroes);
      });
  }

  getHero(id: number): Observable<Hero> {
    return this.heroes.map(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): void {
    this.heroHttpService.save(hero).subscribe(savedHero =>{
    });
  }

  delete(hero: Hero): void {
    this.heroHttpService.delete(hero);
  }
}
