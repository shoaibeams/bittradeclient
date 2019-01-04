import { Injectable } from '@angular/core';
declare var toastr: any;

@Injectable()
export class ToasterService {

  constructor() {
    this.setting();
  }

  serverSideError() {

    toastr.error("Something went wrong. Please try again or contact at info@apply4u.co.uk", null);
  }


  Success(message: string, title?: string) {

    toastr.success(message, title);

  }

  warning(message: string, title?: string) {

    toastr.warning(message, title);

  }
  Error(message: string, title?: string) {

    toastr.error(message, title);

  }

  Info(message: string, title?: string) {

    toastr.info(message, title);

  }

  setting() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "300",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
  // Get toastr js library from : https://github.com/CodeSeven/toastr
}
