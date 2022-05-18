import {ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef} from '@angular/core';
import {ReusablePdfViewerComponent} from './reusable-pdf-viewer.component';
import {ActivationStart, Router} from '@angular/router';
import {ReusablePdfViewer} from './reusable-pdf-viewer.service';
import {distinctUntilChanged, filter} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ReusablePdfViewerBuilder {
  private _componentRef: ComponentRef<ReusablePdfViewerComponent>;
  private _currentViewContainerRef?: ViewContainerRef;
  #attached$ = new BehaviorSubject(false);
  attached$ = this.#attached$.asObservable().pipe(distinctUntilChanged());

  constructor(
    private _injector: Injector,
    private _router: Router,
    private readonly _reusablePdfViewer: ReusablePdfViewer,
    private _componentFactoryResolver: ComponentFactoryResolver,
  ) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(ReusablePdfViewerComponent);
    this._componentRef = componentFactory.create(_injector);
    console.log('Component created');
    this._router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe(event => {
      if (this._currentViewContainerRef) {
        this.detach(this._currentViewContainerRef);
        this._currentViewContainerRef = undefined;
      }
    });
  }

  attach(viewContainerRef: ViewContainerRef) {
    this._currentViewContainerRef = viewContainerRef;
    console.log('Attaching', this._componentRef);
    viewContainerRef.insert(this._componentRef.hostView);
    this.#attached$.next(true);
  }

  detach(viewContainerRef: ViewContainerRef) {
    console.log('Detaching');
    viewContainerRef.detach(viewContainerRef.indexOf(this._componentRef.hostView));
    this.#attached$.next(false);
  }
}
