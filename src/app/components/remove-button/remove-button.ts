import { Component, output } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  imports: [],
  template: `
    <button
      (click)="$event.stopPropagation(); buttonClicked.emit()"
      class="text-xs leading-3 underline text-red-400 cursor-pointer hover:text-red-600">
      Remove</button>
  `,
  styles: ``
})
export class RemoveButton {
  buttonClicked = output();
}
