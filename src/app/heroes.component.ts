import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDataService } from './hero.data.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroDataService]
})
export class HeroesComponent implements OnInit {
  @Input()
  title: string;
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private heroService: HeroDataService) { }

  getHeroes(): void {
    this.heroService
      .heroes
      .subscribe(
        heroes => this.heroes = heroes,
        error => this.error = error);
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
