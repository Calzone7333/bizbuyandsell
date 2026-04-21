import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 animate-slide-up bg-white dark:bg-gray-950">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-[#192830] dark:text-white tracking-widest uppercase">Business Categories</h1>
          <p class="text-slate-400 font-medium mt-2">Manage marketplace classification and sector tags</p>
        </div>
        <button class="bg-[#09337B] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#FF7C2A] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">add</span>
          New Category
        </button>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let cat of categories" class="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-[#09337B] transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[#09337B]">{{ cat.icon }}</span>
            </div>
            <div class="flex gap-1">
              <span class="w-2 h-2 rounded-full" [ngClass]="cat.active ? 'bg-emerald-500' : 'bg-gray-300'"></span>
            </div>
          </div>
          <h3 class="text-lg font-black text-[#192830] dark:text-white uppercase tracking-tighter">{{ cat.name }}</h3>
          <p class="text-xs text-slate-400 mt-2">{{ cat.description }}</p>
          
          <div class="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-800 flex items-center justify-between">
            <div class="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              {{ cat.listingCount }} Listings
            </div>
            <div class="flex gap-2">
              <button class="p-2 text-slate-400 hover:text-[#09337B] transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
              <button class="p-2 text-slate-400 hover:text-rose-500 transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>
            </div>
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
export class CategoriesComponent {
  categories = [
    { name: 'Manufacturing', icon: 'precision_manufacturing', description: 'Industrial units and fabrication plants.', listingCount: 428, active: true },
    { name: 'Technology', icon: 'devices', description: 'Software SaaS and tech infrastructure.', listingCount: 312, active: true },
    { name: 'Hospitality', icon: 'restaurant', description: 'Hotels, resorts and food services.', listingCount: 256, active: true },
    { name: 'Retail', icon: 'storefront', description: 'Consumer goods and physical storefronts.', listingCount: 189, active: false },
    { name: 'Healthcare', icon: 'medical_services', description: 'Clinics, diagnostic centers and pharma.', listingCount: 145, active: true },
    { name: 'E-commerce', icon: 'shopping_bag', description: 'Digital stores and online d2c brands.', listingCount: 98, active: true }
  ];
}
