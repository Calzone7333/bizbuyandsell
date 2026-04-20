import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SellComponent } from './sell.component';
import { SettingsComponent } from './settings.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, SellComponent, SettingsComponent],
  template: `
    <div class="flex min-h-screen bg-[#f8f9fc] font-body overflow-x-hidden">
      
      <!-- SIDEBAR -->
      <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-full z-50 py-8 px-4">
        <!-- Logo (Standardized Image) -->
        <div class="flex items-center mb-10 px-3 cursor-pointer">
          <img src="/Home/LOGO.png" alt="Logo" class="h-[48px] w-auto">
        </div>

        <!-- Navigation Sections -->
        <div class="flex-1 space-y-7 overflow-y-auto pr-1">
          
          <!-- Category 1: Management -->
          <div class="space-y-1">
            <p class="px-3 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">Asset Management</p>
            <a (click)="activeView = 'sell'" 
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer group"
               [ngClass]="activeView === 'sell' ? 'text-[#4185D0] bg-[#4185D0]/5 shadow-sm' : 'text-[#18181b] hover:bg-slate-50'">
              <span class="material-symbols-outlined text-[20px] font-light group-hover:text-[#4185D0]">add_business</span>
              Sell a Business
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#18181b] hover:bg-slate-50 transition-all cursor-pointer group">
              <span class="material-symbols-outlined text-[20px] font-light text-[#18181b] group-hover:text-[#4185D0]">corporate_fare</span>
              My Entities
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#18181b] hover:bg-slate-50 transition-all cursor-pointer group">
              <span class="material-symbols-outlined text-[20px] font-light text-[#18181b] group-hover:text-[#4185D0]">query_stats</span>
              Valuation Analytics
            </a>
          </div>

          <!-- Category 2: Market Hub -->
          <div class="space-y-1">
            <p class="px-3 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">Acquisition Hub</p>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#18181b] hover:bg-slate-50 transition-all cursor-pointer group">
              <span class="material-symbols-outlined text-[20px] font-light text-[#18181b] group-hover:text-[#4185D0]">bookmark_manager</span>
              Watchlist
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#18181b] hover:bg-slate-50 transition-all cursor-pointer group relative">
              <span class="material-symbols-outlined text-[20px] font-light text-[#18181b] group-hover:text-[#4185D0]">notifications_active</span>
              Market Alerts
            </a>
          </div>

          <!-- Category 4: Account -->
          <div class="space-y-1">
            <p class="px-3 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">Account Settings</p>
            <a (click)="activeView = 'settings'" 
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer group"
               [ngClass]="activeView === 'settings' ? 'text-[#4185D0] bg-[#4185D0]/5 shadow-sm' : 'text-[#18181b] hover:bg-slate-50'">
              <span class="material-symbols-outlined text-[20px] font-light group-hover:text-[#4185D0]">settings</span>
              Personal Settings
            </a>
          </div>

        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <main class="flex-1 lg:ml-64 h-screen flex flex-col bg-[#f8f9fc] overflow-hidden">
        
        <!-- Compact Static Header -->
        <header class="flex-none px-10 flex items-center justify-end gap-6 h-16 border-b border-slate-100 bg-white z-[40]">
           <!-- Alert Hub -->
           <button class="relative flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
              <span class="material-symbols-outlined text-[22px] font-thin">notifications</span>
              <span class="absolute top-0 -right-0.5 w-1.5 h-1.5 bg-[#FF7C2A] rounded-full border border-white"></span>
           </button>

           <!-- Profile Identity -->
           <div class="flex items-center gap-3 cursor-pointer group/avatar">
              <div class="w-8 h-8 rounded-full border-2 border-yellow-400 p-[1.5px] bg-white overflow-hidden flex items-center justify-center shadow-sm">
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                      alt="Profile" 
                      class="w-full h-full object-cover rounded-full">
              </div>
              <div class="flex items-center gap-1">
                 <span class="text-[12px] font-medium text-slate-500 group-hover/avatar:text-slate-900 transition-colors">{{ username }}</span>
                 <span class="material-symbols-outlined text-[14px] text-slate-300 font-light group-hover/avatar:translate-y-0.5 transition-transform">expand_more</span>
              </div>
           </div>
        </header>

        <!-- DASHBOARD SCROLLABLE SPACE -->
        <div class="flex-1 overflow-y-auto px-6 lg:px-10 pb-20 pt-10">
           
           <!-- VIEW 2: SELL COMPONENT -->
           <div *ngIf="activeView === 'sell'" class="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
              <app-sell></app-sell>
           </div>

           <!-- VIEW 3: SETTINGS COMPONENT -->
           <div *ngIf="activeView === 'settings'" class="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
              <app-settings [username]="username"></app-settings>
           </div>

        </div>

      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slide-in-from-bottom { from { transform: translateY(2rem); } to { transform: translateY(0); } }
    .animate-in { animation: fade-in 0.3s ease-out, slide-in-from-bottom 0.4s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class UserDashboardComponent implements OnInit {
  activeView: 'sell' | 'settings' = 'sell';

  constructor(private route: ActivatedRoute) {}

  get userEmail(): string {
    return localStorage.getItem('userEmail') || 'Guest';
  }

  get username(): string {
    const email = this.userEmail;
    if (email === 'Guest') return 'Guest';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Listen for deep links from Navbar
    this.route.queryParams.subscribe(params => {
      if (params['view'] === 'sell') {
        this.activeView = 'sell';
      } else if (params['view'] === 'settings') {
        this.activeView = 'settings';
      }
    });
  }
}
