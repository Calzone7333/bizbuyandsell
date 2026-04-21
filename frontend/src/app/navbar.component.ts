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
    <nav #navbar class="fixed top-0 w-full z-[100] bg-white opacity-0 -translate-y-full border-b border-transparent transition-all duration-300">
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between overflow-visible">
        
        <!-- Zone 1: Logo (Left) -->
        <div class="flex items-center">
          <a class="flex items-center" routerLink="/">
            <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-[42px] md:h-[48px] w-auto transition-transform hover:scale-105">
          </a>
        </div>

        <!-- Zone 2: Navigation Links (Center) -->
        <div class="hidden lg:flex items-center justify-center gap-1">
          
          <!-- BUY BUSINESS DROPDOWN -->
          <div #navItem class="dropdown-wrapper h-full flex items-center group opacity-0">
            <button class="nav-link text-[10px] xl:text-[11px]">
              Buy Business
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <div class="dropdown-menu">
               <a routerLink="/browse" class="dropdown-item">Browse Businesses</a>
               <a href="#" class="dropdown-item">Buy with CA Expert</a>
               <a href="#" class="dropdown-item">Business Valuation</a>
               <a href="#" class="dropdown-item">Due Diligence</a>
               <a href="#" class="dropdown-item">Financing Options</a>
               <a href="#" class="dropdown-item">Buyer Dashboard</a>
            </div>
          </div>

          <!-- SELL BUSINESS DROPDOWN -->
          <div #navItem class="dropdown-wrapper h-full flex items-center group opacity-0">
            <button class="nav-link text-[10px] xl:text-[11px]">
              Sell Business
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <div class="dropdown-menu">
               <a routerLink="/sell" class="dropdown-item">List Your Business</a>
               <a href="#" class="dropdown-item">Sell with CA Expert ⭐</a>
               <a href="#" class="dropdown-item">Business Valuation</a>
               <a routerLink="/sell" class="dropdown-item">Get Verified Listing</a>
               <a href="#" class="dropdown-item">Due Diligence Support</a>
               <a href="#" class="dropdown-item">Pricing Plans</a>
            </div>
          </div>

          <!-- INVESTMENT DROPDOWN -->
          <div #navItem class="dropdown-wrapper h-full flex items-center group opacity-0">
            <button class="nav-link text-[10px] xl:text-[11px]">
              Investment
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <div class="dropdown-menu">
               <a href="#" class="dropdown-item">Invest in Verified Businesses</a>
               <a href="#" class="dropdown-item">Startup Investment Opportunities</a>
               <a href="#" class="dropdown-item">High Return Deals</a>
               <a href="#" class="dropdown-item">Business Partnership Opportunities</a>
            </div>
          </div>

          <!-- FRANCHISE DROPDOWN -->
          <div #navItem class="dropdown-wrapper h-full flex items-center group opacity-0">
            <button class="nav-link text-[10px] xl:text-[11px]">
              Franchise
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <div class="dropdown-menu">
               <a href="#" class="dropdown-item">Explore Franchise Opportunities</a>
               <a href="#" class="dropdown-item">Top Franchise Brands</a>
               <a href="#" class="dropdown-item">Low Investment Franchises</a>
               <a href="#" class="dropdown-item">High Growth Franchise Deals</a>
            </div>
          </div>

          <!-- SECONDARY LINKS -->
          <div #navItem class="nav-item-group opacity-0">
            <a class="nav-link text-[10px] xl:text-[11px]" href="#">How It Works</a>
          </div>
          <div #navItem class="nav-item-group opacity-0">
            <a class="nav-link text-[10px] xl:text-[11px]" href="#">FAQs</a>
          </div>
        </div>

        <!-- Zone 3: Actions (Right) -->
        <div class="flex items-center justify-end gap-x-2">
          <!-- AUTH SUITE -->
          <ng-container *ngIf="!authService.isLoggedIn()">
             <!-- Desktop Only Login Button -->
            <button #loginBtn routerLink="/login" class="Btn-Container hidden lg:flex opacity-0">
              <span class="text">LOGIN</span>
              <span class="icon-Container">
                <span class="material-symbols-outlined text-white text-[18px]">login</span>
              </span>
            </button>
          </ng-container>

          <ng-container *ngIf="authService.isLoggedIn()">
            <div class="flex items-center gap-6 h-full">
              <!-- Thin-Stroke Alert Hub -->
              <button class="relative flex items-center justify-center transition-transform active:scale-95 text-slate-600">
                <span class="material-symbols-outlined text-[24px]">notifications</span>
              </button>

              <div id="tour-account" class="relative group h-full flex items-center">
                <!-- Profile Identity Trigger -->
                <button class="flex items-center gap-3 transition-transform active:scale-95 group/avatar">
                  <div class="w-9 h-9 rounded-full bg-[#09337B] flex items-center justify-center shadow-sm border-2 border-white transition-all group-hover/avatar:ring-2 group-hover/avatar:ring-[#FF7C2A]">
                    <span class="text-[14px] font-bold text-white">{{ userInitials }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[13px] font-medium text-slate-500 group-hover/avatar:text-slate-900 transition-colors">{{ username }}</span>
                    <span class="material-symbols-outlined text-[16px] text-slate-300 font-light group-hover/avatar:translate-y-0.5 transition-transform">expand_more</span>
                  </div>
                </button>

                <!-- Dropdown Menu -->
                <div class="absolute right-0 top-[85%] pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[110]">
                  <div class="w-[220px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 p-2 flex flex-col gap-0.5">
                    
                    <!-- ADMIN SPECIFIC ITEMS -->
                    <ng-container *ngIf="authService.isAdmin()">
                      <a routerLink="/admin" class="modern-dropdown-link bg-zinc-50/80 group">
                        <span class="material-symbols-outlined icon-v text-[#09337B]">dashboard</span>
                        <span class="flex-1">Admin Panel</span>
                      </a>
                    </ng-container>
                    
                    <!-- USER SPECIFIC ITEMS -->
                    <a routerLink="/sell" class="modern-dropdown-link group text-[#FF7C2A] bg-orange-50/50">
                      <span class="material-symbols-outlined icon-v text-[#FF7C2A]">sell</span>
                      <span class="flex-1 font-bold">Sell A Business</span>
                    </a>

                    <a routerLink="/profile/settings" class="modern-dropdown-link group">
                      <span class="material-symbols-outlined icon-v">settings</span>
                      <span class="flex-1">Account Settings</span>
                    </a>

                    <a href="#" class="modern-dropdown-link group" *ngIf="!authService.isAdmin()">
                      <span class="material-symbols-outlined icon-v">corporate_fare</span>
                      <span class="flex-1">My Entities</span>
                    </a>

                    <a href="#" class="modern-dropdown-link group" *ngIf="!authService.isAdmin()">
                      <span class="material-symbols-outlined icon-v">favorite</span>
                      <span class="flex-1">Saved Businesses</span>
                    </a>
                    
                    <a href="#" class="modern-dropdown-link group" *ngIf="!authService.isAdmin()">
                      <span class="material-symbols-outlined icon-v">list_alt</span>
                      <span class="flex-1">My Listings</span>
                      <span class="pro-badge-v">
                        <span class="material-symbols-outlined text-[9px]">bolt</span>
                        PRO
                      </span>
                    </a>
                    
                    <a href="#" class="modern-dropdown-link group" *ngIf="!authService.isAdmin()">
                      <span class="material-symbols-outlined icon-v">notifications_active</span>
                      <span class="flex-1">Market Alerts</span>
                    </a>

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

          <!-- MOBILE MENU TOGGLE -->
          <button class="lg:hidden p-2 text-[#09337B] hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center" (click)="isMenuOpen = !isMenuOpen">
            <span class="material-symbols-outlined text-[32px]">{{ isMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- MOBILE MENU OVERLAY (Simplified per Reference) -->
    <div *ngIf="isMenuOpen" class="fixed inset-0 z-[200] bg-white lg:hidden flex flex-col overflow-hidden">
      <!-- Mobile Menu Header -->
      <div class="h-24 px-8 flex items-center justify-between border-b border-slate-100">
        <h2 class="text-3xl font-bold text-[#1a1a1a]">Menu</h2>
        <button (click)="isMenuOpen = false" class="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] text-white">
          <span class="material-symbols-outlined text-[28px]">close</span>
        </button>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex-1 overflow-y-auto px-8 py-10 flex flex-col">
        <div class="flex flex-col">
          <!-- BUY BUSINESS SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('buy')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#1a1a1a]">Buy Business</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['buy']">expand_more</span>
            </button>
            <div *ngIf="sections['buy']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a routerLink="/browse" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Browse Businesses</a>
               <a href="#" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Business Valuation</a>
               <a href="#" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Financing Options</a>
            </div>
          </div>

          <!-- SELL BUSINESS SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('sell')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#1a1a1a]">Sell Business</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['sell']">expand_more</span>
            </button>
            <div *ngIf="sections['sell']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a routerLink="/sell" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">List Your Business</a>
               <a routerLink="/sell" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Get Verified Listing</a>
               <a href="#" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Pricing Plans</a>
            </div>
          </div>

          <!-- INVESTMENT SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('investment')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#1a1a1a]">Investment</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['investment']">expand_more</span>
            </button>
            <div *ngIf="sections['investment']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Invest in Verified Businesses</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Startup Investment</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">High Return Deals</a>
            </div>
          </div>

          <!-- FRANCHISE SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('franchise')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#1a1a1a]">Franchise</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['franchise']">expand_more</span>
            </button>
            <div *ngIf="sections['franchise']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Explore Franchise Opportunities</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Top Franchise Brands</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#09337B]">Low Investment Franchises</a>
            </div>
          </div>

          <!-- SECONDARY LINKS -->
          <div class="border-b border-slate-50 py-4 flex flex-col gap-3">
            <a href="#" class="text-[15px] font-bold text-[#1a1a1a]">How It Works</a>
            <a href="#" class="text-[15px] font-bold text-[#1a1a1a]">FAQs</a>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-100">
          <ng-container *ngIf="!authService.isLoggedIn()">
            <a routerLink="/login" (click)="isMenuOpen = false" 
               class="py-4 text-[17px] font-bold text-[#09337B] border-b border-slate-50 flex items-center justify-between">
               Portal Login
               <span class="material-symbols-outlined">login</span>
            </a>
            <a routerLink="/register" (click)="isMenuOpen = false" 
               class="py-4 text-[17px] font-bold text-[#FF7C2A] border-b border-slate-50 flex items-center justify-between">
               Create Account
               <span class="material-symbols-outlined">person_add</span>
            </a>
          </ng-container>
        </div>

        <ng-container *ngIf="authService.isLoggedIn()">
          <div class="py-4 border-b border-slate-50 mb-6">
             <p class="text-[12px] font-bold text-slate-400 uppercase tracking-widest pl-1">Active Account</p>
             <p class="text-lg font-bold text-[#1a1a1a] pl-1">{{ userEmail }}</p>
          </div>
          
          <div class="flex flex-col">
            <a routerLink="/admin" *ngIf="authService.isAdmin()" (click)="isMenuOpen = false" class="py-6 text-[18px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
              Admin Dashboard <span class="material-symbols-outlined">settings</span>
            </a>
            <button (click)="onLogout(); isMenuOpen = false" class="py-6 text-[18px] font-bold text-rose-500 border-b border-slate-50 flex items-center justify-between text-left">
              Sign Out <span class="material-symbols-outlined">logout</span>
            </button>
          </div>
        </ng-container>
      </div>

    </div>

    <style>
      .nav-link { 
        display: flex; align-items: center; gap: 4px; color: #192830; 
        font-weight: 800; font-size: 11px; text-transform: uppercase; 
        letter-spacing: 0.1em; transition: all 0.2s; 
        padding: 8px 10px; border-radius: 8px; text-decoration: none;
      }
      .nav-link:hover { color: #FF7C2A; }
      
      /* DROPDOWN LOGIC - MIRRORING IMAGE REFERENCE */
      .dropdown-wrapper { position: relative; }
      .dropdown-menu { 
        position: absolute; top: 100%; left: 0; min-width: 200px;
        background: white; border-radius: 4px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;
        padding: 0; opacity: 0; transform: translateY(10px);
        pointer-events: none; transition: all 0.2s ease-out;
        z-index: 100;
        overflow: hidden;
      }
      .group:hover .dropdown-menu { opacity: 1; transform: translateY(0); pointer-events: auto; }
      
      .dropdown-item {
        display: block; padding: 12px 18px;
        color: #64748b; font-size: 12px; font-weight: 700;
        text-decoration: none; transition: all 0.2s;
        border-bottom: 1px solid #f3f4f6;
        text-align: left;
      }
      .dropdown-item:last-child { border-bottom: none; }
      .dropdown-item:hover { color: #FF7C2A; background-color: #f8fafc; padding-left: 24px; }

      .dropdown-item-v {
        display: block; padding: 12px 16px; border-radius: 8px;
        color: #1e293b; font-size: 12px; font-weight: 600;
        transition: all 0.2s; text-align: left;
      }
      .dropdown-item-v:hover { background: #f8fafc; color: #FF7C2A; }

      /* VERIFIED CTA */
      .verified-cta {
        position: relative; overflow: hidden; padding: 0.5rem 1.5rem;
        background: #FF7C2A; color: white; border-radius: 100px;
        font-size: 10px; font-weight: 900; text-transform: uppercase;
        letter-spacing: 0.1em; border: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: none;
      }
      .verified-cta:hover { transform: translateY(-1px); filter: brightness(1.1); box-shadow: none; }
      .cta-inner { position: relative; z-index: 10; display: flex; align-items: center; gap: 8px; }

      .Btn-Container { 
        align-items: center; justify-content: space-between;
        background-color: #09337B; border-radius: 40px; 
        border: none; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative; overflow: hidden;
        display: none; /* Hidden by default for mobile */
      }
      /* Desktop Specific Sizing      /* COMPACT MODERN DROPDOWN */
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

      .pro-badge-v {
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
        .Btn-Container { 
          display: flex;
          width: 130px; height: 44px; padding: 0 4px 0 16px; 
        }
      }
      
      .Btn-Container:hover {
        background-color: #011B45;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px -10px rgba(9, 51, 123, 0.4);
      }
      .icon-Container { 
        width: 34px; height: 34px; background-color: #FF7C2A; 
        display: flex; align-items: center; justify-content: center; 
        border-radius: 50%; border: 3px solid #09337B; 
        flex-shrink: 0;
      }
      .text { 
        color: white; font-size: 10px; font-weight: 900; 
        letter-spacing: 0.15em; white-space: nowrap;
      }

      @media (max-width: 1024px) {
        .announcement-bar { display: none; }
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

  // Mobile Menu Toggles
  sections: { [key: string]: boolean } = {
    buy: false,
    sell: false,
    investment: false,
    franchise: false
  };

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

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
        stagger: 0.05,
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
      start: 'top -10',
      onEnter: () => {
        gsap.to(this.navbar.nativeElement, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
          height: '70px',
          duration: 0.4
        });
      },
      onLeaveBack: () => {
        gsap.to(this.navbar.nativeElement, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: 'blur(0px)',
          boxShadow: 'none',
          height: '80px',
          duration: 0.4
        });
      }
    });
  }
}

