import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <!-- SETTINGS SIDEBAR MENU -->
      <aside class="w-full lg:w-72 bg-white rounded-[32px] p-6 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] h-fit sticky top-24">
        <nav class="space-y-1">
          <button *ngFor="let item of menuItems" 
                  (click)="activeTab = item.id"
                  class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-medium transition-all group"
                  [ngClass]="activeTab === item.id ? 'bg-[#4185D0]/5 text-[#4185D0]' : (item.id === 'delete' ? 'text-red-400 hover:bg-red-50' : 'text-slate-500 hover:bg-slate-50')">
            <span class="material-symbols-outlined text-[20px] font-light" [ngClass]="activeTab === item.id ? 'text-[#4185D0]' : (item.id === 'delete' ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-600')">
              {{ item.icon }}
            </span>
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- SETTINGS CONTENT AREA -->
      <div class="flex-1 space-y-8">
        
        <!-- COMPACT PROFILE HEADER (NO COVER) -->
        <div class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative z-10">
             <!-- Avatar (Simplistic Focal Point) -->
             <div class="relative group">
                <div class="w-20 h-20 rounded-full border-2 border-slate-100 p-1 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover rounded-full">
                </div>
                <button class="absolute bottom-0 right-0 w-6 h-6 bg-[#4185D0] rounded-full text-white flex items-center justify-center border-2 border-white shadow-lg">
                   <span class="material-symbols-outlined text-[12px]">edit</span>
                </button>
             </div>
             
             <!-- Info -->
             <div class="flex-1 pb-1 text-center sm:text-left">
                <div class="flex items-center justify-center sm:justify-start gap-3">
                   <h2 class="text-xl font-black text-[#192830] tracking-tight">{{ username }}</h2>
                   <span class="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                      <span class="material-symbols-outlined text-[10px]">verified</span> Verified
                   </span>
                </div>
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                   <span class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span class="material-symbols-outlined text-sm">corporate_fare</span> Institutional Member
                   </span>
                   <span class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span class="material-symbols-outlined text-sm">list_alt</span> 4 Active Listings
                   </span>
                </div>
             </div>

             <!-- Action -->
             <div class="pb-1">
                <button class="px-8 py-2 bg-slate-50 border border-slate-100 text-[#192830] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95">
                   Public URL
                </button>
             </div>
          </div>
          
          <!-- Progression -->
          <div class="mt-8 pt-6 border-t border-slate-50">
             <div class="flex justify-between items-center mb-2">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Status</span>
                <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Level 3 • Full Access</span>
             </div>
             <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style="width: 100%"></div>
             </div>
          </div>
        </div>

        <!-- MAIN FORM CARD (Basic Information) -->
        <div *ngIf="activeTab === 'basic'" class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          <h3 class="text-[13px] font-black text-[#192830] uppercase tracking-widest mb-10 pb-4 border-b border-slate-50 flex items-center gap-3">
             <span class="w-1.5 h-6 bg-[#4185D0] rounded-full"></span>
             Identity & Professional Standing
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Legal Name</label>
                <input type="text" [(ngModel)]="profileData.firstName" placeholder="Full legal name"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4185D0]/10 focus:border-[#4185D0] transition-all">
             </div>

             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Principal Company</label>
                <input type="text" [(ngModel)]="profileData.lastName" placeholder="Entity name"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4185D0]/10 focus:border-[#4185D0] transition-all">
             </div>

             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Investment Sector</label>
                <select [(ngModel)]="profileData.jobTitle"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] focus:outline-none focus:ring-2 focus:ring-[#4185D0]/10 focus:border-[#4185D0] transition-all cursor-pointer">
                  <option value="">Select Primary Sector</option>
                  <option value="tech">Technology & SaaS</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="healthcare">Healthcare Services</option>
                </select>
             </div>



             <div class="md:col-span-2 space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Investment Thesis / Bio</label>
                <textarea rows="4" [(ngModel)]="profileData.bio" placeholder="Describe your acquisition strategy or business background..."
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4185D0]/10 focus:border-[#4185D0] transition-all resize-none"></textarea>
             </div>
          </div>

          <div class="mt-16 flex justify-end gap-4 border-t border-slate-50 pt-10">
             <button class="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Reset Changes</button>
             <button class="px-10 py-3 bg-[#192830] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                Save Account Updates
             </button>
          </div>
        </div>

        <!-- OTHER TAB PLACEHOLDERS -->
        <div *ngIf="activeTab !== 'basic'" class="bg-white rounded-[32px] p-20 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
           <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
              <span class="material-symbols-outlined text-slate-300 text-3xl font-light">
                {{ menuItems[0].id === activeTab ? menuItems[0].icon : 'construction' }}
              </span>
           </div>
           <h3 class="text-lg font-black text-[#192830] tracking-tight mb-2">{{ activeTab | titlecase }} Control Center</h3>
           <p class="text-sm text-slate-400 max-w-sm">This administrative section is receiving technical refinements. Global security protocols remain active.</p>
        </div>
        
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slide-in-from-bottom { from { transform: translateY(1rem); } to { transform: translateY(0); } }
    .animate-in { animation: fade-in 0.5s ease-out, slide-in-from-bottom 0.5s ease-out; }
  `]
})
export class SettingsComponent {
  @Input() username: string = 'Member';
  
  activeTab = 'basic';

  menuItems = [
    { id: 'basic', label: 'Basic Information', icon: 'person' },
    { id: 'password', label: 'Security & Password', icon: 'lock' },
    { id: 'devices', label: 'Recent Devices', icon: 'devices' },
    { id: 'notifs', label: 'Notifications', icon: 'notifications' },
    { id: 'delete', label: 'Delete Account', icon: 'delete_forever' }
  ];

  profileData = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    location: '',
    bio: ''
  };
}
