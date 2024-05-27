import {Component, Inject, OnInit} from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/heroe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  hero: Hero;
}


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatListModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this._snackBar.open('Hero created', 'Close', {duration: 2000});
      });
  }

  openDialog(hero: Hero) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        hero
      }
    })

    this.dialog.afterAllClosed.subscribe(() => {
      this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    })
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h2 mat-dialog-title>Are you sure to delete this hero? </h2>
  <mat-dialog-content>
    <p>{{data.hero.name}}</p>

    <div [style]="{'display': 'flex', 'justify-content': 'flex-end'}">
      <button [style]="{'margin-right': '10px'}" mat-stroked-button mat-dialog-close (click)="cancel()">Cancel</button>
      <button mat-stroked-button (click)="delete(data.hero)">Yes</button>
    </div>
  </mat-dialog-content>`,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private heroService: HeroService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  heroes: Hero[] = [];

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
    this.dialog.closeAll();
    this._snackBar.open('Hero deleted', 'Close', {duration: 2000});
  }
  cancel() {
    this.dialog.closeAll();
  }
}
