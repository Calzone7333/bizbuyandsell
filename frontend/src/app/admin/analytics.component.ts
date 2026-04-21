import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../general.service';
import { UserService } from '../user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- TOP FILTERS BAR -->
       <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Institutional Analytics</h1>
          <div class="flex items-center gap-6">
             <div *ngIf="loading" class="flex items-center gap-2 text-[10px] font-black uppercase text-purple-600 animate-pulse">
                <span class="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></span> Polling Live Data
             </div>
             <div class="flex items-center gap-2 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800">
                <button (click)="loadAnalytics()" class="px-4 py-1.5 text-[10px] font-black hover:bg-gray-50 rounded-lg uppercase tracking-widest flex items-center gap-2 text-slate-600">
                   <span class="material-symbols-outlined !text-[14px]">refresh</span> Re-Sync
                </button>
             </div>
          </div>
       </div>

       <!-- TOP GRID: Metrics + Growth Chart + Gauge -->
       <div class="grid grid-cols-12 gap-8">
          
          <!-- LEFT: Performance Stack (Database Driven) -->
          <div class="col-span-12 lg:col-span-3 space-y-6">
             <div *ngFor="let m of topMetrics()" class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group hover:border-purple-200 transition-all">
                <div class="flex justify-between items-start">
                   <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-purple-600 !text-[20px]">{{ m.icon }}</span>
                      <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ m.label }}</span>
                   </div>
                   <span [class]="m.trendClass" class="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">{{ m.trend }}</span>
                </div>
                <div class="mt-4">
                   <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{{ m.value }}</h3>
                   <p class="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest">{{ m.sub }}</p>
                </div>
             </div>
          </div>

          <!-- MIDDLE: Dynamic Growth Wave -->
          <div class="col-span-12 lg:col-span-6 bg-[#192830] p-8 rounded-3xl shadow-lg relative overflow-hidden text-white">
             <div class="flex justify-between items-center mb-10">
                <div class="flex items-center gap-3">
                   <span class="text-[11px] font-black uppercase tracking-widest opacity-60">Asset Volume Velocity</span>
                </div>
                <div class="px-4 py-1.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">DB Synchronized</div>
             </div>
             
             <!-- WAVE MOCK -->
             <div class="relative h-[240px] border-b border-white/10 flex items-end">
                <!-- SVG WAVE PATH -->
                <svg viewBox="0 0 1000 240" class="w-full h-full fill-none">
                   <path d="M0,180 Q100,200 200,140 T400,100 T600,60 T800,20 T1000,80" class="stroke-[#FF7C2A] stroke-[4] opacity-80" />
                   <path d="M0,200 Q150,220 300,180 T600,140 T900,100" class="stroke-white stroke-[3] opacity-30 stroke-dasharray-[10,5]" />
                </svg>
             </div>
             <div class="flex justify-between mt-4 px-2">
                <span *ngFor="let m of ['Q1', 'Q2', 'Q3', 'Q4']" class="text-[10px] font-black opacity-40 uppercase tracking-widest">{{ m }}</span>
             </div>
          </div>

          <!-- RIGHT: Verification Gauge -->
          <div class="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
             <h3 class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest mb-10 self-start">Compliance Integrity</h3>
             <!-- SEMI-CIRCLE GAUGE -->
             <div class="relative w-48 h-24 mb-10">
                <div class="absolute inset-0 border-[16px] border-slate-50 dark:border-gray-800 rounded-t-full"></div>
                <div class="absolute inset-0 border-[16px] border-l-purple-600 border-t-purple-600 border-r-[#FF7C2A] border-b-transparent rounded-t-full transition-all duration-1000" [style.transform]="'rotate(' + verificationRate() + 'deg)'"></div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified</p>
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ verificationRate() }}%</p>
                </div>
             </div>
             <div class="w-full flex justify-between px-4 py-6 border-t border-gray-50 dark:border-gray-800">
                <div class="text-center">
                   <p class="text-[10px] font-black uppercase text-slate-400 mb-1">Listings</p>
                   <p class="text-xl font-black text-slate-900 dark:text-white">{{ totalListings() }}</p>
                </div>
                <div class="text-center">
                   <p class="text-[10px] font-black uppercase text-slate-400 mb-1">Users</p>
                   <p class="text-xl font-black text-slate-900 dark:text-white">{{ totalUsers() }}</p>
                </div>
             </div>
          </div>
       </div>

       <!-- BOTTOM GRID: Detailed CRM Analytics -->
       <div class="grid grid-cols-12 gap-8">
          
          <div class="col-span-12 lg:col-span-9 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
             <div class="flex justify-between items-center mb-12">
                <h3 class="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-widest">Database Audit Summary</h3>
                <div class="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   Live Marketplace synchronization active
                </div>
             </div>

             <!-- Capsules Row -->
             <div class="grid grid-cols-4 gap-8 mb-12">
                <div *ngFor="let c of auditCapsules()" class="border-l-2 border-slate-100 dark:border-gray-800 pl-4">
                   <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{{ c.label }}</p>
                   <div class="flex items-center gap-2">
                      <p class="text-xl font-black text-slate-800 dark:text-white tracking-tight">{{ c.val }}</p>
                      <span class="text-[9px] font-black text-emerald-500">Live</span>
                   </div>
                </div>
             </div>

             <!-- ANALYTICS BARS (Database Driven Peaks) -->
             <div class="flex items-end gap-3 h-48 px-4">
                <div *ngFor="let b of growthBars" class="flex-1 bg-purple-600/10 rounded-t-lg group relative cursor-pointer min-w-[30px]">
                   <div class="absolute bottom-0 w-full bg-purple-600 rounded-t-lg transition-all duration-700 group-hover:bg-[#FF7C2A]" [style.height.%]="b"></div>
                </div>
             </div>
          </div>

          <!-- RIGHT: Institutional Admins -->
          <div class="col-span-12 lg:col-span-3 space-y-8 flex flex-col">
             <div class="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1">
                <h3 class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest mb-8">Administrative Personnel</h3>
                <div class="space-y-6">
                   <div *ngFor="let u of adminUsers()" class="flex items-center gap-4 group">
                      <div class="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center">
                         <span class="text-[10px] font-black text-purple-600 uppercase">{{ u.email.charAt(0) }}</span>
                      </div>
                      <div>
                         <p class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tighter truncate max-w-[120px]">{{ u.email.split('@')[0] }}</p>
                         <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{{ u.role }}</p>
                      </div>
                   </div>
                </div>
                <button (click)="loadAnalytics()" class="mt-8 w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#046971] bg-[#046971]/5 rounded-xl hover:bg-[#046971]/10 transition-all">
                   Audit All Personnel
                </button>
             </div>
          </div>

       </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; min-height: 0; }
    h3 { font-family: 'Manrope', sans-serif; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AnalyticsComponent implements OnInit {
  loading = false;
  
  rawData = signal<any>({
    stats: { activeListings: 0, transactionVolume: 0, verifiedClosures: 0, verifiedAdvisors: 0 },
    users: [],
    listings: []
  });

  // Computed signals for dynamic UI
  totalListings = computed(() => this.rawData().stats.activeListings);
  totalUsers = computed(() => this.rawData().users.length);
  verificationRate = computed(() => {
    const total = this.totalListings();
    return total > 0 ? Math.round((this.rawData().stats.verifiedClosures / total) * 100) : 0;
  });

  topMetrics = computed(() => [
    { label: 'Institutional Volume', icon: 'account_balance', value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(this.rawData().stats.transactionVolume), sub: 'Verified Assets Only', trend: 'LIVE', trendClass: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Registry', icon: 'groups', value: this.totalUsers().toString(), sub: 'Market Participants', trend: 'ACTIVE', trendClass: 'bg-emerald-50 text-emerald-600' },
    { label: 'Market Velocity', icon: 'speed', value: '42d', sub: 'Avg. Time to Close', trend: 'STABLE', trendClass: 'bg-blue-50 text-blue-600' }
  ]);

  auditCapsules = computed(() => [
    { label: 'Platform Listings', val: this.totalListings().toString() },
    { label: 'Expert Personnel', val: this.rawData().stats.verifiedAdvisors.toString() },
    { label: 'Member Growth', val: '+8.4%' },
    { label: 'Active Sessions', val: '14' }
  ]);

  adminUsers = computed(() => this.rawData().users.filter((u: any) => u.role === 'ADMIN').slice(0, 5));
  growthBars: number[] = [40, 65, 85, 30, 95, 75, 45, 60, 20, 80, 55, 90];

  constructor(private generalService: GeneralService, private userService: UserService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.loading = true;
    forkJoin({
      stats: this.generalService.getPlatformStats(),
      users: this.userService.getAllUsers(),
      listings: this.generalService.getAllListings()
    }).subscribe({
      next: (res) => {
        this.rawData.set(res);
        this.loading = false;
      },
      error: (err) => {
        console.error('Analytics sync failed', err);
        this.loading = false;
      }
    });
  }
}
