import { Component          } from '@angular/core';
import { CustomErrorHandler } from '../app.module';
//
@Component({
  selector: 'app-files-generation-web',
  templateUrl: './files-generation-web.component.html',
  styleUrls: ['./files-generation-web.component.css']
})
//
export class FilesGenerationWebComponent {
  //
  static get PageTitle()   : string {
    return '[GENERAR ARCHIVOS]';
  }
  //
  readonly  pageTitle      : string = FilesGenerationWebComponent.PageTitle;
  //
  constructor(customErrorHandler : CustomErrorHandler)
  {
    //
    console.log(this.pageTitle + " - [INGRESO]");
  }
}
