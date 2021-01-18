import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  handleError!: string;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user: any) => {
      user ? (this.isAuthenticated = true) : (this.isAuthenticated = false);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  //
  onSaveData() {
    if (this.recipeService._recipes.length) {
      this.dataStorageService.storeRecipes();
      console.log(this.recipeService._recipes);
    } else {
      this.handleError = 'There is No Recipes of saving';
    }
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(recipes => {
      if (!recipes) {
        this.handleError = 'There is No Recipes of fetching';
      } else {
        this.recipeService.setRecipes(recipes);
      }
    });
  }

  onCloseHandleError() {
    // this.handleError = '';
    this.handleError = '';
  }
}
