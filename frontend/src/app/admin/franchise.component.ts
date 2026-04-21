import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-franchise',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-10 animate-slide-up bg-white dark:bg-gray-950">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-[#192830] dark:text-white tracking-widest uppercase">Franchise Network</h1>
          <p class="text-slate-400 font-medium mt-2">Oversee brand expansions and multi-unit agreements</p>
        </div>
        <button class="bg-[#09337B] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#FF7C2A] transition-all shadow-lg shadow-blue-100 flex items-center gap-3">
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Register Franchise
        </button>
      </div>

      <!-- High Impact Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div *ngFor="let franchise of franchises" class="bg-[#f8f9fa] dark:bg-gray-900 p-10 rounded-[40px] border border-gray-50 dark:border-gray-800 flex flex-col justify-between group hover:border-[#09337B] transition-all">
          <div class="flex justify-between items-start mb-12">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 rounded-[28px] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img [src]="franchise.logo" class="w-full h-full object-cover">
              </div>
              <div>
                <h3 class="text-2xl font-black text-[#192830] dark:text-white uppercase tracking-tight">{{ franchise.brand }}</h3>
                <p class="text-sm font-bold text-[#FF7C2A] mt-2">{{ franchise.sector }}</p>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Investment Range</span>
              <p class="text-xl font-black text-[#192830] dark:text-white tracking-tighter">{{ franchise.priceRange }}</p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 py-8 border-y border-gray-200/50 dark:border-gray-800">
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Outlets</p>
              <p class="text-lg font-black text-[#192830] dark:text-white">{{ franchise.units }} +</p>
            </div>
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Royalties</p>
              <p class="text-lg font-black text-[#192830] dark:text-white">{{ franchise.royalty }}</p>
            </div>
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Region</p>
              <p class="text-lg font-black text-[#192830] dark:text-white">{{ franchise.region }}</p>
            </div>
          </div>

          <div class="mt-10 flex items-center justify-between">
            <div class="flex -space-x-4">
              <div *ngFor="let i of [1,2,3]" class="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-slate-200"></div>
              <div class="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black">+12</div>
            </div>
            <button class="text-xs font-black uppercase tracking-[0.2em] text-[#09337B] flex items-center gap-2 group-hover:gap-4 transition-all">
              Manage Brand <span class="material-symbols-outlined !text-[18px]">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; flex: 1; min-height: 0; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class FranchiseComponent {
  franchises = [
    { 
      brand: 'Urban Brew Coffee', 
      logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=150', 
      sector: 'Beverage & Cafe',
      priceRange: '₹25L - ₹45L',
      units: 140,
      royalty: '6%',
      region: 'Pan India'
    },
    { 
      brand: 'Peak Fitness Lab', 
      logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=150', 
      sector: 'Health & Wellness',
      priceRange: '₹40L - ₹1.2Cr',
      units: 85,
      royalty: '8%',
      region: 'South Asia'
    }
  ];
}
