import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingridient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('f')
  editForm!: NgForm;

  editMode = false;
  id!: number;
  recipe!: Recipe;

  recipes!: Recipe[];

  name!: string;
  imagePath!: string;
  description!: string;
  ingName!: string;
  amount!: number;

  ingLength!: number;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      console.log(this.editMode);
    });
    if (this.editMode) {
      this.editRecipe();
    }
  }

  onSubmit() {
    console.log(this.editMode);
    this.editMode ? this.updateRecipe() : this.addRecipe();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addRecipe() {
    let formValue = this.editForm.value;
    console.log('here');
    console.log(formValue);

    this.name = formValue.name;
    this.imagePath = formValue.imagePath;
    this.description = formValue.description;
    this.ingName = formValue.ingName;
    this.amount = formValue.amount;

    this.recipeService.addRecipe(
      new Recipe(this.name, this.description, this.imagePath, [
        new Ingridient(this.ingName, this.amount)
      ])
    );
  }

  editRecipe() {
    this.recipe = this.recipeService.getRecipe(this.id);
    console.log('in edit');
    this.name = this.recipe.name;
    this.imagePath = this.recipe.imagePath;
    this.description = this.recipe.description;

    this.ingName = this.recipe.ingridients[0].name;
    this.amount = this.recipe.ingridients[0].amount;
  }

  updateRecipe() {
    let formValue = this.editForm.value;
    this.name = formValue.name;
    this.imagePath = formValue.imagePath;
    this.description = formValue.description;
    this.ingName = formValue.ingName;
    this.amount = formValue.amount;

    this.recipe = new Recipe(this.name, this.description, this.imagePath, [
      new Ingridient(this.ingName, this.amount)
    ]);

    this.recipeService.updateRecipe(this.id, this.recipe);
    this.editMode = false;
  }

  onCancle() {
    this.router.navigate(['../']);
  }
}
