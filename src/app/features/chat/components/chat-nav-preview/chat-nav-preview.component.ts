import { Component, Input } from '@angular/core';
import { Preview } from 'src/test-examples/chat-test';

@Component({
  selector: 'chat-nav-preview',
  templateUrl: './chat-nav-preview.component.html',
  styleUrls: ['./chat-nav-preview.component.scss'],
})
export class ChatNavPreviewComponent {
  constructor() {}

  @Input() previewData: Preview = <Preview>{};
  @Input() routeToChatWindow: Function = () => true;
}
