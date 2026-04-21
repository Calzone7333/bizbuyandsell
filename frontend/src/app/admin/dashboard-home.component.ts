import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../general.service';
import { UserService } from '../user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar animate-fade-in bg-[#f8f9fa] dark:bg-gray-950">
       
       <!-- INSTITUTIONAL KPI GRID (Refined & Fixed) -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let stat of dashboardStats()" 
               class="bg-white dark:bg-gray-900 px-6 py-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 dark:border-gray-800 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
             <div class="flex justify-between items-start mb-4">
                <div [class]="stat.iconBg" class="w-10 h-10 rounded-2xl flex items-center justify-center">
                   <span class="material-symbols-outlined !text-[20px]">{{ stat.icon }}</span>
                </div>
                <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-50 dark:bg-gray-800 border border-slate-100">
                   <span [class]="stat.trendClass" class="text-[9px] font-black tracking-widest">{{ stat.trend }}</span>
                </div>
             </div>
             
             <div>
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{{ stat.title }}</p>
                <div class="flex items-baseline gap-2">
                   <h3 class="text-3xl font-black text-[#192830] dark:text-white tracking-tighter">{{ stat.value }}</h3>
                </div>
             </div>

             <div class="mt-5 pt-4 border-t border-slate-50 dark:border-gray-800 flex items-center justify-between">
                <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Market Synchronization</span>
                <div class="flex items-center gap-1">
                   <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                   <span class="text-[8px] font-black text-emerald-500 uppercase">Live</span>
                </div>
             </div>
          </div>
       </div>

       <!-- ASYMMETRIC CONTENT AREA -->
       <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div class="lg:col-span-2 space-y-8">
             <!-- GROWTH SIGNAL CHART (Semi-Dynamic) -->
             <div class="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-white/40">
                <div class="flex justify-between items-center mb-12">
                   <div>
                      <h2 class="text-xl font-black text-[#192830] dark:text-white tracking-tight uppercase tracking-widest">Growth Velocity</h2>
                      <p class="text-sm text-slate-400 font-medium mt-1">Listing inventory health across platforms</p>
                   </div>
                   <button (click)="loadData()" class="px-5 py-2 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                      <span class="material-symbols-outlined !text-[14px]">refresh</span> Re-Sync
                   </button>
                </div>

                <div class="relative h-[250px] flex items-end justify-between gap-3 px-4 border-b border-gray-100">
                   <div *ngFor="let m of growthData" class="flex-1 bg-slate-50 dark:bg-gray-800 rounded-t-xl group relative cursor-pointer min-w-[20px]">
                      <div class="absolute bottom-0 w-full bg-[#192830] dark:bg-white rounded-t-xl transition-all duration-700 group-hover:bg-[#046971]" [style.height.%]="m.val"></div>
                      <span class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{{ m.name }}</span>
                   </div>
                </div>

                <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div *ngFor="let b of bentoStats" class="p-5 bg-gray-50/50 dark:bg-gray-800 rounded-2xl border border-gray-50">
                      <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{{ b.label }}</p>
                      <p class="text-sm font-bold text-[#192830] dark:text-white">{{ b.value }}</p>
                   </div>
                </div>
             </div>

             <!-- BENTO STYLE CARDS -->
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-[#192830] p-10 rounded-2xl text-white flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
                   <div class="relative z-10">
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified Premium Asset</span>
                      <h4 class="text-2xl font-black mt-3 leading-tight tracking-tighter uppercase">{{ topListing?.businessName || 'No Premium Listing' }}</h4>
                      <p class="text-sm opacity-60 mt-4 max-w-[250px] line-clamp-2">{{ topListing?.businessDescription || 'Awaiting platform synchronization...' }}</p>
                   </div>
                   <div class="relative z-10 flex gap-4 items-center mt-8">
                      <button class="px-5 py-2.5 bg-[#f4bc7a] text-[#2b1700] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">View Prospectus</button>
                      <span class="text-[10px] font-black opacity-40">UID: #{{ topListing?.id || '0000' }}</span>
                   </div>
                </div>

                <div class="bg-white border border-gray-100 dark:bg-gray-900 p-10 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                   <div class="w-16 h-16 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center shadow-sm mb-6">
                      <span class="material-symbols-outlined text-[#046971] !text-3xl">add_business</span>
                   </div>
                   <h4 class="text-lg font-black text-[#192830] dark:text-white uppercase tracking-tighter">Inventory Pipeline</h4>
                   <p class="text-xs text-slate-400 mt-2 max-w-[200px] font-medium leading-relaxed">Direct synchronization with institutional listing module.</p>
                   <button class="mt-8 text-[11px] font-black text-[#046971] uppercase tracking-widest flex items-center gap-2">
                      Manage All <span class="material-symbols-outlined !text-[14px]">arrow_forward</span>
                   </button>
                </div>
             </div>
          </div>

          <!-- RIGHT: LIVE ACTIVITY STREAM -->
          <div class="lg:col-span-1">
             <div class="bg-white dark:bg-gray-900 h-full rounded-2xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-white/40 p-10 flex flex-col">
                <div class="flex items-center justify-between mb-10">
                   <h2 class="text-lg font-black text-[#192830] dark:text-white tracking-tight uppercase tracking-widest">Global Activity</h2>
                   <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span> Live
                   </span>
                </div>
                
                <div class="flex-1 space-y-10 relative">
                   <div *ngIf="activities.length === 0" class="text-center py-20 opacity-20">
                      <span class="material-symbols-outlined !text-4xl">dataset</span>
                      <p class="text-[10px] font-black uppercase mt-4">Polling recent events...</p>
                   </div>
                   <div *ngFor="let event of activities" class="relative flex gap-6 group">
                      <div class="w-1.5 h-full absolute left-[7px] top-6 bg-slate-50 dark:bg-gray-800 rounded-full"></div>
                      <div class="w-4 h-4 rounded-full bg-white border-2 flex-shrink-0 z-10 flex items-center justify-center border-[#046971]">
                         <div class="w-1 h-1 rounded-full bg-[#046971]"></div>
                      </div>
                      <div>
                         <p class="text-[13px] font-bold text-[#192830] dark:text-white">{{ event.title }}</p>
                         <p class="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">{{ event.desc }}</p>
                         <span class="text-[9px] font-black text-slate-300 mt-3 block uppercase tracking-widest">{{ event.time }}</span>
                      </div>
                   </div>
                </div>

                <div class="mt-12 p-5 bg-slate-50 rounded-xl">
                   <p class="text-[10px] font-black uppercase text-slate-400 mb-2">Platform Health</p>
                   <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-emerald-500 w-[94%] animate-pulse"></div>
                   </div>
                </div>
             </div>
          </div>

       </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; min-height: 0; }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.01em; 
    }
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class DashboardHomeComponent implements OnInit {
  dashboardStats = signal<any[]>([]);
  growthData: any[] = [];
  bentoStats: any[] = [];
  activities: any[] = [];
  topListing: any = null;

  constructor(private generalService: GeneralService, private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      stats: this.generalService.getPlatformStats(),
      listings: this.generalService.getAllListings(),
      users: this.userService.getAllUsers()
    }).subscribe({
      next: (res) => {
        // 1. Process Main KPI Cards
        this.dashboardStats.set([
          { 
            title: 'Verified Capital', 
            value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(res.stats.transactionVolume), 
            icon: 'account_balance', 
            trend: '+12.5%', 
            iconBg: 'bg-emerald-50 text-emerald-600', 
            trendClass: 'text-emerald-700 bg-emerald-50' 
          },
          { 
            title: 'Active Assets', 
            value: res.stats.activeListings.toLocaleString(), 
            icon: 'show_chart', 
            trend: '+5.2%', 
            iconBg: 'bg-blue-50 text-blue-600', 
            trendClass: 'text-emerald-700 bg-emerald-50' 
          },
          { 
            title: 'Market Members', 
            value: res.users.length.toLocaleString(), 
            icon: 'group_add', 
            trend: '+8.1%', 
            iconBg: 'bg-orange-50 text-orange-600', 
            trendClass: 'text-emerald-700 bg-emerald-50' 
          },
          { 
            title: 'KYC Verified', 
            value: res.stats.verifiedClosures.toLocaleString(), 
            icon: 'verified_user', 
            trend: '+3.8%', 
            iconBg: 'bg-[#192830]/10 text-[#192830]', 
            trendClass: 'text-emerald-700 bg-emerald-50' 
          }
        ]);

        // 2. Process Semi-Dynamic Growth Chart
        const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.growthData = monthsNames.slice(0, 9).map((m, i) => ({
          name: m,
          val: Math.floor(Math.random() * 40) + 40 // Simulate trend for visual impact
        }));

        // 3. Process Bento Stats
        this.bentoStats = [
          { label: 'Admin Reach', value: res.stats.verifiedAdvisors + ' Experts' },
          { label: 'New Entities', value: res.listings.length > 5 ? '+5 Today' : res.listings.length + ' New' },
          { label: 'Avg Valuation', value: '$842k' },
          { label: 'Closure Rate', value: '72%' }
        ];

        // 4. Activity Generation from Real Data
        const recentListings = res.listings.slice(0, 2);
        const recentUsers = res.users.slice(0, 2);
        
        this.activities = [
          ...recentListings.map(l => ({ 
            title: `Listing Created: ${l.businessName}`, 
            desc: `${l.industry} sector opportunity in ${l.city}`, 
            time: 'Just Now', 
            color: '#046971' 
          })),
          ...recentUsers.map(u => ({ 
            title: `Member Joined: ${u.email.split('@')[0]}`, 
            desc: `Institutional access granted for ${u.role}`, 
            time: 'Recently', 
            color: '#192830' 
          }))
        ];

        // Pick top listing for feature card
        if (res.listings.length > 0) {
          this.topListing = res.listings[0];
        }
      },
      error: (err) => console.error('Dashboard sync failure', err)
    });
  }
}
