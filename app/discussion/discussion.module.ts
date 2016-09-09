import { NgModule }       from '@angular/core';

//components
import { CommentComponent } from './comment.component';
import { DiscussionComponent } from './discussion.component';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
//import { Routes, RouterModule }   from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';

//services
import { DiscussionService } from './discussion.service';

@NgModule({
    declarations: [
      CommentComponent,
      DiscussionComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      I18nModule,
      HttpModule,
      UtilityModule,
      AuthModule,
      //RouterModule,
      GadgetModule
    ],
    exports: [
      CommentComponent,
      DiscussionComponent
    ],
    bootstrap:    [],
    providers: [
      DiscussionService
    ]
})
export class DiscussionModule {}