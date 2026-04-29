import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { AuthService } from './auth.service';
import { ListingService } from './listing.service';
import { SocialAuthService, GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <main class="flex min-h-screen bg-white font-body selection:bg-[#FF7C2A]/20 selection:text-[#192830]">
      <!-- Left Section: Visual Identity -->
      <section class="hidden lg:flex lg:w-3/5 bg-[#192830] relative overflow-hidden items-center justify-center p-12">
        <div class="absolute inset-0 opacity-60">
          <img alt="Professionals shaking hands" class="w-full h-full object-cover grayscale contrast-125 brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdivxVXX27s75Uw3ao1haYzMx3fIdVOhB7fk9tnj5nhkpt0NdBiH6RyHUbgy5JJfJ4RMSRObXvE65fquY6ORMuCn06suonhigElrjrM0C31nrOKK7Vm8QLmGwS7nmyUz2BfsyOtSZCqnQAedst8G7kWOCL0o2ReAvAge-LYDV0YQJ6rz1E0Wz-FTKvbAjmoGXH1IS6o0_fDRtr22SLKtqTmkjr3I0N2xGRj1RKcfI_Pn3XfF1NsXdHS6AMYhf9z0JDk_vz_teT5EhH"/>
        </div>
        <div class="absolute inset-0 bg-gradient-to-tr from-[#192830] via-[#192830]/80 to-transparent"></div>
        <div #visualContent class="relative z-10 max-w-xl opacity-0 translate-y-8">
          <div class="mb-12">
            <div class="inline-block bg-white px-5 py-3 rounded-2xl shadow-sm border border-white/10">
              <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-10 w-auto">
            </div>
          </div>
          <div class="inline-flex items-center px-3 py-1 bg-[#FF7C2A]/10 border border-[#FF7C2A]/20 rounded-full mb-8">
            <span class="text-[10px] font-label font-bold uppercase tracking-widest text-[#FF7C2A]">Institutional Integrity</span>
          </div>
          <h1 class="text-5xl lg:text-7xl font-headline font-extrabold text-white tracking-tighter leading-tight mb-6">
            Unlock the Premium <br/> <span class="text-[#FF7C2A]">Marketplace.</span>
          </h1>
          <p class="text-slate-200 text-lg leading-relaxed font-light max-w-md">
            Join the exclusive exchange where business owners and institutional buyers find their next chapter through CA-verified valuations.
          </p>
          <div class="mt-12 flex gap-8">
            <div class="flex flex-col">
              <span class="text-3xl font-headline font-bold text-white">{{ formatCurrency(platformStats.transactionVolume) }}</span>
              <span class="text-[10px] font-label uppercase tracking-widest text-slate-300">Transaction Volume</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-headline font-bold text-white">{{ platformStats.verifiedAdvisors }}+</span>
              <span class="text-[10px] font-label uppercase tracking-widest text-slate-300">Verified Advisors</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Section: Registration Form -->
      <section class="w-full lg:w-2/5 flex items-center justify-center p-6 md:p-12 bg-white relative">
        <!-- Close Button -->
        <a routerLink="/" class="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-[#09337B] hover:bg-slate-100 transition-colors z-50">
          <span class="material-symbols-outlined font-bold">close</span>
        </a>
        <div #formSection class="w-full max-w-md opacity-0 translate-x-12">
          <!-- Mobile Logo Branding -->
          <div class="lg:hidden mb-12 flex justify-center">
            <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-12 w-auto">
          </div>

          <div class="mb-10 text-left">
            <h2 class="text-3xl font-headline font-bold tracking-tight text-[#09337B] mb-2">
              {{ isOtpStep ? 'Verify Identity' : 'Create Business Account' }}
            </h2>
            <p class="text-[#43474a] text-sm">
              {{ isOtpStep ? 'Enter the security code sent to your email.' : 'Enter your credentials to access the valuation engine.' }}
            </p>
          </div>

          <!-- STEP 1: Registration Form -->
          <form *ngIf="!isOtpStep" (submit)="onRegister()" class="space-y-6">
            <div class="group">
              <label class="block text-[11px] font-label font-bold uppercase tracking-[0.1em] text-[#43474a] mb-2 group-focus-within:text-[#FF7C2A] transition-colors">Corporate Email</label>
              <input class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-[#FF7C2A] transition-all placeholder:text-zinc-300 text-[#09337B] font-medium" 
                     type="email" name="email" [(ngModel)]="userData.email" placeholder="alexander@firm.com" required/>
            </div>

            <div class="group">
              <label class="block text-[11px] font-label font-bold uppercase tracking-[0.1em] text-[#43474a] mb-2 group-focus-within:text-[#FF7C2A] transition-colors">Contact Number</label>
              <input class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-[#FF7C2A] transition-all placeholder:text-zinc-300 text-[#09337B] font-medium" 
                     type="tel" name="phone" [(ngModel)]="userData.phone" placeholder="+91 98765 43210" required/>
            </div>

            <div class="group relative">
              <label class="block text-[11px] font-label font-bold uppercase tracking-[0.1em] text-[#43474a] mb-2 group-focus-within:text-[#FF7C2A] transition-colors">Access Key (Password)</label>
              <input class="w-full px-0 pr-10 py-3 bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-[#FF7C2A] transition-all placeholder:text-zinc-300 text-[#09337B] font-medium" 
                     [type]="showPassword ? 'text' : 'password'" name="password" [(ngModel)]="userData.password" placeholder="••••••••" required/>
              <button (click)="showPassword = !showPassword" type="button" class="absolute right-0 bottom-3 text-zinc-400 hover:text-[#09337B] transition-colors">
                <span class="material-symbols-outlined text-[20px]">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>

            <div class="flex items-start gap-3 pt-2">
              <input class="mt-1 h-4 w-4 rounded-sm border-zinc-200 text-[#FF7C2A] focus:ring-[#FF7C2A]/20" id="terms" name="terms" required type="checkbox"/>
              <label class="text-xs text-[#43474a] leading-relaxed" for="terms">
                I agree to the <a class="text-[#FF7C2A] hover:underline font-semibold" href="#">Terms</a> and the <a class="text-[#FF7C2A] hover:underline font-semibold" href="#">Privacy Policy</a> regarding confidential data handling.
              </label>
            </div>

            <button class="w-full bg-[#09337B] text-white font-headline font-bold text-sm tracking-wide py-2.5 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border-r-4 border-[#FF7C2A]" 
                    type="submit" [disabled]="isLoading">
              {{ isLoading ? 'Processing...' : 'Create Institutional Account' }}
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            <!-- Divider -->
            <div class="relative py-4 flex items-center">
              <div class="flex-grow border-t border-zinc-100"></div>
              <span class="flex-shrink mx-4 font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400">Or continue with</span>
              <div class="flex-grow border-t border-zinc-100"></div>
            </div>

            <!-- Social Action -->
            <button (click)="signInWithGoogle()" class="w-full bg-slate-50 border border-zinc-100 text-[#09337B] font-body font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors duration-300" type="button">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.14-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
          </form>

          <!-- STEP 2: OTP Verification -->
          <div *ngIf="isOtpStep" class="space-y-8">
            <p class="text-zinc-500 text-sm font-medium">
              We sent a 6-digit cryptographic code to <br> <span class="font-bold text-[#09337B]">{{ userData.email }}</span>
            </p>
            
            <div class="flex justify-between gap-2">
              <input *ngFor="let digit of [0,1,2,3,4,5]; let i = index" 
                     (keyup)="onDigitInput($event, i)"
                     class="w-12 h-14 text-center text-xl font-black text-[#09337B] bg-zinc-50 border border-zinc-200 rounded-xl focus:border-[#FF7C2A] focus:ring-0 transition-all shadow-inner" 
                     maxlength="1" type="text" [id]="'otp-' + i"/>
            </div>

            <button (click)="onVerifyOtp()" class="w-full bg-[#09337B] text-white font-headline font-black text-xs py-2.5 rounded-xl hover:bg-[#062456] transition-all duration-300 active:scale-[0.98] shadow-xl shadow-[#09337B]/10" [disabled]="isLoading">
              {{ isLoading ? 'Verifying...' : 'Verify & Initialize Session' }}
            </button>
            
            <div class="text-center">
              <button (click)="isOtpStep = false" class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-[#09337B]">Modify Credentials</button>
            </div>
          </div>

          <div *ngIf="errorMessage" class="mt-6 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-bounce">
            {{ errorMessage }}
          </div>
          <div *ngIf="successMessage" class="mt-6 text-green-600 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
            {{ successMessage }}
          </div>

          <div *ngIf="!isOtpStep" class="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-[#43474a]">Already have an account?</p>
            <a routerLink="/login" class="inline-flex items-center px-6 py-2 border border-zinc-200 rounded-full text-xs font-label font-bold uppercase tracking-wider text-[#09337B] hover:bg-zinc-50 transition-colors">
              Log In
            </a>
          </div>
        </div>
      </section>
    </main>

    <style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
      }

      /* Custom Scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #09337B !important;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #FF7C2A !important;
      }
      ::-webkit-scrollbar-button {
        display: none;
      }
    </style>
  `
})
export class RegisterComponent implements AfterViewInit, OnInit {
  @ViewChild('visualContent') visualContent!: ElementRef;
  @ViewChild('formSection') formSection!: ElementRef;

  userData = { email: '', phone: '', password: '' };
  otpDigits: string[] = ['', '', '', '', '', ''];
  isOtpStep = false;
  isLoading = false;
  showPassword = false;
  errorMessage = '';
  successMessage = '';
  platformStats: any = {
    activeListings: 0,
    verifiedAdvisors: 0,
    transactionVolume: 4200000000,
    verifiedClosures: 0
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private listingService: ListingService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.refreshStats();
  }

  refreshStats() {
    this.listingService.getPlatformStats().subscribe({
      next: (stats) => this.platformStats = stats,
      error: (err) => console.error('Failed to load platform stats', err)
    });
  }

  formatCurrency(value: number): string {
    if (value >= 1000000000) {
      return '$' + (value / 1000000000).toFixed(1) + 'B+';
    } else if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M+';
    }
    return '$' + value.toLocaleString();
  }

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
        this.errorMessage = err.error?.message || 'Registration failed. Check network.';
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
      this.errorMessage = 'Enter 6-digit code';
      return;
    }
    this.isLoading = true;
    this.authService.verify(this.userData.email, otp).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Verified! Redirecting...';
        setTimeout(() => this.router.navigate([response.role === 'ADMIN' ? '/admin' : '/']), 1500);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid Verify Code.';
      }
    });
  }

  signInWithGoogle() {
    this.errorMessage = '';
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      if (user && user.idToken) {
        this.authService.googleLogin(user.idToken).subscribe({
          next: (response) => {
            if (response.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Google login failed.';
          }
        });
      } else {
        this.errorMessage = 'Google login failed: No ID token received.';
      }
    }).catch(err => {
      this.errorMessage = 'Google authentication failed.';
      console.error(err);
    });
  }

  ngAfterViewInit() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    tl.to(this.visualContent.nativeElement, { opacity: 1, y: 0, delay: 0.2 });
    tl.to(this.formSection.nativeElement, { opacity: 1, x: 0 }, '-=0.8');
  }
}
