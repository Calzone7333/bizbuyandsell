import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-12 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- HERO/HEADER SECTION (Exchange Style) -->
       <header class="mb-12">
          <h2 class="text-5xl font-extrabold text-[#192830] dark:text-white mb-2 tracking-tight">Active Listings</h2>
          <p class="text-slate-500 max-w-2xl leading-relaxed text-sm font-medium">Browse high-value business opportunities curated by our architectural analysts. Every listing includes a verified financial pulse and escrow protection.</p>
       </header>

       <!-- FILTER AND SEARCH BAR -->
       <section class="mb-8 flex flex-wrap items-center gap-4">
          <div class="flex items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-2 rounded-full shadow-sm">
             <div class="px-5 py-2 bg-[#d5e5ef] text-[#192830] text-[10px] font-black rounded-full flex items-center gap-2 uppercase tracking-widest">
                <span class="material-symbols-outlined !text-[14px]">filter_list</span>
                Filters
             </div>
             <div class="flex gap-2 ml-4 no-scrollbar">
                <div class="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full border border-gray-100 dark:border-gray-700 uppercase tracking-widest">
                   Industry: IT
                   <span class="material-symbols-outlined !text-[14px] cursor-pointer">close</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full border border-gray-100 dark:border-gray-700 uppercase tracking-widest">
                   Location: Mumbai
                   <span class="material-symbols-outlined !text-[14px] cursor-pointer">close</span>
                </div>
                <button class="text-[#046971] text-[10px] font-black px-4 uppercase tracking-widest hover:underline">Clear All</button>
             </div>
          </div>
          <button class="ml-auto flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-white transition-all">
             <span class="material-symbols-outlined !text-[18px]">sort</span>
             Sort by: Valuation
          </button>
       </section>

       <!-- ADVANCED DATA TABLE (Exchange Style) -->
       <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(25,28,29,0.03)] border border-gray-100 dark:border-gray-800">
          <table class="w-full text-left border-collapse">
             <thead>
                <tr class="bg-[#2f3e46] text-white">
                   <th class="px-8 py-5 text-[10px] font-black tracking-widest uppercase">Business Name</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Industry</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Asking Price</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Revenue</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Location</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Status</th>
                   <th class="px-8 py-5"></th>
                </tr>
             </thead>
             <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                <tr *ngFor="let row of tableData" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer">
                   <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                         <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            <span class="material-symbols-outlined text-[#192830] dark:text-white !text-[20px]">{{ row.icon }}</span>
                         </div>
                         <div>
                            <p class="font-black text-[#192830] dark:text-white text-sm tracking-tight">{{ row.name }}</p>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{{ row.meta }}</p>
                         </div>
                      </div>
                   </td>
                   <td class="px-6 py-6 text-xs font-bold text-slate-600 dark:text-slate-300">{{ row.industry }}</td>
                   <td class="px-6 py-6 text-xs font-black text-[#046971]">{{ row.price }}</td>
                   <td class="px-6 py-6 text-xs font-bold text-slate-400">{{ row.revenue }}</td>
                   <td class="px-6 py-6 text-xs font-bold text-slate-400">{{ row.location }}</td>
                   <td class="px-6 py-6">
                      <span [class]="row.statusClass" class="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest">{{ row.status }}</span>
                   </td>
                   <td class="px-8 py-6 text-right">
                      <button class="text-slate-300 hover:text-[#192830] transition-colors">
                         <span class="material-symbols-outlined">more_horiz</span>
                      </button>
                   </td>
                </tr>
             </tbody>
          </table>

          <!-- PAGINATION STRIP -->
          <div class="p-8 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/20">
             <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing <span class="text-[#192830] dark:text-white">1-4</span> of 128 global listings</span>
             <div class="flex gap-2">
                <button class="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-xl hover:bg-white text-slate-400"><span class="material-symbols-outlined">chevron_left</span></button>
                <button class="w-10 h-10 flex items-center justify-center bg-[#192830] text-white rounded-xl font-black text-xs">1</button>
                <button class="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-xl hover:bg-white text-slate-400 text-xs font-bold">2</button>
                <button class="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-xl hover:bg-white text-slate-400 text-xs font-bold">3</button>
                <button class="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-xl hover:bg-white text-slate-400"><span class="material-symbols-outlined">chevron_right</span></button>
             </div>
          </div>
       </div>

       <!-- FEATURED INSIGHTS SECTION (Editorial Asymmetry) -->
       <section class="mt-20 grid grid-cols-12 gap-8 mb-20">
          <!-- LEFT: Market Thesis -->
          <div class="col-span-12 lg:col-span-8">
             <div class="bg-[#192830] text-white p-12 rounded-2xl relative overflow-hidden group shadow-xl">
                <div class="relative z-10">
                   <span class="text-[#f4bc7a] text-[10px] font-black uppercase tracking-widest">Market Perspective</span>
                   <h3 class="text-4xl font-black mt-6 mb-8 leading-tight max-w-lg tracking-tighter uppercase">The 2024 Transition Wave: Why Mid-Market SaaS is Peak Value.</h3>
                   <button class="px-8 py-4 bg-white text-[#192830] rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:gap-5 transition-all shadow-lg">
                      Read Full Thesis
                      <span class="material-symbols-outlined !text-[18px]">arrow_forward</span>
                   </button>
                </div>
                <div class="absolute top-0 right-0 h-full w-1/3 opacity-20 group-hover:opacity-40 transition-opacity">
                   <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM4ikUNzHzpENzHBIBfopLV9C9xw77DzlSlb3TqTKiztuB0CCSx5XTu1y3Sy_c5i8od0QVDmftqdDtdSRD51QWdojhfAhnbqvox9f86lsKe_5EMgdfXLnUvO58yyqphj2TOfm3fwbh_2XboMIRIFrPoLAL4ya9ZR1-nlXIP664mtmumSMd5LM6OZ4STNwyu-CkBxC92nAZYyn-6BnL8vAkHc-Pu_ltoKRkuyQfbxLdEli5LPN5NzfghPWBMF1Q2q9WGF8E6RNGA7D0">
                </div>
             </div>
          </div>

          <!-- RIGHT: Market Pulse Indicators -->
          <div class="col-span-12 lg:col-span-4 bg-[#ffddb9] text-[#2b1700] p-12 rounded-2xl flex flex-col justify-between shadow-lg shadow-orange-100/50">
             <div>
                <h4 class="font-black text-xl mb-8 uppercase tracking-tighter">Market Pulse</h4>
                <div class="space-y-8">
                   <div class="space-y-3">
                      <div class="flex justify-between items-end">
                         <span class="text-[10px] font-black opacity-60 uppercase tracking-widest">IT Services Vol.</span>
                         <span class="text-lg font-black">+12.4%</span>
                      </div>
                      <div class="h-1.5 bg-[#2b1700]/10 rounded-full overflow-hidden">
                         <div class="h-full bg-[#2b1700] w-3/4 rounded-full"></div>
                      </div>
                   </div>
                   <div class="space-y-3">
                      <div class="flex justify-between items-end">
                         <span class="text-[10px] font-black opacity-60 uppercase tracking-widest">Avg. Multiple</span>
                         <span class="text-lg font-black">4.8x</span>
                      </div>
                      <div class="h-1.5 bg-[#2b1700]/10 rounded-full overflow-hidden">
                         <div class="h-full bg-[#2b1700] w-1/2 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
             <p class="text-[13px] font-bold italic mt-12 opacity-70 leading-relaxed border-l-4 border-[#2b1700]/20 pl-4">"Liquidity is reaching historic highs in the IT sector, driven by institutional rebalancing."</p>
          </div>
       </section>

    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; min-height: 0; }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.02em; 
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ListingsManagementComponent {
  @Input() listings: any[] = [];
  @Output() onBack = new EventEmitter<void>();

  tableData = [
    { 
      name: 'Zenith Cloud Solutions', meta: 'Est. 2018 • SaaS', industry: 'Information Technology', 
      price: '$4,250,000', revenue: '$1.2M ARR', location: 'Mumbai, IN', status: 'Verified',
      icon: 'precision_manufacturing', statusClass: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    },
    { 
      name: 'Moderne Studio', meta: 'Est. 2012 • Design', industry: 'Creative Services', 
      price: '$890,000', revenue: '$450k Annually', location: 'London, UK', status: 'Active',
      icon: 'architecture', statusClass: 'bg-blue-50 text-blue-700 border border-blue-100'
    },
    { 
      name: 'Swift Logistics Corp', meta: 'Est. 2005 • Transport', industry: 'Supply Chain', 
      price: '$12,400,000', revenue: '$3.8M EBITDA', location: 'Singapore', status: 'Escrow Ready',
      icon: 'local_shipping', statusClass: 'bg-gray-100 text-slate-600 border border-gray-200'
    },
    { 
      name: 'Vitalis Bio-Tech', meta: 'Est. 2020 • Health', industry: 'Healthcare', 
      price: '$7,100,000', revenue: '$2.1M Revenue', location: 'Boston, US', status: 'Verified',
      icon: 'medical_services', statusClass: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    }
  ];
}
