import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroHttpService } from './hero.service';

@Component({
  selector: 'my-heroes-dashboard',
  templateUrl: './heroes-dashboard.component.html',
  styleUrls: ['./heroes-dashboard.component.css']
})
export class HeroesDashboardComponent implements OnInit {
  heroes: Hero[];
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private heroService: HeroHttpService) { }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(
        heroes => this.heroes = heroes,
        error => this.error = error);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
