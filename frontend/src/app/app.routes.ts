import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BrowseComponent } from './browse.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SellComponent } from './sell.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sell', component: SellComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'privacy', component: PrivacyPolicyComponent }
];
