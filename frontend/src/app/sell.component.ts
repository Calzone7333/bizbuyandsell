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
    <div class="h-full bg-white flex flex-col font-body antialiased overflow-hidden">
      
      <!-- ULTRA-COMPACT TOAST (Top-Right) -->
      <div *ngIf="toast.show" 
           class="fixed top-8 right-8 z-[100] w-64 bg-white text-[#192830] p-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.06)] animate-in overflow-hidden border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
             <span class="material-symbols-outlined text-[#192830] text-[14px]">info</span>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-[#192830]">{{ toast.message }}</h4>
            <div class="mt-1 flex flex-wrap gap-x-2 gap-y-1">
               <span *ngFor="let f of toast.fields; let last = last" class="text-[10px] font-bold text-slate-400">
                  {{ f }}{{ last ? '' : ',' }}
               </span>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 h-[2px] bg-[#192830] progress-line"></div>
      </div>

      <!-- MINIMAL TOP BAR -->
      <div class="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 md:px-8 z-50">
        <div class="flex items-center gap-2 md:gap-4">
           <button (click)="goBack()" class="text-slate-300 hover:text-slate-600 transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
           </button>
           <h1 class="text-[10px] md:text-[13px] font-bold text-[#192830] uppercase tracking-widest pl-2 md:pl-4 border-l border-slate-100 truncate max-w-[120px] md:max-w-none">Sell a Business</h1>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
           <span *ngIf="isPublished" class="hidden md:block text-[10px] font-black text-green-500 uppercase tracking-widest">Listing Published</span>
           <button (click)="goBack()" class="hidden sm:block px-4 md:px-6 py-2 bg-slate-50 border border-slate-100 text-[#192830] text-[10px] font-bold uppercase tracking-widest rounded shadow-sm hover:bg-slate-100 transition-all">Exit</button>
           <button (click)="publishListing()" class="px-4 md:px-8 py-2 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg hover:brightness-125 transition-all">Publish</button>
        </div>
      </div>

      <!-- MAIN SPLIT -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- SIDEBAR: MAIN STEPS -->
        <aside class="hidden lg:block w-72 bg-white border-r border-slate-100 p-10 overflow-y-auto relative">
          <div class="space-y-12 relative">
            <div class="absolute left-4 top-4 bottom-4 w-[1px] bg-slate-100 -z-0"></div>
            <div class="absolute left-4 top-4 w-[1px] bg-[#4185D0] -z-0 transition-all duration-700 ease-in-out"
                 [style.height]="(currentMainStep / (mainSteps.length - 1)) * 90 + '%'"></div>

            <ng-container *ngFor="let step of mainSteps; let i = index">
              <div class="flex gap-5 group cursor-pointer relative z-10" (click)="currentMainStep = i">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 flex items-center justify-center transition-all duration-500 relative"
                       [ngClass]="i < currentMainStep ? 'bg-[#4185D0] text-white rounded-xl' : (i === currentMainStep ? 'bg-[#4185D0] text-white rounded-xl shadow-lg ring-4 ring-blue-50' : 'bg-white border-2 border-slate-100 text-slate-300 rounded-xl')">
                    <span *ngIf="i < currentMainStep" class="material-symbols-outlined text-[16px] font-black">check</span>
                    <span *ngIf="i >= currentMainStep" class="text-[11px] font-bold">{{ i + 1 }}</span>
                  </div>
                </div>
                <div class="pt-1">
                  <p class="text-[13.5px] font-semibold transition-colors duration-300"
                     [ngClass]="i === currentMainStep ? 'text-[#4185D0]' : (i < currentMainStep ? 'text-[#192830]' : 'text-slate-300')">
                    {{ step.title }}
                  </p>
                  <p class="text-[9px] font-bold uppercase tracking-widest transition-opacity duration-500"
                     [ngClass]="i <= currentMainStep ? 'text-green-500/70' : 'text-slate-300 opacity-0'">
                    {{ i < currentMainStep ? 'Verified' : 'Active' }}
                  </p>
                </div>
              </div>
            </ng-container>
          </div>
        </aside>

        <!-- CONTENT AREA -->
        <main class="flex-1 overflow-y-auto bg-white p-6 md:p-20 relative">
          <div class="max-w-4xl mx-auto">
             
             <!-- VIEW 1: BASIC INFORMATION -->
             <ng-container *ngIf="currentMainStep === 0">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter mb-4">Foundational Setup</h2>
                   <p class="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">Foundational entry protocol for Establishing your Business on the Global Exchange.</p>
                </div>

                <div class="py-4">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Business Entity Name</label>
                         <input type="text" [(ngModel)]="listingForm.businessName" name="businessName" placeholder="e.g. Sterling Coffee" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Listing Title</label>
                         <input type="text" [(ngModel)]="listingForm.title" name="title" placeholder="Aged Software Company" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">City</label>
                         <input type="text" [(ngModel)]="listingForm.city" name="city" placeholder="Chennai" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Industry Classification</label>
                         <select [(ngModel)]="listingForm.category" name="category" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] outline-none">
                            <option>Retail & Hospitality</option>
                            <option>Technology & SaaS</option>
                            <option>Manufacturing</option>
                            <option>Franchise</option>
                            <option>Startup Investment</option>
                         </select>
                      </div>
                   </div>

                   <div class="mt-16 flex justify-end">
                      <button (click)="currentMainStep = 1" class="px-10 py-3 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg hover:brightness-125 transition-all active:scale-95 flex items-center gap-3">
                         Proceed to Financials
                         <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                   </div>
                </div>
             </ng-container>

             <!-- VIEW 2: FINANCIALS & VALUATION -->
             <ng-container *ngIf="currentMainStep === 1">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter mb-4">Financial Profile</h2>
                   <p class="text-sm text-slate-400 font-medium">Input your core numbers for automated market valuation.</p>
                </div>

                <div class="py-4">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Annual Revenue (₹Cr)</label>
                         <input type="number" [(ngModel)]="listingForm.annualRevenue" name="annualRevenue" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830]">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Net Profit (₹Lakhs)</label>
                         <input type="number" [(ngModel)]="listingForm.netProfit" name="netProfit" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830]">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Assets Value (₹Lakhs)</label>
                         <input type="number" [(ngModel)]="listingForm.assetsValue" name="assetsValue" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830]">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Asking Price (₹Cr)</label>
                         <input type="number" [(ngModel)]="listingForm.askingPrice" name="askingPrice" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830]">
                      </div>
                   </div>

                   <div class="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                      <div>
                         <p class="text-[10px] font-black uppercase text-[#4185D0]">Estimated Market Value</p>
                         <p class="text-2xl font-black text-[#192830]">₹{{ estimatedValue | number }} Cr</p>
                      </div>
                      <button (click)="calculateValuation()" class="px-6 py-2 bg-white text-[#4185D0] border border-blue-200 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-all">Calculate</button>
                   </div>

                   <div class="mt-16 flex justify-between">
                      <button (click)="currentMainStep = 0" class="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#192830]">Back</button>
                      <button (click)="currentMainStep = 2" class="px-10 py-3 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg">Proceed to Verification</button>
                   </div>
                </div>
             </ng-container>

             <!-- VIEW 3: VERIFICATION VAULT -->
             <ng-container *ngIf="currentMainStep === 2">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter mb-4">Verification Audit</h2>
                   <p class="text-sm text-slate-400 mb-8 font-medium">Verified listings attract institutional capital at a significantly higher rate.</p>
                   
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div (click)="uploadDoc('financial')" class="h-56 bg-white border border-slate-100 rounded-[32px] p-10 flex flex-col items-center justify-center space-y-5 hover:shadow-2xl transition-all cursor-pointer group">
                         <span class="material-symbols-outlined text-4xl text-slate-200 group-hover:text-[#4185D0] transition-all">upload_file</span>
                         <p class="text-[11px] font-bold text-slate-400 uppercase">3-Year P&L Statement</p>
                         <p *ngIf="uploadedDocs.includes('financial')" class="text-[9px] font-bold text-green-500 uppercase">Uploaded</p>
                      </div>
                      <div (click)="uploadDoc('gst')" class="h-56 bg-white border border-slate-100 rounded-[32px] p-10 flex flex-col items-center justify-center space-y-5 hover:shadow-2xl transition-all cursor-pointer group">
                         <span class="material-symbols-outlined text-4xl text-slate-200 group-hover:text-[#4185D0] transition-all">verified</span>
                         <p class="text-[11px] font-bold text-slate-400 uppercase">GST/Identity Proof</p>
                         <p *ngIf="uploadedDocs.includes('gst')" class="text-[9px] font-bold text-green-500 uppercase">Uploaded</p>
                      </div>
                   </div>

                   <div class="mt-16 flex justify-between">
                      <button (click)="currentMainStep = 1" class="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#192830]">Back</button>
                      <button (click)="currentMainStep = 3" class="px-10 py-3 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg">Final Review</button>
                   </div>
                </div>
             </ng-container>

             <!-- VIEW 4: MARKET ACTIVATION -->
             <ng-container *ngIf="currentMainStep === 3">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter mb-4">Market Activation</h2>
                   <p class="text-sm text-slate-400 mb-12 font-medium">Your listing is ready to be published to the global exchange.</p>
                   
                   <div class="p-10 bg-slate-50 rounded-[32px] border border-slate-100">
                      <div class="flex justify-between items-start mb-6">
                         <div>
                            <h3 class="text-2xl font-black text-[#192830]">{{ listingForm.title || listingForm.businessName }}</h3>
                            <p class="text-slate-400 text-sm">{{ listingForm.city }}, India</p>
                         </div>
                         <div class="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase">Identity Masked</div>
                      </div>
                      <div class="grid grid-cols-2 gap-8">
                         <div>
                            <p class="text-[10px] font-black text-slate-300 uppercase underline decoration-[#4185D0] underline-offset-4">Asking Price</p>
                            <p class="text-xl font-black text-[#192830]">₹{{ listingForm.askingPrice }} Cr</p>
                         </div>
                         <div>
                            <p class="text-[10px] font-black text-slate-300 uppercase underline decoration-[#FF7C2A] underline-offset-4">Net Profit</p>
                            <p class="text-xl font-black text-[#192830]">₹{{ listingForm.netProfit }} Lakhs</p>
                         </div>
                      </div>
                   </div>

                   <div class="mt-16 flex justify-between">
                      <button (click)="currentMainStep = 2" class="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#192830]">Back</button>
                      <button (click)="publishListing()" class="px-12 py-5 bg-[#192830] text-white text-[11px] font-bold uppercase tracking-widest rounded-3xl shadow-2xl hover:scale-105 transition-all">Publish Listing</button>
                   </div>
                </div>
             </ng-container>

          </div>
        </main>
      </div>
    </div>
  `,
   styles: [`
    :host { display: block; height: 100%; }
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shrinkLine { from { width: 100%; } to { width: 0%; } }
    .animate-in { animation: fadeIn 0.4s ease-out forwards; }
    .progress-line { animation: shrinkLine 3s linear forwards; }
  `]
})
export class SellComponent implements OnInit {
   private router = inject(Router);
   private listingService = inject(ListingService);

   currentMainStep = 0;
   isPublished = false;
   estimatedValue = 0;
   uploadedDocs: string[] = [];

   listingForm = {
      businessName: '',
      title: '',
      city: '',
      category: 'Retail & Hospitality',
      annualRevenue: 0,
      netProfit: 0,
      assetsValue: 0,
      askingPrice: 0,
      description: 'Investment opportunity in well-established business entity with growing operational margins and strong market presence.',
      hideBusinessName: true,
      hideExactAddress: true
   };

   toast = { show: false, message: '', fields: [] as string[] };

   mainSteps = [
      { title: 'Foundational Setup' },
      { title: 'Business Profile' },
      { title: 'Verification Audit' },
      { title: 'Market Activation' }
   ];

   ngOnInit() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   calculateValuation() {
      this.listingService.calculateValuation(this.listingForm.netProfit, this.listingForm.assetsValue).subscribe({
         next: (val) => {
            // Backend returns ₹Lakhs based on formula, convert to Cr if needed
            this.estimatedValue = val / 100; 
            this.showToast('Valuation Calculated', ['Based on 4x Multiplier']);
         }
      });
   }

   uploadDoc(type: string) {
      this.uploadedDocs.push(type);
      this.showToast('Document Uploaded', [type.toUpperCase()]);
   }

   publishListing() {
      this.listingService.createListing(this.listingForm).subscribe({
         next: (res) => {
            this.isPublished = true;
            this.showToast('Listing Published', ['BXB-8821 Live']);
            setTimeout(() => this.router.navigate(['/browse']), 2000);
         },
         error: (err) => {
            this.showToast('Publication Failed', ['Server Error']);
         }
      });
   }

   showToast(msg: string, fields: string[]) {
      this.toast.message = msg;
      this.toast.fields = fields;
      this.toast.show = true;
      setTimeout(() => this.toast.show = false, 3000);
   }

   goBack() { this.router.navigate(['/browse']); }
}

