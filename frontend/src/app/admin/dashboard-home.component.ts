import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar animate-fade-in bg-[#f8f9fa] dark:bg-gray-950">
       
       <!-- KPI SCORECARDS GRID (Pulse Style) -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let stat of stats" class="bg-white dark:bg-gray-900 p-7 rounded-2xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-white/40 flex flex-col justify-between transition-all hover:scale-[1.02]">
             <div class="flex justify-between items-start">
                <div>
                   <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{{ stat.title }}</span>
                   <h3 class="text-2xl font-black text-[#192830] dark:text-white mt-1">{{ stat.value }}</h3>
                </div>
                <div [class]="stat.iconBg" class="p-2.5 rounded-xl flex items-center justify-center">
                   <span class="material-symbols-outlined !text-[22px]">{{ stat.icon }}</span>
                </div>
             </div>
             <div class="mt-4 flex items-center gap-2">
                <span [class]="stat.trendClass" class="text-[11px] font-bold px-2 py-0.5 rounded-full">{{ stat.trend }}</span>
                <span class="text-[10px] text-slate-400 font-medium tracking-tight">vs last month</span>
             </div>
          </div>
       </div>

       <!-- ASYMMETRIC CONTENT AREA (Grid 3-cols) -->
       <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <!-- LEFT: Growth Signal & Bento Cards -->
          <div class="lg:col-span-2 space-y-8">
             
             <!-- GROW SIGNAL CHART -->
             <div class="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-white/40">
                <div class="flex justify-between items-center mb-12">
                   <div>
                      <h2 class="text-xl font-black text-[#192830] dark:text-white tracking-tight uppercase tracking-widest">Growth Signal Visualization</h2>
                      <p class="text-sm text-slate-400 font-medium mt-1">Monthly revenue trends across platform verticals</p>
                   </div>
                   <div class="flex gap-2 bg-gray-50 p-1 rounded-xl">
                      <button class="px-4 py-2 text-[10px] font-black bg-white shadow-sm rounded-lg uppercase tracking-widest">Last 12 Months</button>
                      <button class="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">By Region</button>
                   </div>
                </div>

                <!-- BARS -->
                <div class="relative h-[280px] flex items-end justify-between gap-4 px-4 border-b border-gray-100">
                   <div *ngFor="let m of months" class="flex-1 bg-slate-50 dark:bg-gray-800 rounded-t-xl group relative cursor-pointer">
                      <div class="absolute bottom-0 w-full bg-[#192830] dark:bg-white rounded-t-xl transition-all duration-700 group-hover:opacity-80 group-hover:bg-[#046971]" [style.height.%]="m.val"></div>
                      <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-300 uppercase tracking-widest transform rotate-[-45deg] origin-top">{{ m.name }}</span>
                   </div>
                </div>

                <div class="mt-16 grid grid-cols-3 gap-6">
                   <div class="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Top Sector</p>
                      <p class="text-sm font-bold text-[#192830] dark:text-white">SaaS & Enterprise</p>
                   </div>
                   <div class="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Average Deal</p>
                      <p class="text-sm font-bold text-[#192830] dark:text-white">$284,000</p>
                   </div>
                   <div class="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Velocity</p>
                      <p class="text-sm font-bold text-[#192830] dark:text-white">42 Days</p>
                   </div>
                </div>
             </div>

             <!-- BENTO STYLE CARDS -->
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-[#192830] p-10 rounded-2xl text-white flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
                   <div class="relative z-10">
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified Premium</span>
                      <h4 class="text-2xl font-black mt-3 leading-tight tracking-tighter uppercase">Quantum Logistics Solutions</h4>
                      <p class="text-sm opacity-60 mt-4 max-w-[220px]">AI-driven distribution network with $1.2M ARR.</p>
                   </div>
                   <div class="relative z-10 flex gap-4 items-center mt-8">
                      <button class="px-5 py-2.5 bg-[#f4bc7a] text-[#2b1700] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Review Prospectus</button>
                      <span class="text-[10px] font-black opacity-40">ID: #4928-QL</span>
                   </div>
                   <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[#046971]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
                </div>

                <div class="bg-white border border-gray-100 dark:bg-gray-900 p-10 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-blue-100 transition-all">
                   <div class="w-16 h-16 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center shadow-sm mb-6 transition-transform hover:rotate-12">
                      <span class="material-symbols-outlined text-[#046971] !text-3xl">add_business</span>
                   </div>
                   <h4 class="text-lg font-black text-[#192830] dark:text-white uppercase tracking-tighter">List a New Asset</h4>
                   <p class="text-xs text-slate-400 mt-2 max-w-[200px] font-medium leading-relaxed">Expand your portfolio by adding a verified business entity today.</p>
                   <button class="mt-8 text-[11px] font-black text-[#046971] uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                      Get Started <span class="material-symbols-outlined !text-[14px]">arrow_forward</span>
                   </button>
                </div>
             </div>
          </div>

          <!-- RIGHT: Activity Stream (Pulse Style) -->
          <div class="lg:col-span-1">
             <div class="bg-white dark:bg-gray-900 h-full rounded-2xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-white/40 p-10 flex flex-col">
                <div class="flex items-center justify-between mb-10">
                   <h2 class="text-lg font-black text-[#192830] dark:text-white tracking-tight uppercase tracking-widest">Activity Stream</h2>
                   <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
                   </span>
                </div>
                
                <div class="flex-1 space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-50 dark:before:bg-gray-800">
                   <div *ngFor="let event of activity" class="relative flex gap-6 group">
                      <div class="w-6 h-6 rounded-full bg-white border-2 flex-shrink-0 z-10 flex items-center justify-center transition-all group-hover:scale-125" [style.border-color]="event.color">
                         <div class="w-1.5 h-1.5 rounded-full" [style.background]="event.color"></div>
                      </div>
                      <div>
                         <p class="text-[13px] font-bold text-[#192830] dark:text-white">{{ event.title }}</p>
                         <p class="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">{{ event.desc }}</p>
                         <span class="text-[10px] font-black text-slate-300 mt-3 block uppercase tracking-widest">{{ event.time }}</span>
                      </div>
                   </div>
                </div>

                <button class="mt-12 w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                   View Historical Logs
                </button>
             </div>
          </div>

       </div>
    </div>
  `,
  styles: [`
    :host { 
      display: flex; 
      flex: 1; 
      flex-direction: column; 
      min-height: 0;
    }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.01em; 
    }
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
  `]
})
export class DashboardHomeComponent {
  stats = [
    { title: 'Total Revenue', value: '$4.2M', icon: 'payments', trend: '+12.5%', iconBg: 'bg-[#9fecf6]/20 text-[#046971]', trendClass: 'text-emerald-700 bg-emerald-50' },
    { title: 'Active Listings', value: '1,482', icon: 'storefront', trend: '+5.2%', iconBg: 'bg-[#d5e5ef] text-[#192830]', trendClass: 'text-emerald-700 bg-emerald-50' },
    { title: 'Registered Users', value: '84.5k', icon: 'group', trend: '-1.2%', iconBg: 'bg-[#ffddb9]/30 text-[#643e05]', trendClass: 'text-rose-700 bg-rose-50' },
    { title: 'Conversion Rate', value: '3.8%', icon: 'trending_up', trend: '+0.4%', iconBg: 'bg-[#9fecf6]/20 text-[#046971]', trendClass: 'text-emerald-700 bg-emerald-50' }
  ];

  months = [
    { name: 'Jan', val: 40 }, { name: 'Feb', val: 55 }, { name: 'Mar', val: 45 },
    { name: 'Apr', val: 70 }, { name: 'May', val: 85 }, { name: 'Jun', val: 65 },
    { name: 'Jul', val: 90 }, { name: 'Aug', val: 75 }, { name: 'Sep', val: 80 }
  ];

  activity = [
    { title: 'Offer Accepted: "TechFlow SaaS"', desc: 'Acquisition value confirmed at $840,000 via Escrow.', time: '2 mins ago', color: '#046971' },
    { title: 'New Listing: "Eco-Friendly Pack"', desc: 'E-commerce vertical, health & wellness niche approved.', time: '14 mins ago', color: '#192830' },
    { title: 'Identity Verified: John M.', desc: 'Tier 3 Investor verification completed successfully.', time: '28 mins ago', color: '#f4bc7a' },
    { title: 'Report Generated', desc: 'Quarterly compliance audit for Q3 2023 is ready.', time: '1 hour ago', color: '#c3c7ca' }
  ];
}
