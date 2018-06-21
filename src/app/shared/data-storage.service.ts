import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
   // const token = this.authService.getToken();
   // const headers = new HttpHeaders().set('headerName', 'value').append('anotherHeader', 'value');
    const params = new HttpParams(); // .set('auth', token);
    return this.httpClient.put('https://ng-recipe-book-27d4a.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        observe: 'body',
        // body' is Default, you don't have to mention, but there are other options like response, event, to capture other events
        // responseType: 'text' blob, arraybuffer, json is default
        // headers: headers
        params: params // This is blank, just to show how we can use...
    });

    // If you need to know the progress of request, use the following code
    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-27d4a.firebaseio.com/recipes.json', {
    //   reportProgress: true,
    //   params: params
    // });
    // return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-27d4a.firebaseio.com/recipes.json?auth=' + token)
    // Same as above, other options are also available
    // add ?auth= token to URL below for firebase authentication, in our case we using Interpceptor
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-27d4a.firebaseio.com/recipes.json', {
      observe: 'body', // this default, don't have to mention
      responseType: 'json' // this default, don't have to mention
    })
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
