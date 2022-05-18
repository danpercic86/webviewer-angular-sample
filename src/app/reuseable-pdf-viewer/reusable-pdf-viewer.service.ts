import {Inject, Injectable} from '@angular/core';
import WebViewer, {WebViewerInstance} from '@pdftron/webviewer';
import {BehaviorSubject} from "rxjs";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {ActivationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ReusablePdfViewer {
  private _instance: WebViewerInstance;
  #initialized$ = new BehaviorSubject<boolean>(false);
  initialized$ = this.#initialized$.asObservable().pipe(distinctUntilChanged());
  show$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly _router: Router) {
    _router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe(event => {
      console.log("hide")
      this.show$.next(false);
    });
  }

  async init(htmlElement: HTMLElement) {
    this._instance = await WebViewer({
      path: '../../lib',
      fullAPI: true,
    }, htmlElement);

    console.log('[PDF] Viewer initialized');

    this.#initialized$.next(true);

    this._instance.UI.addEventListener('documentLoaded', () => {
      console.log('[PDF] Document loaded');
      this.show$.next(true)
    });
  }

  loadDocument(filename: string) {
    console.log('[PDF] Loading document', filename);
    const filePath = '../../files/' + filename + '.pdf';
    this._instance.UI.loadDocument(filePath, {filename: filename + '.pdf' ?? 'document.pdf'});
  }
}
