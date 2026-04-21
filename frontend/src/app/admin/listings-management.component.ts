import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '../listing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listings-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex-1 overflow-y-auto p-12 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- HERO/HEADER SECTION -->
       <header class="mb-12 flex justify-between items-end">
          <div>
            <h2 class="text-5xl font-extrabold text-[#192830] dark:text-white mb-2 tracking-tight">Portfolio Control</h2>
            <p class="text-slate-500 max-w-2xl leading-relaxed text-sm font-medium">Systematic verification and management of institutional business assets on the BizBuyAndSell exchange.</p>
          </div>
          <button (click)="loadListings()" class="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <span class="material-symbols-outlined !text-[20px] text-slate-400">refresh</span>
          </button>
       </header>

       <!-- ADVANCED DATA TABLE -->
       <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(25,28,29,0.03)] border border-gray-100 dark:border-gray-800">
          <table class="w-full text-left border-collapse">
             <thead>
                <tr class="bg-[#2f3e46] text-white">
                   <th class="px-8 py-5 text-[10px] font-black tracking-widest uppercase">Asset Identity</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Industry</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Asking Price</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Revenue/Profit</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Status</th>
                   <th class="px-8 py-5">Verification</th>
                </tr>
             </thead>
             <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                <tr *ngFor="let listing of realListings" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer">
                   <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                         <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            <span class="material-symbols-outlined text-[#192830] dark:text-white !text-[20px]">business</span>
                         </div>
                         <div>
                            <p class="font-black text-[#192830] dark:text-white text-sm tracking-tight">{{ listing.businessName }}</p>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{{ listing.title }}</p>
                         </div>
                      </div>
                   </td>
                   <td class="px-6 py-6 text-xs font-bold text-slate-600 dark:text-slate-300">{{ listing.category }}</td>
                   <td class="px-6 py-6 text-xs font-black text-[#046971]">₹{{ listing.askingPrice }}Cr</td>
                   <td class="px-6 py-6 font-bold">
                      <p class="text-xs text-slate-500">R: ₹{{ listing.annualRevenue }}Cr</p>
                      <p class="text-[10px] text-[#FF7C2A]">P: ₹{{ listing.netProfit }}L</p>
                   </td>
                   <td class="px-6 py-6">
                      <span [ngClass]="{
                        'bg-amber-50 text-amber-600 border-amber-100': listing.verificationStatus === 'PENDING',
                        'bg-emerald-50 text-emerald-600 border-emerald-100': listing.verificationStatus === 'VERIFIED',
                        'bg-rose-50 text-rose-600 border-rose-100': listing.verificationStatus === 'REJECTED'
                      }" class="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest border">
                        {{ listing.verificationStatus }}
                      </span>
                   </td>
                   <td class="px-8 py-6 text-right">
                      <button (click)="openVerification(listing)" class="px-4 py-2 bg-[#192830] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#2f3e46] transition-all">
                        Audit Asset
                      </button>
                   </td>
                </tr>
             </tbody>
          </table>
       </div>

       <!-- VERIFICATION MODAL (CA EXPERT VIEW) -->
       <div *ngIf="selectedListing" class="fixed inset-0 z-[100] flex items-center justify-center bg-[#192830]/60 backdrop-blur-sm p-4">
          <div class="bg-white dark:bg-gray-900 w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl animate-slide-up">
             <div class="p-10">
                <div class="flex justify-between items-start mb-10">
                   <div>
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#4185D0] mb-2 block">CA Verification Sequence</span>
                      <h3 class="text-3xl font-black text-[#192830] dark:text-white tracking-tighter">Audit Checklist</h3>
                   </div>
                   <button (click)="selectedListing = null" class="text-slate-300 hover:text-slate-600">
                      <span class="material-symbols-outlined">close</span>
                   </button>
                </div>

                <div class="space-y-6 mb-12">
                   <!-- Requirement 1: Financial Statement -->
                   <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent" [class.border-blue-200]="checklist.financials">
                      <div class="flex items-center gap-4">
                         <span class="material-symbols-outlined text-[#4185D0]">account_balance_wallet</span>
                         <span class="text-sm font-bold text-[#192830]">Financial Statement Check</span>
                      </div>
                      <input type="checkbox" [(ngModel)]="checklist.financials" class="w-5 h-5 rounded border-gray-300 text-[#4185D0] focus:ring-[#4185D0]">
                   </label>

                   <!-- Requirement 2: GST/Bank Validation -->
                   <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent" [class.border-blue-200]="checklist.gst">
                      <div class="flex items-center gap-4">
                         <span class="material-symbols-outlined text-[#4185D0]">verified_user</span>
                         <span class="text-sm font-bold text-[#192830]">GST & Bank Statement Validation</span>
                      </div>
                      <input type="checkbox" [(ngModel)]="checklist.gst" class="w-5 h-5 rounded border-gray-300 text-[#4185D0] focus:ring-[#4185D0]">
                   </label>

                   <!-- Requirement 3: Profit Verification -->
                   <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent" [class.border-blue-200]="checklist.profit">
                      <div class="flex items-center gap-4">
                         <span class="material-symbols-outlined text-[#4185D0]">trending_up</span>
                         <span class="text-sm font-bold text-[#192830]">Basic Profit Verification</span>
                      </div>
                      <input type="checkbox" [(ngModel)]="checklist.profit" class="w-5 h-5 rounded border-gray-300 text-[#4185D0] focus:ring-[#4185D0]">
                   </label>

                   <!-- Requirement 4: Business Identity -->
                   <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent" [class.border-blue-200]="checklist.identity">
                      <div class="flex items-center gap-4">
                         <span class="material-symbols-outlined text-[#4185D0]">badge</span>
                         <span class="text-sm font-bold text-[#192830]">Business Identity Confirmation</span>
                      </div>
                      <input type="checkbox" [(ngModel)]="checklist.identity" class="w-5 h-5 rounded border-gray-300 text-[#4185D0] focus:ring-[#4185D0]">
                   </label>

                   <div class="mt-6">
                      <label class="text-[10px] font-black uppercase text-slate-400 mb-2 block">CA Audit Summary</label>
                      <textarea [(ngModel)]="checklist.summary" rows="3" class="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" placeholder="Provide a summary of the audit findings..."></textarea>
                   </div>
                </div>

                <div class="flex gap-4">
                   <button (click)="selectedListing = null" class="flex-1 py-4 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400">Cancel</button>
                   <button (click)="submitVerification()" class="flex-1 py-4 bg-[#192830] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl">Complete Audit</button>
                </div>
             </div>
          </div>
       </div>

    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; min-height: 0; }
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.02em; 
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ListingsManagementComponent implements OnInit {
  @Input() listings: any[] = [];
  @Output() onBack = new EventEmitter<void>();

  private listingService = inject(ListingService);

  realListings: any[] = [];
  selectedListing: any = null;

  checklist = {
    financials: false,
    gst: false,
    profit: false,
    identity: false,
    summary: ''
  };

  ngOnInit() {
    this.loadListings();
  }

  loadListings() {
    this.listingService.getAllListings().subscribe({
      next: (data) => this.realListings = data,
      error: (err) => console.error('Failed to load listings', err)
    });
  }

  openVerification(listing: any) {
    this.selectedListing = listing;
    this.checklist = {
      financials: listing.financialStatementChecked,
      gst: listing.gstBankValidated,
      profit: listing.profitVerified,
      identity: listing.identityVerified,
      summary: listing.caAuditSummary || ''
    };
  }

  submitVerification() {
    if (!this.selectedListing) return;
    this.listingService.verifyListing(this.selectedListing.id, this.checklist).subscribe({
      next: () => {
        this.selectedListing = null;
        this.loadListings();
        alert('Verification sequence completed.');
      },
      error: (err) => alert('Failed to submit verification.')
    });
  }
}

