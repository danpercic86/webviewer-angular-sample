import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
