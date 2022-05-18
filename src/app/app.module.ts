import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReusablePdfViewerComponent} from "./reuseable-pdf-viewer/reusable-pdf-viewer.component";
import {RouterModule} from "@angular/router";
import {FileComponent} from './file/file.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ReusablePdfViewerComponent,
    FileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {
        path: ':filename',
        component: FileComponent
      }]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
