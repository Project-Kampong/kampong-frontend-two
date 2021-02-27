import { Component, Input } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chat';

@Component({
  selector: 'chat-nav-preview',
  templateUrl: './chat-nav-preview.component.html',
  styleUrls: ['./chat-nav-preview.component.scss'],
})
export class ChatNavPreviewComponent {
  constructor() {}

  @Input() chatroomData: Chatroom = <Chatroom>{};
  @Input() routeToChatWindow: Function = () => true;
}
