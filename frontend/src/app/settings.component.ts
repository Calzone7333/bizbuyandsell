import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt-32 px-6 lg:px-20 max-w-7xl mx-auto min-h-screen pb-20">
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
        </div>        <!-- IDENTITY & BASIC INFO -->
        <div *ngIf="activeTab === 'basic'" class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-right-4">
          <h3 class="text-[13px] font-black text-[#192830] uppercase tracking-widest mb-10 pb-4 border-b border-slate-50 flex items-center gap-3">
             <span class="w-1.5 h-6 bg-[#4185D0] rounded-full"></span>
             Identity & Professional Standing
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                <input type="text" [(ngModel)]="profileData.firstName"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] focus:ring-2 focus:ring-[#4185D0]/10 outline-none">
             </div>
             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                <input type="text" [(ngModel)]="profileData.lastName"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] focus:ring-2 focus:ring-[#4185D0]/10 outline-none">
             </div>
             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Investment Sector</label>
                <select [(ngModel)]="profileData.jobTitle" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] outline-none">
                   <option value="Private Equity">Private Equity</option>
                   <option value="M&A Advisory">M&A Advisory</option>
                   <option value="Corporate Development">Corporate Development</option>
                   <option value="Strategic Investor">Strategic Investor</option>
                </select>
             </div>
             <div class="space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Contact Phone</label>
                <input type="text" [(ngModel)]="profileData.phone"
                       class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] focus:ring-2 focus:ring-[#4185D0]/10 outline-none">
             </div>
             <div class="md:col-span-2 space-y-3">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Investment Thesis</label>
                <textarea rows="4" [(ngModel)]="profileData.bio" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold text-[#192830] outline-none resize-none"></textarea>
             </div>
          </div>
          <div class="mt-16 flex justify-end gap-4 border-t border-slate-50 pt-10">
             <button (click)="saveProfile()" class="px-10 py-4 bg-[#192830] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2">
                Save Account Updates
                <span *ngIf="loading" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             </button>
          </div>
        </div>

        <!-- SECURITY & PASSWORD -->
        <div *ngIf="activeTab === 'password'" class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-right-4">
           <h3 class="text-[13px] font-black text-[#192830] uppercase tracking-widest mb-10 pb-4 border-b border-slate-50 flex items-center gap-3">
             <span class="w-1.5 h-6 bg-amber-400 rounded-full"></span>
             Credential Management
           </h3>
           <div class="max-w-md space-y-8">
              <div class="space-y-3">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                 <input type="password" [(ngModel)]="passwordData.oldPassword" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm outline-none">
              </div>
              <div class="space-y-3">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                 <input type="password" [(ngModel)]="passwordData.newPassword" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm outline-none">
              </div>
              <div class="space-y-3">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                 <input type="password" [(ngModel)]="passwordData.confirmPassword" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm outline-none">
              </div>
              <button (click)="updatePassword()" class="w-full py-4 bg-[#FF7C2A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                 Update Security Credentials
              </button>
           </div>
        </div>

        <!-- RECENT DEVICES -->
        <div *ngIf="activeTab === 'devices'" class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-right-4">
           <h3 class="text-[13px] font-black text-[#192830] uppercase tracking-widest mb-10 pb-4 border-b border-slate-50">Authorized Terminals</h3>
           <div class="space-y-4">
              <div *ngFor="let device of devices" class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                       <span class="material-symbols-outlined text-slate-400">{{ device.icon }}</span>
                    </div>
                    <div>
                       <p class="text-sm font-bold text-[#192830]">{{ device.name }}</p>
                       <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ device.location }} • {{ device.time }}</p>
                    </div>
                 </div>
                 <span *ngIf="device.current" class="px-3 py-1 bg-[#4185D0]/10 text-[#4185D0] rounded-full text-[9px] font-black uppercase tracking-widest">Active Session</span>
              </div>
           </div>
        </div>

        <!-- NOTIFICATIONS -->
        <div *ngIf="activeTab === 'notifs'" class="bg-white rounded-[32px] p-8 border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-right-4">
           <h3 class="text-[13px] font-black text-[#192830] uppercase tracking-widest mb-10 pb-4 border-b border-slate-50">Communication Routing</h3>
           <div class="space-y-6">
              <div class="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                 <div>
                    <h4 class="text-sm font-bold text-[#192830]">Email Dispatch</h4>
                    <p class="text-xs text-slate-400">Receive strategic updates and listing alerts via email.</p>
                 </div>
                 <button (click)="profileData.emailNotifications = !profileData.emailNotifications" 
                         [ngClass]="profileData.emailNotifications ? 'bg-emerald-500' : 'bg-slate-200'"
                         class="w-12 h-6 rounded-full relative transition-all duration-300">
                    <div [ngClass]="profileData.emailNotifications ? 'translate-x-6' : 'translate-x-1'" class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                 </button>
              </div>
              <div class="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                 <div>
                    <h4 class="text-sm font-bold text-[#192830]">Browser Terminal Notifications</h4>
                    <p class="text-xs text-slate-400">Real-time alerts for incoming deal flow.</p>
                 </div>
                 <button (click)="profileData.pushNotifications = !profileData.pushNotifications" 
                         [ngClass]="profileData.pushNotifications ? 'bg-emerald-500' : 'bg-slate-200'"
                         class="w-12 h-6 rounded-full relative transition-all duration-300">
                    <div [ngClass]="profileData.pushNotifications ? 'translate-x-6' : 'translate-x-1'" class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                 </button>
              </div>
           </div>
        </div>

        <!-- DELETE ACCOUNT -->
        <div *ngIf="activeTab === 'delete'" class="bg-white rounded-[32px] p-8 border border-red-50 shadow-[0_20px_50px_rgba(239,68,68,0.05)] animate-in fade-in slide-in-from-right-4">
           <div class="flex items-start gap-6 p-8 bg-red-50/50 rounded-[28px] border border-red-100 mb-10">
              <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                 <span class="material-symbols-outlined text-red-500 text-3xl">warning</span>
              </div>
              <div>
                 <h3 class="text-lg font-black text-red-600 tracking-tight mb-2">Institutional Divestment Protocol</h3>
                 <p class="text-sm text-red-400 font-medium leading-relaxed">Deactivating your account will restrict access to all active listings and valuation tools. Your data remains in the registry for <span class="font-black">30 business days</span> for potential recovery before final archival.</p>
              </div>
           </div>
           
           <div class="space-y-4 max-w-lg">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">CONFIRMATION REQUIRED</p>
              <input type="text" [(ngModel)]="deleteConfirm" placeholder="Type UNLOCK to authorize deactivation" 
                     class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black focus:border-red-200 outline-none transition-all">
              <button (click)="handleDelete()" [disabled]="deleteConfirm !== 'UNLOCK'"
                      class="w-full py-4 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20 disabled:opacity-30 disabled:shadow-none transition-all hover:bg-red-600 active:scale-95">
                 Execute Account Deactivation
              </button>
           </div>
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
export class SettingsComponent implements OnInit {
  @Input() _username: string = '';
  
