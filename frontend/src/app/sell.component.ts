import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
        <!-- Progress Line (Navbar Color) -->
        <div class="absolute bottom-0 left-0 h-[2px] bg-[#192830] progress-line"></div>
      </div>

      <!-- MINIMAL TOP BAR -->
      <div class="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-8 z-50">
        <div class="flex items-center gap-4">
           <button (click)="goBack()" class="text-slate-300 hover:text-slate-600 transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
           </button>
           <h1 class="text-[13px] font-bold text-[#192830] uppercase tracking-widest pl-4 border-l border-slate-100">Sell a Business Portal</h1>
        </div>
        <div class="flex items-center gap-4">
           <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Listing ID: BXB-8821</span>
           <button (click)="goBack()" class="px-6 py-2 bg-slate-50 border border-slate-100 text-[#192830] text-[10px] font-bold uppercase tracking-widest rounded shadow-sm hover:bg-slate-100 transition-all">Save & Exit</button>
           <button class="px-8 py-2 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg">Publish</button>
        </div>
      </div>

      <!-- MAIN SPLIT -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- SIDEBAR: MAIN STEPS (With Kinetic Line Animation) -->
        <aside class="w-72 bg-white border-r border-slate-100 p-10 overflow-y-auto relative">
          <div class="space-y-12 relative">
            
            <!-- BACKGROUND LINE (The Grey Track) -->
            <div class="absolute left-4 top-4 bottom-4 w-[1px] bg-slate-100 -z-0"></div>
            
            <!-- ACTIVE ANIMATED LINE (The Blue Progress) -->
            <div class="absolute left-4 top-4 w-[1px] bg-[#4185D0] -z-0 transition-all duration-700 ease-in-out"
                 [style.height]="(currentMainStep / (mainSteps.length - 1)) * 90 + '%'"></div>

            <ng-container *ngFor="let step of mainSteps; let i = index">
              <div class="flex gap-5 group cursor-pointer relative z-10" (click)="currentMainStep = i">
                <!-- Status Squircle (Match Image Reference) -->
                <div class="flex flex-col items-center">
                  <!-- The Squircle Indicator -->
                  <div class="w-8 h-8 flex items-center justify-center transition-all duration-500 relative"
                       [ngClass]="i < currentMainStep ? 'bg-[#4185D0] text-white rounded-xl' : (i === currentMainStep ? 'bg-[#4185D0] text-white rounded-xl shadow-lg ring-4 ring-blue-50' : 'bg-white border-2 border-slate-100 text-slate-300 rounded-xl')">
                    
                    <span *ngIf="i < currentMainStep" class="material-symbols-outlined text-[16px] font-black">check</span>
                    <span *ngIf="i >= currentMainStep" class="text-[11px] font-bold">{{ i + 1 }}</span>
                  </div>
                </div>
                <!-- Content -->
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
        <main class="flex-1 overflow-y-auto bg-white p-20 relative">
          
          <div class="max-w-4xl mx-auto">
             
             <!-- VIEW 1: BASIC INFORMATION (Phase 0) -->
             <ng-container *ngIf="!showValuationPrompt && !showValuationDocs">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter mb-4">{{ mainSteps[currentMainStep].title }}</h2>
                   <p class="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">Foundational entry protocol for Establishing your Business on the Global Exchange.</p>
                </div>

                <!-- SEAMLESS FORM AREA (No Card/Shadow as requested) -->
                <div class="py-4">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Business Entity Name</label>
                         <input type="text" [(ngModel)]="listingForm.entityName" name="entityName" placeholder="e.g. Sterling Coffee" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Asset Location</label>
                         <input type="text" [(ngModel)]="listingForm.location" name="location" placeholder="Manhattan, NYC" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Industry Classification</label>
                         <select [(ngModel)]="listingForm.industry" name="industry" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] outline-none">
                            <option>Retail & Hospitality</option>
                            <option>Tehcnology & SaaS</option>
                            <option>Manufacturing</option>
                         </select>
                      </div>
                      <div class="space-y-3">
                         <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Operational Years</label>
                         <input type="number" [(ngModel)]="listingForm.years" name="years" placeholder="12" class="w-full bg-slate-50/70 border-none px-6 py-5 rounded-2xl text-[13.5px] font-medium text-[#192830] focus:bg-slate-100/50 outline-none transition-all">
                      </div>
                   </div>

                   <div class="mt-16 flex justify-end">
                      <button (click)="triggerValuationCheck()" class="px-10 py-3 bg-[#192830] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg hover:brightness-125 transition-all active:scale-95 flex items-center gap-3">
                         Proceed to Phase 2
                         <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                   </div>
                </div>
             </ng-container>

             <!-- VIEW 2: VALUATION GATE (Miniaturized & Aligned) -->
             <ng-container *ngIf="showValuationPrompt">
                <div class="py-12 animate-in max-w-2xl">
                   <div class="flex items-center gap-3 mb-6">
                      <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                         <span class="material-symbols-outlined text-[18px] text-[#4185D0]">verified</span>
                      </div>
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#4185D0]">Security Protocol</span>
                   </div>
                   
                   <h3 class="text-4xl font-black text-[#192830] tracking-tighter mb-6 leading-none">If you want validation?</h3>
                   <p class="text-slate-400 mb-12 max-w-xl" style="font-size: 16px; font-weight: 400; line-height: 32px;">Verified listings attract institutional capital at a significantly higher rate. Access the Digital Vault now to begin your verification sequence.</p>
                   
                   <div class="flex gap-4 max-w-sm">
                      <button (click)="goToDocs()" class="px-8 py-3 bg-[#192830] rounded text-[10px] font-bold text-white uppercase tracking-widest shadow-lg hover:brightness-125 transition-all">Yes, Validate Now</button>
                      <button (click)="skipToNext()" class="px-8 py-3 border border-slate-200 rounded text-[10px] font-bold text-[#192830] uppercase tracking-widest hover:bg-slate-50 transition-all">Skip for Later</button>
                   </div>
                </div>
             </ng-container>

             <!-- VIEW 3: DOCUMENT SUBMISSION -->
             <ng-container *ngIf="showValuationDocs">
                <div class="mb-14">
                   <h2 class="text-4xl font-black text-[#192830] tracking-tighter">Verification Vault</h2>
                   <p class="text-sm text-slate-400 font-medium">Please upload the required institutional audit documents.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div class="h-56 bg-white border border-slate-100 rounded-[32px] p-10 flex flex-col items-center justify-center space-y-5 hover:shadow-2xl transition-all cursor-pointer group">
                      <span class="material-symbols-outlined text-4xl text-slate-200 group-hover:text-[#4185D0] transition-all">upload_file</span>
                      <p class="text-[11px] font-bold text-slate-400 uppercase">3-Year P&L Statement</p>
                   </div>
                   <div class="h-56 bg-white border border-slate-100 rounded-[32px] p-10 flex flex-col items-center justify-center space-y-5 hover:shadow-2xl transition-all cursor-pointer group">
                      <span class="material-symbols-outlined text-4xl text-slate-200 group-hover:text-[#4185D0] transition-all">verified</span>
                      <p class="text-[11px] font-bold text-slate-400 uppercase">Tax Returns</p>
                   </div>
                </div>
                <div class="mt-16 flex justify-between items-center">
                   <button (click)="showValuationDocs = false; showValuationPrompt = true" class="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-[#192830]">Back</button>
                   <button (click)="skipToNext()" class="px-12 py-5 bg-[#192830] text-white text-[11px] font-bold uppercase tracking-widest rounded-3xl">Submit Vault</button>
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
   currentMainStep = 0;
   showValuationPrompt = false;
   showValuationDocs = false;

   constructor(private router: Router) {}

   // FORM DATA
   listingForm = {
      entityName: '',
      location: '',
      industry: 'Retail & Hospitality',
      years: ''
   };

   // TOAST STATE
   toast = {
      show: false,
      message: '',
      fields: [] as string[]
   };

   mainSteps = [
      { title: 'Foundational Setup', subtitle: 'Basic Profile' },
      { title: 'Business Profile', subtitle: 'Deep Detail' },
      { title: 'Verification Audit', subtitle: 'Value Analysis' },
      { title: 'Market Activation', subtitle: 'Portfolio Live' }
   ];

   ngOnInit() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   triggerValuationCheck() {
      const emptyFields = [];
      if (!this.listingForm.entityName) emptyFields.push('Business Entity Name');
      if (!this.listingForm.location) emptyFields.push('Asset Location');
      if (!this.listingForm.years) emptyFields.push('Operational Years');

      if (emptyFields.length > 0) {
         this.showToast('Registration Incomplete', emptyFields);
         return;
      }

      this.showValuationPrompt = true;
   }

   showToast(msg: string, fields: string[]) {
      this.toast.message = msg;
      this.toast.fields = fields;
      this.toast.show = true;

      setTimeout(() => {
         this.toast.show = false;
      }, 3000);
   }

   goToDocs() { this.showValuationPrompt = false; this.showValuationDocs = true; }
   skipToNext() {
      this.showValuationPrompt = false;
      this.showValuationDocs = false;
      this.currentMainStep = Math.min(this.currentMainStep + 1, this.mainSteps.length - 1);
   }

   goBack() {
      this.router.navigate(['/dashboard']);
   }
}
