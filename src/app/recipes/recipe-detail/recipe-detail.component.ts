import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // recipeItem: Recipe;
  id!: number;
  recipe!: Recipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
    console.log(this.id);
    // this.id = this.route.snapshot.params['id'];
  }

  onAddToShopping() {
    this.recipeService.addIngridientsShoppingList(this.recipe.ingridients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }
}
