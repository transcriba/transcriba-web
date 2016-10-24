import { NgModule }       from '@angular/core';

//components
import { BePatientComponent } from './be-patient.component';

//directives
import { EmailValidator } from './email-validator';

//pipes
import { ReplaceIfEmptyPipe } from './replace-if-empty.pipe';

//services
import { BackendHelper } from './backend-helper';
import { LoggerService } from './logger.service';
import { NotificationService } from './notification.service';


//modules
import { FormsModule }   from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { ConfigurationModule  } from '../config/configuration.module';
import { I18nModule  } from '../i18n/i18n.module';

@NgModule({
    declarations: [BePatientComponent, EmailValidator, ReplaceIfEmptyPipe],
    exports: [BePatientComponent, EmailValidator, ReplaceIfEmptyPipe],
    imports:      [BrowserModule, FormsModule, ConfigurationModule, I18nModule],
    bootstrap:    [],
    providers: [BackendHelper, LoggerService, NotificationService]
})
export class UtilityModule {}
