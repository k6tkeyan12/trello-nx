import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppData,AppState } from './+state';

@Component({
  selector: 'my-nx-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // list$: Observable<AppData[]>;
  title = 'app-name';

  constructor(private store: Store<AppState>) {
    // this.list$ = this.store.select(state => state.app);
  }

  ngOnInit() {

  }
}
