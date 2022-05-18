import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReusablePdfViewer} from './reusable-pdf-viewer.service';

@Component({
  selector: 'app-reusable-pdf-viewer',
  template: `<div  #viewer style="height: 100%"></div>`,
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

  constructor(readonly reusablePdfViewer: ReusablePdfViewer) {

  }

  async ngOnInit() {

    await this.reusablePdfViewer.init(this.viewer.nativeElement);

    console.log('ReusablePdfViewerComponent created');

    this.reusablePdfViewer.show$.subscribe(show => {
      console.log(show)
      this.viewer.nativeElement.style.visibility = show ? 'visible' : 'hidden';
    })
  }

  ngOnDestroy() {
    console.log('ReusablePdfViewerComponent destroyed');
  }
}
