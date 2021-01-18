import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients!: Ingridient[];
  private slSubscription!: Subscription;
  constructor(private shoppinListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingridients = this.shoppinListService.getIngridient();

    this.slSubscription = this.shoppinListService.ingridientsChanged.subscribe(
      (ingridients: Ingridient[]) => {
        this.ingridients = ingridients;
      }
    );
  }

  onEditing(index: number) {
    this.shoppinListService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
  }
}
