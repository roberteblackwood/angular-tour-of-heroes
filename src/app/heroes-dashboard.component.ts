import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      this.heroes2 = heroes;
    });
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
}
