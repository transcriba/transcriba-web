import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../loopback-auth/auth-guard.service';
import { AdminGuardService } from '../loopback-auth/admin-guard.service';



//import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  /*{
    path: 'sources/:id',
    component: SourceDetailsComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'sources',
    component: SourceComponent,
    canActivate: [AdminGuardService]
  }*/
];

export const transcriberRouting = RouterModule.forChild(routes);