import { Component, Input } from '@angular/core';
import { messages } from 'src/test-examples/chat-test';

interface Message {
  name: string;
  timestamp: string;
  message: string;
}

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  @Input() changeWindow: Function = () => true;
  @Input() isMobile: boolean = false;
  constructor() {}

  messages: Message[] = [
    {
      name: 'Darren',
      timestamp: '12:09',
      message: 'Howdy',
    },
    {
      name: 'Don',
      timestamp: '12:19',
      message:
        'Hey there. This is a very long message that I need to test to see if the mobile and desktop versions appear properly. Becuase I am scared that if I do it this way like Telegram instead of Slack, the thing might look very ugly and I need to ensure that the profile pic and everythin remains the correct shape and stuff hehehehehehehehehehehehehe',
    },
    {
      name: 'Darren',
      timestamp: '12:09',
      message: 'Kampong rocks ftw',
    },
  ];

  sendMessage(e: Event): void {
    e.preventDefault();
    if (e) {
      const message: string = (e.target as HTMLTextAreaElement)?.value;
      if (message.length === 0) {
        return;
      }
      const newMessage: Message = {
        name: 'Darren',
        timestamp: 'Test',
        message: message,
      };
      this.messages.push(newMessage);
      (<HTMLFormElement>document.getElementById('input-form')).reset();
      setTimeout(() => this.updateScroll(), 50);
    }
  }

  updateScroll(): void {
    const window: HTMLElement | null = document.getElementById('window');
    window?.scrollTo({ top: window.scrollHeight, behavior: 'smooth' });
  }
}
