import { Component, output } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  imports: [],
  template: `
    <button
      (click)="buttonClicked.emit()"
      class="text-xs leading-3 underline text-red-500 cursor-pointer">
      Remove</button>
  `,
  styles: ``
})
export class RemoveButton {
  buttonClicked = output();
}
