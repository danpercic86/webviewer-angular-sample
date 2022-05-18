import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { ReusablePdfViewerBuilder } from './reusable-pdf-viewer-builder.service';

@Directive({
    selector: '[redactionReusablePdfViewer]',
})
export class ReusablePdfViewerDirective implements OnInit {
    constructor(private readonly _viewContainerRef: ViewContainerRef, private readonly _reusablePdfBuilder: ReusablePdfViewerBuilder) {}

    ngOnInit(): void {
        this._reusablePdfBuilder.attach(this._viewContainerRef);
    }
}
