import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

import { routing } from './app.routing';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { UtilityModule } from './utilities/utility.module';
import { AuthModule } from './loopback-auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { SourceModule } from './source/source.module';
import { InfoPageModule } from './info-page/info-page.module';
import { TranscribaModule } from './transcriba/transcriba.module';
import { EditorModule } from './editor/editor.module';
import { ToastyModule } from 'ng2-toasty';
import { ScoreModule } from './score/score.module';



@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    UtilityModule,
    AuthModule,
    I18nModule,
    SourceModule,
    InfoPageModule,
    TranscribaModule,
    EditorModule,
    ToastyModule.forRoot(),
    ScoreModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AuthorizationRequiredComponent
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule {}
