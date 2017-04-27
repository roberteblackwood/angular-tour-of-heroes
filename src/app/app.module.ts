import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroHttpService } from './hero.http.service';
import { HeroDataService } from './hero.data.service';
import { HomeDashboardComponent } from './home-dashboard.component';
import { HeroesDashboardComponent } from './heroes-dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    HomeDashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroesDashboardComponent,
  ],
  providers: [
    HeroHttpService,
    HeroDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
