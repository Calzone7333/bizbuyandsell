import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { AuthService } from './auth.service';

type AuthStep = 'request' | 'verify' | 'reset' | 'success';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <main class="min-h-screen flex items-center justify-center relative p-6 bg-white overflow-hidden">
      <!-- Home Navigation -->
      <a routerLink="/" class="absolute top-10 right-10 flex items-center gap-2 group z-50">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#09337B]/40 group-hover:text-[#09337B] transition-colors">Exit</span>
        <div class="w-8 h-8 rounded-full border border-[#09337B]/10 flex items-center justify-center group-hover:border-[#09337B] transition-colors">
          <span class="material-symbols-outlined text-[16px] text-[#09337B]/40 group-hover:text-[#09337B]">close</span>
        </div>
      </a>

      <!-- Center Card Shell -->
      <div #authCard class="w-full max-w-md bg-white rounded-2xl border border-zinc-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] p-10 relative z-10">
        
        <!-- Brand Header (Always Visible) -->
        <div class="mb-10 text-center">
          <div class="inline-flex items-center gap-2 mb-2">
             <div class="w-8 h-8 bg-[#FF7C2A] rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-lg">lock_reset</span>
              </div>
          </div>
          <p class="font-headline font-black text-xl tracking-widest text-[#09337B] uppercase">Bizbuyandsell</p>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="mb-6 bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider animate-pulse">
           <span class="material-symbols-outlined text-sm">error</span>
           {{errorMessage}}
        </div>

        <!-- STEP 1: REQUEST EMAIL -->
        <div *ngIf="currentStep === 'request'">
          <div class="mb-8">
            <h1 class="text-2xl font-headline font-bold text-[#09337B] tracking-tight mb-2">Forgot Password?</h1>
            <p class="text-zinc-500 text-sm leading-relaxed">
              Enter your registered email below, and we'll send you a 6-digit secure verification code.
            </p>
          </div>
          <form class="space-y-8" (submit)="$event.preventDefault(); handleRequestReset()">
            <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="name@firm.com" required type="email" name="email" [(ngModel)]="email"/>
            </div>
            <button [disabled]="loading" class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all group disabled:opacity-50" type="submit">
              {{ loading ? 'SENDING...' : 'SEND SECURE CODE' }}
              <span *ngIf="!loading" class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>

        <!-- STEP 2: VERIFY OTP -->
        <div *ngIf="currentStep === 'verify'">
          <div class="mb-8 text-center">
            <h1 class="text-2xl font-headline font-bold text-[#09337B] tracking-tight mb-2">Enter Secure Code</h1>
            <p class="text-zinc-500 text-sm leading-relaxed">
              We sent a validation code to <span class="font-bold text-[#09337B]">{{maskedEmail}}</span>
            </p>
          </div>
          <form class="space-y-10" (submit)="$event.preventDefault(); handleVerifyCode()">
            <div class="flex justify-between gap-3">
              <input #otpInput *ngFor="let digit of otpArray; let i = index; trackBy: trackByFn" 
                     (keydown)="onKeyDown($event, i)"
                     [value]="otpArray[i]"
                     class="w-12 h-16 text-center text-3xl font-black text-[#09337B] bg-zinc-50 border-2 border-zinc-100 rounded-xl focus:border-[#FF7C2A] focus:ring-0 transition-all uppercase" 
                     maxlength="1" required type="text" [name]="'otp'+i"/>
            </div>
            <div class="space-y-4">
              <button class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all" type="submit">
                VERIFY & CONTINUE
              </button>
              <div class="flex flex-col items-center gap-2">
                <button (click)="handleRequestReset()" [disabled]="timer > 0" type="button" class="text-xs font-bold text-[#FF7C2A] hover:underline uppercase tracking-widest disabled:opacity-50 disabled:grayscale">
                  {{ timer > 0 ? 'Resend Code (' + timer + 's)' : 'Resend OTP' }}
                </button>
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
          <form class="space-y-6" (submit)="$event.preventDefault(); handleFinalizeReset()">
             <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">New Password</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="••••••••" required type="password" name="newPass" [(ngModel)]="newPassword"/>
            </div>
            <div class="group space-y-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-zinc-400">Confirm Security Key</label>
              <input class="w-full bg-transparent border-0 border-b-2 border-zinc-100 focus:border-[#09337B] focus:ring-0 py-3 text-lg font-bold text-[#09337B] placeholder:text-zinc-200" 
                     placeholder="••••••••" required type="password" name="confirmPass" [(ngModel)]="confirmPassword"/>
            </div>
            
            <div class="bg-zinc-50 p-4 rounded-xl space-y-2 border border-zinc-100">
              <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" [class.text-green-500]="newPassword.length >= 8" [class.text-zinc-400]="newPassword.length < 8">
                <span class="material-symbols-outlined text-[14px]">{{ newPassword.length >= 8 ? 'check_circle' : 'radio_button_unchecked' }}</span>
                Min 8 Characters
              </div>
              <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" [class.text-green-500]="hasSpecialChar" [class.text-zinc-400]="!hasSpecialChar">
                <span class="material-symbols-outlined text-[14px]">{{ hasSpecialChar ? 'check_circle' : 'radio_button_unchecked' }}</span>
                Special Character
              </div>
            </div>

            <button [disabled]="loading || !isPasswordValid" class="w-full bg-[#09337B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d419d] active:scale-[0.98] transition-all disabled:opacity-50" type="submit">
              {{ loading ? 'UPDATING...' : 'UPDATE PASSWORD' }}
            </button>
          </form>
        </div>

        <!-- STEP 4: SUCCESS -->
        <div *ngIf="currentStep === 'success'" class="text-center py-4">
           <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <span class="material-symbols-outlined text-white text-3xl">verified</span>
           </div>
           <h1 class="text-2xl font-headline font-bold text-[#09337B] mb-2 uppercase">Safety Updated</h1>
           <p class="text-zinc-500 text-sm mb-8">Your account security has been fully restored and verified.</p>
           
           <div class="space-y-4">
             <button (click)="navigateToDashboard()" class="w-full inline-flex items-center justify-center px-8 py-4 bg-[#09337B] text-white font-bold rounded-xl hover:bg-[#0d419d] transition-all shadow-lg shadow-blue-500/10 uppercase tracking-widest text-xs">
               PROCEED TO PORTAL
               <span class="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
             </button>
             <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4">You are now securely logged in.</p>
           </div>
        </div>

        <!-- Footer Actions (Back to Login) -->
        <div *ngIf="currentStep !== 'success'" class="mt-10 pt-8 border-t border-zinc-50 text-center">
          <a routerLink="/login" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#FF7C2A] hover:text-[#09337B] transition-colors">
            <span class="material-symbols-outlined text-lg">keyboard_backspace</span>
            Back to SignIn
          </a>
        </div>
      </div>
    </main>
  `
})
export class ForgotPasswordComponent implements AfterViewInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  @ViewChild('authCard') authCard!: ElementRef;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  
  currentStep: AuthStep = 'request';
  email: string = '';
  otpArray: string[] = ['', '', '', '', '', ''];
  newPassword: string = '';
  confirmPassword: string = '';
  
  errorMessage: string = '';
  loading: boolean = false;
  timer: number = 0;
  private timerInterval: any;

  trackByFn(index: number, item: any) {
    return index;
  }

  get maskedEmail(): string {
    if (!this.email) return '';
    const [user, domain] = this.email.split('@');
    return `${user.charAt(0)}***@${domain}`;
  }

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
  }

  get isPasswordValid(): boolean {
    return this.newPassword.length >= 8 && this.hasSpecialChar && this.newPassword === this.confirmPassword;
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.stopTimer();
  }

  handleRequestReset() {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.setStep('verify');
        this.startTimer();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Email not found in our records.';
      }
    });
  }

  handleVerifyCode() {
    const otp = this.otpArray.join('');
    if (otp.length < 6) {
        this.errorMessage = 'Please enter the full 6-digit code.';
        return;
    }
    this.setStep('reset');
  }

  handleFinalizeReset() {
    this.loading = true;
    this.errorMessage = '';
    
    const otp = this.otpArray.join('');
    this.authService.resetPassword({
      email: this.email,
      otp: otp,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.loading = false;
        this.setStep('success');
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to update password. Code may have expired.';
      }
    });
  }

  setStep(step: AuthStep) {
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

  startTimer() {
    this.timer = 59;
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;
    const items = this.otpInputs.toArray();

    if (/^\d$/.test(key)) {
      event.preventDefault();
      this.otpArray[index] = key;
      // Force change detection immediately to update [value]
      items[index].nativeElement.value = key;
      
      if (index < 5) {
        // Use a small timeout to ensure focus isn't stolen back by a re-render
        setTimeout(() => items[index + 1].nativeElement.focus(), 0);
      }
    } else if (key === 'Backspace') {
      event.preventDefault();
      if (this.otpArray[index]) {
        this.otpArray[index] = '';
        items[index].nativeElement.value = '';
      } else if (index > 0) {
        this.otpArray[index - 1] = '';
        items[index - 1].nativeElement.value = '';
        items[index - 1].nativeElement.focus();
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      items[index - 1].nativeElement.focus();
    } else if (key === 'ArrowRight' && index < 5) {
      items[index + 1].nativeElement.focus();
    } else if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(key)) {
      return;
    } else {
      event.preventDefault();
    }
  }

  navigateToDashboard() {
    const role = localStorage.getItem('userRole');
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
