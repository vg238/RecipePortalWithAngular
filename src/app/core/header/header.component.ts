import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  onLogout() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    console.log('IN Here');
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

}
