import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  //   exports: [
  //     RecipesComponent,
  //     RecipeListComponent,
  //     RecipeDetailComponent,
  //     RecipeItemComponent,
  //     RecipeStartComponent,
  //     RecipeEditComponent
  //   ],
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {}