  get username(): string {
    if (this._username) return this._username;
    const email = localStorage.getItem('userEmail') || 'Guest';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  activeTab = 'basic';
  loading = false;
  deleteConfirm = '';

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
    jobTitle: 'Strategic Investor',
    phone: '',
    bio: '',
    emailNotifications: true,
    pushNotifications: false
  };

  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  devices = [
    { name: 'MacBook Pro 16"', location: 'Chennai, IN', time: 'Just now', icon: 'laptop_mac', current: true },
    { name: 'iPhone 15 Pro', location: 'Dubai, UAE', time: '2 hours ago', icon: 'smartphone', current: false },
    { name: 'Windows Terminal', location: 'Singapore, SG', time: 'Yesterday', icon: 'terminal', current: false }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profileData = { ...this.profileData, ...data };
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  saveProfile() {
    this.loading = true;
    this.userService.updateProfile(this.profileData).subscribe({
      next: () => {
        this.loading = false;
        alert('Profile updated successfully');
      },
      error: (err) => {
        this.loading = false;
        alert('Failed to update profile');
      }
    });
  }

  updatePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.userService.changePassword({
      oldPassword: this.passwordData.oldPassword,
      newPassword: this.passwordData.newPassword
    }).subscribe({
      next: () => alert('Password updated successfully'),
      error: (err) => alert('Error: ' + err.error?.error || 'Update failed')
    });
  }

  handleDelete() {
    if (confirm('Are you sure you want to deactivate your account? It will be restricted for 30 days.')) {
      this.userService.softDelete().subscribe({
        next: () => {
          alert('Account deactivated. Redirecting...');
          localStorage.clear();
          window.location.href = '/login';
        },
        error: (err) => alert('Deactivation failed')
      });
    }
  }
}

