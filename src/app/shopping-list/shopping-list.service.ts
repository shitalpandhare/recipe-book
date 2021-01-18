import { Ingridient } from '../shared/ingridient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
  ingridientsChanged = new Subject<Ingridient[]>();
  startEditing = new Subject<number>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apple', 10),
    new Ingridient('Tammoto', 5)
  ];

  getIngridient() {
    return this.ingridients.slice();
  }
  getIngridientById(id: number) {
    return this.ingridients.slice()[id];
  }

  updateIngridient(id: number, name: string, amount: number) {
    this.ingridients[id].name = name;
    this.ingridients[id].amount = amount;
  }

  deleteIngridient(id: number) {
    this.ingridients.splice(id, 1);
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);

    this.ingridientsChanged.next(this.ingridients.slice());
  }

  addIngridients(ing: Ingridient[]) {
    this.ingridients.push(...ing);
    this.ingridientsChanged.next(this.ingridients.slice());
  }
}
