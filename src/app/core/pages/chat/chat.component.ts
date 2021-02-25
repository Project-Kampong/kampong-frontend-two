import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chatroom } from '../../models/chat';
import { UserData } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {
  chatId: string = '';
  chatrooms: Chatroom[] = [];
  isMobile: boolean = false; //hack to make the thing work first
  private userData: UserData = <UserData>{};
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
    window.scroll(0, 0);

    this.chatId = this.route.snapshot.queryParams['id'] ? this.route.snapshot.queryParams['id'] : '';
    this.routeToChatWindow = this.routeToChatWindow.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    if (window.screen.width < 1024) {
      this.isMobile = true;
    }
    this.subscriptions.push(
      this.authService.getUserDataByToken().subscribe((res) => {
        this.userData = res['data'] as any;
        this.subscriptions.push(
          this.chatService.getUserChatrooms().subscribe((res) => {
            this.chatrooms = res['data'] as Chatroom[];
          }),
        );
      }),
    );
  }

  changeWindow(): void {
    if (window.screen.width < 1024) {
      const chatElement: HTMLElement | null = document.getElementById('chat-div');
      const previewElement: HTMLElement | null = document.getElementById('preview-div');
      if (chatElement && previewElement) {
        if (chatElement.style.display === 'none') {
          chatElement.style.display = 'block';
          previewElement.style.display = 'none';
        } else {
          chatElement.style.display = 'none';
          previewElement.style.display = 'block';
        }
      }
    }
  }

  //need to think of a better way to do the mobile
  routeToChatWindow(chatId: string = ''): void {
    this.router.navigate(['/chat/'], {
      queryParams: { id: chatId },
    });
    this.chatId = chatId;
    this.changeWindow();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
