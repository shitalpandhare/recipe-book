import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppingListForm!: NgForm;
  id!: number;
  ingridient!: Ingridient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.startEditing.subscribe((id: number) => {
      this.id = id;
      this.ingridient = this.shoppingListService.getIngridientById(this.id);

      this.editMode = true;
      this.shoppingListForm.setValue({
        name: this.ingridient.name,
        amount: this.ingridient.amount
      });
    });
  }

  onSubmit() {
    var name = this.shoppingListForm.form.value.name;
    var amount = this.shoppingListForm.form.value.amount;

    this.editMode
      ? this.shoppingListService.updateIngridient(this.id, name, amount)
      : this.shoppingListService.addIngridient(new Ingridient(name, amount));

    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngridient(this.id);
    // this.onClear();
  }

  // onClear() {
  //   this.editMode = false;
  //   this.shoppingListForm.reset();
  // }
}
