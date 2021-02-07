import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-chat',
  templateUrl: './header-chat.component.html',
  styleUrls: ['./header-chat.component.scss'],
})
export class HeaderChatComponent {
  constructor(private router: Router) {}

  routeToChat(chatId: string = ''): void {
    this.router.navigate(['/chat/' + chatId]);
  }
}
