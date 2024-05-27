import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data.service';

import { AppComponent } from './app/app.component';

import { HeroDetailComponent } from './app/components/hero-detail/hero-detail.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { HeroesComponent } from './app/heroes/heroes.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard | Tour of Heroes' },
    {
        path: 'detail/:id',
        component: HeroDetailComponent,
        title: 'Hero Details | Tour of Heroes',
    },
    { path: 'heroes', component: HeroesComponent, title: 'My Heroes | Tour of Heroes' },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                dataEncapsulation: false,
            })
        ),
    ],
});


