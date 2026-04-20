import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthService } from './auth.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav #navbar class="fixed top-0 w-full z-[100] bg-white opacity-0 -translate-y-full">
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between overflow-visible">
        
        <!-- Zone 1: Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a class="flex items-center" routerLink="/">
            <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-[48px] w-auto transition-transform hover:scale-105">
          </a>
        </div>

        <!-- Zone 2: Navigation Links (Desktop) -->
        <div class="hidden lg:flex items-stretch justify-center flex-1 px-10 h-full">
          <div #navItem class="nav-item-group opacity-0">
            <a id="tour-buy" class="nav-link" routerLink="/browse">BUY BUSINESS</a>
          </div>
          <div #navItem class="nav-item-group opacity-0">
            <a id="tour-sell" class="nav-link" routerLink="/sell">SELL BUSINESS</a>
          </div>
          <div #navItem class="nav-item-group opacity-0">
            <a id="tour-investment" class="nav-link" routerLink="/browse">INVESTMENT</a>
          </div>
          <div #navItem class="nav-item-group opacity-0">
            <a id="tour-franchise" class="nav-link" routerLink="/browse">FRANCHISE</a>
          </div>
          <div #navItem class="nav-item-group opacity-0">
            <a id="tour-advisory" class="nav-link" href="#">ADVISORY</a>
          </div>
        </div>

        <!-- Zone 3: Actions -->
        <div class="flex items-center gap-x-2 lg:gap-x-6 h-full font-sans">
          
          <!-- AUTH BUTTONS (Only if not logged in) -->
          <ng-container *ngIf="!authService.isLoggedIn()">
            <button id="tour-login" #loginBtn routerLink="/login" class="Btn-Container opacity-0 hidden lg:flex">
              <span class="text">LOGIN</span>
              <span class="icon-Container">
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1.61321" cy="1.61321" r="1.5" fill="white" />
                  <circle cx="5.73583" cy="1.61321" r="1.5" fill="white" />
                  <circle cx="5.73583" cy="5.5566" r="1.5" fill="white" />
                  <circle cx="9.85851" cy="5.5566" r="1.5" fill="white" />
                  <circle cx="9.85851" cy="9.5" r="1.5" fill="white" />
                  <circle cx="13.9811" cy="9.5" r="1.5" fill="white" />
                  <circle cx="5.73583" cy="13.4434" r="1.5" fill="white" />
                  <circle cx="9.85851" cy="13.4434" r="1.5" fill="white" />
                  <circle cx="1.61321" cy="17.3868" r="1.5" fill="white" />
                  <circle cx="5.73583" cy="17.3868" r="1.5" fill="white" />
                </svg>
              </span>
            </button>
          </ng-container>

          <!-- EXECUTIVE PROFILE SUITE (Synchronized with Reference) -->
          <ng-container *ngIf="authService.isLoggedIn()">
            <div class="flex items-center gap-6 h-full">
              <!-- Thin-Stroke Alert Hub -->
              <button class="relative flex items-center justify-center transition-transform active:scale-95 text-slate-600">
                <img *ngIf="hasNotifications" src="/icons/Bell.gif" alt="Notifications" class="w-7 h-7 object-contain">
                <i *ngIf="!hasNotifications" class="fa-regular fa-bell text-[20px]"></i>
              </button>

              <div id="tour-account" class="relative group h-full flex items-center">
                <!-- Profile Identity Trigger -->
                <button class="flex items-center gap-3 transition-transform active:scale-95 group/avatar">
                  <!-- Perfect Circle Photo Avatar -->
                  <!-- Professional Initials Avatar -->
                  <div class="w-9 h-9 rounded-full bg-[#09337B] flex items-center justify-center shadow-sm border-2 border-white transition-all group-hover/avatar:ring-2 group-hover/avatar:ring-[#FF7C2A]">
                    <span class="text-[14px] font-bold text-white">{{ userInitials }}</span>
                  </div>
                  
                  <!-- Label & Chevron -->
                  <div class="flex items-center gap-1">
                    <span class="text-[13px] font-medium text-slate-500 group-hover/avatar:text-slate-900 transition-colors">{{ username }}</span>
                    <span class="material-symbols-outlined text-[16px] text-slate-300 font-light group-hover/avatar:translate-y-0.5 transition-transform">expand_more</span>
                  </div>
                </button>

                <!-- Dropdown Menu (REDUCED SIZE) -->
                <div class="absolute right-0 top-[75%] pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[110]">
                  <div class="w-[220px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 p-2 flex flex-col gap-0.5">
                    
                    <!-- ADMIN SPECIFIC ITEMS -->
                    <ng-container *ngIf="authService.isAdmin()">
                      <a routerLink="/admin" class="modern-dropdown-link bg-zinc-50/80 group">
                        <span class="material-symbols-outlined icon-v text-[#09337B]">dashboard</span>
                        <span class="flex-1">Admin Panel</span>
                      </a>
                      <a routerLink="/profile/settings" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">settings</span>
                        <span class="flex-1">Account Settings</span>
                      </a>
                    </ng-container>
                    
                    <!-- USER SPECIFIC ITEMS -->
                    <ng-container *ngIf="!authService.isAdmin()">
                      <a routerLink="/sell" class="modern-dropdown-link group text-[#FF7C2A] bg-orange-50/50">
                        <span class="material-symbols-outlined icon-v text-[#FF7C2A]">sell</span>
                        <span class="flex-1 font-bold">Sell A Business</span>
                      </a>

                      <a routerLink="/profile/settings" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">settings</span>
                        <span class="flex-1">Account Settings</span>
                      </a>

                      <a href="#" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">corporate_fare</span>
                        <span class="flex-1">My Entities</span>
                      </a>

                      <a href="#" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">favorite</span>
                        <span class="flex-1">Saved Businesses</span>
                      </a>
                      
                      <a href="#" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">list_alt</span>
                        <span class="flex-1">My Listings</span>
                        <span class="pro-badge">
                          <span class="material-symbols-outlined text-[9px]">bolt</span>
                          PRO
                        </span>
                      </a>
                      
                      <a href="#" class="modern-dropdown-link group">
                        <span class="material-symbols-outlined icon-v">notifications_active</span>
                        <span class="flex-1">Market Alerts</span>
                      </a>
                    </ng-container>

                    <div class="h-px bg-zinc-100/60 my-1.5 mx-3"></div>
                    
                    <a href="#" class="modern-dropdown-link group">
                      <span class="material-symbols-outlined icon-v text-zinc-400">help_outline</span>
                      <span class="flex-1 text-zinc-400">Help center</span>
                    </a>
                    
                    <button (click)="onLogout()" class="modern-dropdown-link text-zinc-600 hover:text-red-500 hover:bg-red-50/50 group">
                      <span class="material-symbols-outlined icon-v text-zinc-400 group-hover:text-red-500">logout</span>
                      <span class="flex-1 text-left">Sign out</span>
                    </button>

                  </div>
                </div>
            </div>
          </div>
        </ng-container>
          
          <!-- Mobile Toggle -->
          <button class="lg:hidden p-2 text-zinc-500" (click)="isMenuOpen = !isMenuOpen">
            <span class="material-symbols-outlined text-[32px]">
              {{ isMenuOpen ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>
    </nav>

    <style>
      /* Base Elements */
      .logo-box { width: 32px; height: 32px; background-color: #FF7C2A; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
      .nav-item-group { position: relative; padding: 0 16px; height: 100%; display: flex; align-items: center; }
      .nav-link { display: flex; align-items: center; gap: 6px; color: black; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s ease; text-decoration: none; cursor: pointer; }
      .nav-link:hover { color: #4185D0; }
      
      .Btn-Container { display: flex; width: 140px; height: 44px; background-color: #09337B; border-radius: 40px; justify-content: space-between; align-items: center; border: none; cursor: pointer; padding: 0 4px 0 20px; transition: all 0.3s ease; }
      .icon-Container { width: 36px; height: 36px; background-color: #FF7C2A; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 3px solid #09337B; }
      .text { color: white; font-size: 10px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; }

      /* COMPACT MODERN DROPDOWN */
      .modern-dropdown-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 9px 12px;
        border-radius: 12px;
        color: #18181b; 
        font-size: 13.5px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      
      .modern-dropdown-link:hover {
        background-color: #f4f4f5; 
      }

      .icon-v {
        font-size: 20px;
        color: #18181b;
        font-variation-settings: 'FILL' 0, 'wght' 300;
      }

      .pro-badge {
        background-color: #fae8ff; 
        color: #701a75; 
        font-size: 9px;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 1px;
      }

      @media (min-width: 1024px) {
        button.lg\\:hidden { display: none !important; }
      }
    </style>
  `
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  @ViewChild('loginBtn') loginBtn!: ElementRef;

  isMenuOpen = false;
  hasNotifications = false;

  constructor(public authService: AuthService, private router: Router) {}

  get userEmail(): string {
    return localStorage.getItem('userEmail') || 'Guest';
  }

  get userInitials(): string {
    const email = this.userEmail;
    if (email === 'Guest') return 'G';
    return email.substring(0, 2).toUpperCase();
  }

  get username(): string {
    const email = this.userEmail;
    if (email === 'Guest') return 'Guest';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }



  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    const tl = gsap.timeline({ 
      defaults: { ease: 'expo.out' },
      delay: 0.2 
    });

    tl.fromTo(this.navbar.nativeElement,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    tl.fromTo(this.navItems.map(item => item.nativeElement),
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.8'
    );

    if (this.loginBtn) {
      tl.fromTo(this.loginBtn.nativeElement,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.6'
      );
    }

    ScrollTrigger.create({
      start: 'top -20',
      onEnter: () => {
        gsap.to(this.navbar.nativeElement, {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
          height: '70px',
          duration: 0.4,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(this.navbar.nativeElement, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: 'blur(0px)',
          borderBottom: '1px solid transparent',
          boxShadow: 'none',
          height: '80px',
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  }
}
