import {Inject, Injectable} from '@angular/core';
import WebViewer, {WebViewerInstance} from '@pdftron/webviewer';
import {BehaviorSubject} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ReusablePdfViewer {
  private _instance: WebViewerInstance;
  #initialized$ = new BehaviorSubject<boolean>(false);
  initialized$ = this.#initialized$.asObservable().pipe(distinctUntilChanged());

  async init(htmlElement: HTMLElement) {
    this._instance = await WebViewer({
      path: '../../lib',
    }, htmlElement);

    console.log('[PDF] Viewer initialized');
    this.#initialized$.next(true);
    this._instance.UI.addEventListener('documentLoaded', () => console.log('[PDF] Document loaded'));
  }

  loadDocument(filename: string) {
    console.log('[PDF] Loading document', filename);
    const filePath = '../../files/' + filename + '.pdf';
    this._instance.UI.loadDocument(filePath, {filename: filename + '.pdf' ?? 'document.pdf'});
  }
}
