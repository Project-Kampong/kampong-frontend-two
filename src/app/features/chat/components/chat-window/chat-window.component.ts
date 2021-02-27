import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chatroom, Message } from 'src/app/core/models/chat';
import { ChatService } from 'src/app/core/services/chat.service';

interface User {
  nickname: string;
  profile_picture: string;
}

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, OnDestroy, OnChanges {
  @Input() changeWindow: Function = () => true;
  @Input() isMobile: boolean = false;
  @Input() chatroomName: string = '';
  @Input() chatroomPic: string = '';
  @Input() chatId: string = '';
  @Input() userId: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  subscriptions: Subscription[] = [];
  messages: Message[] = [];
  users: { [key: string]: User } = {};

  ngOnInit(): void {
    setTimeout(() => this.forceScroll(), 50);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges(): void {
    this.chatService.getChatroom(this.chatId).subscribe(
      (res) => {
        const chatDetails = res['data'] as any;
        chatDetails['users'].forEach((user: any) => {
          this.users[user.user_id] = {
            nickname: user['nickname'],
            profile_picture: user['profile_picture'],
          };
          this.messages = chatDetails['messages'];
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        setTimeout(() => this.forceScroll(), 50);
      },
    );
  }

  sendMessage(e: Event): void {
    e.preventDefault();
    if (e) {
      const message: string = (e.target as HTMLTextAreaElement)?.value;
      if (message.length === 0) {
        return;
      }
      this.chatService
        .postMessage({
          chatroom_id: this.chatId,
          chatmessage_text: message,
        })
        .subscribe(
          (res) => {
            if (res.success) {
              this.messages.push(res['data'] as any);
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            (<HTMLFormElement>document.getElementById('input-form')).reset();
            setTimeout(() => this.updateScroll(), 50);
          },
        );
    }
  }

  updateScroll(): void {
    const window: HTMLElement | null = document.getElementById('window');
    window?.scrollTo({ top: window.scrollHeight, behavior: 'smooth' });
  }

  forceScroll(): void {
    const window: HTMLElement | null = document.getElementById('window');
    window?.scrollTo({ top: window.scrollHeight });
  }
}
