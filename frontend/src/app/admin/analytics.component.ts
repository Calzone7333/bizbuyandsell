import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- TOP FILTERS BAR -->
       <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Overview</h1>
          <div class="flex items-center gap-6">
             <div class="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <span class="flex items-center gap-2 text-slate-400"><span class="w-2 h-2 rounded-full bg-purple-600"></span> Chosen Period</span>
                <span class="flex items-center gap-2 text-slate-400"><span class="w-2 h-2 rounded-full bg-orange-400"></span> Last Period</span>
             </div>
             <div class="flex items-center gap-2 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800">
                <button class="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily</button>
                <button class="px-4 py-1.5 text-[10px] font-black text-slate-800 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg uppercase tracking-widest">Weekly</button>
             </div>
             <button class="p-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                <span class="material-symbols-outlined !text-[18px]">calendar_today</span>
             </button>
          </div>
       </div>

       <!-- TOP GRID: Metrics + Growth Chart + Gauge -->
       <div class="grid grid-cols-12 gap-8">
          
          <!-- LEFT: Performance Stack -->
          <div class="col-span-12 lg:col-span-3 space-y-6">
             <div *ngFor="let m of topMetrics" class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group hover:border-purple-200 transition-all">
                <div class="flex justify-between items-start">
                   <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-slate-400 !text-[20px]">{{ m.icon }}</span>
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
          <div class="col-span-12 lg:col-span-6 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
             <div class="flex justify-between items-center mb-10">
                <div class="flex items-center gap-3">
                   <span class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest">All Revenue</span>
                   <span class="material-symbols-outlined text-slate-300 !text-[16px]">expand_more</span>
                </div>
                <div class="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">Last Year</div>
             </div>
             <!-- WAVE MOCK -->
             <div class="relative h-[240px] border-b border-gray-100 dark:border-gray-800 flex items-end">
                <div class="absolute inset-0 flex items-end justify-between px-4 pb-2">
                   <div *ngFor="let i of months" class="text-[9px] font-black text-slate-300 uppercase tracking-widest">{{ i }}</div>
                </div>
                <!-- SVG WAVE PATH -->
                <svg viewBox="0 0 1000 240" class="w-full h-full fill-none">
                   <path d="M0,180 Q100,200 200,140 T400,100 T600,60 T800,20 T1000,80" class="stroke-purple-600 stroke-[4] opacity-80" />
                   <path d="M0,200 Q150,220 300,180 T600,140 T900,100" class="stroke-orange-400 stroke-[3] opacity-30 stroke-dasharray-[10,5]" />
                </svg>
             </div>
          </div>

          <!-- RIGHT: Net Revenue Gauge -->
          <div class="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
             <h3 class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest mb-10 self-start">Net Revenue</h3>
             <!-- SEMI-CIRCLE GAUGE -->
             <div class="relative w-48 h-24 mb-10">
                <div class="absolute inset-0 border-[16px] border-slate-100 dark:border-gray-800 rounded-t-full"></div>
                <div class="absolute inset-0 border-[16px] border-l-purple-600 border-t-purple-600 border-r-orange-400 border-b-transparent rounded-t-full"></div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">$15,000</p>
                </div>
             </div>
             <div class="w-full flex justify-between px-4 py-6 border-t border-gray-50 dark:border-gray-800">
                <div>
                   <p class="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Customer
                   </p>
                   <p class="text-xl font-black text-slate-900 dark:text-white">1254</p>
                </div>
                <div>
                   <p class="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Subscription
                   </p>
                   <p class="text-xl font-black text-slate-900 dark:text-white">1145</p>
                </div>
             </div>
          </div>
       </div>

       <!-- BOTTOM GRID: Report Summary + Churn -->
       <div class="grid grid-cols-12 gap-8">
          
          <!-- LEFT: Detailed Summary -->
          <div class="col-span-12 lg:col-span-9 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
             <div class="flex justify-between items-center mb-12">
                <h3 class="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-widest">Report Summary</h3>
                <div class="flex items-center gap-4">
                   <div class="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <span class="material-symbols-outlined !text-[16px]">calendar_month</span> Jul 09 - Jul 16, 2024
                   </div>
                   <button class="text-[10px] font-black uppercase text-purple-600 tracking-widest hover:underline">Edit Chart</button>
                </div>
             </div>

             <!-- Capsules Row -->
             <div class="grid grid-cols-4 gap-8 mb-12">
                <div *ngFor="let c of capsules" class="border-l-2 border-slate-100 dark:border-gray-800 pl-4">
                   <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{{ c.label }}</p>
                   <div class="flex items-center gap-2">
                      <p class="text-xl font-black text-slate-800 dark:text-white tracking-tight">{{ c.val }}</p>
                      <span [class]="c.trendClass" class="text-[9px] font-black">{{ c.trend }}</span>
                   </div>
                </div>
             </div>

             <!-- ANALYTICS BARS ENGINE -->
             <div class="grid grid-cols-12 gap-10 items-end h-64">
                <!-- Grouped Daily Bars -->
                <div class="col-span-8 flex justify-between items-end h-full px-4">
                   <div *ngFor="let b of [80, 45, 65, 95, 30, 75, 90]" class="w-12 h-full flex flex-col justify-end gap-1 group cursor-pointer relative">
                      <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#192830] text-white px-2 py-1 rounded-lg text-[8px] font-black opacity-0 group-hover:opacity-100 transition-all">25 New</div>
                      <div class="w-full bg-purple-600/10 dark:bg-purple-900/20 rounded-t-lg transition-all h-full">
                         <div class="w-full bg-purple-600 rounded-t-lg transition-all group-hover:bg-purple-400" [style.height.%]="b"></div>
                      </div>
                      <div class="w-full bg-emerald-500/10 dark:bg-emerald-900/20 rounded-t-sm transition-all h-1/2 overflow-hidden">
                         <div class="w-full bg-emerald-400 rounded-t-sm h-3/4"></div>
                      </div>
                   </div>
                </div>
                <!-- Segmented Performance Bars -->
                <div class="col-span-4 flex items-end gap-6 h-full border-l border-gray-50 dark:border-gray-800 pl-10">
                   <div *ngFor="let s of [{label: 'Gross', c: 'bg-emerald-400'}, {label: 'Retention', c: 'bg-blue-400'}, {label: 'Coupon', c: 'bg-purple-500'}]" class="flex-1 h-full flex flex-col justify-end gap-1">
                      <div class="w-full rounded-t-xl opacity-20" [class]="s.c" [style.height.%]="90"></div>
                      <div class="w-full rounded-sm opacity-40" [class]="s.c" [style.height.%]="60"></div>
                      <div class="w-full rounded-sm" [class]="s.c" [style.height.%]="40"></div>
                      <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-4">{{ s.label }}</span>
                   </div>
                </div>
             </div>
          </div>

          <!-- RIGHT: Churn & Subscriptions -->
          <div class="col-span-12 lg:col-span-3 space-y-8 flex flex-col">
             
             <!-- Churn Bars -->
             <div class="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest mb-10">Customer Churn Rate</h3>
                <div class="flex justify-between items-end h-40 gap-4">
                   <div *ngFor="let h of [40, 60, 90, 50]" class="flex-1 flex flex-col justify-end gap-1">
                      <div class="w-full bg-emerald-400/20 rounded-t-md h-[40%]"></div>
                      <div class="w-full bg-blue-400/40 rounded-sm h-[30%]"></div>
                      <div class="w-full bg-purple-600 rounded-sm" [style.height.%]="h"></div>
                   </div>
                </div>
             </div>

             <!-- Recent Subs List -->
             <div class="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1">
                <h3 class="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest mb-8">Recent Subscriptions</h3>
                <div class="space-y-6">
                   <div *ngFor="let u of users" class="flex items-center justify-between group">
                      <div class="flex items-center gap-4">
                         <div class="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                            <img [src]="u.avatar" class="w-full h-full object-cover">
                         </div>
                         <div>
                            <p class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tighter">{{ u.name }}</p>
                            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{{ u.date }}</p>
                         </div>
                      </div>
                      <div class="text-right">
                         <p class="text-xs font-black text-slate-800 dark:text-white tracking-tighter">{{ u.price }}</p>
                         <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">/month</p>
                      </div>
                   </div>
                </div>
             </div>

          </div>

       </div>

    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; min-height: 0; }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.01em; 
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AnalyticsComponent {
  topMetrics = [
    { label: 'Revenue', icon: 'payments', value: '$86,044', sub: 'From $175.26', trend: '▲ 100%', trendClass: 'bg-emerald-50 text-emerald-600' },
    { label: 'Transactions', icon: 'sync_alt', value: '132', sub: 'From 8 month', trend: '▲ 100%', trendClass: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg. Transactions', icon: 'show_chart', value: '$6,144', sub: 'From $29.21', trend: '▼ 80%', trendClass: 'bg-orange-50 text-orange-400' }
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  capsules = [
    { label: 'Net Volume from sales', val: '$4,180,332.54', trend: '▲ 4.2%', trendClass: 'text-emerald-500' },
    { label: 'Successful Payment', val: '25,296', trend: '▼ 3.5%', trendClass: 'text-orange-400' },
    { label: 'New Customers', val: '18,043', trend: '▲ 10.9%', trendClass: 'text-emerald-500' },
    { label: 'New Subscribers', val: '13,326', trend: '▲ 5.9%', trendClass: 'text-emerald-500' }
  ];

  users = [
    { name: 'Robert Fox', date: 'Sep 18', price: '$14.99', avatar: 'https://i.pravatar.cc/150?u=fox' },
    { name: 'Darrell Steward', date: 'Sep 18', price: '$7.99', avatar: 'https://i.pravatar.cc/150?u=steward' },
    { name: 'Jenny Wilson', date: 'Sep 17', price: '$12.99', avatar: 'https://i.pravatar.cc/150?u=jenny' }
  ];
}
