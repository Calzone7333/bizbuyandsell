import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from './listing.service';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-surface font-body text-on-surface antialiased min-h-screen relative">
      <!-- Toast Notification -->
      <div *ngIf="toastMessage" class="fixed top-28 right-8 z-[110] animate-in">
        <div class="bg-red-50 border-l-4 border-red-500 p-4 shadow-2xl rounded-r-xl flex items-center gap-4 min-w-[300px]">
          <span class="material-symbols-outlined text-red-500">error</span>
          <div>
            <p class="text-xs font-black text-red-800 uppercase tracking-widest">Required Action</p>
            <p class="text-sm text-red-700 font-medium">{{ toastMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Success Screen -->
      <div *ngIf="isPublished" class="fixed inset-0 z-[200] bg-surface flex items-center justify-center p-8 animate-in">
        <div class="max-w-md w-full text-center space-y-8">
          <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
            <span class="material-symbols-outlined text-white text-5xl">check</span>
          </div>
          <div class="space-y-3">
            <h2 class="text-3xl font-headline font-black text-primary">Application Submitted</h2>
            <p class="text-on-surface-variant font-medium leading-relaxed">
              Your business listing for <span class="text-primary font-bold">"{{ listingForm.brandName }}"</span> has been received and is currently <span class="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-black uppercase tracking-wider">Pending for Approval</span>.
            </p>
          </div>
          <div class="p-6 bg-surface-container-low rounded-2xl text-left space-y-4">
            <div class="flex gap-4">
              <span class="material-symbols-outlined text-secondary">verified_user</span>
              <div>
                <p class="text-sm font-bold text-on-surface">Admin Review Required</p>
                <p class="text-xs text-on-surface-variant">Our team will verify your documents within 24-48 hours.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <span class="material-symbols-outlined text-secondary">visibility</span>
              <div>
                <p class="text-sm font-bold text-on-surface">Listing Status</p>
                <p class="text-xs text-on-surface-variant">Once approved, your listing will show a "Verified" badge to all buyers.</p>
              </div>
            </div>
          </div>
          <button (click)="isPublished = false; router.navigate(['/browse'])" 
                  class="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-xl active:scale-95 transition-all">
            Return to Marketplace
          </button>
        </div>
      </div>

      <main class="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div class="max-w-[1200px] mx-auto px-4 md:px-8">
          <!-- Responsive Stepper Header -->
          <div class="mb-8 lg:mb-12">
            <!-- Desktop: Chevron Stepper -->
            <div class="hidden lg:flex items-center w-full gap-1 overflow-hidden rounded-xl shadow-sm border border-gray-100">
              <div *ngFor="let step of steps; let i = index" 
                   (click)="goToStep(i)"
                   class="chevron-step flex-1 px-6 py-5 cursor-pointer transition-all duration-300 relative group"
                   [ngClass]="{
                     'active': i === currentStep,
                     'completed': i < currentStep,
                     'pending': i > currentStep
                   }">
                <div class="relative z-10">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-black opacity-40">0{{ i + 1 }}</span>
                    <span class="text-[13px] font-bold tracking-tight">{{ step.label }}</span>
                  </div>
                  <div class="text-[9px] mt-1 font-medium opacity-60 leading-none truncate">{{ step.subtitle }}</div>
                </div>
              </div>
            </div>

            <!-- Mobile: Compact Progress Stepper -->
            <div class="lg:hidden bg-white rounded-[20px] p-6 text-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
               <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
               <div class="relative z-10">
                  <div class="flex justify-between items-end mb-4">
                    <div>
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7C2A]">Step 0{{ currentStep + 1 }} of 06</span>
                      <h2 class="text-xl font-headline font-black mt-1 text-primary">{{ steps[currentStep].label }}</h2>
                    </div>
                    <div class="flex items-center gap-3">
                       <div class="bg-[#FF7C2A]/10 px-3 py-2 rounded-xl border border-[#FF7C2A]/20 flex items-center gap-2">
                          <span class="text-[14px] font-black text-primary tracking-tighter">{{ Math.round(((currentStep + 1) / 6) * 100) }}%</span>
                       </div>
                    </div>
                  </div>
                  <div class="flex gap-1.5 px-0.5">
                    <div *ngFor="let s of steps; let i = index" 
                         class="h-1.5 flex-1 rounded-full transition-all duration-500 overflow-hidden relative"
                         [ngClass]="i <= currentStep ? 'bg-primary' : 'bg-gray-100'">
                         <div *ngIf="i === currentStep" class="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                  <div class="mt-4 flex justify-between items-center">
                    <p class="text-[9px] font-bold text-primary/40 uppercase tracking-[0.1em]">Verification Level: High</p>
                    <div class="flex items-center gap-1">
                      <div class="w-1 h-1 rounded-full bg-green-500"></div>
                      <span class="text-[9px] font-black text-green-600 uppercase">Live Sync</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Column: Guidance Info Card -->
            <div class="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div class="bg-surface-container-low p-8 rounded-xl space-y-6">
                <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary">{{ steps[currentStep].icon }}</span>
                </div>
                <h2 class="text-2xl font-headline font-bold text-primary tracking-tight">{{ steps[currentStep].guideTitle }}</h2>
                <p class="text-on-surface-variant text-sm leading-relaxed">
                  {{ steps[currentStep].guideDescription }}
                </p>
                <ul class="space-y-4 pt-4">
                  <li *ngFor="let tip of steps[currentStep].tips" class="flex gap-3 text-xs font-medium text-on-surface items-start">
                    <span class="material-symbols-outlined text-secondary text-sm">verified</span>
                    {{ tip }}
                  </li>
                </ul>
              </div>
              
              <div class="bg-primary p-6 rounded-xl relative overflow-hidden group">
                <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span class="material-symbols-outlined text-8xl text-white">account_balance</span>
                </div>
                <h3 class="text-tertiary-fixed-dim text-xs font-bold uppercase tracking-widest mb-2">Need valuation help?</h3>
                <p class="text-on-primary text-sm leading-snug mb-4">Our experts can provide a pre-listing assessment.</p>
                <a class="text-secondary-fixed text-xs font-bold underline underline-offset-4 decoration-secondary-fixed/50 hover:decoration-secondary-fixed cursor-pointer">Contact Advisory</a>
              </div>
            </div>

            <!-- Right Column: The Form Card -->
            <div class="lg:col-span-8 bg-surface-container-lowest editorial-shadow rounded-xl p-6 md:p-10 order-1 lg:order-2">
              <div class="mb-10">
                <span class="text-secondary font-label text-[10px] font-extrabold uppercase tracking-[0.2em]">Step 0{{ currentStep + 1 }} of 06</span>
                <h1 class="text-3xl font-headline font-black text-primary mt-2">{{ steps[currentStep].label }}</h1>
              </div>

              <form class="space-y-8">
              
              <!-- STEP 1: IDENTITY -->
              <div *ngIf="currentStep === 0" class="animate-in space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.legalBusinessName" name="legal_name" id="legal_name" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.legalBusinessName) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="legal_name" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.legalBusinessName) ? 'text-red-500' : 'text-on-surface-variant'">Legal Business Name</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.brandName" name="brand_name" id="brand_name" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.brandName) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="brand_name" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.brandName) ? 'text-red-500' : 'text-on-surface-variant'">Brand Name</label>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant ml-1">Mode of Business</label>
                  <div class="flex p-1.5 bg-surface-container-low rounded-xl w-full sm:max-w-sm" [ngClass]="{'ring-1 ring-red-500': showErrors && !listingForm.businessMode}">
                    <button type="button" (click)="listingForm.businessMode = 'B2B'" 
                            class="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all"
                            [ngClass]="listingForm.businessMode === 'B2B' ? 'bg-white text-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'">B2B</button>
                    <button type="button" (click)="listingForm.businessMode = 'B2C'"
                            class="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all"
                            [ngClass]="listingForm.businessMode === 'B2C' ? 'bg-white text-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'">B2C</button>
                    <button type="button" (click)="listingForm.businessMode = 'Hybrid'"
                            class="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all"
                            [ngClass]="listingForm.businessMode === 'Hybrid' ? 'bg-white text-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'">Hybrid</button>
                  </div>
                </div>

                <div class="relative space-y-3">
                  <label class="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant ml-1" for="category">Business Category</label>
                  <select [(ngModel)]="listingForm.category" name="category" id="category" 
                          class="block w-full px-4 py-4 text-sm text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary cursor-pointer appearance-none transition-all"
                          [ngClass]="(showErrors && !listingForm.category) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <option value="">Select Specialization</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>

                  <div class="relative floating-label-input group">
                    <textarea [(ngModel)]="listingForm.growthOpportunities" name="vision" id="vision" placeholder=" " 
                              class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer min-h-[80px] placeholder-transparent"
                              [ngClass]="(showErrors && !listingForm.growthOpportunities) ? 'border-red-500' : 'border-[#E2E8F0]'"></textarea>
                    <label for="vision" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.growthOpportunities) ? 'text-red-500' : 'text-on-surface-variant'">Mission & Vision (Growth Opportunities)</label>
                  </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.contactEmail" name="contact_email" id="contact_email" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.contactEmail) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="contact_email" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.contactEmail) ? 'text-red-500' : 'text-on-surface-variant'">Contact Email</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.contactNumber" name="contact_phone" id="contact_phone" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.contactNumber) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="contact_phone" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.contactNumber) ? 'text-red-500' : 'text-on-surface-variant'">Contact Phone</label>
                  </div>
                </div>
              </div>

              <!-- STEP 2: OPERATIONS -->
              <div *ngIf="currentStep === 1" class="animate-in space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.city" name="city" id="city" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.city) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="city" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.city) ? 'text-red-500' : 'text-on-surface-variant'">City</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.state" name="state" id="state" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.state) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="state" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.state) ? 'text-red-500' : 'text-on-surface-variant'">State</label>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.physicalSqft" name="sqft" id="sqft" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.physicalSqft) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="sqft" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.physicalSqft) ? 'text-red-500' : 'text-on-surface-variant'">Physical (SQFT)</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.rentAndMaintenance" name="rent" id="rent" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.rentAndMaintenance) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="rent" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.rentAndMaintenance) ? 'text-red-500' : 'text-on-surface-variant'">Rent & Maintenance (Monthly)</label>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div class="relative floating-label-input group">
                    <select [(ngModel)]="listingForm.leaseAgreement" name="lease_agr" id="lease_agr" 
                            class="block w-full px-4 py-4 text-sm text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary appearance-none"
                            [ngClass]="(showErrors && !listingForm.leaseAgreement) ? 'border-red-500' : 'border-[#E2E8F0]'">
                      <option value="">Lease Agreement</option>
                      <option value="Registered">Registered</option>
                      <option value="Notarized">Notarized</option>
                    </select>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.securityDeposit" name="deposit" id="deposit" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.securityDeposit) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="deposit" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.securityDeposit) ? 'text-red-500' : 'text-on-surface-variant'">Security Deposit</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.lockInPeriod" name="lockin" id="lockin" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.lockInPeriod) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="lockin" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.lockInPeriod) ? 'text-red-500' : 'text-on-surface-variant'">Lock-in Period</label>
                  </div>
                </div>
              </div>

              <!-- STEP 3: PERFORMANCE -->
              <div *ngIf="currentStep === 2" class="animate-in space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.averageDailyTurnover" name="daily_turn" id="daily_turn" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.averageDailyTurnover) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="daily_turn" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.averageDailyTurnover) ? 'text-red-500' : 'text-on-surface-variant'">Avg Daily Turnover</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.averageMonthlyTurnover" name="monthly_turn" id="monthly_turn" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.averageMonthlyTurnover) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="monthly_turn" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.averageMonthlyTurnover) ? 'text-red-500' : 'text-on-surface-variant'">Avg Monthly Turnover</label>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.askingPrice" name="ask_price" id="ask_price" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.askingPrice) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="ask_price" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.askingPrice) ? 'text-red-500' : 'text-on-surface-variant'">Asking Price</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="number" [(ngModel)]="listingForm.businessValue" name="biz_val" id="biz_val" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.businessValue) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="biz_val" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.businessValue) ? 'text-red-500' : 'text-on-surface-variant'">Value of Business (Assessment)</label>
                  </div>
                </div>

                <div class="relative floating-label-input group">
                  <textarea [(ngModel)]="listingForm.description" name="reason" id="reason" placeholder=" " 
                            class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer min-h-[100px] placeholder-transparent"
                            [ngClass]="(showErrors && !listingForm.description) ? 'border-red-500' : 'border-[#E2E8F0]'"></textarea>
                  <label for="reason" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                         [ngClass]="(showErrors && !listingForm.description) ? 'text-red-500' : 'text-on-surface-variant'">Compelling Description (Reason for Selling)</label>
                </div>
              </div>

              <!-- STEP 4: ASSETS & PORTFOLIO -->
              <div *ngIf="currentStep === 3" class="animate-in space-y-8">
                <div class="relative floating-label-input group">
                  <textarea [(ngModel)]="listingForm.assetList" name="assets" id="assets" placeholder=" " 
                            class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer min-h-[100px] placeholder-transparent"
                            [ngClass]="(showErrors && !listingForm.assetList) ? 'border-red-500' : 'border-[#E2E8F0]'"></textarea>
                  <label for="assets" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                         [ngClass]="(showErrors && !listingForm.assetList) ? 'text-red-500' : 'text-on-surface-variant'">Detailed Asset List</label>
                </div>

                <div class="relative floating-label-input group">
                  <textarea [(ngModel)]="listingForm.clientBase" name="clients" id="clients" placeholder=" " 
                            class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer min-h-[80px] placeholder-transparent"
                            [ngClass]="(showErrors && !listingForm.clientBase) ? 'border-red-500' : 'border-[#E2E8F0]'"></textarea>
                  <label for="clients" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                         [ngClass]="(showErrors && !listingForm.clientBase) ? 'text-red-500' : 'text-on-surface-variant'">Client Portfolio / Reach</label>
                </div>

                <div class="p-8 border-2 border-dashed rounded-xl text-center transition-colors relative overflow-hidden" 
                     [ngClass]="(showErrors && listingForm.imageUrls.length === 0) ? 'border-red-500 bg-red-50/30' : (listingForm.imageUrls.length > 0 ? 'border-green-500 bg-green-50/10' : 'border-outline-variant bg-surface-container-lowest')">
                  
                  <!-- Loading Overlay for Photos -->
                  <div *ngIf="isUploading['photos']" class="absolute inset-0 bg-surface/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 animate-in">
                    <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Uploading to Cloud...</p>
                  </div>

                  <span class="material-symbols-outlined text-4xl mb-4" [ngClass]="listingForm.imageUrls.length > 0 ? 'text-green-600' : ((showErrors && listingForm.imageUrls.length === 0) ? 'text-red-500' : 'text-outline-variant')">
                    {{ listingForm.imageUrls.length > 0 ? 'check_circle' : 'add_a_photo' }}
                  </span>
                  <p class="text-xs font-bold uppercase tracking-widest mb-2" [ngClass]="listingForm.imageUrls.length > 0 ? 'text-green-800' : ((showErrors && listingForm.imageUrls.length === 0) ? 'text-red-800' : 'text-on-surface-variant')">
                    {{ listingForm.imageUrls.length > 0 ? listingForm.imageUrls.length + ' Photos Uploaded' : 'Clear Business Photos' }}
                  </p>
                  
                  <!-- Image Previews -->
                  <div *ngIf="listingForm.imageUrls.length > 0" class="flex flex-wrap justify-center gap-2 mb-4">
                    <div *ngFor="let url of listingForm.imageUrls" class="w-12 h-12 rounded-lg overflow-hidden border border-green-200">
                      <img [src]="url" class="w-full h-full object-cover">
                    </div>
                  </div>

                  <p class="text-[10px] mb-4" [ngClass]="listingForm.imageUrls.length > 0 ? 'text-green-700' : ((showErrors && listingForm.imageUrls.length === 0) ? 'text-red-600' : 'text-on-surface-variant/60')">
                    {{ listingForm.imageUrls.length > 0 ? 'Successfully saved to server' : 'Upload exterior, interior, and operational shots (Max 10)' }}
                  </p>
                  <input type="file" multiple (change)="onFileSelected($event, 'photos')" class="hidden" #photoInput>
                  <button type="button" (click)="photoInput.click()" 
                          class="w-full sm:w-auto px-6 py-3 sm:py-2 text-xs font-black rounded-lg transition-all"
                          [ngClass]="listingForm.imageUrls.length > 0 ? 'bg-green-600 text-white' : ((showErrors && listingForm.imageUrls.length === 0) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-secondary/10 text-secondary hover:bg-secondary/20')">
                    {{ listingForm.imageUrls.length > 0 ? 'Add More Photos' : 'Select Photos' }}
                  </button>
                </div>
              </div>

              <!-- STEP 5: COMPLIANCE -->
              <div *ngIf="currentStep === 4" class="animate-in space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.gstNumber" name="gst" id="gst" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.gstNumber) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="gst" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.gstNumber) ? 'text-red-500' : 'text-on-surface-variant'">GST Number</label>
                  </div>
                  <div class="relative floating-label-input group">
                    <input type="text" [(ngModel)]="listingForm.companyPan" name="pan" id="pan" placeholder=" " 
                           class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer placeholder-transparent"
                           [ngClass]="(showErrors && !listingForm.companyPan) ? 'border-red-500' : 'border-[#E2E8F0]'">
                    <label for="pan" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                           [ngClass]="(showErrors && !listingForm.companyPan) ? 'text-red-500' : 'text-on-surface-variant'">Company PAN Card Number</label>
                  </div>
                </div>

                <div class="relative floating-label-input group">
                  <textarea [(ngModel)]="listingForm.businessLicenses" name="licenses" id="licenses" placeholder=" " 
                            class="block w-full px-4 py-4 text-on-surface bg-transparent border rounded-xl focus:ring-0 focus:border-secondary transition-all duration-300 peer min-h-[80px] placeholder-transparent"
                            [ngClass]="(showErrors && !listingForm.businessLicenses) ? 'border-red-500' : 'border-[#E2E8F0]'"></textarea>
                  <label for="licenses" class="absolute text-sm duration-300 transform top-4 left-4 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[2.2rem] peer-focus:bg-surface-container-lowest peer-focus:px-1 font-medium"
                         [ngClass]="(showErrors && !listingForm.businessLicenses) ? 'text-red-500' : 'text-on-surface-variant'">Existing Business Licenses (FSSAI, Trade, etc.)</label>
                </div>

                <div class="p-6 border rounded-xl flex items-center justify-between transition-colors relative"
                     [ngClass]="listingForm.panImageUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.panImageUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-low')">
                   
                   <div *ngIf="isUploading['panImageUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                     <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading...</span>
                   </div>

                   <div class="flex items-center gap-4">
                     <span class="material-symbols-outlined" [ngClass]="listingForm.panImageUrl ? 'text-green-600' : ((showErrors && !listingForm.panImageUrl) ? 'text-red-500' : 'text-secondary')">
                       {{ listingForm.panImageUrl ? 'verified' : 'badge' }}
                     </span>
                     <div>
                       <p class="text-xs font-bold" [ngClass]="listingForm.panImageUrl ? 'text-green-800' : ((showErrors && !listingForm.panImageUrl) ? 'text-red-800' : 'text-on-surface')">
                         {{ listingForm.pan_image_name || 'PAN Card Image' }}
                       </p>
                       <p class="text-[10px]" [ngClass]="listingForm.panImageUrl ? 'text-green-700' : ((showErrors && !listingForm.panImageUrl) ? 'text-red-600' : 'text-on-surface-variant')">
                         {{ listingForm.panImageUrl ? 'Saved to server' : 'Clear scan of Company PAN' }}
                       </p>
                     </div>
                   </div>
                   <input type="file" (change)="onFileSelected($event, 'panImageUrl')" class="hidden" #panInput>
                   <button type="button" (click)="panInput.click()" 
                           class="text-[10px] font-black uppercase tracking-widest hover:underline"
                           [ngClass]="listingForm.panImageUrl ? 'text-green-600' : ((showErrors && !listingForm.panImageUrl) ? 'text-red-600' : 'text-secondary')">
                     {{ listingForm.panImageUrl ? 'Replace' : 'Upload' }}
                   </button>
                </div>
              </div>
              <!-- STEP 6: VERIFICATION DOCUMENTS -->
              <div *ngIf="currentStep === 5" class="animate-in space-y-6">
                <div class="grid grid-cols-1 gap-4">
                  
                  <!-- Doc 1: COI -->
                  <div class="p-4 border rounded-xl flex items-center justify-between transition-all relative"
                       [ngClass]="listingForm.coiUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.coiUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-lowest hover:border-secondary')">
                    
                    <div *ngIf="isUploading['coiUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                      <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading to Cloud...</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined" [ngClass]="listingForm.coiUrl ? 'text-green-600' : ((showErrors && !listingForm.coiUrl) ? 'text-red-500' : 'text-primary')">
                        {{ listingForm.coiUrl ? 'check_circle' : 'description' }}
                      </span>
                      <div>
                        <p class="text-[13px] font-bold" [ngClass]="listingForm.coiUrl ? 'text-green-800' : 'text-on-surface'">{{ listingForm.coi_name || 'Certificate of Incorporation' }}</p>
                        <p *ngIf="listingForm.coiUrl" class="text-[10px] text-green-700 font-bold uppercase tracking-widest">Verified & Stored</p>
                      </div>
                    </div>
                    <input type="file" (change)="onFileSelected($event, 'coiUrl')" class="hidden" #coiInput>
                    <button type="button" (click)="coiInput.click()" 
                            class="px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all"
                            [ngClass]="listingForm.coiUrl ? 'bg-green-600 text-white' : ((showErrors && !listingForm.coiUrl) ? 'bg-red-500 text-white' : 'bg-primary/5 text-primary')">
                      {{ listingForm.coiUrl ? 'Change' : 'Select File' }}
                    </button>
                  </div>

                  <!-- Doc 2: MOA -->
                  <div class="p-4 border rounded-xl flex items-center justify-between transition-all relative"
                       [ngClass]="listingForm.moaUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.moaUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-lowest hover:border-secondary')">
                    
                    <div *ngIf="isUploading['moaUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                      <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading to Cloud...</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined" [ngClass]="listingForm.moaUrl ? 'text-green-600' : ((showErrors && !listingForm.moaUrl) ? 'text-red-500' : 'text-primary')">
                        {{ listingForm.moaUrl ? 'check_circle' : 'description' }}
                      </span>
                      <div>
                        <p class="text-[13px] font-bold" [ngClass]="listingForm.moaUrl ? 'text-green-800' : 'text-on-surface'">{{ listingForm.moa_name || 'Memorandum of Association (MOA)' }}</p>
                        <p *ngIf="listingForm.moaUrl" class="text-[10px] text-green-700 font-bold uppercase tracking-widest">Verified & Stored</p>
                      </div>
                    </div>
                    <input type="file" (change)="onFileSelected($event, 'moaUrl')" class="hidden" #moaInput>
                    <button type="button" (click)="moaInput.click()" 
                            class="px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all"
                            [ngClass]="listingForm.moaUrl ? 'bg-green-600 text-white' : ((showErrors && !listingForm.moaUrl) ? 'bg-red-500 text-white' : 'bg-primary/5 text-primary')">
                      {{ listingForm.moaUrl ? 'Change' : 'Select File' }}
                    </button>
                  </div>

                  <!-- Doc 3: AOA -->
                  <div class="p-4 border rounded-xl flex items-center justify-between transition-all relative"
                       [ngClass]="listingForm.aoaUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.aoaUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-lowest hover:border-secondary')">
                    
                    <div *ngIf="isUploading['aoaUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                      <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading to Cloud...</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined" [ngClass]="listingForm.aoaUrl ? 'text-green-600' : ((showErrors && !listingForm.aoaUrl) ? 'text-red-500' : 'text-primary')">
                        {{ listingForm.aoaUrl ? 'check_circle' : 'description' }}
                      </span>
                      <div>
                        <p class="text-[13px] font-bold" [ngClass]="listingForm.aoaUrl ? 'text-green-800' : 'text-on-surface'">{{ listingForm.aoa_name || 'Articles of Association (AOA)' }}</p>
                        <p *ngIf="listingForm.aoaUrl" class="text-[10px] text-green-700 font-bold uppercase tracking-widest">Verified & Stored</p>
                      </div>
                    </div>
                    <input type="file" (change)="onFileSelected($event, 'aoaUrl')" class="hidden" #aoaInput>
                    <button type="button" (click)="aoaInput.click()" 
                            class="px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all"
                            [ngClass]="listingForm.aoaUrl ? 'bg-green-600 text-white' : ((showErrors && !listingForm.aoaUrl) ? 'bg-red-500 text-white' : 'bg-primary/5 text-primary')">
                      {{ listingForm.aoaUrl ? 'Change' : 'Select File' }}
                    </button>
                  </div>

                  <!-- Doc 4: Financials -->
                  <div class="p-4 border rounded-xl flex items-center justify-between transition-all relative"
                       [ngClass]="listingForm.financialsUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.financialsUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-lowest hover:border-secondary')">
                    
                    <div *ngIf="isUploading['financialsUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                      <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading to Cloud...</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined" [ngClass]="listingForm.financialsUrl ? 'text-green-600' : ((showErrors && !listingForm.financialsUrl) ? 'text-red-500' : 'text-account_balance_wallet')">
                        {{ listingForm.financialsUrl ? 'check_circle' : 'account_balance_wallet' }}
                      </span>
                      <div>
                        <p class="text-[13px] font-bold" [ngClass]="listingForm.financialsUrl ? 'text-green-800' : 'text-on-surface'">{{ listingForm.financials_name || 'Latest Audited Financial Statement' }}</p>
                        <p *ngIf="listingForm.financialsUrl" class="text-[10px] text-green-700 font-bold uppercase tracking-widest">Verified & Stored</p>
                      </div>
                    </div>
                    <input type="file" (change)="onFileSelected($event, 'financialsUrl')" class="hidden" #finInput>
                    <button type="button" (click)="finInput.click()" 
                            class="px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all"
                            [ngClass]="listingForm.financialsUrl ? 'bg-green-600 text-white' : ((showErrors && !listingForm.financialsUrl) ? 'bg-red-500 text-white' : 'bg-primary/5 text-primary')">
                      {{ listingForm.financialsUrl ? 'Change' : 'Select File' }}
                    </button>
                  </div>

                  <!-- Doc 5: GST Cert -->
                  <div class="p-4 border rounded-xl flex items-center justify-between transition-all relative"
                       [ngClass]="listingForm.gstCertUrl ? 'border-green-500 bg-green-50/10' : ((showErrors && !listingForm.gstCertUrl) ? 'border-red-500 bg-red-50/30' : 'border-outline-variant bg-surface-container-lowest hover:border-secondary')">
                    
                    <div *ngIf="isUploading['gstCertUrl']" class="absolute inset-0 bg-surface/60 flex items-center justify-center z-10 rounded-xl">
                      <span class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Uploading to Cloud...</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="material-symbols-outlined" [ngClass]="listingForm.gstCertUrl ? 'text-green-600' : ((showErrors && !listingForm.gstCertUrl) ? 'text-red-500' : 'text-primary')">
                        {{ listingForm.gstCertUrl ? 'check_circle' : 'verified_user' }}
                      </span>
                      <div>
                        <p class="text-[13px] font-bold" [ngClass]="listingForm.gstCertUrl ? 'text-green-800' : 'text-on-surface'">{{ listingForm.gst_cert_name || 'GST Certificate' }}</p>
                        <p *ngIf="listingForm.gstCertUrl" class="text-[10px] text-green-700 font-bold uppercase tracking-widest">Verified & Stored</p>
                      </div>
                    </div>
                    <input type="file" (change)="onFileSelected($event, 'gstCertUrl')" class="hidden" #gstCertInput>
                    <button type="button" (click)="gstCertInput.click()" 
                            class="px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all"
                            [ngClass]="listingForm.gstCertUrl ? 'bg-green-600 text-white' : ((showErrors && !listingForm.gstCertUrl) ? 'bg-red-500 text-white' : 'bg-primary/5 text-primary')">
                      {{ listingForm.gstCertUrl ? 'Change' : 'Select File' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Form Footer Buttons -->
              <div class="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-surface-container">
                <button (click)="prevStep()" *ngIf="currentStep > 0" class="order-2 sm:order-1 flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold hover:bg-surface-container-low transition-colors active:scale-95" type="button">
                  <span class="material-symbols-outlined text-lg">west</span>
                  Go Back
                </button>
                <div *ngIf="currentStep === 0" class="order-2 sm:order-1">
                   <button class="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold hover:bg-surface-container-low transition-colors active:scale-95" type="button">
                    <span class="material-symbols-outlined text-lg">save</span>
                    Save Draft
                  </button>
                </div>

                <button (click)="nextStep()" *ngIf="currentStep < 5" class="order-1 sm:order-2 w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-tertiary-fixed-dim text-sm font-black uppercase tracking-wider active:scale-95 transition-all" type="button">
                  Next Step
                </button>
                
                <button (click)="publishListing()" *ngIf="currentStep === 5" class="order-1 sm:order-2 w-full sm:w-auto px-10 py-3 rounded-xl bg-secondary text-white text-sm font-black uppercase tracking-wider active:scale-95 transition-all" type="button">
                  Activate Listing
                </button>
              </div>
            </form>
          </div>

          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
        font-family: 'Work Sans', sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
    }
    .floating-label-input:focus-within label,
    .floating-label-input input:not(:placeholder-shown) + label,
    .floating-label-input textarea:not(:placeholder-shown) + label {
        transform: translateY(-2.2rem) scale(0.85);
        color: #FF7C2A;
        background: white;
        padding: 0 6px;
    }
    .editorial-shadow {
        box-shadow: 0 12px 40px rgba(25, 28, 29, 0.04);
    }
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(15px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .chevron-step {
        background: #f8f9ff;
        color: #0c023c;
        clip-path: polygon(calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%, 20px 50%, 0% 0%);
        margin-left: -18px;
    }
    .chevron-step:first-child {
        clip-path: polygon(calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%, 0% 50%, 0% 0%);
        margin-left: 0;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    .chevron-step:last-child {
        clip-path: polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 20px 50%, 0% 0%);
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
    }
    .chevron-step.active {
        background: #0c023c;
        color: white;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .chevron-step.completed {
        background: #eef2ff;
        color: #0c023c;
        border-left: 1px solid #FF7C2A;
    }
    .chevron-step.pending {
        background: #ffffff;
        color: #94a3b8;
        opacity: 0.6;
    }
    .chevron-step:hover:not(.active) {
        background: #fff7ed;
        color: #FF7C2A;
    }
  `]
})
export class SellComponent implements OnInit {
  public router = inject(Router);
  private listingService = inject(ListingService);
  Math = Math; // For template access

  currentStep = 0;
  isPublished = false;
  showErrors = false;
  toastMessage = '';
  isUploading: { [key: string]: boolean } = {};

  listingForm: any = {
    legalBusinessName: '',
    brandName: '',
    businessMode: 'Offline',
    category: '',
    city: '',
    state: '',
    physicalSqft: '',
    rentAndMaintenance: '',
    securityDeposit: '',
    lockInPeriod: '',
    averageDailyTurnover: '',
    averageMonthlyTurnover: '',
    annualRevenue: '',
    askingPrice: '',
    businessValue: '',
    description: '',
    assetList: '',
    clientBase: '',
    gstNumber: '',
    companyPan: '',
    businessLicenses: '',
    contactEmail: '',
    contactNumber: '',
    growthOpportunities: '',
    photos: [],
    imageUrls: [],
    panImageUrl: '',
    coiUrl: '',
    moaUrl: '',
    aoaUrl: '',
    financialsUrl: '',
    gstCertUrl: ''
  };

  steps = [
    {
      label: 'Identity',
      subtitle: 'Legal & Branding',
      icon: 'fact_check',
      guideTitle: 'Core Enterprise Identity',
      guideDescription: 'Establish the primary identification of your practice. This information forms the legal foundation of your marketplace listing.',
      tips: ['Verify your legal name exactly as per PAN.', 'Mission statements attract high-quality buyers.', 'Professional contact info is essential.']
    },
    {
      label: 'Operations',
      subtitle: 'Space & Logistics',
      icon: 'location_on',
      guideTitle: 'Space & Logistics',
      guideDescription: 'Provide detailed operational metrics including physical footprint and lease obligations.',
      tips: ['SQFT accuracy is vital for valuation.', 'Detailed lease terms reduce transition friction.', 'Rent and maintenance reflect overhead.']
    },
    {
      label: 'Financials',
      subtitle: 'Economic Performance',
      icon: 'payments',
      guideTitle: 'Economic Performance',
      guideDescription: 'Detail your revenue streams and expected valuation to attract institutional interest.',
      tips: ['Consistent turnover figures build trust.', 'Provide a realistic asking price.', 'The reason for selling should be transparent.']
    },
    {
      label: 'Portfolio',
      subtitle: 'Assets & Photos',
      icon: 'inventory_2',
      guideTitle: 'Assets & Brand',
      guideDescription: 'Showcase your tangible assets and professional reach through documentation and imagery.',
      tips: ['Comprehensive asset lists speed up DD.', 'Client reach indicates market stability.', 'High-quality photos increase engagement.']
    },
    {
      label: 'Compliance',
      subtitle: 'Legal & Tax',
      icon: 'gavel',
      guideTitle: 'Regulatory Integrity',
      guideDescription: 'Verify your statutory compliance through standard identification numbers.',
      tips: ['GST and PAN numbers are mandatory.', 'Encryption ensures your data is secure.', 'List all active operational licenses.']
    },
    {
      label: 'Verification',
      subtitle: 'Official Documents',
      icon: 'verified_user',
      guideTitle: 'Document Protocol',
      guideDescription: 'Upload essential corporate and financial filings to achieve a "Verified" status badge.',
      tips: ['Audited statements are highly valued.', 'COI and MOA verify corporate structure.', 'PDF format is preferred for documents.']
    }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 4000);
  }

  private validateStep(): boolean {
    this.showErrors = true;
    let isValid = true;
    let message = '';

    if (this.currentStep === 0) {
      if (!this.listingForm.legalBusinessName || !this.listingForm.brandName || !this.listingForm.category || !this.listingForm.growthOpportunities || !this.listingForm.contactEmail || !this.listingForm.contactNumber) {
        isValid = false;
        message = 'Please fill all identity and contact details.';
      }
    } else if (this.currentStep === 1) {
      if (!this.listingForm.city || !this.listingForm.state || !this.listingForm.physicalSqft || !this.listingForm.rentAndMaintenance || !this.listingForm.securityDeposit || !this.listingForm.lockInPeriod) {
        isValid = false;
        message = 'Please provide all operational and lease details.';
      }
    } else if (this.currentStep === 2) {
      if (!this.listingForm.averageDailyTurnover || !this.listingForm.averageMonthlyTurnover || !this.listingForm.askingPrice || !this.listingForm.businessValue || !this.listingForm.description) {
        isValid = false;
        message = 'Financial and performance data is required.';
      }
    } else if (this.currentStep === 3) {
      if (!this.listingForm.assetList || !this.listingForm.clientBase || this.listingForm.imageUrls.length === 0) {
        isValid = false;
        message = 'Asset details and business photos are required.';
      }
    } else if (this.currentStep === 4) {
      if (!this.listingForm.gstNumber || !this.listingForm.companyPan || !this.listingForm.businessLicenses || !this.listingForm.panImageUrl) {
        isValid = false;
        message = 'Compliance IDs and PAN image are required.';
      }
    } else if (this.currentStep === 5) {
      if (!this.listingForm.coiUrl || !this.listingForm.moaUrl || !this.listingForm.aoaUrl || !this.listingForm.financialsUrl || !this.listingForm.gstCertUrl) {
        isValid = false;
        message = 'All statutory verification documents are mandatory.';
      }
    }

    if (!isValid) {
      this.showToast(message);
      return false;
    }

    this.showErrors = false;
    return true;
  }

  nextStep() {
    if (!this.validateStep()) return;
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(index: number) {
    if (index <= this.currentStep) {
      this.currentStep = index;
    }
  }

  publishListing() {
    if (!this.validateStep()) return;

    // Map frontend fields to backend entity names
    const finalForm: any = {
      legalBusinessName: this.listingForm.legalBusinessName,
      brandName: this.listingForm.brandName,
      businessMode: this.listingForm.businessMode,
      category: this.listingForm.category,
      city: this.listingForm.city,
      state: this.listingForm.state,
      physicalSqft: Number(this.listingForm.physicalSqft),
      rentAndMaintenance: Number(this.listingForm.rentMaintenance),
      leaseAgreementUrl: "", // File handling to be implemented
      securityDeposit: Number(this.listingForm.securityDeposit),
      lockInPeriod: this.listingForm.lockInPeriod,
      averageDailyTurnover: Number(this.listingForm.dailyTurnover),
      averageMonthlyTurnover: Number(this.listingForm.monthlyTurnover),
      askingPrice: Number(this.listingForm.askingPrice),
      businessValue: Number(this.listingForm.businessValue),
      description: this.listingForm.reasonForSelling,
      assetList: this.listingForm.assetList,
      clientBase: this.listingForm.clientBase,
      gstNumber: this.listingForm.gstNumber,
      companyPan: this.listingForm.companyPan,
      businessLicenses: this.listingForm.businessLicenses,
      contactEmail: this.listingForm.contactEmail,
      contactNumber: this.listingForm.contactPhone,
      growthOpportunities: this.listingForm.vision,
      imageUrls: this.listingForm.imageUrls,
      panImageUrl: this.listingForm.pan_image,
      coiUrl: this.listingForm.coi,
      moaUrl: this.listingForm.moa,
      aoaUrl: this.listingForm.aoa,
      financialsUrl: this.listingForm.financials,
      gstCertUrl: this.listingForm.gst_cert,
      verificationStatus: 'PENDING'
    };

    // Remove any undefined/null/NaN values that might cause 400
    Object.keys(finalForm).forEach(key => {
      const val = finalForm[key];
      if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
        delete finalForm[key];
      }
    });

    this.listingService.createListing(finalForm).subscribe({
      next: (res) => {
        this.isPublished = true;
      },
      error: (err) => {
        console.error('Submission Failed', err);
        this.showToast('Submission failed. Please check your data.');
      }
    });
  }

  onFileSelected(event: any, field: string) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    this.isUploading[field] = true;

    // Convert to array for processing
    const fileList = Array.from(files) as File[];

    if (field === 'photos') {
      fileList.forEach(file => {
        this.listingService.uploadFile(file).subscribe({
          next: (res) => {
            this.listingForm.imageUrls.push(res.url);
            this.isUploading[field] = false;
          },
          error: (err) => {
            this.isUploading[field] = false;
            this.showToast('Photo upload failed.');
          }
        });
      });
    } else {
      const file = fileList[0];
      this.listingForm[field + '_name'] = file.name;
      this.listingService.uploadFile(file).subscribe({
        next: (res) => {
          this.listingForm[field] = res.url; // Save the URL instead of the File object
          this.isUploading[field] = false;
        },
        error: (err) => {
          this.isUploading[field] = false;
          this.showToast('Document upload failed.');
        }
      });
    }
  }
}
