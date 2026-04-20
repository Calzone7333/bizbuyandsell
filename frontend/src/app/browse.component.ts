import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  revenue: number;
  profit: number;
  location: string;
  description: string;
  imageUrl: string;
  verified: boolean;
  type: 'ESTABLISHED' | 'FRANCHISE' | 'START-UP';
}

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="max-w-[1440px] mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-24 min-h-screen">
      <!-- Breadcrumbs & Toggle Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div class="max-w-2xl translate-reveal">
          <span class="text-[0.6rem] lg:text-xs tracking-[0.2em] uppercase text-outline font-bold mb-3 block">Premium Marketplace</span>
          <h1 class="font-headline font-light text-2xl lg:text-4xl tracking-tight text-[#09337B] leading-tight">
            Institutional & Industrial Opportunities
          </h1>
        </div>
        
        <!-- View Toggle -->
        <div class="flex items-center bg-surface-container p-1 rounded-xl shadow-inner shadow-black/5">
          <button 
            (click)="viewType = 'list'"
            [ngClass]="viewType === 'list' ? 'bg-white text-[#09337B] shadow-sm' : 'text-outline hover:text-[#09337B]'"
            class="flex items-center gap-2 px-4 lg:px-6 py-2 font-bold rounded-lg transition-all duration-300 text-sm">
            <span class="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            List View
          </button>
          <button 
            (click)="viewType = 'map'"
            [ngClass]="viewType === 'map' ? 'bg-white text-[#09337B] shadow-sm' : 'text-outline hover:text-[#09337B]'"
            class="flex items-center gap-2 px-4 lg:px-6 py-2 font-bold rounded-lg transition-all duration-300 text-sm">
            <span class="material-symbols-outlined text-[18px]">map</span>
            Map View
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left Sidebar: Filter Panel (30%) -->
        <aside class="w-full lg:w-[30%] space-y-10 order-2 lg:order-1">
          <div class="bg-surface-container-low p-6 lg:p-8 rounded-2xl border border-zinc-100/50 shadow-sm sticky top-28">
            <div class="flex items-center justify-between mb-8">
              <h2 class="font-headline font-bold text-xl tracking-tight text-[#09337B]">Refine Portfolio</h2>
              <button 
                (click)="resetFilters()"
                class="text-[10px] uppercase tracking-widest text-[#09337B] font-bold hover:underline transition-all">Clear All</button>
            </div>
            
            <!-- Keyword Search -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Keywords</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input 
                  [(ngModel)]="filters.search"
                  (input)="applyFilters()"
                  class="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-outline-variant/30 focus:border-[#09337B] outline-none transition-all placeholder:text-outline/50 text-sm font-medium" 
                  placeholder="e.g. Manufacturing, Tech" 
                  type="text"/>
              </div>
            </div>

            <!-- Industry Filters -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Industry Sector</label>
              <div class="space-y-3">
                <label *ngFor="let industry of industries" class="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="filters.selectedIndustries[industry]"
                    (change)="applyFilters()"
                    class="w-4 h-4 rounded border-outline-variant text-[#09337B] focus:ring-[#09337B]/20 transition-all"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#09337B] transition-colors">{{industry}}</span>
                </label>
              </div>
            </div>

            <!-- Investment Range -->
            <div class="mb-10">
              <div class="flex justify-between items-end mb-4">
                <label class="text-[10px] font-bold uppercase tracking-widest text-outline">Max Investment</label>
                <span class="text-sm font-bold text-[#09337B]">\${{ (filters.maxPrice | number) }}M+</span>
              </div>
              <input 
                [(ngModel)]="filters.maxPrice"
                (input)="applyFilters()"
                class="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-[#09337B]" 
                max="50" min="0" step="0.5" type="range"/>
            </div>

            <!-- Business Type -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Business Model</label>
              <div class="space-y-3">
                <label *ngFor="let type of ['ESTABLISHED', 'FRANCHISE', 'START-UP']" class="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="filters.selectedTypes[type]"
                    (change)="applyFilters()"
                    class="w-4 h-4 rounded border-outline-variant text-[#09337B] focus:ring-[#09337B]/20 transition-all"/>
                  <span class="text-sm font-medium text-zinc-700 group-hover:text-[#09337B] transition-colors capitalize">{{type.toLowerCase()}}</span>
                </label>
              </div>
            </div>

            <!-- Profit Range -->
            <div class="mb-10">
              <div class="flex justify-between items-end mb-4">
                <label class="text-[10px] font-bold uppercase tracking-widest text-outline">Min Annual Profit</label>
                <span class="text-sm font-bold text-[#FF7C2A]">\${{ (filters.minProfit | number) }}k+</span>
              </div>
              <input 
                [(ngModel)]="filters.minProfit"
                (input)="applyFilters()"
                class="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-[#FF7C2A]" 
                max="10000" min="0" step="100" type="range"/>
            </div>

            <!-- Verified Toggle -->
            <div class="mb-10 p-4 bg-white/40 rounded-xl border border-zinc-100">
              <label class="flex items-center justify-between cursor-pointer">
                <div>
                  <span class="block text-sm font-bold text-[#09337B]">Verified Only</span>
                  <span class="text-[10px] text-zinc-500 uppercase font-black">Trusted Sellers</span>
                </div>
                <div class="relative inline-flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.verifiedOnly" (change)="applyFilters()" class="sr-only peer">
                  <div class="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </div>
              </label>
            </div>

            <!-- Location Dropdown -->
            <div class="mb-10">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Global Location</label>
              <select 
                [(ngModel)]="filters.location"
                (change)="applyFilters()"
                class="w-full bg-white/50 border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-[#09337B] outline-none text-sm font-medium">
                <option value="Any">All Regions</option>
                <option value="North America">North America</option>
                <option value="European Union">European Union</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Middle East">Middle East</option>
              </select>
            </div>

            <!-- Advisory CTA -->
            <div class="bg-[#09337B] p-8 rounded-2xl text-white relative overflow-hidden mt-12 hover:scale-[1.02] transition-transform duration-500 cursor-pointer group shadow-2xl shadow-[#09337B]/20">
              <div class="relative z-10">
                <h3 class="font-headline font-bold text-xl mb-4 group-hover:text-[#FF7C2A] transition-colors">Need Valuation?</h3>
                <p class="text-xs opacity-70 mb-6 leading-relaxed">Our senior advisors offer private valuation services for qualified acquisitions.</p>
                <button class="w-full py-3 bg-white text-[#09337B] font-bold rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest text-[9px]">Consult Advisory</button>
              </div>
              <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </div>
        </aside>

        <!-- Right Column: Results (70%) -->
        <section class="w-full lg:w-[70%] order-1 lg:order-2">
          
          <ng-container *ngIf="viewType === 'list'">
            <!-- Sort & Count -->
            <div class="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-zinc-100">
              <p class="text-zinc-500 font-medium text-sm">
                <span class="text-[#09337B] font-bold">{{ filteredListings.length }}</span> Businesses Found
              </p>
              <div class="flex items-center gap-3 mt-4 sm:mt-0">
                <span class="text-[10px] uppercase tracking-widest font-black text-outline">Sort By:</span>
                <select 
                  [(ngModel)]="sortBy"
                  (change)="applyFilters()"
                  class="bg-transparent text-[#09337B] font-bold text-sm border-none focus:ring-0 cursor-pointer">
                  <option value="Newest">Newest Listed</option>
                  <option value="PriceHigh">Highest Asking Price</option>
                  <option value="ProfitHigh">Highest Net Profit</option>
                </select>
              </div>
            </div>

            <!-- Listing Cards -->
            <div class="space-y-8 min-h-[400px]">
              <div *ngIf="filteredListings.length === 0" class="flex flex-col items-center justify-center py-20 opacity-40">
                <span class="material-symbols-outlined text-[64px] mb-4">search_off</span>
                <p class="font-bold">No opportunities match your criteria</p>
              </div>

              <div *ngFor="let listing of filteredListings" 
                   #listingCard
                   class="group bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-100 transition-all duration-700">
                
                <!-- Card Image -->
                <div class="w-full md:w-[35%] h-56 md:h-auto overflow-hidden relative">
                  <img [src]="listing.imageUrl" [alt]="listing.title" class="w-full h-full object-cover"/>
                  <div class="absolute top-4 left-4 bg-[#09337B]/90 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                    {{ listing.category }}
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 lg:p-8 md:w-[65%] flex flex-col">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="font-headline font-bold text-lg lg:text-xl text-[#09337B] tracking-tight flex-1">
                      {{ listing.title }}
                    </h3>
                    <span [ngClass]="listing.verified ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'" 
                          class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ml-4 pointer-events-none">
                      <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">
                        {{ listing.verified ? 'verified' : 'new_releases' }}
                      </span>
                      {{ listing.verified ? 'Verified' : 'Not Verified' }}
                    </span>
                  </div>
                  
                  <p class="text-zinc-500 text-[13px] mb-6 leading-relaxed line-clamp-2">
                    {{ listing.description }}
                  </p>

                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">Asking PRICE</p>
                      <p class="text-lg font-headline font-extrabold text-[#09337B]">\${{ listing.price | number }}M</p>
                    </div>
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">Net PROFIT</p>
                      <p class="text-lg font-headline font-extrabold text-[#FF7C2A]">\${{ listing.profit | number }}k</p>
                    </div>
                    <div class="hidden lg:block">
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">TURNOVER</p>
                      <p class="text-sm font-bold text-zinc-700">\${{ listing.revenue | number }}M</p>
                    </div>
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">LOCATION</p>
                      <p class="text-sm font-bold text-zinc-700">{{ listing.location }}</p>
                    </div>
                  </div>

                  <div class="mt-auto flex gap-3">
                    <button class="flex-1 py-3.5 bg-[#09337B] text-white font-black rounded-xl hover:bg-[#123e8a] transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-[#09337B]/10 active:scale-95">
                      Explore Details
                    </button>
                    <button class="px-5 py-3.5 border border-zinc-100 text-[#09337B] font-bold rounded-xl hover:bg-[#FF7C2A] hover:border-[#FF7C2A] hover:text-white transition-all flex items-center justify-center group/btn active:scale-95">
                      <span class="material-symbols-outlined text-[20px] transition-transform group-hover/btn:scale-125">star</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Pagination -->
            <div *ngIf="filteredListings.length > 0" class="mt-20 flex flex-col items-center gap-6">
              <div class="flex justify-center items-center gap-2">
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-400 hover:border-[#09337B] hover:text-[#09337B] transition-all active:scale-95">
                  <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl bg-[#09337B] text-white font-bold text-sm shadow-lg shadow-[#09337B]/20">1</button>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#09337B] hover:text-[#09337B] transition-all font-bold text-sm active:scale-95">2</button>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#09337B] hover:text-[#09337B] transition-all font-bold text-sm active:scale-95">3</button>
                <span class="px-2 text-zinc-300">...</span>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-600 hover:border-[#09337B] hover:text-[#09337B] transition-all font-bold text-sm">42</button>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-400 hover:border-[#09337B] hover:text-[#09337B] transition-all active:scale-95">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
              <p class="text-[10px] uppercase font-black tracking-widest text-zinc-400">Showing page 1 of 42</p>
            </div>
          </ng-container>

          <!-- Map View Placeholder -->
          <div *ngIf="viewType === 'map'" 
               class="w-full h-[800px] bg-surface-container-low rounded-3xl border border-zinc-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div class="z-10 text-center px-12">
              <span class="material-symbols-outlined text-[80px] text-[#09337B] mb-6 animate-bounce">location_on</span>
              <h3 class="font-headline font-bold text-2xl mb-4 text-[#09337B]">Interactive Market Map</h3>
              <p class="text-zinc-500 max-w-md mx-auto mb-8">Visualize acquisition opportunities across territories with our high-density geospatial dashboard.</p>
              <div class="flex gap-4 justify-center">
                <div class="px-6 py-2 bg-white rounded-full border border-zinc-100 shadow-sm flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-[#09337B]"></div>
                  <span class="text-[10px] font-bold">Industrial Hubs</span>
                </div>
                <div class="px-6 py-2 bg-white rounded-full border border-zinc-100 shadow-sm flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-[#FF7C2A]"></div>
                  <span class="text-[10px] font-bold">Retail Zones</span>
                </div>
              </div>
              <button class="mt-12 px-10 py-4 bg-[#09337B] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-[#09337B]/20">Request Map Access</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  `
})
export class BrowseComponent implements OnInit, AfterViewInit {
  @ViewChildren('listingCard') listingCards!: QueryList<ElementRef>;

  viewType: 'list' | 'map' = 'list';
  sortBy: string = 'Newest';
  
  industries = [
    'Manufacturing & Industrial',
    'Technology & SaaS',
    'Food & Beverage',
    'Architecture & Design',
    'Retail & Commerce'
  ];

  filters = {
    search: '',
    selectedIndustries: {} as { [key: string]: boolean },
    selectedTypes: { 'ESTABLISHED': true, 'FRANCHISE': true, 'START-UP': true } as { [key: string]: boolean },
    maxPrice: 50,
    minProfit: 0,
    location: 'Any',
    verifiedOnly: false
  };

  allListings: Listing[] = [
    {
      id: 1,
      title: 'Precision Aerospace Engineering Firm',
      category: 'Manufacturing & Industrial',
      price: 8.45,
      revenue: 24.5,
      profit: 1200,
      location: 'Stuttgart, DE',
      description: 'A leading tier-one supplier for aerospace components specializing in high-tolerance CNC machining and composite integration.',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      verified: true,
      type: 'ESTABLISHED'
    },
    {
      id: 2,
      title: 'Award-Winning Architectural Practice',
      category: 'Architecture & Design',
      price: 3.2,
      revenue: 5.8,
      profit: 680,
      location: 'London, UK',
      description: 'Boutique firm with a prestigious portfolio of luxury residential and sustainable commercial projects across Western Europe.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      verified: true,
      type: 'ESTABLISHED'
    },
    {
      id: 3,
      title: 'Global SaaS Platform: Logistics Engine',
      category: 'Technology & SaaS',
      price: 12.5,
      revenue: 18.2,
      profit: 4500,
      location: 'San Francisco, US',
      description: 'Scalable logistics optimization engine with enterprise contracts in 14 countries. Fully remote infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      verified: false,
      type: 'START-UP'
    },
    {
      id: 4,
      title: 'Luxury Organic Vineyard & Resort',
      category: 'Food & Beverage',
      price: 15.0,
      revenue: 4.2,
      profit: 950,
      location: 'Tuscany, IT',
      description: 'Exclusive estate featuring 50 acres of organic grapevines, a modern production facility, and a 5-star boutique hotel.',
      imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?q=80&w=2070&auto=format&fit=crop',
      verified: true,
      type: 'ESTABLISHED'
    },
    {
      id: 5,
      title: 'Industrial Robotics Manufacturer',
      category: 'Manufacturing & Industrial',
      price: 22.0,
      revenue: 45.0,
      profit: 6200,
      location: 'Tokyo, JP',
      description: 'Specializing in automation solutions for automotive assembly lines. Proprietary patents for cobot integration.',
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
      verified: true,
      type: 'ESTABLISHED'
    }
  ];

  filteredListings: Listing[] = [];

  constructor() {
    // Select all industries by default
    this.industries.forEach(ind => this.filters.selectedIndustries[ind] = true);
  }

  ngOnInit() {
    this.applyFilters();
  }

  ngAfterViewInit() {
    this.initGSAP();
  }

  applyFilters() {
    this.filteredListings = this.allListings.filter(l => {
      const matchSearch = l.title.toLowerCase().includes(this.filters.search.toLowerCase()) || 
                          l.description.toLowerCase().includes(this.filters.search.toLowerCase());
      const matchIndustry = this.filters.selectedIndustries[l.category];
      const matchType = this.filters.selectedTypes[l.type];
      const matchPrice = l.price <= this.filters.maxPrice;
      const matchProfit = l.profit >= this.filters.minProfit;
      const matchLocation = this.filters.location === 'Any' || l.location.includes(this.filters.location);
      const matchVerified = !this.filters.verifiedOnly || l.verified;
      
      return matchSearch && matchIndustry && matchType && matchPrice && matchProfit && matchLocation && matchVerified;
    });

    // Sorting
    if (this.sortBy === 'PriceHigh') {
      this.filteredListings.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'ProfitHigh') {
      this.filteredListings.sort((a, b) => b.profit - a.profit);
    } else {
      this.filteredListings.sort((a, b) => b.id - a.id);
    }

    // Small delay to allow Angular to render, then re-animate
    setTimeout(() => {
      this.animateList();
    }, 50);
  }

  resetFilters() {
    this.filters.search = '';
    this.filters.maxPrice = 50;
    this.filters.minProfit = 0;
    this.filters.location = 'Any';
    this.filters.verifiedOnly = false;
    this.industries.forEach(ind => this.filters.selectedIndustries[ind] = true);
    this.filters.selectedTypes = { 'ESTABLISHED': true, 'FRANCHISE': true, 'START-UP': true };
    this.sortBy = 'Newest';
    this.applyFilters();
  }

  initGSAP() {
    gsap.from('.translate-reveal', {
      duration: 1.2,
      y: 40,
      opacity: 0,
      ease: 'expo.out'
    });
  }

  animateList() {
    if (this.listingCards && this.listingCards.length > 0) {
      gsap.from(this.listingCards.map(c => c.nativeElement), {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        overwrite: true
      });
    }
  }
}
