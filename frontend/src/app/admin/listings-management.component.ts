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
            <h2 style="font-family: 'Work Sans', sans-serif; font-size: 42px; font-weight: 700; line-height: 52px; color: rgb(12, 2, 60);" class="mb-2 tracking-tight">Portfolio Control</h2>
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
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Industry & Mode</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Financials</th>
                   <th class="px-6 py-5 text-[10px] font-black tracking-widest uppercase">Status</th>
                   <th class="px-8 py-5 text-right">Actions</th>
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
                            <p class="font-black text-[#192830] dark:text-white text-sm tracking-tight">{{ listing.brandName || 'N/A' }}</p>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{{ listing.legalBusinessName || 'N/A' }}</p>
                         </div>
                      </div>
                   </td>
                   <td class="px-6 py-6">
                      <p class="text-xs font-bold text-slate-600 dark:text-slate-300">{{ listing.category }}</p>
                      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ listing.businessMode }}</p>
                   </td>
                   <td class="px-6 py-6 font-bold">
                      <p class="text-xs text-[#046971]">Ask: ₹{{ listing.askingPrice }}Cr</p>
                      <p class="text-[10px] text-slate-400 mt-0.5">Rev: ₹{{ listing.averageMonthlyTurnover }}L/mo</p>
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
                      <div class="flex items-center justify-end gap-2">
                        <button (click)="viewDetails(listing)" class="p-2 text-slate-400 hover:text-[#4185D0] transition-colors" title="View Full Details">
                           <span class="material-symbols-outlined !text-[20px]">visibility</span>
                        </button>
                        <button (click)="openVerification(listing)" class="px-4 py-2 bg-[#192830] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#2f3e46] transition-all">
                           Audit Asset
                        </button>
                      </div>
                   </td>
                </tr>
             </tbody>
          </table>
       </div>

       <!-- FULL DETAILS MODAL -->
       <div *ngIf="viewingListing" class="fixed inset-0 z-[110] flex items-center justify-center bg-[#192830]/80 backdrop-blur-md p-4 lg:p-12">
          <div class="bg-white dark:bg-gray-900 w-full max-w-6xl h-full max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col animate-slide-up">
             
             <!-- Modal Header -->
             <div class="px-10 py-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-950/50">
                <div class="flex items-center gap-6">
                   <div class="w-12 h-12 bg-[#192830] text-white rounded-2xl flex items-center justify-center">
                      <span class="material-symbols-outlined !text-2xl">business</span>
                   </div>
                   <div>
                      <h3 class="text-2xl font-black text-[#192830] dark:text-white tracking-tighter">{{ viewingListing.brandName }}</h3>
                      <p class="text-[10px] font-black uppercase tracking-[0.2em] text-[#4185D0]">Asset ID: #{{ viewingListing.id }} • {{ viewingListing.category }}</p>
                   </div>
                </div>
                <button (click)="viewingListing = null" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                   <span class="material-symbols-outlined">close</span>
                </button>
             </div>

             <!-- Modal Body (Scrollable) -->
             <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   
                   <!-- LEFT COLUMN: Core Identity & Operations -->
                   <div class="lg:col-span-2 space-y-12">
                      
                      <!-- Section 1: Business Identity -->
                      <section>
                         <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-2">01. Enterprise Identity</h4>
                         <div class="grid grid-cols-2 gap-8">
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Legal Name</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.legalBusinessName }}</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Business Mode</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.businessMode }}</p>
                            </div>
                            <div class="col-span-2">
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Mission & Growth Vision</p>
                               <p class="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{{ viewingListing.growthOpportunities }}</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Contact Email</p>
                               <p class="text-sm font-bold text-[#4185D0]">{{ viewingListing.contactEmail }}</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Contact Number</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.contactNumber }}</p>
                            </div>
                         </div>
                      </section>

                      <!-- Section 2: Operational Profile -->
                      <section>
                         <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-2">02. Operational Metrics</h4>
                         <div class="grid grid-cols-3 gap-8">
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Location</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.city }}, {{ viewingListing.state }}</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Physical Size</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.physicalSqft }} SQFT</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Rent/Maintenance</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">₹{{ viewingListing.rentAndMaintenance }}/mo</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Lease Status</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">Registered</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Security Deposit</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">₹{{ viewingListing.securityDeposit }}</p>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Lock-in Period</p>
                               <p class="text-sm font-bold text-[#192830] dark:text-white">{{ viewingListing.lockInPeriod }}</p>
                            </div>
                         </div>
                      </section>

                      <!-- Section 3: Performance & Portfolio -->
                      <section>
                         <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-2">03. Performance & Assets</h4>
                         <div class="space-y-6">
                            <div class="grid grid-cols-2 gap-8">
                               <div class="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl">
                                  <p class="text-[9px] font-black text-emerald-600 uppercase mb-1">Asking Price</p>
                                  <p class="text-xl font-black text-emerald-700 dark:text-emerald-400">₹{{ viewingListing.askingPrice }}Cr</p>
                               </div>
                               <div class="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
                                  <p class="text-[9px] font-black text-blue-600 uppercase mb-1">Assessed Value</p>
                                  <p class="text-xl font-black text-blue-700 dark:text-blue-400">₹{{ viewingListing.businessValue }}Cr</p>
                               </div>
                            </div>
                            <div>
                               <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Reason for Selling</p>
                               <p class="text-sm font-medium text-slate-600 dark:text-slate-400 italic leading-relaxed">"{{ viewingListing.description }}"</p>
                            </div>
                            <div class="grid grid-cols-2 gap-8">
                               <div>
                                  <p class="text-[9px] font-black text-slate-400 uppercase mb-2">Inventory/Asset List</p>
                                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300">
                                     {{ viewingListing.assetList }}
                                  </div>
                               </div>
                               <div>
                                  <p class="text-[9px] font-black text-slate-400 uppercase mb-2">Client Portfolio</p>
                                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300">
                                     {{ viewingListing.clientBase }}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </section>

                   </div>

                   <!-- RIGHT COLUMN: Photos & Documents -->
                   <div class="space-y-12">
                      
                      <!-- Section 4: Visual Assets -->
                      <section>
                         <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-2">04. Visual Gallery</h4>
                         <div class="grid grid-cols-2 gap-2">
                            <div *ngFor="let img of viewingListing.imageUrls" class="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                               <img [src]="img" class="w-full h-full object-cover">
                            </div>
                            <div *ngIf="!viewingListing.imageUrls?.length" class="col-span-2 py-8 text-center bg-gray-50 rounded-xl text-[10px] font-bold text-slate-400 uppercase">
                               No Photos Uploaded
                            </div>
                         </div>
                      </section>

                      <!-- Section 5: Compliance & Vault -->
                      <section>
                         <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-2">05. Document Vault</h4>
                         <div class="space-y-3">
                            <!-- Verification Document Items -->
                            <a *ngIf="viewingListing.panImageUrl" [href]="viewingListing.panImageUrl" target="_blank" class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group">
                               <div class="flex items-center gap-3">
                                  <span class="material-symbols-outlined text-orange-500">badge</span>
                                  <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300">Company PAN</span>
                               </div>
                               <span class="material-symbols-outlined text-slate-300 group-hover:text-[#4185D0] !text-lg">open_in_new</span>
                            </a>
                            <a *ngIf="viewingListing.coiUrl" [href]="viewingListing.coiUrl" target="_blank" class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group">
                               <div class="flex items-center gap-3">
                                  <span class="material-symbols-outlined text-blue-500">description</span>
                                  <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300">Certificate of Inc.</span>
                               </div>
                               <span class="material-symbols-outlined text-slate-300 group-hover:text-[#4185D0] !text-lg">open_in_new</span>
                            </a>
                            <a *ngIf="viewingListing.financialsUrl" [href]="viewingListing.financialsUrl" target="_blank" class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group">
                               <div class="flex items-center gap-3">
                                  <span class="material-symbols-outlined text-emerald-500">account_balance_wallet</span>
                                  <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300">Financial Statement</span>
                               </div>
                               <span class="material-symbols-outlined text-slate-300 group-hover:text-[#4185D0] !text-lg">open_in_new</span>
                            </a>
                            <a *ngIf="viewingListing.gstCertUrl" [href]="viewingListing.gstCertUrl" target="_blank" class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group">
                               <div class="flex items-center gap-3">
                                  <span class="material-symbols-outlined text-purple-500">verified_user</span>
                                  <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300">GST Certificate</span>
                               </div>
                               <span class="material-symbols-outlined text-slate-300 group-hover:text-[#4185D0] !text-lg">open_in_new</span>
                            </a>
                            
                            <!-- If no docs -->
                            <div *ngIf="!viewingListing.panImageUrl && !viewingListing.coiUrl && !viewingListing.financialsUrl && !viewingListing.gstCertUrl" class="text-center py-6 text-[10px] font-bold text-slate-300 uppercase italic">
                               No Digital Assets Provided
                            </div>
                         </div>
                      </section>

                   </div>

                </div>
             </div>

             <!-- Modal Footer -->
             <div class="px-10 py-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 flex justify-end gap-4">
                <button (click)="viewingListing = null" class="px-6 py-3 text-xs font-black uppercase text-slate-400 hover:text-slate-600 transition-colors">Close View</button>
                <button (click)="openVerification(viewingListing); viewingListing = null" class="px-8 py-3 bg-[#192830] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                   Proceed to Audit
                </button>
             </div>

          </div>
       </div>

       <!-- VERIFICATION MODAL (CA EXPERT VIEW) -->
       <div *ngIf="selectedListing" class="fixed inset-0 z-[120] flex items-center justify-center bg-[#192830]/60 backdrop-blur-sm p-4">
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
      font-family: 'Work Sans', sans-serif; 
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
  viewingListing: any = null;

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

  viewDetails(listing: any) {
    this.viewingListing = listing;
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

