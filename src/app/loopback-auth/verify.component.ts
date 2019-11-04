import { Component } from '@angular/core';

@Component({
  selector:    'usr-email-verification',
  template:
  `
  <div class="jumbotron">
    <h1>{{'title.eMailConfirmation' | translate }}</h1>
    <p>
      {{ 'command.pleaseVerifyYourEMailAccount' | translate }}
    </p>
  </div>
  `,
  styleUrls: []
})
export class VerifyComponent {}
