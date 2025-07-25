import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button
      class="px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 bg-blanchedalmond-hover hover:bg-orange-400 focus:bg-orange-400 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center relative"
      (click)="buttonClicked.emit()">
      {{ label() }}
      @if (SvgPath()) {
        <svg class="ml-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path [attr.d]="SvgPath()"/>
        </svg>
      }
      @if (itemesNum() && itemesNum() !== '0') {
        <span class="absolute top-[-15%] right-[-5%] text-[10px] font-bold bg-blue-500 text-white rounded-full px-1 ring-4 ring-blue-500/50">
          {{ itemesNum() }}
        </span>
      }
    </button>
  `,
  styles: ``
})
export class PrimaryButton {
  label = input<string>('');
  SvgPath = input<string>('');
  itemesNum = input<string>('');

  buttonClicked = output();
}
