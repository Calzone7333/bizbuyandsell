import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: 'bottom' | 'top' | 'left' | 'right';
}

@Component({
  selector: 'app-welcome-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Onboarding Modal Overlay -->
    <div *ngIf="showPrompt" class="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/30">
      <!-- The Modal -->
      <div class="welcome-card relative w-full max-w-md bg-white rounded-[28px] shadow-[0_40px_100px_rgba(25,28,29,0.15)] overflow-hidden">
        
        <!-- Top Section: Asymmetric Floating Visuals -->
        <div class="relative h-40 bg-[#f8f9fa] flex items-center justify-center overflow-hidden">
          <!-- Abstract Gradient Mesh Background -->
          <div class="absolute inset-0 bg-gradient-to-tr from-[#192830]/5 via-[#046971]/5 to-[#f4bc7a]/5"></div>
          
          <!-- Floating Card 1: Asset Management (Scaled Down) -->
          <div class="absolute transform -translate-x-12 -translate-y-2 rotate-[-6deg] w-24 h-32 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-white/40 p-2.5 flex flex-col justify-between hidden md:flex opacity-60">
            <div class="w-6 h-6 rounded-sm bg-gradient-to-br from-[#192830] to-[#2f3e46] flex items-center justify-center text-white scale-75">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">account_balance</span>
            </div>
            <div class="space-y-1">
              <div class="h-1 w-6 bg-[#192830]/20 rounded"></div>
              <div class="h-2.5 w-full bg-[#192830]/10 rounded"></div>
              <div class="h-2.5 w-1/2 bg-[#192830]/10 rounded"></div>
            </div>
          </div>

          <!-- Floating Card 2: Market Intelligence (The Centerpiece - Scaled) -->
          <div class="z-10 w-32 h-40 bg-gradient-to-br from-[#192830] to-[#2f3e46] rounded-xl shadow-2xl p-4 flex flex-col justify-between transform translate-y-1 scale-[0.85]">
            <div class="flex justify-between items-start">
              <div class="w-8 h-8 rounded-lg bg-[#86d3dc]/20 flex items-center justify-center text-[#86d3dc]">
                <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">monitoring</span>
              </div>
              <span class="text-[7px] font-headline font-bold text-white/50 tracking-widest uppercase">Live</span>
            </div>
            <div class="space-y-2">
              <div class="h-0.5 bg-white/20 rounded-full w-full overflow-hidden">
                <div class="h-full bg-[#f4bc7a] w-3/4 animate-pulse"></div>
              </div>
              <div class="text-white font-headline font-black text-[13px] leading-tight">Institutional <br>Intelligence</div>
              <div class="flex items-center space-x-1">
                <div class="w-1 h-1 rounded-full bg-[#86d3dc]"></div>
                <span class="text-[7px] text-white/60 font-medium uppercase tracking-tighter">Real-time</span>
              </div>
            </div>
          </div>

          <!-- Floating Card 3: Security & Escrow (Scaled Down) -->
          <div class="absolute transform translate-x-12 translate-y-2 rotate-[8deg] w-24 h-32 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-white/40 p-2.5 flex flex-col items-center justify-center space-y-2.5 hidden md:flex opacity-60">
            <div class="w-8 h-8 rounded-full bg-[#046971]/10 flex items-center justify-center text-[#046971] scale-75">
              <span class="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div class="text-center">
              <div class="text-[7px] font-bold text-[#046971] tracking-widest uppercase">Verified</div>
              <div class="text-[9px] text-slate-500 font-bold leading-none">Escrow</div>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="px-7 pt-7 pb-9 text-center">
          <h1 class="font-headline text-[22px] font-black text-[#192830] tracking-tight mb-2.5">
            Welcome to the Platform!
          </h1>
          <p class="font-body text-slate-500 text-[13px] leading-relaxed max-w-[240px] mx-auto mb-7">
            Experience the future of digital asset management with our tools.
          </p>

          <!-- Pagination Indicator -->
          <div class="flex justify-center items-center space-x-1.5 mb-7">
            <div class="w-5 h-1 rounded-full bg-[#046971]"></div>
            <div class="w-1 h-1 rounded-full bg-slate-200"></div>
            <div class="w-1 h-1 rounded-full bg-slate-200"></div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between space-x-3">
            <button (click)="skipTour()" class="flex-1 py-3 px-4 font-headline font-bold text-[#192830] bg-[#f8f9fa] border border-slate-100 rounded-xl hover:bg-slate-50 transition-all active:scale-95 text-[10px] uppercase tracking-wider">
              Skip
            </button>
            <button (click)="startTour()" class="flex-[1.8] py-3 px-4 font-headline font-bold text-white bg-[#046971] rounded-xl shadow-lg shadow-[#046971]/20 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-wider">
              <span>Start Tour</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- Subtle Decorative Branding -->
        <div class="absolute top-4 left-4">
          <div class="flex items-center space-x-1.5 opacity-20">
            <div class="w-3.5 h-3.5 bg-[#192830] rounded-[2px]"></div>
            <span class="font-headline font-black text-[7px] tracking-tighter uppercase">Architectural Exchange</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TOUR TOOLTIP -->
    <div *ngIf="isTourActive" class="tour-overlay fixed inset-0 z-[600] pointer-events-none bg-black/5 transition-opacity">
      <div id="tour-tooltip" class="absolute pointer-events-auto bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 p-6 w-[280px] z-[601]">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-2 h-2 rounded-full bg-[#FF7C2A] animate-pulse"></span>
          <h3 class="font-black text-[10px] uppercase tracking-widest text-[#FF7C2A]">{{ steps[currentStepIndex].title }}</h3>
        </div>
        <p class="text-slate-600 text-[13px] leading-relaxed mb-6 font-medium">
          {{ steps[currentStepIndex].content }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">{{ currentStepIndex + 1 }} / {{ steps.length }}</span>
          <button (click)="nextStep()" class="px-6 py-2 bg-[rgb(25,40,48)] text-white font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all">
            {{ currentStepIndex === steps.length - 1 ? 'Finish' : 'Next' }}
          </button>
        </div>
        <!-- Arrow -->
        <div id="tour-arrow" class="absolute w-4 h-4 bg-white rotate-45 border-l border-t border-slate-100"></div>
      </div>
    </div>
  `
})
export class WelcomePopupComponent implements OnInit {
  showPrompt = false;
  isTourActive = false;
  currentStepIndex = 0;

  steps: TourStep[] = [
    { targetId: 'tour-buy', title: 'Acquisition', content: 'Browse thousands of verified businesses available for immediate purchase across India.', position: 'bottom' },
    { targetId: 'tour-sell', title: 'Divestiture', content: 'List your business discreetly and connect with high-net-worth accredited investors.', position: 'bottom' },
    { targetId: 'tour-investment', title: 'Capital', content: 'Explore exclusive high-yield investment opportunities and fractional ownership deals.', position: 'bottom' },
    { targetId: 'tour-login', title: 'Portal', content: 'Access your private dashboard to manage valuations, deals, and professional listings.', position: 'bottom' }
  ];

  ngOnInit() {
    const tourSeen = localStorage.getItem('productTourSeen');
    if (!tourSeen) {
      setTimeout(() => {
        this.showPrompt = true;
        this.animatePromptIn();
      }, 3000);
    }
  }

  animatePromptIn() {
    gsap.from('.welcome-card', {
      scale: 0.9,
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    });
  }

  startTour() {
    this.showPrompt = false;
    this.isTourActive = true;
    setTimeout(() => this.updateTooltipPosition(), 100);
  }

  skipTour() {
    this.showPrompt = false;
    localStorage.setItem('productTourSeen', 'true');
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.updateTooltipPosition();
    } else {
      this.finishTour();
    }
  }

  finishTour() {
    gsap.to('#tour-tooltip', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        this.isTourActive = false;
        localStorage.setItem('productTourSeen', 'true');
      }
    });
  }

  updateTooltipPosition() {
    const step = this.steps[this.currentStepIndex];
    const target = document.getElementById(step.targetId);
    if (!target) {
      // Fallback if target not found (e.g. login button vs account)
      if (step.targetId === 'tour-login') {
        const accountTarget = document.getElementById('tour-account');
        if (accountTarget) {
            this.positionTooltip(accountTarget, step);
            return;
        }
      }
      this.nextStep(); // Skip if target missing
      return;
    }

    this.positionTooltip(target, step);
  }

  positionTooltip(target: HTMLElement, step: TourStep) {
    const rect = target.getBoundingClientRect();
    const tooltip = document.getElementById('tour-tooltip');
    const arrow = document.getElementById('tour-arrow');

    if (!tooltip || !arrow) return;

    // Default position (bottom)
    let top = rect.bottom + 20;
    let left = rect.left + (rect.width / 2) - (280 / 2);

    // Keep on screen
    if (left < 20) left = 20;
    if (left + 280 > window.innerWidth - 20) left = window.innerWidth - 300;

    gsap.to(tooltip, {
      top: top,
      left: left,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    });

    // Arrow positioning
    gsap.set(arrow, {
        top: -8,
        left: (rect.left + rect.width / 2) - left - 8
    });

    // Highlight target
    gsap.to(target, {
        scale: 1.1,
        color: '#FF7C2A',
        duration: 0.4,
        yoyo: true,
        repeat: 1
    });
  }
}
