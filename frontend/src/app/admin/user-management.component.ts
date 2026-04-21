import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- TOP KPI GRID -->
       <div class="grid grid-cols-12 gap-6">
          <div *ngFor="let s of stats()" class="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
             <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined !text-[20px]" [class]="s.color">{{ s.icon }}</span>
                <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ s.label }}</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ s.val1 }}</p>
                   <p class="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-1 mt-1">● {{ s.sub1 }}</p>
                </div>
                <div class="text-right">
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ s.val2 }}</p>
                   <p class="text-[9px] font-black uppercase text-orange-400 flex items-center gap-1 mt-1">● {{ s.sub2 }}</p>
                </div>
             </div>
          </div>

          <!-- Special Gradient Alert Card -->
          <div class="col-span-12 lg:col-span-3 bg-gradient-to-br from-[#192830] to-[#4185D0] p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between text-white relative overflow-hidden">
             <div class="z-10">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">System Status</p>
                <h3 class="text-3xl font-black tracking-tighter mt-1">SECURE</h3>
             </div>
             <button class="z-10 w-full py-2.5 bg-white/10 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Registry Health</button>
          </div>
       </div>

       <!-- TAB SYSTEM -->
       <div class="mt-12 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div class="px-8 pt-8 flex items-center gap-10 border-b border-gray-50 dark:border-gray-800">
             <div *ngFor="let t of tabs()" 
                  (click)="activeTab.set(t.id)"
                  [class]="activeTab() === t.id ? 'text-[#046971] border-b-2 border-[#046971]' : 'text-slate-400 hover:text-slate-600'"
                  class="pb-4 text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all">
               {{ t.name }} <span class="ml-1 opacity-40">({{ t.count }})</span>
             </div>
          </div>

          <!-- TOOLBAR -->
          <div class="p-8 flex justify-between items-center gap-6">
             <div class="flex items-center gap-4 flex-1">
                <div class="relative max-w-sm flex-1">
                   <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 !text-[18px]">search</span>
                   <input [(ngModel)]="searchQuery" (input)="onSearchChange()" 
                          class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold placeholder:text-slate-300 focus:ring-1 focus:ring-[#046971]" placeholder="Search by name or email...">
                </div>
                <div *ngIf="loading" class="flex items-center gap-2 animate-pulse">
                   <span class="w-4 h-4 border-2 border-[#046971]/20 border-t-[#046971] rounded-full animate-spin"></span>
                   <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Polling DB...</span>
                </div>
             </div>
             <button (click)="fetchUsers()" class="px-6 py-2.5 bg-white dark:bg-gray-900 border border-[#046971] text-[#046971] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#046971] hover:text-white transition-all">
                Refresh <span class="material-symbols-outlined !text-[16px]">refresh</span>
             </button>
          </div>

          <!-- DATA TABLE -->
          <div class="overflow-x-auto min-h-[400px]">
             <table class="w-full text-left border-collapse">
                <thead>
                   <tr class="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                      <th class="px-8 py-4 w-10">UID</th>
                      <th class="px-4 py-4">Associated User</th>
                      <th class="px-4 py-4">Phone</th>
                      <th class="px-4 py-4">KYC Status</th>
                      <th class="px-4 py-4">Visibility</th>
                      <th class="px-8 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                   <tr *ngFor="let u of filteredUsers()" class="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-all group">
                      <td class="px-8 py-5 text-[11px] font-black text-slate-400">#{{ u.id }}</td>
                      <td class="px-4 py-5">
                         <div class="flex items-center gap-4">
                            <!-- Avatar Logic: Image if exists, else Initials -->
                            <div class="w-10 h-10 rounded-full border border-slate-100 shadow-sm overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center">
                               <img *ngIf="u.avatar" [src]="u.avatar" class="w-full h-full object-cover">
                               <span *ngIf="!u.avatar" class="text-[11px] font-black uppercase text-[#046971]">
                                  {{ getInitials(u) }}
                               </span>
                            </div>
                            <div>
                               <p class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tighter">{{ (u.firstName || u.email.split('@')[0]) }} {{ u.lastName || '' }}</p>
                               <p class="text-[9px] font-black text-slate-300 lowercase tracking-tighter leading-none">{{ u.email }}</p>
                            </div>
                         </div>
                      </td>
                      <td class="px-4 py-5 text-xs font-black text-slate-600 dark:text-slate-300">{{ u.phone || 'N/A' }}</td>
                      <td class="px-4 py-5">
                         <span [class]="u.kycVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'" class="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest border border-current/10">
                           {{ u.kycVerified ? 'Verified' : 'Pending' }}
                         </span>
                      </td>
                      <td class="px-4 py-5">
                         <span [class]="u.active ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'" class="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest shadow-sm">
                           {{ u.active ? 'Live' : 'Deactivated' }}
                         </span>
                      </td>
                      <td class="px-8 py-5 text-right">
                         <button class="px-3 py-1.5 bg-[#d5e5ef] text-[#192830] rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ml-auto shadow-sm active:scale-95 transition-all">
                            <span class="material-symbols-outlined !text-[14px]">bolt</span> Detailed View
                         </button>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>

    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; min-height: 0; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class UserManagementComponent implements OnInit {
  usersQuery = signal<any[]>([]);
  activeTab = signal('all');
  searchQuery = '';
  loading = false;

  constructor(private userService: UserService) {}

  stats = computed(() => {
    const list = this.usersQuery();
    return [
      { 
        label: 'Platform Users', 
        val1: list.length.toString(), 
        sub1: 'Registered',
        val2: list.filter(u => !u.enabled).length.toString(), 
        sub2: 'Unverified',
        icon: 'group', 
        color: 'text-orange-400' 
      },
      { 
        label: 'Institutional KYC', 
        val1: list.filter(u => u.kycVerified).length.toString(), 
        sub1: 'Verified',
        val2: list.filter(u => !u.kycVerified).length.toString(), 
        sub2: 'Waiting',
        icon: 'verified_user', 
        color: 'text-emerald-500' 
      },
      { 
        label: 'Access Protocols', 
        val1: list.filter(u => u.role === 'ADMIN').length.toString(), 
        sub1: 'Admins',
        val2: list.filter(u => u.role !== 'ADMIN').length.toString(), 
        sub2: 'Standard',
        icon: 'security', 
        color: 'text-[#192830]' 
      }
    ];
  });

  tabs = computed(() => {
    const all = this.usersQuery();
    return [
      { id: 'all', name: 'All Users', count: all.length },
      { id: 'ADMIN', name: 'Admins', count: all.filter(u => u.role === 'ADMIN').length },
      { id: 'USER', name: 'Standard Users', count: all.filter(u => u.role === 'USER').length },
      { id: 'deactivated', name: 'Deactivated', count: all.filter(u => !u.active).length }
    ];
  });

  filteredUsers = computed(() => {
    let list = this.usersQuery();
    if (this.activeTab() === 'deactivated') list = list.filter(u => !u.active);
    else if (this.activeTab() !== 'all') list = list.filter(u => u.role === this.activeTab() && u.active);

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(u => u.email?.toLowerCase().includes(q) || u.firstName?.toLowerCase().includes(q) || u.lastName?.toLowerCase().includes(q));
    }
    return list;
  });

  ngOnInit() { this.fetchUsers(); }

  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.loading = false;
        this.usersQuery.set(data);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching data', err);
      }
    });
  }

  getInitials(u: any): string {
    if (!u.firstName && !u.lastName) return u.email.substring(0, 2).toUpperCase();
    const first = u.firstName ? u.firstName.charAt(0) : '';
    const last = u.lastName ? u.lastName.charAt(0) : '';
    return (first + last).toUpperCase();
  }

  onSearchChange() {}
}
