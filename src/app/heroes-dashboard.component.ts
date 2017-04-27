import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDataService } from './hero.data.service';

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
    private heroService: HeroDataService) { }

  getHeroes(): void {
    this.heroService.heroes.subscribe(
        heroes => this.heroes = heroes,
        error => this.error = error);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
