import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { AuthService } from './auth.service';
import { ListingService } from './listing.service';
import { SocialAuthService, GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SocialLoginModule],
  template: `
    <main class="flex min-h-screen bg-white font-body selection:bg-[#FF7C2A]/20 selection:text-[#192830]">
      <!-- Left Section: Visual Identity -->
      <section class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#192830]">
        <div class="absolute inset-0 z-0">
          <img alt="Modern corporate workspace" class="w-full h-full object-cover opacity-80 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhhXe4ucXy36CspZyxQPXjKi85_anUlisvS8cSbSgvpzhu_7MTlWD6_Sk0vyAnSt1aKQFEgGKtpCfi15jwvaX1YJft-Xkbi8xxD7D1wDlN4kEUNZ57ddUq0wA6H9KHQIWGKsnrCgY3oS9_drIH6HHsFgguxAjUiao2TlGK1fIszLYomfRf_GyTHVtsZbbiXdDujgYyNfWQ-Wr84F_G3OFFbaUYMbj7ynman33zC_6af0p4sdYeeC8hdEUP2By2kSgePthXVTF0GfRD"/>
          <div class="absolute inset-0 bg-gradient-to-tr from-[#192830] via-[#192830]/40 to-transparent"></div>
        </div>
        <div #visualContent class="relative z-10 flex flex-col justify-between p-16 w-full opacity-0 translate-y-8">
          <div class="mb-12">
            <div class="inline-block bg-white px-5 py-3 rounded-2xl shadow-sm border border-white/10">
              <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-8 w-auto">
            </div>
          </div>
          <div>
            <h1 class="font-headline font-extrabold text-3xl tracking-tighter text-white">
              Institutional <br/> Marketplace
            </h1>
          </div>
          <div class="max-w-md">
            <span class="font-label text-xs uppercase tracking-[0.2em] text-[#FF7C2A] mb-4 block">CA-Verified Platform</span>
            <h2 class="font-headline font-bold text-4xl text-white leading-tight mb-6">
              The Ledger for Business <br> Divestitures.
            </h2>
            <p class="text-slate-200 text-lg leading-relaxed">
              Access exclusive listings, verified valuations, and secure escrow services for high-stakes business transitions.
            </p>
          </div>
          <div class="flex items-center gap-8">
            <div class="flex flex-col">
              <span class="font-headline font-bold text-2xl text-[#FF7C2A]">1.4k+</span>
              <span class="font-label text-[10px] uppercase tracking-widest text-slate-300 opacity-70">Active Listings</span>
            </div>
            <div class="w-px h-8 bg-white/10"></div>
            <div class="flex flex-col">
              <span class="font-headline font-bold text-2xl text-[#FF7C2A]">480</span>
              <span class="font-label text-[10px] uppercase tracking-widest text-slate-300 opacity-70">Verified Closures</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Section: Transactional Shell -->
      <section class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <!-- Close Button -->
        <a routerLink="/" class="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-[#09337B] hover:bg-slate-100 transition-colors z-50">
          <span class="material-symbols-outlined font-bold">close</span>
        </a>
        <div #formSection class="w-full max-w-md opacity-0 translate-x-12">
          <div class="lg:hidden mb-12 text-center flex justify-center">
            <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-12 w-auto">
          </div>
          <div class="mb-10">
            <h3 class="font-headline font-bold text-3xl text-[#09337B] mb-2">Welcome Back</h3>
            <p class="text-[#43474a] text-sm">Access your institutional dashboard and pending offers.</p>
          </div>
          
          <form (submit)="$event.preventDefault(); onLogin()" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-1">
              <label class="font-label text-[10px] uppercase tracking-widest text-[#43474a] font-semibold" for="email">Business Email</label>
              <div class="relative group">
                <input class="w-full py-3 px-0 bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-[#FF7C2A] text-[#09337B] font-medium transition-all duration-300 placeholder:text-zinc-300" 
                       id="email" placeholder="name@firm.com" type="email" name="email" [(ngModel)]="credentials.email" required/>
              </div>
            </div>
            <!-- Password Field -->
            <div class="space-y-1">
              <div class="flex justify-between items-center">
                <label class="font-label text-[10px] uppercase tracking-widest text-[#43474a] font-semibold" for="password">Password</label>
                <a routerLink="/forgot-password" class="font-label text-[10px] uppercase tracking-widest text-[#FF7C2A] font-bold hover:text-[#e06b20] transition-colors">Forgot Password</a>
              </div>
              <div class="relative group">
                <input class="w-full py-3 pr-10 px-0 bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-[#FF7C2A] text-[#09337B] font-medium transition-all duration-300 placeholder:text-zinc-300" 
                       id="password" placeholder="••••••••" [type]="showPassword ? 'text' : 'password'" name="password" [(ngModel)]="credentials.password" required/>
                <button (click)="showPassword = !showPassword" type="button" class="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#09337B] transition-colors">
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>

            <div *ngIf="errorMessage" class="text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              {{ errorMessage }}
            </div>

            <!-- Primary Action -->
            <button class="w-full bg-[#09337B] text-white font-headline font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#062456] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#09337B]/10" type="submit">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">lock</span>
              Log In securely
            </button>

            <!-- Divider -->
            <div class="relative py-4 flex items-center">
              <div class="flex-grow border-t border-zinc-100"></div>
              <span class="flex-shrink mx-4 font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400">Professional Identity</span>
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
              Sign in with Google
            </button>
          </form>

          <!-- Footer Text -->
          <div class="mt-12 text-center">
            <p class="text-[#43474a] text-xs">
              Don't have an institutional account? 
              <a routerLink="/register" class="text-[#FF7C2A] font-bold hover:underline decoration-[#FF7C2A]/30">Request Access</a>
            </p>
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
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('visualContent') visualContent!: ElementRef;
  @ViewChild('formSection') formSection!: ElementRef;

  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  showPassword = false;
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

  onLogin() {
    this.errorMessage = '';
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login Successful! User Details:', response);
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Invalid email or password.';
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

    tl.to(this.visualContent.nativeElement, {
      opacity: 1,
      y: 0,
      delay: 0.2
    });

    tl.to(this.formSection.nativeElement, {
      opacity: 1,
      x: 0
    }, '-=0.8');
  }
}
