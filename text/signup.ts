import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <main class="h-screen flex items-center justify-center bg-white relative overflow-hidden font-body">

      <div class="container max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center p-6 h-full relative z-10 gap-20 lg:gap-32">
        
        <!-- Left Section: Visual -->
        <section class="hidden lg:flex relative items-center h-full">
          <!-- Character Illustration -->
          <div class="relative z-10">
            <img alt="Professional working" 
                 class="w-[300px] lg:w-[350px] 2xl:w-[420px] drop-shadow-2xl" 
                 src="login/register.png">
          </div>
        </section>

        <section class="flex flex-col items-center">
          <div class="mb-12 text-center w-full">
            <h1 class="text-3xl lg:text-4xl font-headline font-black text-[rgb(25,40,48)] tracking-tight">
              {{ isOtpStep ? 'Verify Account' : 'Create Account' }}
            </h1>
          </div>

          <!-- STEP 1: Registration Form -->
          <form *ngIf="!isOtpStep" (submit)="onRegister()" class="w-full max-w-[330px] space-y-8 mb-8">
            <div class="relative group">
              <label class="absolute -top-3 left-8 px-4 bg-white text-[10px] leading-[18px] font-bold text-black transition-colors z-10 uppercase tracking-[0.1em]">Email</label>
              <div class="flex items-center gap-4 px-8 h-12 border border-zinc-200 rounded-full group-focus-within:border-[rgb(25,40,48)] transition-all bg-white shadow-sm">
                <span class="material-symbols-outlined text-[18px] text-zinc-400">mail</span>
                <input class="w-full bg-transparent border-none focus:ring-0 text-zinc-700 text-xs font-medium placeholder:text-zinc-200" 
                       placeholder="email@gmail.com" type="email" name="email" [(ngModel)]="userData.email" required/>
              </div>
            </div>

            <div class="relative group">
              <label class="absolute -top-3 left-8 px-4 bg-white text-[10px] leading-[18px] font-bold text-black transition-colors z-10 uppercase tracking-[0.1em]">Phone no</label>
              <div class="flex items-center gap-4 px-8 h-12 border border-zinc-200 rounded-full group-focus-within:border-[rgb(25,40,48)] transition-all bg-white shadow-sm">
                <span class="material-symbols-outlined text-[18px] text-zinc-400">phone_iphone</span>
                <input class="w-full bg-transparent border-none focus:ring-0 text-zinc-700 text-xs font-medium placeholder:text-zinc-200" 
                       placeholder="Enter your phone no" type="tel" name="phone" [(ngModel)]="userData.phone" required/>
              </div>
            </div>

            <div class="relative group">
              <label class="absolute -top-3 left-8 px-4 bg-white text-[10px] leading-[18px] font-bold text-black transition-colors z-10 uppercase tracking-[0.1em]">Password</label>
              <div class="flex items-center gap-4 px-8 h-12 border border-zinc-200 rounded-full group-focus-within:border-[rgb(25,40,48)] transition-all bg-white shadow-sm">
                <span class="material-symbols-outlined text-[18px] text-zinc-400">lock</span>
                <input class="w-full bg-transparent border-none focus:ring-0 text-zinc-700 text-xs font-medium placeholder:text-zinc-200" 
                       placeholder="Enter your password" type="password" name="password" [(ngModel)]="userData.password" required/>
              </div>
            </div>

            <button class="w-full bg-[#FF7C2A] text-white font-headline font-black text-xs py-4 rounded-full hover:bg-[#e06b20] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#FF7C2A]/20 uppercase tracking-[0.2em]" type="submit" [disabled]="isLoading">
              {{ isLoading ? 'Processing...' : 'Register' }}
            </button>
          </form>

          <!-- STEP 2: OTP Verification -->
          <div *ngIf="isOtpStep" class="w-full max-w-[330px] space-y-10">
            <p class="text-center text-zinc-500 text-xs font-medium mb-8">
              We sent a 6-digit code to <br> <span class="font-bold text-[rgb(25,40,48)]">{{ userData.email }}</span>
            </p>
            
            <div class="flex justify-between gap-2">
              <input *ngFor="let digit of [0,1,2,3,4,5]; let i = index" 
                     (keyup)="onDigitInput($event, i)"
                     class="otp-input w-11 h-12 text-center text-xl font-black text-[rgb(25,40,48)] bg-zinc-50 border border-zinc-200 rounded-xl focus:border-[#FF7C2A] focus:ring-0 transition-all" 
                     maxlength="1" type="text" [id]="'otp-' + i"/>
            </div>

            <button (click)="onVerifyOtp()" class="w-full bg-[rgb(25,40,48)] text-white font-headline font-black text-xs py-4 rounded-full hover:bg-slate-800 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-slate-200 uppercase tracking-[0.2em]" [disabled]="isLoading">
              {{ isLoading ? 'Verifying...' : 'Verify & Complete' }}
            </button>
            
            <div class="text-center">
              <button (click)="isOtpStep = false" class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-[rgb(25,40,48)]">Change Email</button>
            </div>
          </div>

          <!-- Messages -->
          <div *ngIf="errorMessage" class="mt-6 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-bounce">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="mt-6 text-green-500 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
            {{ successMessage }}
          </div>

          <!-- Footer Navigation (Only for step 1) -->
          <div *ngIf="!isOtpStep" class="mt-8 text-center w-full max-w-[330px]">
             <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Already have an account? <a routerLink="/login" class="text-black font-black hover:text-[#4185D0] hover:underline transition-all">Sign in</a>
            </p>
          </div>
        </section>

      </div>
    </main>

    <style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
      }
      .otp-input {
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
      }
    </style>
  `
})
export class RegisterComponent {
  userData = { email: '', phone: '', password: '' };
  otpDigits: string[] = ['', '', '', '', '', ''];
  isOtpStep = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.isOtpStep = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Check your network.';
      }
    });
  }

  onDigitInput(event: any, index: number) {
    const value = event.target.value;
    if (value && index < 5) {
      document.getElementById('otp-' + (index + 1))?.focus();
    }
    this.otpDigits[index] = value;
  }

  onVerifyOtp() {
    const otp = this.otpDigits.join('');
    if (otp.length < 6) {
      this.errorMessage = 'Please enter all 6 digits';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.authService.verify(this.userData.email, otp).subscribe({
      next: (response) => {
        console.log('Verification Successful! User Details:', response);
        this.isLoading = false;
        this.successMessage = 'Verified Successfully! Redirecting...';
        const target = response.role === 'ADMIN' ? '/admin' : '/';
        setTimeout(() => this.router.navigate([target]), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    });
  }
}
