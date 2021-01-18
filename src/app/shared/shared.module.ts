import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {}
