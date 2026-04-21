import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-10 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- HEADER SECTION -->
       <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
             <h1 class="text-3xl font-black text-[#192830] dark:text-white tracking-widest uppercase">Personnel Profile</h1>
             <p class="text-sm text-slate-400 font-medium mt-1">Manage your administrative credentials and security layer</p>
          </div>
          <div class="flex items-center gap-3">
             <span class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                <span class="material-symbols-outlined !text-[16px]">verified_user</span> Full System Access
             </span>
          </div>
       </div>

       <div class="grid grid-cols-12 gap-10">
          
          <!-- LEFT: AVATAR & QUICK ACTIONS -->
          <div class="col-span-12 lg:col-span-4 space-y-8">
             <div class="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-slate-50 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                <div class="relative group">
                   <div class="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-gray-800 p-1 bg-white shadow-inner overflow-hidden flex items-center justify-center">
                      <span *ngIf="!profileData.avatar" class="text-4xl font-black text-[#046971] uppercase">{{ getInitials() }}</span>
                      <img *ngIf="profileData.avatar" [src]="profileData.avatar" class="w-full h-full object-cover rounded-full">
                   </div>
                   <button class="absolute bottom-1 right-1 w-8 h-8 bg-[#046971] rounded-full text-white flex items-center justify-center border-2 border-white shadow-lg">
                      <span class="material-symbols-outlined !text-[16px]">photo_camera</span>
                   </button>
                </div>
                <h2 class="mt-6 text-xl font-black text-[#192830] dark:text-white uppercase tracking-tighter">{{ profileData.firstName }} {{ profileData.lastName }}</h2>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{{ profileData.jobTitle || 'System Administrator' }}</p>
                
                <div class="w-full mt-8 pt-8 border-t border-slate-50 dark:border-gray-800 space-y-3">
                   <button (click)="activeSubTab = 'basic'" 
                           [class.bg-slate-50]="activeSubTab === 'basic'"
                           class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[11px] font-black uppercase tracking-widest transition-all">
                      <span class="material-symbols-outlined !text-[18px]">badge</span> Identity Info
                   </button>
                   <button (click)="activeSubTab = 'security'" 
                           [class.bg-slate-50]="activeSubTab === 'security'"
                           class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[11px] font-black uppercase tracking-widest transition-all">
                      <span class="material-symbols-outlined !text-[18px]">lock_person</span> Security Layer
                   </button>
                </div>
             </div>

             <div class="bg-gradient-to-br from-[#192830] to-[#2a3c46] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Audit Status</p>
                <h4 class="text-2xl font-black mt-3 leading-tight tracking-tighter">Your internal account is fully compliant.</h4>
                <p class="text-[11px] opacity-60 mt-4 leading-relaxed font-medium">Last comprehensive audit was performed 14 days ago by the automated protocol.</p>
                <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
             </div>
          </div>

          <!-- RIGHT: FORMS -->
          <div class="col-span-12 lg:col-span-8">
             
             <!-- BASIC INFORMATION -->
             <div *ngIf="activeSubTab === 'basic'" class="bg-white dark:bg-gray-900 rounded-[32px] p-10 border border-slate-50 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-right-4">
                <h3 class="text-lg font-black text-[#192830] dark:text-white uppercase tracking-widest mb-10 flex items-center gap-3 border-b pb-6 border-slate-50">
                   <span class="w-1.5 h-6 bg-[#046971] rounded-full"></span>
                   Identity Disclosure
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                      <input type="text" [(ngModel)]="profileData.firstName"
                             class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#192830] dark:text-white focus:ring-2 focus:ring-[#046971]/10 outline-none">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                      <input type="text" [(ngModel)]="profileData.lastName"
                             class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#192830] dark:text-white focus:ring-2 focus:ring-[#046971]/10 outline-none">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Job Designation</label>
                      <input type="text" [(ngModel)]="profileData.jobTitle"
                             class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#192830] dark:text-white focus:ring-2 focus:ring-[#046971]/10 outline-none">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Direct Contact</label>
                      <input type="text" [(ngModel)]="profileData.phone"
                             class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#192830] dark:text-white focus:ring-2 focus:ring-[#046971]/10 outline-none">
                   </div>
                   <div class="md:col-span-2 space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Professional Abstract</label>
                      <textarea rows="4" [(ngModel)]="profileData.bio"
                                class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#192830] dark:text-white focus:ring-2 focus:ring-[#046971]/10 outline-none resize-none"></textarea>
                   </div>
                </div>

                <div class="mt-12 flex justify-end">
                   <button (click)="saveProfile()" class="px-10 py-4 bg-[#192830] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3">
                      Sync Profile Updates
                      <span *ngIf="loading" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                   </button>
                </div>
             </div>

             <!-- SECURITY LAYER -->
             <div *ngIf="activeSubTab === 'security'" class="bg-white dark:bg-gray-900 rounded-[32px] p-10 border border-slate-50 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-right-4">
                <h3 class="text-lg font-black text-[#192830] dark:text-white uppercase tracking-widest mb-10 flex items-center gap-3 border-b pb-6 border-slate-50">
                   <span class="w-1.5 h-6 bg-amber-400 rounded-full"></span>
                   System Access Protocol
                </h3>

                <div class="max-w-md space-y-6">
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Current Password</label>
                      <input type="password" [(ngModel)]="passwordData.oldPassword" class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">New Credential</label>
                      <input type="password" [(ngModel)]="passwordData.newPassword" class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Verification Match</label>
                      <input type="password" [(ngModel)]="passwordData.confirmPassword" class="w-full bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none">
                   </div>
                   
                   <div class="pt-6">
                      <button (click)="updatePassword()" class="w-full py-4 bg-[#FF7C2A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                         Authorized Password Rotation
                      </button>
                   </div>
                </div>

                <div class="mt-12 p-8 bg-rose-50 dark:bg-rose-950/20 rounded-3xl border border-rose-100 dark:border-rose-900/40">
                   <div class="flex items-start gap-5">
                      <span class="material-symbols-outlined text-rose-500 !text-3xl">policy</span>
                      <div>
                         <h4 class="text-sm font-black text-rose-700 dark:text-rose-400 uppercase tracking-tighter">Security Reminder</h4>
                         <p class="text-xs text-rose-600 dark:text-rose-500 mt-1 leading-relaxed font-medium">Internal administrative passwords must be changed every 90 days. Avoid reuse of common sequences.</p>
                      </div>
                   </div>
                </div>
             </div>

          </div>
       </div>

    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; min-height: 0; }
    h1, h2, h3, h4 { font-family: 'Manrope', sans-serif; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
  `]
})
export class AdminProfileComponent implements OnInit {
  activeSubTab = 'basic';
  loading = false;
  
  profileData: any = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    phone: '',
    bio: '',
    avatar: null
  };

  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profileData = { ...this.profileData, ...data };
      },
      error: (err) => console.error('Failed to load admin profile', err)
    });
  }

  getInitials(): string {
    const fn = this.profileData.firstName || '';
    const ln = this.profileData.lastName || '';
    if (!fn && !ln) return 'AD';
    return (fn.charAt(0) + ln.charAt(0)).toUpperCase();
  }

  saveProfile() {
    this.loading = true;
    this.userService.updateProfile(this.profileData).subscribe({
      next: () => {
        this.loading = false;
        alert('Institutional profile synchronized successfully.');
      },
      error: (err) => {
        this.loading = false;
        alert('Profile update failed: Permission denied or system error.');
      }
    });
  }

  updatePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Credential verification mismatch.');
      return;
    }
    this.userService.changePassword({
      oldPassword: this.passwordData.oldPassword,
      newPassword: this.passwordData.newPassword
    }).subscribe({
      next: () => {
        alert('Administrative password rotated successfully.');
        this.passwordData = { oldPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: (err) => alert('Security update rejected: Incorrect credentials.')
    });
  }
}
