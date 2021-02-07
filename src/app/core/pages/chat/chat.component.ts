import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preview, previews } from 'src/test-examples/chat-test';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatPageComponent implements OnInit {
  chatId: string = '';
  previews: Preview[] = previews;
  isMobile: boolean = false; //hack to make the thing work first

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    console.log(this.route.snapshot.queryParams);
    this.chatId = this.route.snapshot.queryParams['id'] ? this.route.snapshot.queryParams['id'] : '';
    this.routeToChatWindow = this.routeToChatWindow.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    if (window.screen.width < 1024) {
      this.isMobile = true;
    }
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
}
