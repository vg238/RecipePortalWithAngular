import {RouterModule, Routes} from '@angular/router';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes.component';
import {NgModule} from '@angular/core';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
