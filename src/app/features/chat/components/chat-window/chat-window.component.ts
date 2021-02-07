import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  @Input() changeWindow: Function = () => true;
  @Input() isMobile: boolean = false;
  constructor() {}
}
