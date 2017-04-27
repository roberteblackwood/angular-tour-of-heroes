import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  heroes: Hero[];

  @Output()
  reload = new EventEmitter();
  @Output()
  delete = new EventEmitter<Hero>();
  @Output()
  save = new EventEmitter<Hero>();

  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  addHero(): void {
    this.selectedHero = new Hero();
  }

  saveHero(hero: Hero):void{
    this.save.emit(hero);
    this.selectedHero = null;
  }

  reloadHeroes():void{
    this.reload.emit();
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.delete.emit(hero);
    if (this.selectedHero === hero) { this.selectedHero = null; }
  }

  ngOnInit(): void {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
