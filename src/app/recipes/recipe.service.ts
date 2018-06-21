import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingrediant.modal';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Banana Bread Recipe', 'Banana Bread Recipe - Instructions',
      'http://www.bemindfulbehuman.com/wordpress/wp-content/uploads/MG_4777.banana.bread_.mini_.loaves.final2_.png',
      [
        new Ingredient('Banana', 3),
        new Ingredient('All Purpose Flour', 1),
        new Ingredient('Milk', 2)
      ]),
    new Recipe('Garlic Naan Bread Recipe', 'Garic Naan Bread Recipe Details',
      'http://secretingredientsltd.com/wp-content/uploads/2017/10/butter-naan.jpg', [
        new Ingredient('All Purpose Flour', 3),
        new Ingredient('Garic cloves', 10)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
