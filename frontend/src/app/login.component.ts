import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <main class="h-screen flex items-center justify-center bg-white relative overflow-hidden font-body">

      <div class="container max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center p-6 h-full relative z-10 gap-20 lg:gap-32">
        
        <section #formSection class="flex flex-col items-center opacity-0 -translate-x-8">
          <div class="mb-12 text-center w-full">
            <h1 style="font-family: 'Manrope', sans-serif; font-weight: 900; color: rgb(25, 40, 48);" class="text-4xl tracking-tighter">Welcome Back</h1>
            <p class="text-slate-400 text-xs mt-2 uppercase tracking-[0.2em] font-bold">Secure Institutional Access</p>
          </div>

          <form (submit)="onLogin()" class="w-full max-w-[340px] space-y-7 mb-8">
            <!-- Email Field -->
            <div class="space-y-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
              <div class="flex items-center gap-4 px-6 h-14 border border-slate-100 rounded-xl focus-within:border-[rgb(25,40,48)] focus-within:ring-4 focus-within:ring-slate-50 transition-all bg-slate-50/30">
                <span class="material-symbols-outlined text-[20px] text-slate-300">mail</span>
                <input class="w-full bg-transparent border-none focus:ring-0 text-slate-800 text-sm font-semibold placeholder:text-slate-300" 
                       placeholder="name@company.com" type="email" name="email" [(ngModel)]="credentials.email" required/>
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <div class="flex justify-between items-center ml-1">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                <a routerLink="/forgot-password" class="text-[10px] font-bold text-[rgb(25,40,48)] hover:underline opacity-60">Reset Key?</a>
              </div>
              <div class="flex items-center gap-4 px-6 h-14 border border-slate-100 rounded-xl focus-within:border-[rgb(25,40,48)] focus-within:ring-4 focus-within:ring-slate-50 transition-all bg-slate-50/30">
                <span class="material-symbols-outlined text-[20px] text-slate-300">lock_open</span>
                <input class="w-full bg-transparent border-none focus:ring-0 text-slate-800 text-sm font-semibold placeholder:text-slate-300" 
                       placeholder="••••••••" type="password" name="password" [(ngModel)]="credentials.password" required/>
              </div>
            </div>

            <!-- Login Button -->
            <div class="pt-2">
               <button class="w-full bg-[rgb(25,40,48)] text-white font-headline font-black text-xs py-5 rounded-xl hover:bg-slate-800 transition-all duration-300 active:scale-[0.98] shadow-xl shadow-slate-200 uppercase tracking-[0.2em]" type="submit">
                 Initialize Session
               </button>
            </div>
          </form>

          <div *ngIf="errorMessage" class="mb-4 text-red-500 text-xs font-bold uppercase tracking-widest text-center">
            {{ errorMessage }}
          </div>

          <!-- Divider -->
          <div class="w-full max-w-[330px] flex items-center justify-center gap-3 mb-8">
            <span class="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">- or -</span>
          </div>

          <!-- Social Auth cluster -->
          <div class="flex items-center gap-7 mb-8">
            <button class="hover:scale-110 transition-transform"><img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" class="w-4 h-4"></button>
            <button class="hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button class="hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-black" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 17.27 3.55 12.24 6.1 7.82c1.28-2.22 3.52-3.11 5.39-3.06 1.25.03 2.12.51 2.88.51s1.95-.58 3.54-.42c1.67.17 2.98.78 3.86 2.1-.2.13-3.6 2.13-3.06 6.3 1.13 4.54 5.34 6.14 5.34 6.14-.04.1.66 2.3-1.6 4.89M15.42 4.49c-.68.85-1.91 1.43-3.18 1.31-.19-1.34.42-2.77 1.11-3.6.61-.75 2.01-1.38 3.03-1.2 1.3 2.1-.28 2.64-.96 3.49"/></svg>
            </button>
          </div>

          <div class="text-center w-full max-w-[330px]">
            <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Don't have an account? <a routerLink="/register" class="text-black font-black hover:text-[#4185D0] hover:underline transition-all">Sign up</a>
            </p>
          </div>
        </section>

        <!-- Right Section: Visual -->
        <section class="hidden lg:flex relative items-center h-full">
          <!-- Character Illustration -->
          <div #character class="relative z-10 opacity-0 translate-y-8">
            <img alt="Professional working" 
                 class="w-[300px] lg:w-[350px] 2xl:w-[420px] drop-shadow-2xl" 
                 src="login/login.png">
          </div>
        </section>

      </div>
    </main>

    <style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
      }
    </style>
  `
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('character') character!: ElementRef;
  @ViewChild('formSection') formSection!: ElementRef;

  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

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

  ngAfterViewInit() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Reveal Form Section
    tl.to(this.formSection.nativeElement, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      delay: 0.5
    });

    // Reveal Character
    gsap.to(this.character.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.4,
      ease: 'back.out(1.7)'
    });
  }
}
