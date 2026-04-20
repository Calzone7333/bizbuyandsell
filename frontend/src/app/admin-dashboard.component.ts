import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ListingsManagementComponent } from './admin/listings-management.component';
import { DashboardHomeComponent } from './admin/dashboard-home.component';
import { AnalyticsComponent } from './admin/analytics.component';
import { UserManagementComponent } from './admin/user-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ListingsManagementComponent, DashboardHomeComponent, AnalyticsComponent, UserManagementComponent],
  template: `
    <div [class.dark]="isDarkMode()" class="bb-admin-container h-screen flex overflow-hidden bg-white dark:bg-gray-950 text-slate-800 duration-300">
      
      <!-- ASTRA-INSPIRED SIDEBAR (Marketplace Labels) -->
      <aside class="w-64 bg-gray-50/50 dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 flex flex-col z-50">
        
        <!-- Logo Section -->
        <div class="px-7 py-8 flex items-center justify-center">
           <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-[56px] w-auto transition-transform hover:scale-105">
        </div>

        <nav class="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
           
           <!-- Primary Dashboard -->
           <div class="space-y-1 mb-1">
              <a (click)="activeTab.set('dashboard')" 
                 [class]="activeTab() === 'dashboard' ? 'bg-blue-50/50 text-[rgb(25,40,48)]' : 'text-[rgb(25,40,48)] hover:bg-gray-100'"
                 class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer group">
                 <span class="material-symbols-outlined !text-[20px]">grid_view</span>
                 <span class="text-[13px] font-bold">Dashboard</span>
              </a>
              <a (click)="activeTab.set('analytics')" 
                 [class]="activeTab() === 'analytics' ? 'bg-blue-50/50 text-[rgb(25,40,48)]' : 'text-[rgb(25,40,48)] hover:bg-gray-100'"
                 class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer">
                 <span class="material-symbols-outlined !text-[20px]">bubble_chart</span>
                 <span class="text-[13px] font-bold">Analytics</span>
              </a>
           </div>


           <!-- MARKETPLACE MODULES -->
           <div class="space-y-1">
              <div (click)="activeTab.set('users')"
                   [class]="activeTab() === 'users' ? 'bg-blue-50/50 text-[rgb(25,40,48)]' : 'text-[rgb(25,40,48)] hover:bg-gray-100'"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer">
                 <i class="fa-solid fa-users text-[18px]"></i>
                 <span class="text-[13px] font-bold">Users</span>
              </div>
              
              <!-- Multi-level Listings (Fixed Click Handler) -->
              <div class="space-y-1">
                 <div (click)="activeTab.set('listings')"
                      [class]="activeTab() === 'listings' ? 'bg-blue-50/50 text-[rgb(25,40,48)]' : 'text-[rgb(25,40,48)] hover:bg-gray-100'"
                      class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                    <span class="material-symbols-outlined !text-[20px]">receipt_long</span>
                    <span class="text-[13px] font-bold flex-1">Business Listings</span>
                 </div>
                 <div class="pl-11 space-y-1" *ngIf="activeTab() === 'listings'">
                    <div class="py-1.5 text-[13px] font-medium text-slate-500 hover:text-[#4185D0] cursor-pointer transition-colors">Pending Review</div>
                    <div class="py-1.5 text-[13px] font-medium text-slate-500 hover:text-[#4185D0] cursor-pointer transition-colors">Approved Assets</div>
                 </div>
              </div>

              <div (click)="activeTab.set('categories')"
                   class="flex items-center gap-3 px-3 py-2 text-[rgb(25,40,48)] hover:bg-gray-100 rounded-lg cursor-pointer">
                 <span class="material-symbols-outlined !text-[20px]">sell</span>
                 <span class="text-[13px] font-bold">Categories</span>
              </div>
              <div (click)="activeTab.set('investments')"
                   class="flex items-center gap-3 px-3 py-2 text-[rgb(25,40,48)] hover:bg-gray-100 rounded-lg cursor-pointer">
                 <span class="material-symbols-outlined !text-[20px]">payments</span>
                 <span class="text-[13px] font-bold">Investments</span>
              </div>
              <div (click)="activeTab.set('franchise')"
                   class="flex items-center gap-3 px-3 py-2 text-[rgb(25,40,48)] hover:bg-gray-100 rounded-lg cursor-pointer">
                 <span class="material-symbols-outlined !text-[20px]">business_center</span>
                 <span class="text-[13px] font-bold">Franchise</span>
              </div>
           </div>
        </nav>

        <!-- BOTTOM STACK -->
        <div class="p-4 space-y-1 border-t border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between px-3 py-2 text-[rgb(25,40,48)] hover:bg-gray-100 rounded-lg cursor-pointer">
               <div class="flex items-center gap-3">
                  <img src="/icons/Bell.gif" class="w-5 h-5 object-contain" alt="notify">
                  <span class="text-[13px] font-bold">Notifications</span>
               </div>
               <span class="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">5</span>
            </div>
           <div (click)="activeTab.set('settings')"
                class="flex items-center justify-between px-3 py-2 text-[rgb(25,40,48)] hover:bg-gray-100 rounded-lg cursor-pointer">
              <div class="flex items-center gap-3">
                 <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[rgb(25,40,48)]">
                    <i class="fa-solid fa-gear text-[14px]"></i>
                 </div>
                 <span class="text-[13px] font-bold">Settings</span>
              </div>
           </div>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-gray-950">
        
        <!-- HIGH-FIDELITY TOPBAR (Pulse Design) -->
        <header class="flex justify-between items-center px-10 h-16 w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-[0_12px_40px_rgba(25,28,29,0.06)] border-b border-gray-50/50">
           <div class="flex items-center gap-10">
              <h1 style="font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 900; line-height: 28px; color: rgb(25, 40, 48);" class="uppercase tracking-[0.2em]">{{ activeTab() }}</h1>
           </div>
           
           <div class="flex items-center gap-1">
              <!-- ULTIMATE CLOUD/STAR THEME SWITCH -->
              <div class="flex items-center justify-center pt-1">
                 <label class="theme-switch block cursor-pointer scale-50 lg:scale-[0.6] origin-right">
                    <input type="checkbox" class="theme-switch__checkbox hidden" [checked]="isDarkMode()" (change)="toggleDarkMode()">
                    <div class="theme-switch__container relative w-[5.625em] h-[2.5em] bg-[#3D7EAE] dark:bg-[#1D1F2C] rounded-[6.25em] overflow-hidden transition-all duration-500 shadow-inner">
                       <div class="theme-switch__clouds absolute w-[1.25em] h-[1.25em] bg-[#F3FDFF] dark:translate-y-[100px] rounded-full bottom-[-0.625em] left-[0.312em] shadow-[0.937em_0.312em_#F3FDFF,-0.312em_-0.312em_#AACADF,1.437em_0.375em_#F3FDFF,0.5em_-0.125em_#AACADF,2.187em_0_#F3FDFF,1.25em_-0.062em_#AACADF,2.937em_0.312em_#F3FDFF,2em_-0.312em_#AACADF,3.625em_-0.062em_#F3FDFF,2.625em_0em_#AACADF,4.5em_-0.312em_#F3FDFF,3.375em_-0.437em_#AACADF,4.625em_-1.75em_0_0.437em_#F3FDFF,4em_-0.625em_#AACADF,4.125em_-2.125em_0_0.437em_#F3FDFF] transition-all duration-500"></div>
                       <div class="theme-switch__stars-container absolute text-white top-[-100%] dark:top-1/2 dark:-translate-y-1/2 left-[0.312em] w-[2.75em] transition-all duration-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none" class="w-full h-full"><path fill-rule="evenodd" clip-rule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path></svg>
                       </div>
                       <div class="theme-switch__circle-container absolute w-[3.375em] h-[3.375em] bg-white/10 rounded-full left-[-0.625em] top-[-0.625em] transition-all duration-300 dark:left-[calc(100%-2.75em)] flex">
                          <div class="theme-switch__sun-moon-container relative z-20 w-[2.125em] h-[2.125em] m-auto rounded-full bg-[#ECCA2F] dark:bg-[#C4C9D1] shadow-xl overflow-hidden transition-all duration-500">
                             <div class="theme-switch__moon absolute w-full h-full bg-[#C4C9D1] rounded-full translate-x-full dark:translate-x-0 transition-all duration-500 relative">
                                <div class="theme-switch__spot absolute top-[0.75em] left-[0.312em] w-[0.75em] h-[0.75em] rounded-full bg-[#959DB1] shadow-inner"></div>
                                <div class="theme-switch__spot absolute w-[0.375em] h-[0.375em] top-[0.937em] left-[1.375em] rounded-full bg-[#959DB1]"></div>
                                <div class="theme-switch__spot absolute w-[0.25em] h-[0.25em] top-[0.312em] left-[0.812em] rounded-full bg-[#959DB1]"></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </label>
              </div>
              
              <div class="flex items-center gap-1">
                 <button class="p-2 hover:bg-slate-50 rounded-full transition-colors relative">
                    <img src="/icons/Bell.gif" class="w-6 h-6 object-contain" alt="notifications">
                    <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                 </button>
              </div>
              
              <div class="cursor-pointer overflow-hidden mx-2">
                 <img src="/icons/Profile.gif" class="w-8 h-8 object-cover">
              </div>

              <div class="flex items-center ml-2 border-l border-gray-100 pl-4">
                 <img (click)="onLogout()" src="/icons/Logout.gif" 
                      style="filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);"
                      class="w-6 h-6 object-contain opacity-80 hover:opacity-100 cursor-pointer transition-all active:scale-95" 
                      title="Sign Out">
              </div>
           </div>
        </header>

        <!-- DASHBOARD OVERVIEW -->
        <app-dashboard-home *ngIf="activeTab() === 'dashboard'"></app-dashboard-home>

        <!-- USERS MODULE (High Fidelity CRM) -->
        <app-user-management *ngIf="activeTab() === 'users'"></app-user-management>

        <!-- MODULAR BUSINESS LISTINGS (Extracted) -->
        <app-listings-management 
           *ngIf="activeTab() === 'listings'" 
           [listings]="listings"
           (onBack)="activeTab.set('dashboard')">
        </app-listings-management>

        <!-- ANALYTICS MODULE -->
        <app-analytics *ngIf="activeTab() === 'analytics'"></app-analytics>

        <!-- SETTINGS MODULE -->
        <div *ngIf="activeTab() === 'settings'" class="flex-1 overflow-y-auto p-10 animate-slide-up">
           <h1 class="text-3xl font-bold tracking-tighter dark:text-white">System Settings</h1>
           <p class="text-slate-400">Module loading...</p>
        </div>

      </main>
    </div>
  `,
  styles: [`
    :host { 
      display: block; 
      height: 100vh; 
      font-family: 'Inter', sans-serif; 
      font-size: 14px; 
    }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.02em; 
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    
    /* ANIMATED SWITCH STYLES */
    .sun-icon svg { animation: rotate 15s linear infinite; }
    @keyframes rotate { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
    .moon-icon svg { animation: tilt 5s linear infinite; }
    @keyframes tilt { 0% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } 100% { transform: rotate(0deg); } }
    .switch-input:checked + .switch-slider:before { transform: translateX(28px); }
  `]
})
export class AdminDashboardComponent implements OnInit {
  isDarkMode = signal(false);
  activeTab = signal('dashboard');
  currentDate = new Date();

  listings = [
    { name: 'Mountain View Coffee', price: '$85k', owner: 'Robert P.' },
    { name: 'Zenith Tech Solutions', price: '$1.2M', owner: 'Clara M.' },
    { name: 'Skyline Fitness Hub', price: '$220k', owner: 'David K.' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  toggleDarkMode() { this.isDarkMode.update(v => !v); }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
