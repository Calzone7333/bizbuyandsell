import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BrowseComponent } from './browse.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SellComponent } from './sell.component';
import { SettingsComponent } from './settings.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { BuyerDashboardComponent } from './buyer-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile/settings', component: SettingsComponent },
  { path: 'sell', component: SellComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent }
];
