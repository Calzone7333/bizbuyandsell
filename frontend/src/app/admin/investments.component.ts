import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto p-10 space-y-8 animate-slide-up bg-white dark:bg-gray-950">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-[#192830] dark:text-white tracking-widest uppercase">Investment Portfolio</h1>
          <p class="text-slate-400 font-medium mt-2">Monitor capital injection and venture fund allocation</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-gray-50 text-slate-600 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Audit Logs</button>
          <button class="bg-[#09337B] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#FF7C2A] transition-all">Export Report</button>
        </div>
      </div>

      <!-- Stats Rows -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div *ngFor="let stat of stats" class="p-8 bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
           <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{{ stat.label }}</p>
           <h3 class="text-3xl font-black text-[#192830] dark:text-white mb-4">{{ stat.value }}</h3>
           <div class="flex items-center gap-2">
             <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{{ stat.trend }}</span>
             <span class="text-[10px] text-slate-400">Monthly</span>
           </div>
        </div>
      </div>

      <!-- Detailed Investments Table -->
      <div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div class="p-8 border-b border-gray-50 dark:border-gray-800">
          <h2 class="text-xl font-black text-[#192830] dark:text-white uppercase tracking-tighter">Recent Allocations</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                <th class="px-8 py-5">Portfolio Entity</th>
                <th class="px-8 py-5">Funding Round</th>
                <th class="px-8 py-5">Capital</th>
                <th class="px-8 py-5">Equity</th>
                <th class="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
              <tr *ngFor="let invest of investments" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group cursor-pointer">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center font-bold text-[#09337B] dark:text-blue-400">
                      {{ invest.entity[0] }}
                    </div>
                    <span class="text-sm font-bold text-[#192830] dark:text-white capitalize">{{ invest.entity }}</span>
                  </div>
                </td>
                <td class="px-8 py-6 text-sm font-medium text-slate-500 uppercase tracking-tight">{{ invest.round }}</td>
                <td class="px-8 py-6 text-sm font-black text-[#192830] dark:text-white">{{ invest.amount }}</td>
                <td class="px-8 py-6 text-sm font-bold text-[#FF7C2A]">{{ invest.equity }}</td>
                <td class="px-8 py-6">
                  <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        [ngClass]="{'bg-emerald-50 text-emerald-600': invest.status === 'Completed', 'bg-amber-50 text-amber-600': invest.status === 'In Progress'}">
                    {{ invest.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; flex: 1; min-height: 0; }
    .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class InvestmentsComponent {
  stats = [
    { label: 'AUM (Market Cap)', value: '₹148.2 Cr', trend: '+18.4%' },
    { label: 'Active Investors', value: '1,240', trend: '+6.5%' },
    { label: 'Closed Deals', value: '42', trend: '+12.1%' }
  ];

  investments = [
    { entity: 'Nimbus Cloud Infra', round: 'Series B', amount: '₹12.5 Cr', equity: '15%', status: 'Completed' },
    { entity: 'Solara Energy', round: 'Seed Round', amount: '₹85 L', equity: '8%', status: 'In Progress' },
    { entity: 'MedFlow Systems', round: 'Series A', amount: '₹4.2 Cr', equity: '12%', status: 'Completed' },
    { entity: 'EcoHarvest Foods', round: 'Pre-Seed', amount: '₹45 L', equity: '10%', status: 'Completed' },
    { entity: 'Vortex Dynamics', round: 'Series C', amount: '₹48 Cr', equity: '18%', status: 'In Progress' }
  ];
}
