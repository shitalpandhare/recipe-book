import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe',
  //     'This is test recipe',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-QpmIOKI4soG_zb-boajrl69-jDRzPOlgXQ&usqp=CAU',
  //     [new Ingridient('meat', 1), new Ingridient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'MY Recipe',
  //     'This is my recipe',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-QpmIOKI4soG_zb-boajrl69-jDRzPOlgXQ&usqp=CAU',
  //     [new Ingridient('Buns', 1), new Ingridient('meat', 1)]
  //   )
  // ];

  private recipes: Recipe[] = [];

  get _recipes() {
    return this.recipes;
  }

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    if (!this.recipes) {
      return null;
    }
    return this.recipes;
  }

  getRecipe(id: number) {
    console.log('beguv');
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
    console.log('in serviceee');

    console.log(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;

    this.recipeChanged.next(this.recipes.slice());
    console.log('in update');

    console.log(this.recipes);
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngridientsShoppingList(ingridients: Ingridient[]) {
    this.shoppingListService.addIngridients(ingridients);
    console.log(ingridients);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
