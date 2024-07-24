import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}
  options = {
    timeOut: 5000,
    positionClass: 'toast-top-rigth',
  };
  success(content: string, title: string) {
    this.toastr.success(content, title, this.options);
  }

  error(content: string, title: string) {
    this.toastr.error(content, title, this.options);
  }

  info(content: string, title: string) {
    this.toastr.info(content, title, this.options);
  }

  warning(content: string, title: string) {
    this.toastr.warning(content, title, this.options);
  }
}
