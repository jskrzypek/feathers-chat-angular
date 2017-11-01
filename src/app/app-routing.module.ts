import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { UserComponent } from './components/user/user.component';
import { ChatSelectComponent } from './components/chat-select/chat-select.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

/*
  Our app's routes.
  If you don't know what this means, check https://angular.io/docs/ts/latest/guide/router.html
 */
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chat'
      },
      {
        path: 'chat',
        component: ChatSelectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/:id',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
