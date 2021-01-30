import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modal: NzModalService) {}

  openModal(title: string, content: string, size: number) {
    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzWidth: size,
    });
  }
}
