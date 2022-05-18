import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReusablePdfViewer} from './reusable-pdf-viewer.service';

@Component({
  template: '<div #viewer style="height: 100%"></div>',
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ReusablePdfViewerComponent implements OnInit, OnDestroy {
  @ViewChild('viewer', {static: true}) readonly viewer: ElementRef;

  constructor(private readonly _reusablePdfViewer: ReusablePdfViewer) {
  }

  ngOnInit() {
    console.log('ReusablePdfViewerComponent created');
    return this._reusablePdfViewer.init(this.viewer.nativeElement);
  }

  ngOnDestroy() {
    console.log('ReusablePdfViewerComponent destroyed');
  }
}
