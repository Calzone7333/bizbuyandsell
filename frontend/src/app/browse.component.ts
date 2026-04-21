import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ListingService } from './listing.service';
import { AuthService } from './auth.service';

gsap.registerPlugin(ScrollTrigger);

interface Listing {
  id: number;
  title: string;
  category: string;
  askingPrice: number;
  annualRevenue: number;
  netProfit: number;
  city: string;
  state: string;
  description: string;
  imageUrls: string[];
  isVerified: boolean;
  verificationStatus: string;
  businessName: string;
  exactAddress: string;
  accessApproved: boolean;
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
        <div class="w-full lg:w-[30%] order-2 lg:order-1">
          <!-- Mobile Filter Toggle -->
          <button 
            (click)="showMobileFilters = !showMobileFilters"
            class="lg:hidden w-full flex items-center justify-center gap-2 p-4 bg-white border border-zinc-200 rounded-xl font-bold text-[#09337B] mb-6">
            <span class="material-symbols-outlined">{{ showMobileFilters ? 'close' : 'tune' }}</span>
            {{ showMobileFilters ? 'Hide Filters' : 'Show Filters & Sorting' }}
          </button>

          <aside 
            [class.hidden]="!showMobileFilters && isMobile"
            class="w-full space-y-10 lg:block">
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
                <span class="text-sm font-bold text-[#09337B]">₹{{ (filters.maxPrice | number) }}Cr+</span>
              </div>
              <input 
                [(ngModel)]="filters.maxPrice"
                (input)="applyFilters()"
                class="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-[#09337B]" 
                max="500" min="0" step="5" type="range"/>
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

