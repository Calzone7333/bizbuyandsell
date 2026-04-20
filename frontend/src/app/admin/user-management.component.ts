import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8F9FA] dark:bg-gray-950 animate-slide-up custom-scrollbar">
       
       <!-- TOP KPI GRID -->
       <div class="grid grid-cols-12 gap-6">
          <div *ngFor="let s of stats" class="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
             <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined !text-[20px]" [class]="s.color">{{ s.icon }}</span>
                <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ s.label }}</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ s.val1 }}</p>
                   <p class="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-1 mt-1">● Accepted</p>
                </div>
                <div class="text-right">
                   <p class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ s.val2 }}</p>
                   <p class="text-[9px] font-black uppercase text-orange-400 flex items-center gap-1 mt-1">● Pending</p>
                </div>
             </div>
             <div class="mt-6 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                <span class="text-[9px] font-black text-emerald-500 flex items-center gap-1">
                   <span class="material-symbols-outlined !text-[14px]">trending_up</span> 2.75% Last month
                </span>
                <span class="text-[10px] font-black text-slate-300 cursor-pointer hover:text-slate-800 uppercase tracking-widest">View more</span>
             </div>
          </div>

          <!-- Special Gradient Alert Card -->
          <div class="col-span-12 lg:col-span-3 bg-gradient-to-br from-[#106d76] to-[#516169] p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between text-white relative overflow-hidden">
             <div class="z-10">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Waitlist</p>
                <h3 class="text-3xl font-black tracking-tighter mt-1">17.92k</h3>
             </div>
             <button class="z-10 w-full py-2.5 bg-white/10 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">View Details</button>
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>
       </div>

       <!-- TAB SYSTEM -->
       <div class="mt-12 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div class="px-8 pt-8 flex items-center gap-10 border-b border-gray-50 dark:border-gray-800">
             <div *ngFor="let t of tabs; let i = index" 
                  [class]="i === 0 ? 'text-[#046971] border-b-2 border-[#046971]' : 'text-slate-400 hover:text-slate-600'"
                  class="pb-4 text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all">
                {{ t.name }} <span class="ml-1 opacity-40">({{ t.count }})</span>
             </div>
          </div>

          <!-- TOOLBAR -->
          <div class="p-8 flex justify-between items-center gap-6">
             <div class="flex items-center gap-4 flex-1">
                <div class="relative max-w-sm flex-1">
                   <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 !text-[18px]">search</span>
                   <input class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold placeholder:text-slate-300 focus:ring-1 focus:ring-[#046971]" placeholder="Search user directory...">
                </div>
                <button class="px-4 py-2 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                   <span class="material-symbols-outlined !text-[16px]">sort</span> Sort by
                </button>
             </div>
             <button class="px-6 py-2.5 bg-white dark:bg-gray-900 border border-[#046971] text-[#046971] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#046971] hover:text-white transition-all">
                Create User <span class="material-symbols-outlined !text-[16px]">expand_more</span>
             </button>
          </div>

          <!-- DATA TABLE -->
          <div class="overflow-x-auto">
             <table class="w-full text-left border-collapse">
                <thead>
                   <tr class="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                      <th class="px-8 py-4 w-10"><input type="checkbox" class="rounded border-gray-300 text-[#046971]"></th>
                      <th class="px-4 py-4">ID</th>
                      <th class="px-4 py-4">Associated User</th>
                      <th class="px-4 py-4">Tier Value</th>
                      <th class="px-4 py-4">Balance</th>
                      <th class="px-4 py-4">Status</th>
                      <th class="px-4 py-4">Sent Date</th>
                      <th class="px-4 py-4">Due Date</th>
                      <th class="px-8 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                   <tr *ngFor="let u of users" class="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-all group">
                      <td class="px-8 py-5"><input type="checkbox" class="rounded border-gray-300 text-[#046971]"></td>
                      <td class="px-4 py-5 text-[11px] font-black text-slate-400">2501130</td>
                      <td class="px-4 py-5">
                         <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                               <img [src]="u.avatar" class="w-full h-full object-cover">
                            </div>
                            <div>
                               <p class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tighter">{{ u.name }}</p>
                               <p class="text-[9px] font-black text-slate-300 lowercase tracking-tighter leading-none">{{ u.email }}</p>
                            </div>
                         </div>
                      </td>
                      <td class="px-4 py-5 text-xs font-black text-slate-600 dark:text-slate-300">$ {{ u.value }}</td>
                      <td class="px-4 py-5 text-xs font-black text-slate-600 dark:text-slate-300">$ {{ u.balance }}</td>
                      <td class="px-4 py-5">
                         <span [class]="u.statusClass" class="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest">{{ u.status }}</span>
                      </td>
                      <td class="px-4 py-5 text-xs font-bold text-slate-400">{{ u.date }}</td>
                      <td class="px-4 py-5 text-xs font-bold text-slate-400">{{ u.date }}</td>
                      <td class="px-8 py-5 text-right">
                         <button class="px-4 py-1.5 bg-[#d5e5ef] text-[#192830] rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ml-auto shadow-sm active:scale-95 transition-all">
                            <span class="material-symbols-outlined !text-[14px]">edit</span> Edit
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
    h1, h2, h3, h4, .headline { 
      font-family: 'Manrope', sans-serif; 
      letter-spacing: -0.01em; 
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class UserManagementComponent {
  stats = [
    { label: 'Total Users', val1: '22.42k', val2: '15.52k', icon: 'account_balance_wallet', color: 'text-orange-400' },
    { label: 'Verified Accounts', val1: '24.47k', val2: '34.64k', icon: 'deployed_code', color: 'text-emerald-500' },
    { label: 'Internal Activity', val1: '17.92k', val2: '12.34k', icon: 'view_agenda', color: 'text-rose-400' }
  ];

  tabs = [
    { name: 'All Users', count: 120 },
    { name: 'Admins', count: 21 },
    { name: 'Brokers', count: 32 },
    { name: 'Leads', count: 12 }
  ];

  users = [
    { name: 'Albert Flores', email: 'albert@bizbuy.com', value: '2,084', balance: '8,264', status: 'Accepted', date: '10/12/2026', avatar: 'https://i.pravatar.cc/150?u=albert', statusClass: 'bg-emerald-50 text-emerald-600' },
    { name: 'Ronald Richards', email: 'ronald@bizbuy.com', value: '2,084', balance: '8,264', status: 'Overdue', date: '10/12/2026', avatar: 'https://i.pravatar.cc/150?u=ronald', statusClass: 'bg-rose-50 text-rose-600' },
    { name: 'Jane Cooper', email: 'jane@bizbuy.com', value: '2,084', balance: '8,264', status: 'Pending', date: '10/12/2026', avatar: 'https://i.pravatar.cc/150?u=jane', statusClass: 'bg-orange-50 text-orange-400' },
    { name: 'Brooklyn Simmons', email: 'brook@bizbuy.com', value: '2,084', balance: '8,264', status: 'Overdue', date: '10/12/2026', avatar: 'https://i.pravatar.cc/150?u=brook', statusClass: 'bg-rose-50 text-rose-600' },
    { name: 'Marvin McKinney', email: 'marvin@bizbuy.com', value: '2,084', balance: '8,264', status: 'Pending', date: '10/12/2026', avatar: 'https://i.pravatar.cc/150?u=marvin', statusClass: 'bg-orange-50 text-orange-400' }
  ];
}
