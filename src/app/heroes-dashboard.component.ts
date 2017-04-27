import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import * as _ from "lodash";

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes-dashboard',
  templateUrl: './heroes-dashboard.component.html',
  styleUrls: ['./heroes-dashboard.component.css']
})
export class HeroesDashboardComponent implements OnInit {
  heroes1: Hero[];
  heroes2: Hero[];
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(callback: (heroes: Hero[]) => void): void {
    this.heroService
      .getHeroes()
      .then(callback)
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getHeroes((heroes: Hero[]) => {
      this.heroes1 = heroes;
      this.heroes2 = _.cloneDeep(this.heroes1);;
    });
  }
  
  saveHero(hero: Hero, heroes: Hero[]){
    this.heroService
        .save(hero)
        .then(savedHero => {
          let idx = heroes.findIndex(h => h.id === savedHero.id);
          if(idx > -1) {
            heroes[idx] = savedHero;
          }
          else {
            heroes.push(savedHero);
          }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  saveHero1(hero: Hero){
    this.saveHero(hero, this.heroes1);
  }

  saveHero2(hero: Hero){
    this.saveHero(hero, this.heroes2);
  }

  loadHeroes1(){
    this.getHeroes((heroes: Hero[]) => {
      this.heroes1 = heroes;
    });
  }

  loadHeroes2(){
    this.getHeroes((heroes: Hero[]) => {
      this.heroes2 = heroes;
    });
  }

  deleteHero(hero: Hero, heroes: Hero[]){
    this.heroService
      .delete(hero)
      .then(response => {
          let idx = heroes.findIndex(h => h.id === hero.id);
          if(idx > -1){
            heroes.splice(idx, 1);
          }
        })
      .catch(error => this.error = error);
  }

  deleteHero1(hero: Hero){
    this.deleteHero(hero, this.heroes1);
  }

  deleteHero2(hero: Hero){
    this.deleteHero(hero, this.heroes2);
  }
}