            <!-- Advisory CTA -->
            <div (click)="bookConsultation()" class="bg-[#09337B] p-8 rounded-2xl text-white relative overflow-hidden mt-12 hover:scale-[1.02] transition-transform duration-500 cursor-pointer group shadow-2xl shadow-[#09337B]/20">
              <div class="relative z-10">
                <h3 class="font-headline font-bold text-xl mb-4 group-hover:text-[#FF7C2A] transition-colors">Buy/Sell with CA Expert</h3>
                <p class="text-xs opacity-70 mb-6 leading-relaxed">Our certified experts handle due diligence and secure transactions.</p>
                <button class="w-full py-3 bg-white text-[#09337B] font-bold rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest text-[9px]">Book Consultation</button>
              </div>
              <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </div>
          </aside>
        </div>

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
                  <img [src]="listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'" [alt]="listing.title" class="w-full h-full object-cover"/>
                  <div class="absolute top-4 left-4 bg-[#09337B]/90 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                    {{ listing.category }}
                  </div>
                  <!-- CA-Verified Badge Integration -->
                  <div *ngIf="listing.isVerified" class="absolute bottom-4 left-4 flex items-center gap-2 bg-[#FF7C2A] text-white px-3 py-1.5 rounded-lg shadow-xl animate-pulse">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    <span class="text-[10px] font-black uppercase tracking-tighter">CA-Verified</span>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 lg:p-8 md:w-[65%] flex flex-col">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="font-headline font-bold text-lg lg:text-xl text-[#09337B] tracking-tight flex-1">
                      {{ listing.accessApproved ? listing.businessName : listing.title }}
                    </h3>
                  </div>
                  
                  <p class="text-zinc-500 text-[13px] mb-6 leading-relaxed line-clamp-2">
                    {{ listing.description }}
                  </p>

                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">Asking PRICE</p>
                      <p class="text-lg font-headline font-extrabold text-[#09337B]">₹{{ listing.askingPrice | number }}Cr</p>
                    </div>
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">Net PROFIT</p>
                      <p class="text-lg font-headline font-extrabold text-[#FF7C2A]">₹{{ listing.netProfit | number }}L</p>
                    </div>
                    <div class="hidden lg:block">
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">CITY</p>
                      <p class="text-sm font-bold text-zinc-700">{{ listing.city }}</p>
                    </div>
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-outline font-black mb-1">IDENTITY</p>
                      <p class="text-[10px] font-bold" [ngClass]="listing.accessApproved ? 'text-green-600' : 'text-amber-600'">
                        {{ listing.accessApproved ? 'Unmasked' : 'Masked' }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-auto flex gap-3">
                    <button (click)="requestDetails(listing)" class="flex-1 py-3.5 bg-[#09337B] text-white font-black rounded-xl hover:bg-[#123e8a] transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-[#09337B]/10 active:scale-95">
                      {{ listing.accessApproved ? 'View Full Profile' : 'Request Private Details' }}
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
                <span class="px-2 text-zinc-300">...</span>
                <button class="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-100 text-zinc-400 hover:border-[#09337B] hover:text-[#09337B] transition-all active:scale-95">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
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

  private listingService = inject(ListingService);
  public authService = inject(AuthService);

  viewType: 'list' | 'map' = 'list';
  sortBy: string = 'Newest';
  showMobileFilters: boolean = false;
  isMobile: boolean = false;
  
  industries = [
    'Manufacturing & Industrial',
    'Technology & SaaS',
    'Food & Beverage',
    'Architecture & Design',
    'Retail & Commerce',
    'Franchise',
    'Startup Investment'
  ];

  filters = {
    search: '',
    selectedIndustries: {} as { [key: string]: boolean },
    maxPrice: 500,
    minProfit: 0,
    verifiedOnly: false
  };

  allListings: Listing[] = [];
  filteredListings: Listing[] = [];

  constructor() {
    this.industries.forEach(ind => this.filters.selectedIndustries[ind] = true);
  }

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
    this.loadListings();
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024;
  }

  loadListings() {
    this.listingService.getAllListings().subscribe({
      next: (data) => {
        this.allListings = data;
        this.applyFilters();
      },
      error: (err) => console.error('Failed to load listings', err)
    });
  }

  ngAfterViewInit() {
    this.initGSAP();
  }

  applyFilters() {
    this.filteredListings = this.allListings.filter(l => {
      const matchSearch = l.title.toLowerCase().includes(this.filters.search.toLowerCase()) || 
                          l.description.toLowerCase().includes(this.filters.search.toLowerCase());
      const matchIndustry = this.filters.selectedIndustries[l.category];
      const matchPrice = l.askingPrice <= this.filters.maxPrice;
      const matchProfit = l.netProfit >= this.filters.minProfit;
      const matchVerified = !this.filters.verifiedOnly || l.isVerified;
      
      return matchSearch && matchIndustry && matchPrice && matchProfit && matchVerified;
    });

    if (this.sortBy === 'PriceHigh') {
      this.filteredListings.sort((a, b) => b.askingPrice - a.askingPrice);
    } else if (this.sortBy === 'ProfitHigh') {
      this.filteredListings.sort((a, b) => b.netProfit - a.netProfit);
    } else {
      this.filteredListings.sort((a, b) => b.id - a.id);
    }

    setTimeout(() => this.animateList(), 50);
  }

  requestDetails(listing: Listing) {
    if (listing.accessApproved) {
      alert('You already have access to this profile.');
      return;
    }
    
    // Security Check: CA-Verified listings require verified buyers
    if (listing.isVerified && !this.authService.isKycVerified()) {
      alert('🔒 Security Protocol: This is a CA-Verified institutional listing. Please complete your KYC in Account Settings to request details.');
      return;
    }

    this.listingService.requestAccess(listing.id, 'I am interested in this acquisition.').subscribe({
      next: () => alert('Request sent! The seller will review your profile.'),
      error: (err) => alert('Failed to send request. ' + (err.error?.message || ''))
    });
  }

  bookConsultation() {
    const consultation = {
      preferredTime: 'Anytime this week',
      message: 'Interested in institutional advisory.'
    };
    this.listingService.bookConsultation(consultation).subscribe({
      next: () => alert('Consultation booked! A CA Expert will contact you.'),
      error: (err) => alert('Failed to book consultation.')
    });
  }

  resetFilters() {
    this.filters.search = '';
    this.filters.maxPrice = 500;
    this.filters.minProfit = 0;
    this.filters.verifiedOnly = false;
    this.industries.forEach(ind => this.filters.selectedIndustries[ind] = true);
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

