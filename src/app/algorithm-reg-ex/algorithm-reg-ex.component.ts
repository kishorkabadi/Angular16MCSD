import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MCSDService                                 } from '../mcsd.service';
import { Observable                                  } from 'rxjs';
import { CustomErrorHandler                          } from '../app.module';
//
@Component({
  selector: 'app-algorithm-reg-ex',
  templateUrl: './algorithm-reg-ex.component.html',
  styleUrls: ['./algorithm-reg-ex.component.css']
})
//
export class AlgorithmRegExComponent implements OnInit, AfterViewInit {
    ////////////////////////////////////////////////////////////////
    // PROPERTIES //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    //
    public static get PageTitle()      : string {
      return '[ALGORITMOS - EXPRESIONES REGULARES]';
    }
    //
    readonly  pageTitle             : string = AlgorithmRegExComponent.PageTitle;
    protected xmlData               : string = "";
    protected lblStatus             : string = "";
    protected pattern               : string = "";
    //
    @ViewChild('mensajes')    mensajes    : any;
    @ViewChild('tagSearch')   tagSearch   : any;
    @ViewChild('textSearch')  textSearch  : any;
    @ViewChild('regExSearch') regExSearch : any;
    //
    constructor(private mcsdService:MCSDService, private customErrorHandler : CustomErrorHandler)
    {
        //
    }
    //
    ngOnInit(): void {
        //
        console.log(AlgorithmRegExComponent.PageTitle + " - [INGRESANDO]");
        //
    }
    //
    ngAfterViewInit(): void {
      //
      console.log(AlgorithmRegExComponent.PageTitle + " - [INICIO VISUAL]");
      //
      this._GetXMLData();
    }
    ////////////////////////////////////////////////////////////////
    // METODOS    //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    _GetXMLData():void {
        //
        console.log(AlgorithmRegExComponent.PageTitle + " - [GET XML DATA]");
        //
        let xmlInfo!  : Observable<string>;
        //
        xmlInfo       = this.mcsdService._GetXmlData();
        //
        let data      : any;
        //
        const xmlInfoObserver   = {
            //
            next: (_xmlData: string)     => { 
                //------------------------------------------------------------
                // OBTENER DATA
                //------------------------------------------------------------
                //
                console.warn(AlgorithmRegExComponent.PageTitle + ' - [GET XML DATA] - [RETURN VALUE] : ' + _xmlData);
                //
                this.xmlData = _xmlData;
                //-------------------------------------------------------------
                // CONFIGURAR CONTROLES
                //-------------------------------------------------------------
                //
                this.mensajes.nativeElement.innerHTML = this.xmlData;
                //
                this.lblStatus = "[REINICIO EXITOSO]"
                //
                this.pattern   = "";
            },
            error: (err: Error) => {
                //
                console.error(AlgorithmRegExComponent.PageTitle + ' - [GET XML DATA]- [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(AlgorithmRegExComponent.PageTitle  + ' - [GET XML DATA]- [Observer got a complete notification]');
                //
            },
        };
        //
        xmlInfo.subscribe(xmlInfoObserver);
    }
    //
    GetRegex():void{
        //
        console.log(AlgorithmRegExComponent.PageTitle + " - [EVAL REGEX]");   
        //
        let selectedIndex   : number = this.tagSearch.nativeElement.options.selectedIndex;
        let tagSearchIndex  : number = this.tagSearch.nativeElement.options[selectedIndex].value;
        let tagSearchValue  : string = "";
        let textSearchValue : string = this.textSearch.nativeElement.value;
        //
        if (tagSearchIndex == 0) {
            //
            this.lblStatus = "FAVOR SELECCIONE UN [ELEMENTO A BUSCAR]";
            //
            return;
        }
        //
        if (textSearchValue == "") {
            //
            this.lblStatus = "FAVOR INGRESE UN VALOR EN EL CAMPO [CONTENIDO]";
            //
            return;
        }
        //
        let regExInfo!  : Observable<string>;
        //
        regExInfo       = this.mcsdService._RegExEval(tagSearchIndex,textSearchValue);
        //
        let data      : any;
        //
        const regExInfoObserver   = {
            //
            next: (data: string)     => { 
                //------------------------------------------------------------
                // OBTENER DATA
                //------------------------------------------------------------
                //
                console.warn(AlgorithmRegExComponent.PageTitle + ' - [EVAL REGEX] - [RETURN VALUE] : ' + data);
                //    
                let resultArray : string[] = data.split("|");
                //
                //
                if (resultArray.length > 0)
                {
                    //
                    let matchAmt       : string = resultArray[0];
                    //
                    let xmlHighlighted : string = resultArray[1];
                    //
                    this.pattern       = this.mcsdService.DebugHostingContent(resultArray[2]);
                    //
                    console.log("REGEX. AMT OF MATCHES   : " + matchAmt);
                    //
                    console.log("REGEX. PATTERN          : " + this.pattern);
                    //----------------------------------------------------------------------
                    // CONFIGURA CONTROLES
                    //----------------------------------------------------------------------
                    //
                    this.mensajes.nativeElement.innerHTML = xmlHighlighted;
                    //
                    //$("#GetRegex").prop('disabled', true);
                    //
                    //$("#newSearch").prop('disabled', false);
                    //
                    //this.regExSearch.nativeElement.text   = pattern;
                    //
                    this.lblStatus = 'SE ENCONTRARON (' + matchAmt + ') COINCIDENCIAS';
                }
            },
            error: (err: Error) => {
                //
                console.error(AlgorithmRegExComponent.PageTitle + ' - [EVAL REGEX] - [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(AlgorithmRegExComponent.PageTitle  + ' - [EVAL REGEX] - [Observer got a complete notification]');
                //
            },
        };
        //
        regExInfo.subscribe(regExInfoObserver);
    }
}
