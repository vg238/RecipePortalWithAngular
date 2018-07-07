import {Ingredient} from '../../shared/ingrediant.modal';
import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {

  switch (action.type) {
    case  (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPES):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const oldRecipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...oldRecipe,
        ...action.payload.newRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const modifiedRecipes = [...state.recipes];
      modifiedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: modifiedRecipes
      };
    default:
      return state;

  }

}
