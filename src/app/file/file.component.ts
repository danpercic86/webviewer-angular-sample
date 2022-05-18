import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ReusablePdfViewer} from "../reuseable-pdf-viewer/reusable-pdf-viewer.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, takeUntil, takeWhile, tap, throttleTime} from "rxjs/operators";
import {ReusablePdfViewerBuilder} from "../reuseable-pdf-viewer/reusable-pdf-viewer-builder.service";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnDestroy {
  onDestroy$ = new Subject();

  constructor(readonly reusablePdfViewer: ReusablePdfViewer, readonly activatedRoute: ActivatedRoute, readonly reusablePdfViewerBuilder: ReusablePdfViewerBuilder) {
    console.log('FileComponent created');
    const filename$ = this.activatedRoute.paramMap.pipe(map(params => params.get('filename')));
    combineLatest([filename$, this.reusablePdfViewer.initialized$, reusablePdfViewerBuilder.attached$])
      .pipe(
        takeUntil(this.onDestroy$),
        filter(([, initialized, attached]) => initialized && attached),
      )
      .subscribe(([filename]) => {
        this.reusablePdfViewer.loadDocument(filename)
    })
  }

  ngOnDestroy() {
    console.log('FileComponent destroyed');
    this.onDestroy$.next();
  }
}
