import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/heroe';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', superpower: 'Beauty' },
      { id: 13, name: 'Bombasto', superpower: 'Bombs' },
      { id: 14, name: 'Celeritas', superpower: 'Speed' },
      { id: 15, name: 'Magneta', superpower: 'Magnets' },
      { id: 16, name: 'RubberMan', superpower: 'Elastic' },
      { id: 17, name: 'Dynama', superpower: 'Telekinesis' },
      { id: 18, name: 'Dr. IQ', superpower: 'Intelligence' },
      { id: 19, name: 'Magma', superpower: 'Lava' },
      { id: 20, name: 'Tornado', superpower: 'Wind' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
