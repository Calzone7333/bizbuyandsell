import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

type AuthStep = 'request' | 'verify' | 'reset' | 'success';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="min-h-screen flex items-center justify-center relative p-6 bg-slate-900 overflow-hidden">
      <!-- Background Visual -->
      <div class="absolute inset-0 z-0 bg-[#09337B]">
        <img #bgImg alt="Secure corporate environment" 
             class="w-full h-full object-cover opacity-30 scale-105" 
             src="https://images.unsplash.com/photo-1573164060897-425941c30362?auto=format&fit=crop&q=80&w=1200">
        <div class="absolute inset-0 bg-black/40"></div>
      </div>

      <!-- Home Navigation -->
      <a routerLink="/" class="absolute top-10 right-10 flex items-center gap-2 group z-50">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Exit</span>
        <div class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
          <span class="material-symbols-outlined text-[16px] text-white/40 group-hover:text-white">close</span>
        </div>
      </a>

      <!-- Center Card Shell -->
      <div #authCard class="w-full max-w-md bg-white rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] p-10 relative z-10 opacity-0 translate-y-8">
        
        <!-- Brand Header (Always Visible) -->
        <div class="mb-10 text-center">
          <div class="inline-flex items-center gap-2 mb-2">
             <div class="w-8 h-8 bg-[#FF7C2A] rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-lg">lock_reset</span>
              </div>
          </div>
          <p class="font-headline font-black text-xl tracking-widest text-[#09337B] uppercase">Bizbuyandsell</p>
        </div>

        <!-- STEP 1: REQUEST EMAIL -->
        <div *ngIf="currentStep === 'request'" [@fadeSlideIn]>
          <div class="mb-8">
            <h1 class="text-2xl font-headline font-bold text-[#09337B] tracking-tight mb-2">Forgot Password?</h1>
            <p class="text-zinc-500 text-sm leading-relaxed">
              Enter your registered email below, and we'll send you a 6-digit secure verification code.
            </p>
          </div>
          <form class="space-y-8" (submit)="setStep('verify')">
            <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="name@firm.com" required type="email"/>
            </div>
            <button class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all group" type="submit">
              SEND SECURE CODE
              <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>

        <!-- STEP 2: VERIFY OTP -->
        <div *ngIf="currentStep === 'verify'">
          <div class="mb-8 text-center">
            <h1 class="text-2xl font-headline font-bold text-[#09337B] tracking-tight mb-2">Enter Secure Code</h1>
            <p class="text-zinc-500 text-sm leading-relaxed">
              We sent a validation code to <span class="font-bold text-[#09337B]">b***&#64;firm.com</span>
            </p>
          </div>
          <form class="space-y-10" (submit)="setStep('reset')">
            <div class="flex justify-between gap-3">
              <input *ngFor="let i of [1,2,3,4,5,6]" 
                     class="w-12 h-16 text-center text-3xl font-black text-[#09337B] bg-zinc-50 border-2 border-zinc-100 rounded-xl focus:border-[#FF7C2A] focus:ring-0 transition-all uppercase" 
                     maxlength="1" required type="text"/>
            </div>
            <div class="space-y-4">
              <button class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all" type="submit">
                VERIFY & CONTINUE
              </button>
              <div class="flex flex-col items-center gap-2">
                <button type="button" class="text-xs font-bold text-[#FF7C2A] hover:underline uppercase tracking-widest">Resend Code (59s)</button>
              </div>
            </div>
          </form>
        </div>

        <!-- STEP 3: RESET PASSWORD -->
        <div *ngIf="currentStep === 'reset'">
          <div class="mb-8">
            <h1 class="text-2xl font-headline font-bold text-[#09337B] tracking-tight mb-2">Set New Password</h1>
            <p class="text-zinc-500 text-sm">Ensure your new credentials meet institutional requirements.</p>
          </div>
          <form class="space-y-6" (submit)="setStep('success')">
             <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">New Password</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="••••••••" required type="password"/>
            </div>
            <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">Confirm Security Key</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="••••••••" required type="password"/>
            </div>
            
            <div class="bg-zinc-50 p-4 rounded-xl space-y-2 border border-zinc-100">
              <div class="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <span class="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                Min 8 Characters
              </div>
              <div class="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <span class="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                Special Character
              </div>
            </div>

            <button class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all" type="submit">
              UPDATE PASSWORD
            </button>
          </form>
        </div>

        <!-- STEP 4: SUCCESS -->
        <div *ngIf="currentStep === 'success'" class="text-center py-4">
           <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <span class="material-symbols-outlined text-white text-3xl">verified</span>
           </div>
           <h1 class="text-2xl font-headline font-bold text-[#09337B] mb-2 uppercase">Safety Updated</h1>
           <p class="text-zinc-500 text-sm mb-8">Your account security has been successfully restored.</p>
           <a routerLink="/login" class="inline-flex items-center px-8 py-3 bg-[#09337B] text-white font-bold rounded-xl hover:bg-[#0d419d] transition-all">
             BACK TO LOGIN
           </a>
        </div>

        <!-- Footer Actions (Back to Login) -->
        <div *ngIf="currentStep !== 'success'" class="mt-10 pt-8 border-t border-zinc-50 text-center">
          <a routerLink="/login" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#FF7C2A] hover:text-[#09337B] transition-colors">
            <span class="material-symbols-outlined text-lg">keyboard_backspace</span>
            Back to SignIn
          </a>
        </div>
      </div>

      <!-- Compliance Signals -->
      <div class="absolute bottom-10 inset-x-0 flex justify-center gap-12 text-[#FF7C2A]/30 font-bold uppercase tracking-[0.3em] text-[9px] pointer-events-none">
        <span class="flex items-center gap-2"><span class="material-symbols-outlined text-[14px]">shield</span> AES-256 Encrypted</span>
        <span class="flex items-center gap-2"><span class="material-symbols-outlined text-[14px]">verified_user</span> ISO Verified</span>
      </div>
    </main>
  `
})
export class ForgotPasswordComponent implements AfterViewInit {
  @ViewChild('authCard') authCard!: ElementRef;
  @ViewChild('bgImg') bgImg!: ElementRef;
  currentStep: AuthStep = 'request';

  ngAfterViewInit() {
    gsap.fromTo(this.bgImg.nativeElement,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.2, duration: 3, ease: 'power2.out' }
    );

    gsap.to(this.authCard.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'expo.out'
    });
  }

  setStep(step: AuthStep) {
    // Elegant transition between steps
    gsap.to(this.authCard.nativeElement, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        this.currentStep = step;
        gsap.to(this.authCard.nativeElement, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      }
    });
  }
}
