import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="max-w-[1440px] mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-24">
      <!-- Breadcrumbs & Toggle Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div class="max-w-2xl">
          <span class="text-[0.6rem] lg:text-xs tracking-[0.2em] uppercase text-outline font-bold mb-3 block">Premium Marketplace</span>
          <h1 class="font-headline font-light text-3xl lg:text-5xl tracking-tight text-primary leading-tight">Architectural & Industrial Opportunities</h1>
        </div>
        <div class="flex items-center bg-surface-container p-1 rounded-xl">
          <button class="flex items-center gap-2 px-4 lg:px-6 py-2 bg-surface-container-lowest text-primary font-bold rounded-lg shadow-sm text-sm">
            <span class="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            List View
          </button>
          <button class="flex items-center gap-2 px-4 lg:px-6 py-2 text-outline font-medium hover:text-primary transition-colors text-sm">
            <span class="material-symbols-outlined text-[18px]">map</span>
            Map View
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left Sidebar: Filter Panel (30%) -->
        <aside class="w-full lg:w-[30%] space-y-10">
          <div class="bg-surface-container-low p-6 lg:p-8 rounded-2xl border border-zinc-100/50">
            <div class="flex items-center justify-between mb-8">
              <h2 class="font-headline font-bold text-xl tracking-tight text-primary">Refine Portfolio</h2>
              <button class="text-[10px] uppercase tracking-widest text-[#388E9E] font-bold hover:underline">Clear All</button>
            </div>
            
            <!-- Search Box -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Keywords</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input class="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-outline-variant/30 focus:border-[#388E9E] outline-none transition-all placeholder:text-outline/50 text-sm font-medium" placeholder="e.g. Manufacturing, Tech" type="text"/>
              </div>
            </div>

            <!-- Industry Filters -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Industry Sector</label>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input checked class="w-4 h-4 rounded border-outline-variant text-[#388E9E] focus:ring-[#388E9E]/20 transition-all" type="checkbox"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#388E9E] transition-colors">Manufacturing & Industrial</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input class="w-4 h-4 rounded border-outline-variant text-[#388E9E] focus:ring-[#388E9E]/20 transition-all" type="checkbox"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#388E9E] transition-colors">Technology & SaaS</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input class="w-4 h-4 rounded border-outline-variant text-[#388E9E] focus:ring-[#388E9E]/20 transition-all" type="checkbox"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#388E9E] transition-colors">Food & Beverage</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input class="w-4 h-4 rounded border-outline-variant text-[#388E9E] focus:ring-[#388E9E]/20 transition-all" type="checkbox"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#388E9E] transition-colors">Architecture & Design</span>
                </label>
              </div>
            </div>

            <!-- Investment Range -->
            <div class="mb-10">
              <div class="flex justify-between items-end mb-4">
                <label class="text-[10px] font-bold uppercase tracking-widest text-outline">Investment Range</label>
                <span class="text-sm font-bold text-[#388E9E]">$500k - $10M+</span>
              </div>
              <input class="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-[#388E9E]" max="100" min="0" type="range" value="40"/>
            </div>

            <!-- Location Dropdown -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Global Location</label>
              <select class="w-full bg-white/50 border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-[#388E9E] outline-none text-sm font-medium">
                <option>North America</option>
                <option>European Union</option>
                <option>Asia Pacific</option>
                <option>Middle East</option>
              </select>
            </div>

            <!-- Business Type -->
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Business Type</label>
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 rounded-full border border-outline-variant text-[10px] font-bold hover:bg-primary hover:text-white transition-all">ESTABLISHED</button>
                <button class="px-4 py-2 rounded-full bg-primary text-white text-[10px] font-bold">FRANCHISE</button>
                <button class="px-4 py-2 rounded-full border border-outline-variant text-[10px] font-bold hover:bg-primary hover:text-white transition-all">START-UP</button>
              </div>
            </div>
          </div>

          <!-- Advisory CTA Card -->
          <div class="bg-primary p-8 rounded-2xl text-white relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="font-headline font-bold text-xl mb-4">Need Valuation Assistance?</h3>
              <p class="text-sm opacity-80 mb-6 leading-relaxed">Our senior advisors can provide a comprehensive market analysis for your acquisition strategy.</p>
              <button class="w-full py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest text-[10px]">Consult Advisory</button>
            </div>
            <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </aside>

        <!-- Right Column: Results (70%) -->
        <section class="w-full lg:w-[70%]">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-zinc-100">
            <p class="text-zinc-500 font-medium text-sm"><span class="text-primary font-bold">1,245</span> Businesses for Sale</p>
            <div class="flex items-center gap-3 mt-4 sm:mt-0">
              <span class="text-[10px] uppercase tracking-widest font-black text-outline">Sort By:</span>
              <select class="bg-transparent text-primary font-bold text-sm border-none focus:ring-0 cursor-pointer">
                <option>Newest Listed</option>
                <option>Highest Valuation</option>
                <option>Most Recent Profit</option>
              </select>
            </div>
          </div>

          <!-- Listing Cards -->
          <div class="space-y-8">
            <!-- Card 1 -->
            <div class="group bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500">
              <div class="w-full md:w-[40%] h-64 md:h-auto overflow-hidden relative">
                <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACV8vUnUef4pxCZsJcD9T5qr8Ve7WcNgFq-IRBIkIWvH9S-jegHeWwNkXEXZJCwPgHQM7xofFu73-rqXI4wyIE-X73S8ZjZ2r8DiKv8KTDD50NyPXsmPiCFaQ4TImVNYpOWF8cylE9UwLX6aNL_XQmih-NCQANLjLsZXVgHoy0iYwwpdPjuE8HpVkhhw8F6yw5_wVVGFwPDv5mgKm80fPWI-T7OSkcmlK_QLmP86IqFnCJ4VS_Y4cHJ84VA4CWHu_1tQ0ne5nBDDNM"/>
                <div class="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Manufacturing</div>
              </div>
              <div class="p-6 lg:p-8 md:w-[60%] flex flex-col">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="font-headline font-bold text-xl lg:text-2xl text-primary tracking-tight group-hover:text-[#388E9E] transition-colors">Precision Aerospace Engineering Firm</h3>
                  <span class="flex items-center gap-1.5 px-3 py-1 bg-[#388E9E]/10 text-[#388E9E] rounded-full text-[10px] font-bold">
                    <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                    Verified
                  </span>
                </div>
                <p class="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-2">A leading tier-one supplier for aerospace components specializing in high-tolerance CNC machining and composite integration.</p>
                <div class="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Asking Price</p>
                    <p class="text-lg font-headline font-extrabold text-primary">$8,450,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Net Profit</p>
                    <p class="text-lg font-headline font-extrabold text-[#388E9E]">$1,200,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Turnover</p>
                    <p class="text-sm font-bold text-zinc-700">$24,500,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Location</p>
                    <p class="text-sm font-bold text-zinc-700">Stuttgart, DE</p>
                  </div>
                </div>
                <div class="mt-auto flex gap-4">
                  <button class="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-[11px] uppercase tracking-widest">View Details</button>
                  <button class="px-6 py-3.5 border border-[#388E9E]/30 text-[#388E9E] font-bold rounded-xl hover:bg-[#388E9E] hover:text-white transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">star</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="group bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500">
              <div class="w-full md:w-[40%] h-64 md:h-auto overflow-hidden relative">
                <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhAzT3FImAu8eKdB4akYXOxOU9T2dGYb6w8JJOS9KoNioIkGEQaRik1xPxl6p4WLQTvOd-P0A98i0lgQbDHUmsCFxxNln4QrujldqatJzgK4c7wRhy-djdReq27biCJ-74QwJygAILB1qLwOWq0ho2LRbJBQDD6KKnYEHmX5ZP9M5mBPeFnrswJqmMiI8hl3bXi2bhxm5Su-zP-FqBa8JXL2Oxo1rRevQ4OZx-2AxM7Wo3Y0WFMqM4D9RoTlkTjMH61nAN_aCjBHNg"/>
                <div class="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Architecture</div>
              </div>
              <div class="p-6 lg:p-8 md:w-[60%] flex flex-col">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="font-headline font-bold text-xl lg:text-2xl text-primary tracking-tight group-hover:text-[#388E9E] transition-colors">Award-Winning Architectural Practice</h3>
                  <span class="flex items-center gap-1.5 px-3 py-1 bg-[#388E9E]/10 text-[#388E9E] rounded-full text-[10px] font-bold">
                    <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                    Verified
                  </span>
                </div>
                <p class="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-2">Boutique firm with a prestigious portfolio of luxury residential and sustainable commercial projects across Western Europe.</p>
                <div class="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Asking Price</p>
                    <p class="text-lg font-headline font-extrabold text-primary">$3,200,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Net Profit</p>
                    <p class="text-lg font-headline font-extrabold text-[#388E9E]">$680,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Turnover</p>
                    <p class="text-sm font-bold text-zinc-700">$5,800,000</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Location</p>
                    <p class="text-sm font-bold text-zinc-700">London, UK</p>
                  </div>
                </div>
                <div class="mt-auto flex gap-4">
                  <button class="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-[11px] uppercase tracking-widest">View Details</button>
                  <button class="px-6 py-3.5 border border-[#388E9E]/30 text-[#388E9E] font-bold rounded-xl hover:bg-[#388E9E] hover:text-white transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">star</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-16 flex justify-center items-center gap-2">
            <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-400 hover:border-[#388E9E] hover:text-[#388E9E] transition-all">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">1</button>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#388E9E] hover:text-[#388E9E] transition-all font-bold text-sm">2</button>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#388E9E] hover:text-[#388E9E] transition-all font-bold text-sm">3</button>
            <span class="px-2 text-zinc-300">...</span>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#388E9E] hover:text-[#388E9E] transition-all font-bold text-sm">42</button>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-400 hover:border-[#388E9E] hover:text-[#388E9E] transition-all">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  `
})
export class BrowseComponent {}
