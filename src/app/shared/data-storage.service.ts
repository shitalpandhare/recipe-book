import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  header: any;
  constructor(
    private http: HttpClient,
    private recipeServive: RecipeService,
    private authService: AuthService
  ) {}

  data = { name: 'shital', edu: 'msc' };

  ngOnInit(): void {
    // this.storeRecipes();
  }

  storeRecipes() {
    const recipes = this.recipeServive.getRecipes();
    this.http
      .put(
        'https://recipe-book-b43be-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-b43be-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          if (!recipes) {
            return null;
          }
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingridients: recipe.ingridients ? recipe.ingridients : []
            };
          });
        }),
        tap(recipes => {
          if (!recipes) {
            return;
          }
          this.recipeServive.setRecipes(recipes);
        })
      );
  }
}
