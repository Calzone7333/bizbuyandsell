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
  brandName?: string;
  businessMode?: string;
  physicalSqft?: number;
  exactAddress: string;
  accessApproved: boolean;
}

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt-[110px] min-h-screen bg-[#F4F4F4]">


      <main class="max-w-[1400px] mx-auto px-6 py-6">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside [class.hidden]="isMobile && !showMobileFilters" class="w-full lg:w-[260px] space-y-4 animate-in flex-shrink-0">
            <div class="sticky top-28">
              <div class="flex items-center justify-between lg:hidden mb-6 bg-gray-50 p-4 -mx-4 -mt-4 border-b border-gray-100">
                <h2 class="text-[14px] font-black text-gray-900 uppercase tracking-[2px]">Filters</h2>
                <button (click)="showMobileFilters = false" class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-400">
                  <span class="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <h2 class="text-[14px] font-black text-gray-900 uppercase tracking-[2px] mb-6 hidden lg:block">Filter By</h2>

              <!-- Categories Box -->
              <div class="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60 overflow-hidden mb-6">
                <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 class="text-[13px] font-black text-gray-900 uppercase tracking-wider">Categories</h3>
                  <span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{{ industries.length }}</span>
                </div>
                <div class="max-h-[320px] overflow-y-auto custom-scrollbar">
                  <div *ngFor="let cat of industries" 
                       (click)="filters.category = (filters.category === cat ? '' : cat); applyFilters()"
                       [class.bg-[#09337B]]="filters.category === cat"
                       [class.text-white]="filters.category === cat"
                       [class.hover:bg-gray-50]="filters.category !== cat"
                       class="px-5 py-3 flex items-center justify-between cursor-pointer transition-all group border-b border-gray-50 last:border-0">
                    <span class="transition-colors category-text" 
                          [style.color]="filters.category === cat ? 'white' : 'rgb(66, 75, 89)'">{{ cat }}</span>
                    <span class="material-symbols-outlined text-[16px] transition-transform group-hover:scale-110" [class.text-gray-300]="filters.category !== cat">
                      {{ filters.category === cat ? 'check' : 'chevron_right' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60 p-5 mb-6">
                <h3 class="text-[13px] font-black text-gray-900 uppercase tracking-wider mb-6">Price Range</h3>
                <div class="space-y-6">
                  <div class="relative pt-1">
                    <input type="range" [(ngModel)]="filters.maxPrice" (change)="applyFilters()" min="0" [max]="maxDbPrice" step="1"
                           class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF7C2A]" />
                    <div class="absolute -top-1 left-0 w-full flex justify-between text-[10px] font-bold text-gray-300 pointer-events-none">
                      <span>₹0</span>
                      <span>{{ formatPrice(maxDbPrice / 2) }}</span>
                      <span>{{ formatPrice(maxDbPrice) }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <div class="text-[10px] font-bold text-gray-400 uppercase mb-1">Max Price</div>
                      <div class="flex items-center px-3 py-2.5 bg-gray-50 border border-gray-100 rounded text-[14px] font-black text-[#09337B]">
                        {{ formatPrice(filters.maxPrice) }}
                      </div>
                    </div>
                    <button (click)="applyFilters()" class="mt-4 bg-[#09337B] hover:bg-[#072a66] text-white px-4 py-2.5 rounded font-bold text-[11px] uppercase tracking-wider transition-all shadow-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <!-- Status Toggles -->
              <div class="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60 p-5 mb-6 space-y-4">
                <h3 class="text-[13px] font-black text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-50 pb-3">Security & Status</h3>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="text-[13px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-green-500">verified</span>
                    Verified Only
                  </span>
                  <div class="relative inline-flex items-center">
                    <input type="checkbox" [(ngModel)]="filters.verifiedOnly" (change)="applyFilters()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF7C2A]"></div>
                  </div>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="text-[13px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-blue-500">trending_up</span>
                    Profitable Only
                  </span>
                  <div class="relative inline-flex items-center">
                    <input type="checkbox" [(ngModel)]="filters.profitableOnly" (change)="applyFilters()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF7C2A]"></div>
                  </div>
                </label>
              </div>

              <!-- Market Tags -->
              <div class="mb-8">
                <h3 class="text-[13px] font-black text-gray-900 uppercase tracking-wider mb-4 px-1">Market Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <button *ngFor="let mode of ['B2B', 'B2C', 'Hybrid', 'Online', 'Service']"
                          (click)="filters.businessMode = (filters.businessMode === mode ? '' : mode); applyFilters()"
                          [class]="filters.businessMode === mode ? 'bg-[#FF7C2A] text-white border-[#FF7C2A]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF7C2A]'"
                          class="px-4 py-2 border rounded-full text-[11px] font-bold uppercase transition-all shadow-sm">
                    {{ mode }}
                  </button>
                </div>
              </div>

              <button (click)="resetFilters()" 
                      class="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl text-[12px] font-black uppercase tracking-[1.5px] hover:bg-red-600 transition-all shadow-lg group">
                <span class="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">restart_alt</span>
                Reset All Filters
              </button>
            </div>
          </aside>

          <!-- Listing Section -->
          <div class="flex-1">
            <!-- Marketplace Header Bar -->
            <div class="mb-6">
              <!-- New Toolbar Design -->
              <!-- Refined Toolbar Design (Image 4 style) -->
              <div class="bg-[#f9f9f9] border border-gray-200 rounded-sm p-4 mb-8 space-y-4">
                <!-- Top Row -->
                <div class="flex items-center justify-between">
                  <div class="flex gap-1">
                    <button (click)="viewType = 'grid'" 
                            [class.bg-[#FF4C3B]]="viewType === 'grid'" 
                            [class.text-white]="viewType === 'grid'"
                            [class.bg-[#444]]="viewType !== 'grid'"
                            [class.text-white/50]="viewType !== 'grid'"
                            class="w-9 h-9 rounded-sm flex items-center justify-center transition-all">
                      <span class="material-symbols-outlined text-[20px]">grid_view</span>
                    </button>
                    <button (click)="viewType = 'list'" 
                            [class.bg-black]="viewType === 'list'" 
                            [class.text-white]="viewType === 'list'"
                            [class.bg-white]="viewType !== 'list'"
                            [class.text-gray-400]="viewType !== 'list'"
                            class="w-9 h-9 rounded-sm flex items-center justify-center border border-gray-200 transition-all">
                      <span class="material-symbols-outlined text-[20px]">list</span>
                    </button>
                    <button (click)="showMobileFilters = !showMobileFilters" 
                            class="lg:hidden h-9 bg-white border border-gray-200 px-3 flex items-center gap-2 rounded-sm text-[12px] font-black uppercase tracking-tight text-gray-700 hover:bg-gray-50 transition-all ml-1">
                      <span class="material-symbols-outlined text-[18px]">tune</span>
                      Filter
                    </button>
                  </div>

                  <!-- Center: Result Count -->
                  <div class="hidden md:block text-[13px] font-medium text-gray-500 italic">
                    Found {{ filteredListings.length }} premium institutional opportunities for you
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="text-[12px] font-medium text-gray-500">Show :</span>
                    <div class="relative select-wrapper">
                      <select [(ngModel)]="itemsPerPage" 
                              class="appearance-none bg-white border border-gray-200 rounded-sm px-4 py-1.5 pr-8 text-[12px] font-bold text-gray-700 focus:outline-none w-full">
                        <option [value]="15">15</option>
                        <option [value]="24">24</option>
                        <option [value]="48">48</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="h-px bg-gray-200 w-full"></div>

                <!-- Bottom Row -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="flex items-center">
                    <div class="relative flex items-center select-wrapper">
                      <select [(ngModel)]="sortBy" (change)="applyFilters()"
                              class="appearance-none bg-white border border-gray-200 rounded-sm px-4 py-2 pr-8 text-[12px] font-medium text-gray-600 focus:outline-none min-w-[150px]">
                        <option value="Best match">Position</option>
                        <option value="Newest">Newest</option>
                        <option value="PriceHigh">Price</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="text-[12px] font-medium text-gray-500">Page :</span>
                    <div class="flex gap-1">
                      <button *ngFor="let page of getPages()" 
                              (click)="changePage(page)"
                              [class.bg-black]="page === currentPage"
                              [class.text-white]="page === currentPage"
                              [class.bg-white]="page !== currentPage"
                              [class.text-gray-700]="page !== currentPage"
                              class="w-8 h-8 rounded-sm border border-gray-200 flex items-center justify-center text-[12px] font-bold transition-all">
                        {{ page }}
                      </button>
                      <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages"
                              class="w-8 h-8 rounded-sm border border-gray-200 bg-white flex items-center justify-center text-gray-400 disabled:opacity-30">
                        <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Active Filters Row -->
              <div *ngIf="filters.search || filters.category" class="pt-6 flex items-center gap-3 flex-wrap">
                <span class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-2">Active Filters:</span>
                <div *ngIf="filters.search" class="flex items-center gap-1 bg-white border border-gray-200 pl-3 pr-2 py-1.5 rounded shadow-sm text-[10px]">
                  <span class="text-gray-500 italic">Term:</span>
                  <span class="font-bold text-gray-800">'{{ filters.search }}'</span>
                  <button (click)="filters.search = ''; applyFilters()" class="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
                <div *ngIf="filters.category" class="flex items-center gap-1 bg-white border border-gray-200 pl-3 pr-2 py-1.5 rounded shadow-sm text-[10px]">
                  <span class="text-gray-500 italic">Category:</span>
                  <span class="font-bold text-gray-800">'{{ filters.category }}'</span>
                  <button (click)="filters.category = ''; applyFilters()" class="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
                <button (click)="filters.search = ''; filters.category = ''; applyFilters()" class="text-[11px] font-bold text-[#FF7C2A] hover:underline ml-4">Clear all</button>
              </div>
              
              <div class="mt-6 flex items-center justify-between">
              </div>
            </div>

            <!-- Listing Views -->
            <div *ngIf="viewType === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let listing of getPaginatedListings()" #listingCard class="flex flex-col group bg-white rounded-[12px] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 border border-transparent hover:border-gray-100 relative">
                <div class="relative aspect-[16/10] bg-gray-100 overflow-hidden shadow-sm">
                  <img [src]="listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : 'https://picsum.photos/seed/' + listing.id + '/800/500'" 
                       (error)="$any($event.target).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'"
                       class="w-full h-full object-cover transition-opacity duration-500" />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                  <!-- Badge for status -->
                  <div class="absolute top-4 left-4 flex flex-col gap-2">
                    <div *ngIf="listing.isVerified || listing.verificationStatus === 'VERIFIED'" class="flex items-center gap-2 bg-[#0c023c] text-white px-4 py-2.5 shadow-xl border border-white/10 backdrop-blur-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
                        <path d="M11.5283 1.5999C11.7686 1.29437 12.2314 1.29437 12.4717 1.5999L14.2805 3.90051C14.4309 4.09173 14.6818 4.17325 14.9158 4.10693L17.7314 3.3089C18.1054 3.20292 18.4799 3.475 18.4946 3.86338L18.6057 6.78783C18.615 7.03089 18.77 7.24433 18.9984 7.32823L21.7453 8.33761C22.1101 8.47166 22.2532 8.91189 22.0368 9.23478L20.4078 11.666C20.2724 11.8681 20.2724 12.1319 20.4078 12.334L22.0368 14.7652C22.2532 15.0881 22.1101 15.5283 21.7453 15.6624L18.9984 16.6718C18.77 16.7557 18.615 16.9691 18.6057 17.2122L18.4946 20.1366C18.4799 20.525 18.1054 20.7971 17.7314 20.6911L14.9158 19.8931C14.6818 19.8267 14.4309 19.9083 14.2805 20.0995L12.4717 22.4001C12.2314 22.7056 11.7686 22.7056 11.5283 22.4001L9.71949 20.0995C9.56915 19.9083 9.31823 19.8267 9.08421 19.8931L6.26856 20.6911C5.89463 20.7971 5.52014 20.525 5.50539 20.1366L5.39427 17.2122C5.38503 16.9691 5.22996 16.7557 5.00164 16.6718L2.25467 15.6624C1.88986 15.5283 1.74682 15.0881 1.96317 14.7652L3.59221 12.334C3.72761 12.1319 3.72761 11.8681 3.59221 11.666L1.96317 9.23478C1.74682 8.91189 1.88986 8.47166 2.25467 8.33761L5.00165 7.32823C5.22996 7.24433 5.38503 7.03089 5.39427 6.78783L5.50539 3.86338C5.52014 3.475 5.89463 3.20292 6.26857 3.3089L9.08421 4.10693C9.31823 4.17325 9.56915 4.09173 9.71949 3.90051L11.5283 1.5999Z" fill="#4CAF50" stroke="#4CAF50" stroke-width="1.5"/>
                        <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="text-[12px] font-black uppercase tracking-wider">Verified</span>
                    </div>
                    <span *ngIf="!listing.isVerified && listing.verificationStatus !== 'VERIFIED'" 
                          class="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1 shadow-sm uppercase tracking-wider border border-gray-100 w-fit">
                      {{ listing.verificationStatus || 'PENDING' }}
                    </span>
                  </div>
                  <!-- Bookmark Action -->
                  <button class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 shadow-sm hover:bg-white transition-all">
                    <span class="material-symbols-outlined text-[24px]">bookmark</span>
                  </button>
                </div>

                <div class="flex-1 flex flex-col p-5">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-[18px] font-bold text-[#191C1D] leading-tight hover:text-[#09337B] cursor-pointer transition-colors line-clamp-2">
                      {{ listing.title }}
                    </h3>
                    <div class="text-right ml-2">
                      <span class="text-[20px] font-black text-gray-900 whitespace-nowrap">{{ formatPrice(listing.askingPrice) }}</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex items-center gap-1 text-[13px] font-bold leading-[18px] text-[#191C1D]" style="font-family: 'Roboto', sans-serif;">
                      <span class="material-symbols-outlined text-[16px]">category</span>
                      {{ listing.category }}
                    </div>
                    <div class="flex items-center gap-1 text-[11px] font-bold leading-[16.5px] text-[#191C1D]" style="font-family: 'Roboto', sans-serif;">
                      <span class="material-symbols-outlined text-[14px]">location_on</span>
                      {{ listing.city }}, {{ listing.state }}
                    </div>
                  </div>

                  <p class="text-[14px] font-normal leading-[21px] text-gray-500 line-clamp-2 mb-4">
                    {{ listing.description }}
                  </p>
                  
                  <div class="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-4">
                    <div>
                      <span class="block text-[13px] font-bold text-[#191C1D] leading-[18px] mb-1" style="font-family: 'Roboto', sans-serif;">Annual Revenue</span>
                      <span class="text-[14px] font-medium text-gray-500">₹{{ listing.annualRevenue }}Cr</span>
                    </div>
                    <div>
                      <span class="block text-[13px] font-bold text-[#191C1D] leading-[18px] mb-1" style="font-family: 'Roboto', sans-serif;">Facility Size</span>
                      <span class="text-[14px] font-medium text-gray-500">{{ listing.physicalSqft || '5,000' }} SQFT</span>
                    </div>
                  </div>
                  
                  <div class="flex gap-2 mt-auto">
                    <button (click)="requestDetails(listing)" class="flex-1 py-3 bg-gray-900 text-white rounded text-[14px] font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                      View Details
                      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- List View -->
            <div *ngIf="viewType === 'list'" class="space-y-6">
              <div *ngFor="let listing of getPaginatedListings()" class="flex gap-6 bg-white p-5 border border-gray-100 rounded-[20px] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 group relative">
                <div class="w-48 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden relative">
                  <img [src]="listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'" 
                       class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 flex flex-col py-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-[15px] font-bold text-[#191C1D] mb-1 hover:text-[#09337B] cursor-pointer">{{ listing.title }}</h3>
                      <p class="text-[12px] text-gray-500">by <span class="font-bold text-gray-700">{{ listing.brandName }}</span> in <span class="text-[#09337B] font-bold">{{ listing.category }}</span></p>
                    </div>
                    <div class="text-right">
                      <span class="text-xl font-black text-gray-900">₹{{ listing.askingPrice }}Cr</span>
                      <p class="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">Excl. statutory taxes</p>
                    </div>
                  </div>
                  <p class="text-[14px] font-normal leading-[21px] text-gray-500 line-clamp-2 mt-3">{{ listing.description }}</p>
                  <div class="mt-auto flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <span class="flex items-center gap-1 text-[11px] font-bold leading-[16.5px] text-[#191C1D] bg-gray-50 px-2 py-1 rounded" style="font-family: 'Roboto', sans-serif;">
                        <span class="material-symbols-outlined text-[14px]">location_on</span> {{ listing.city }}
                      </span>
                      <div *ngIf="listing.isVerified || listing.verificationStatus === 'VERIFIED'" class="flex items-center gap-2 bg-[#0c023c] text-white px-3 py-1.5 shadow-lg border border-white/10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
                          <path d="M11.5283 1.5999C11.7686 1.29437 12.2314 1.29437 12.4717 1.5999L14.2805 3.90051C14.4309 4.09173 14.6818 4.17325 14.9158 4.10693L17.7314 3.3089C18.1054 3.20292 18.4799 3.475 18.4946 3.86338L18.6057 6.78783C18.615 7.03089 18.77 7.24433 18.9984 7.32823L21.7453 8.33761C22.1101 8.47166 22.2532 8.91189 22.0368 9.23478L20.4078 11.666C20.2724 11.8681 20.2724 12.1319 20.4078 12.334L22.0368 14.7652C22.2532 15.0881 22.1101 15.5283 21.7453 15.6624L18.9984 16.6718C18.77 16.7557 18.615 16.9691 18.6057 17.2122L18.4946 20.1366C18.4799 20.525 18.1054 20.7971 17.7314 20.6911L14.9158 19.8931C14.6818 19.8267 14.4309 19.9083 14.2805 20.0995L12.4717 22.4001C12.2314 22.7056 11.7686 22.7056 11.5283 22.4001L9.71949 20.0995C9.56915 19.9083 9.31823 19.8267 9.08421 19.8931L6.26856 20.6911C5.89463 20.7971 5.52014 20.525 5.50539 20.1366L5.39427 17.2122C5.38503 16.9691 5.22996 16.7557 5.00164 16.6718L2.25467 15.6624C1.88986 15.5283 1.74682 15.0881 1.96317 14.7652L3.59221 12.334C3.72761 12.1319 3.72761 11.8681 3.59221 11.666L1.96317 9.23478C1.74682 8.91189 1.88986 8.47166 2.25467 8.33761L5.00165 7.32823C5.22996 7.24433 5.38503 7.03089 5.39427 6.78783L5.50539 3.86338C5.52014 3.475 5.89463 3.20292 6.26857 3.3089L9.08421 4.10693C9.31823 4.17325 9.56915 4.09173 9.71949 3.90051L11.5283 1.5999Z" fill="#4CAF50" stroke="#4CAF50" stroke-width="1.5"/>
                          <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-[11px] font-black uppercase tracking-wider">Verified</span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button class="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-gray-500 hover:bg-gray-50">
                        <span class="material-symbols-outlined">shopping_cart</span>
                      </button>
                      <button (click)="requestDetails(listing)" class="px-6 py-2 bg-[#09337B] text-white rounded text-[12px] font-bold hover:bg-[#6c9635] transition-all shadow-sm">
                        Request Full Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div *ngIf="filteredListings.length === 0" class="flex flex-col items-center justify-center py-32">
               <span class="material-symbols-outlined text-[64px] mb-4 text-gray-100">search_off</span>
               <p class="text-lg font-bold text-gray-800">No results found for your search</p>
               <p class="text-sm text-gray-400 mt-2">Try adjusting your filters or keyword.</p>
               <button (click)="resetFilters()" class="mt-6 text-[#09337B] font-bold hover:underline">Clear all filters</button>
            </div>

            <!-- New Bottom Pagination Design -->
            <div *ngIf="filteredListings.length > itemsPerPage" class="mt-8 pt-6 border-t border-gray-100">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-1.5">
                  <div class="relative select-wrapper">
                    <select [(ngModel)]="sortBy" (change)="applyFilters()"
                            class="appearance-none bg-white border border-gray-100 rounded px-4 py-2 pr-8 text-[13px] font-bold text-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FF4C3B] min-w-[140px]">
                      <option value="Best match">Position</option>
                      <option value="Newest">Newest</option>
                      <option value="PriceHigh">Price</option>
                    </select>
                  </div>
                </div>

                <div class="flex items-center gap-4 ml-auto">
                  <span class="text-[13px] font-medium text-gray-400">Page :</span>
                  <div class="flex gap-1.5">
                    <button *ngFor="let page of getPages()" 
                            (click)="changePage(page)"
                            [class.bg-black]="page === currentPage"
                            [class.text-white]="page === currentPage"
                            [class.bg-white]="page !== currentPage"
                            [class.text-gray-700]="page !== currentPage"
                            class="w-10 h-10 rounded border border-gray-100 flex items-center justify-center text-[13px] font-bold shadow-sm hover:border-[#FF4C3B] transition-all">
                      {{ page }}
                    </button>
                    <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages"
                            class="w-10 h-10 rounded border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-[#FF4C3B] transition-all disabled:opacity-30">
                      <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-6 text-center">
                <p class="text-[11px] text-gray-400 font-medium">Showing {{ Math.min(filteredListings.length, (currentPage-1)*itemsPerPage + 1) }} - {{ Math.min(currentPage*itemsPerPage, filteredListings.length) }} of {{ filteredListings.length }} institutional listings</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Work Sans', sans-serif;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ccc; }
    select {
      appearance: none !important;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
    }
    select::-ms-expand {
      display: none !important;
    }
    .select-wrapper::after {
      content: "expand_more";
      font-family: 'Material Symbols Outlined';
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #9ca3af;
      font-size: 18px;
      line-height: 1;
    }
    .category-text {
      font-family: "Work Sans", sans-serif;
      font-size: 13px;
      font-weight: 600;
      line-height: 19.5px;
    }
  `]
})
export class BrowseComponent implements OnInit, AfterViewInit {
  @ViewChildren('listingCard') listingCards!: QueryList<ElementRef>;

  private listingService = inject(ListingService);
  public authService = inject(AuthService);

  viewType: 'list' | 'map' | 'grid' = 'grid';
  sortBy: string = 'Best match';
  showMobileFilters: boolean = false;
  isMobile: boolean = false;

  // Pagination State
  currentPage: number = 1;
  itemsPerPage: number = 15; 
  Math = Math; // For template access

  get totalPages(): number {
    return Math.ceil(this.filteredListings.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPaginatedListings(): Listing[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredListings.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  clickMap() {
    this.viewType = 'map';
  }

  maxDbPrice: number = 1000;

  industries = [
    'Technology',
    'Food',
    'Retail',
    'Energy',
    'Education',
    'Healthcare',
    'Logistics',
    'Fashion',
    'Automobile',
    'Marketing',
    'Interior',
    'Agriculture',
    'Event',
    'Security'
  ];

  filters = {
    search: '',
    category: '',
    location: '',
    selectedIndustries: {} as { [key: string]: boolean },
    maxPrice: 1000000000,
    minRevenue: 0,
    maxRevenue: 1000000000,
    minProfit: 0,
    verifiedOnly: false,
    profitableOnly: false,
    businessMode: ''
  };

  allListings: Listing[] = [];
  filteredListings: Listing[] = [];

  constructor() {
    this.industries.forEach((ind: string) => this.filters.selectedIndustries[ind] = true);
  }

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
    this.loadListings();
  }

  getCategoryCount(category: string): number {
    return this.allListings.filter(l => l.category === category).length;
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024;
  }

  loadListings() {
    console.log('Fetching all listings...');
    this.listingService.getAllListings().subscribe({
      next: (data) => {
        console.log('Listings received from server:', data.length, data);
        this.allListings = data;
        this.updateDynamicFilters();
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load listings', err);
      }
    });
  }

  ngAfterViewInit() {
    this.initGSAP();
  }

  updateDynamicFilters() {
    if (this.allListings.length > 0) {
      const prices = this.allListings.map(l => l.askingPrice || 0);
      this.maxDbPrice = Math.max(...prices);
      if (this.maxDbPrice < 10) this.maxDbPrice = 10; 
      this.filters.maxPrice = this.maxDbPrice;

      const revenues = this.allListings.map(l => l.annualRevenue || 0);
      const maxRev = Math.max(...revenues);
      this.filters.maxRevenue = maxRev > 0 ? maxRev : 1000000000;
    }
  }

  applyFilters() {
    this.showMobileFilters = false;
    this.currentPage = 1; // Reset to page 1 on filter change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.filteredListings = this.allListings.filter(l => {
      const title = (l.title || '').toLowerCase();
      const description = (l.description || '').toLowerCase();
      const city = (l.city || '').toLowerCase();
      const searchTerm = this.filters.search.toLowerCase();

      const matchSearch = title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        city.includes(searchTerm);

      const matchIndustry = !this.filters.category || l.category === this.filters.category;
      const matchLocation = !this.filters.location || l.state === this.filters.location;

      const price = l.askingPrice ?? 0;
      const matchPrice = price <= this.filters.maxPrice;

      const revenue = l.annualRevenue ?? 0;
      const matchRevenue = revenue >= (this.filters.minRevenue || 0) &&
        revenue <= (this.filters.maxRevenue || 1000000000000);

      const matchProfit = !this.filters.profitableOnly || (l.netProfit || 0) > 0;
      const matchVerified = !this.filters.verifiedOnly || (l.isVerified || l.verificationStatus === 'VERIFIED');
      const matchBusinessMode = !this.filters.businessMode || l.businessMode === this.filters.businessMode;
      
      return matchSearch && matchIndustry && matchLocation && matchPrice && matchRevenue && matchProfit && matchVerified && matchBusinessMode;
    });

    if (this.sortBy === 'PriceHigh') {
      this.filteredListings.sort((a, b) => (b.askingPrice || 0) - (a.askingPrice || 0));
    } else if (this.sortBy === 'ProfitHigh') {
      this.filteredListings.sort((a, b) => (b.netProfit || 0) - (a.netProfit || 0));
    } else {
      this.filteredListings.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
  }




  formatPrice(amount: number): string {
    if (!amount) return '₹0';
    
    if (amount >= 10000000) { // 1 Crore = 10,000,000
      const cr = (amount / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 });
      return `₹${cr} Cr`;
    } else {
      // For anything less than 1 Crore, show the full formatted number (including Lakhs and Thousands)
      return `₹${amount.toLocaleString('en-IN')}`;
    }
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
      error: (err: any) => alert('Failed to send request. ' + (err.error?.message || ''))
    });
  }

  bookConsultation() {
    const consultation = {
      preferredTime: 'Anytime this week',
      message: 'Interested in institutional advisory.'
    };
    this.listingService.bookConsultation(consultation).subscribe({
      next: () => alert('Consultation booked! A CA Expert will contact you.'),
      error: (err: any) => alert('Failed to book consultation.')
    });
  }

  resetFilters() {
    this.filters.search = '';
    this.filters.category = '';
    this.filters.location = '';
    this.filters.maxPrice = this.maxDbPrice;
    this.filters.minProfit = 0;
    this.filters.verifiedOnly = false;
    this.industries.forEach((ind: string) => this.filters.selectedIndustries[ind] = true);
    this.sortBy = 'Newest';
    this.applyFilters();
  }

  initGSAP() {
    // Disabled
  }

  animateList() {
    // Disabled
  }
}
