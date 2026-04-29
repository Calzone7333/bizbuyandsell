import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50">
      <!-- TopAppBar -->
      <header class="sticky top-0 w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md z-40 border-b border-slate-200">
        <div class="flex items-center gap-8">
          <h1 class="text-xl font-bold tracking-tighter text-slate-900 uppercase font-['Manrope']">BizBuySell</h1>
          <div class="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64">
            <span class="material-symbols-outlined text-slate-400 text-sm">search</span>
            <input class="bg-transparent border-none text-sm focus:ring-0 w-full placeholder:text-slate-400" placeholder="Search marketplace..." type="text"/>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-6 mr-4">
            <span class="material-symbols-outlined text-slate-500 hover:text-[#09337B] transition-colors cursor-pointer">notifications</span>
            <span class="material-symbols-outlined text-slate-500 hover:text-[#09337B] transition-colors cursor-pointer">settings</span>
            <span class="material-symbols-outlined text-slate-500 hover:text-[#09337B] transition-colors cursor-pointer">help_outline</span>
          </div>
          <div class="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-bold text-[#192830] leading-none">Alex Sterling</p>
              <p class="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Institutional Buyer</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-[#09337B] flex items-center justify-center text-white text-[12px] font-bold">AS</div>
          </div>
        </div>
      </header>

      <div class="flex">
        <!-- Left Sidebar -->
        <aside class="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 sticky top-16 p-4 gap-2 bg-white border-r border-slate-200 font-['Manrope'] text-sm font-medium z-30">
          <div class="mb-8 px-2 flex items-center gap-3">
            <div class="w-10 h-10 bg-[#09337B] flex items-center justify-center rounded-lg shadow-lg">
              <span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">architecture</span>
            </div>
            <div>
              <p class="text-lg font-black text-slate-900">Exchange</p>
              <p class="text-[10px] uppercase tracking-widest text-[#FF7C2A] font-bold">Buyer Premium</p>
            </div>
          </div>
          <nav class="flex-1 space-y-1">
            <a class="flex items-center gap-3 px-3 py-2.5 bg-slate-50 text-[#09337B] rounded-lg font-bold transition-all duration-200" href="#">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">storefront</span>
              <span>Marketplace</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:translate-x-1 transition-all" href="#">
              <span class="material-symbols-outlined">visibility</span>
              <span>Watchlist</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:translate-x-1 transition-all" href="#">
              <span class="material-symbols-outlined">payments</span>
              <span>My Offers</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:translate-x-1 transition-all" href="#">
              <span class="material-symbols-outlined">verified_user</span>
              <span>Due Diligence Vault</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:translate-x-1 transition-all" href="#">
              <span class="material-symbols-outlined">chat_bubble_outline</span>
              <span>Messages</span>
            </a>
          </nav>
          <div class="mt-auto pt-4 border-t border-slate-100">
            <button class="w-full bg-[#FF7C2A] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-tighter hover:opacity-90 transition-all mb-4">
              List a Business
            </button>
            <div class="space-y-1">
              <a class="flex items-center gap-3 px-3 py-2 text-slate-500 text-xs" href="#">
                <span class="material-symbols-outlined text-sm">contact_support</span>
                <span>Support</span>
              </a>
              <button class="w-full flex items-center gap-3 px-3 py-2 text-slate-500 text-xs hover:text-red-500 transition-colors">
                <span class="material-symbols-outlined text-sm">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8 overflow-y-auto">
          <!-- KPI Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Saved Listings</p>
              <div class="flex items-end justify-between">
                <h3 class="text-2xl font-bold text-slate-900">24</h3>
                <span class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+3 this week</span>
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Active Bids</p>
              <div class="flex items-end justify-between">
                <h3 class="text-2xl font-bold text-slate-900">08</h3>
                <span class="text-slate-500 text-xs font-medium">4 in negotiation</span>
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Total Capital Allocated</p>
              <div class="flex items-end justify-between">
                <h3 class="text-2xl font-bold text-slate-900">$4.2M</h3>
                <span class="material-symbols-outlined text-amber-500">verified</span>
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">New Matches</p>
              <div class="flex items-end justify-between">
                <h3 class="text-2xl font-bold text-slate-900">12</h3>
                <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white"></div>
                  <div class="w-6 h-6 rounded-full bg-emerald-200 border-2 border-white"></div>
                  <div class="w-6 h-6 rounded-full bg-emerald-300 border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Area: Recommended Businesses Table -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-lg font-bold text-slate-900 font-headline">Recommended Businesses</h2>
              <button class="text-xs font-bold text-[#09337B] uppercase tracking-widest hover:underline transition-all">Export Report</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50">
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Business Name</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Industry</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Asking Price</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Multiplier</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Profit</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Growth Trend</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr class="hover:bg-slate-50 transition-colors cursor-pointer group" *ngFor="let business of businesses">
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                          <img [src]="business.img" alt="Business Thumbnail" class="w-full h-full object-cover">
                        </div>
                        <div>
                          <p class="text-sm font-bold text-slate-900 group-hover:text-[#09337B] transition-colors">{{business.name}}</p>
                          <p class="text-[10px] text-slate-400 font-medium">{{business.location}} • Est. {{business.year}}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-5">
                      <span class="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">{{business.industry}}</span>
                    </td>
                    <td class="px-6 py-5 text-sm font-bold text-slate-900">{{business.price}}</td>
                    <td class="px-6 py-5 text-sm font-medium text-slate-500">{{business.multiplier}}</td>
                    <td class="px-6 py-5 text-sm font-bold text-emerald-600">{{business.profit}}</td>
                    <td class="px-6 py-5">
                      <div class="w-24 h-8 bg-emerald-50 rounded flex items-center justify-center">
                        <span class="text-[10px] font-bold text-emerald-600">UPWARD</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-4 bg-slate-50 text-center">
              <button class="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-all">Load More Listings</button>
            </div>
          </div>
        </main>

        <!-- Right Sidebar -->
        <aside class="hidden lg:flex flex-col h-[calc(100vh-64px)] w-72 sticky top-16 p-6 gap-6 bg-white border-l border-slate-200 z-30 overflow-y-auto">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Recently Viewed</p>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg transition-all hover:-translate-y-0.5" *ngFor="let recent of recentViewed">
                <div class="w-12 h-12 rounded bg-slate-100 flex-shrink-0 overflow-hidden">
                  <img [src]="recent.img" alt="Recent" class="w-full h-full object-cover">
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-900 leading-tight">{{recent.name}}</p>
                  <p class="text-[10px] text-[#09337B]">{{recent.price}} • {{recent.multiplier}}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <div class="flex items-center justify-between mb-4">
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Deal Flow</p>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">12 Active</span>
            </div>
            <div class="relative space-y-8 pl-4">
              <div class="absolute left-0 top-1 bottom-1 w-[2px] bg-slate-100"></div>
              <div class="relative" *ngFor="let deal of dealFlow">
                <div class="absolute -left-5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" [class.bg-slate-400]="deal.status === 'Watchlist'"></div>
                <p class="text-xs font-bold text-slate-900">{{deal.name}}</p>
                <p class="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-0.5" [class.text-slate-400]="deal.status === 'Watchlist'">{{deal.status}}</p>
                <p class="text-[10px] text-slate-400 mt-1 italic">{{deal.subtitle}}</p>
              </div>
            </div>
          </div>

          <div class="mt-auto bg-[#09337B] p-4 rounded-xl text-center">
            <p class="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-2">Deal Velocity</p>
            <div class="text-2xl font-black text-white">+18%</div>
            <p class="text-[10px] text-slate-400 mt-1">Vs last month</p>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  `]
})
export class BuyerDashboardComponent {
  businesses = [
    { 
      name: 'Skyline Design Studio', location: 'Austin, TX', year: '2014', 
      industry: 'Architecture', price: '$1,850,000', multiplier: '4.2x', profit: '$440,000',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Urban Loft Logistics', location: 'Portland, OR', year: '2018', 
      industry: 'Supply Chain', price: '$3,120,000', multiplier: '3.8x', profit: '$820,000',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
    },
    { 
      name: 'Apex Civil Engineering', location: 'Denver, CO', year: '2009', 
      industry: 'Engineering', price: '$5,400,000', multiplier: '5.1x', profit: '$1,050,000',
      img: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2062&auto=format&fit=crop'
    }
  ];

  recentViewed = [
    { name: 'Terraform HVAC', price: '$1.2M', multiplier: '3.1x', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Co-Work Collective', price: '$850K', multiplier: '2.8x', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop' }
  ];

  dealFlow = [
    { name: 'Skyline Design Studio', status: 'Letter of Intent (LOI)', subtitle: 'Due Diligence starts in 48h' },
    { name: 'Apex Civil Engineering', status: 'Under Review', subtitle: 'Financial audits in progress' },
    { name: 'Urban Loft Logistics', status: 'Initial Outreach', subtitle: 'Waiting for broker response' },
    { name: 'Summit Architecture', status: 'Watchlist', subtitle: 'Saved for future consideration' }
  ];
}
