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
    <nav #navbar class="fixed top-0 w-full z-[100] bg-[#f8f9ff] opacity-0 -translate-y-full border-b border-transparent transition-all duration-300">
      <div class="max-w-screen-2xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between overflow-visible">
        
        <!-- Zone 1: Logo (Left) -->
        <div class="flex items-center">
          <a class="flex items-center" routerLink="/">
            <img src="/Home/LOGO.png" alt="Bizbuysell Logo" class="h-[42px] md:h-[48px] w-auto">
          </a>
        </div>

        <!-- Zone 2: Navigation Links (Center) -->
        <div class="hidden lg:flex items-center justify-center gap-2 xl:gap-4">
          
          <!-- BUY BUSINESS DROPDOWN -->
          <div #navItem class="dropdown-wrapper relative group opacity-0">
            <button class="nav-link-v2 flex items-center gap-1">
              Buy Business
              <span class="material-symbols-outlined text-[18px]">expand_more</span>
            </button>

            <div class="dropdown-menu-v2">
               <a routerLink="/browse" class="dropdown-item-v2">Browse Businesses</a>
               <a href="#" class="dropdown-item-v2">Buy with CA Expert</a>
               <a href="#" class="dropdown-item-v2">Business Valuation</a>
               <a href="#" class="dropdown-item-v2">Due Diligence</a>
               <a href="#" class="dropdown-item-v2">Financing Options</a>
               <a routerLink="/buyer-dashboard" class="dropdown-item-v2">Buyer Dashboard</a>
            </div>
          </div>

          <!-- SELL BUSINESS DROPDOWN -->
          <div #navItem class="dropdown-wrapper relative group opacity-0">
            <button class="nav-link-v2 flex items-center gap-1">
              Sell Business
              <span class="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div class="dropdown-menu-v2">
               <a routerLink="/sell" class="dropdown-item-v2">List Your Business</a>
               <a href="#" class="dropdown-item-v2">Sell with CA Expert ⭐</a>
               <a href="#" class="dropdown-item-v2">Business Valuation</a>
               <a routerLink="/sell" class="dropdown-item-v2">Get Verified Listing</a>
               <a href="#" class="dropdown-item-v2">Due Diligence Support</a>
               <a href="#" class="dropdown-item-v2">Pricing Plans</a>
            </div>
          </div>

          <!-- INVESTMENT DROPDOWN -->
          <div #navItem class="dropdown-wrapper relative group opacity-0">
            <button class="nav-link-v2 flex items-center gap-1">
              Investment
              <span class="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div class="dropdown-menu-v2">
               <a href="#" class="dropdown-item-v2">Invest in Verified Businesses</a>
               <a href="#" class="dropdown-item-v2">Startup Investment Opportunities</a>
               <a href="#" class="dropdown-item-v2">High Return Deals</a>
               <a href="#" class="dropdown-item-v2">Business Partnership Opportunities</a>
            </div>
          </div>

          <!-- FRANCHISE DROPDOWN -->
          <div #navItem class="dropdown-wrapper relative group opacity-0">
            <button class="nav-link-v2 flex items-center gap-1">
              Franchise
              <span class="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div class="dropdown-menu-v2">
               <a href="#" class="dropdown-item-v2">Explore Franchise Opportunities</a>
               <a href="#" class="dropdown-item-v2">Top Franchise Brands</a>
               <a href="#" class="dropdown-item-v2">Low Investment Franchises</a>
               <a href="#" class="dropdown-item-v2">High Growth Franchise Deals</a>
            </div>
          </div>

          <!-- HOW IT WORKS -->
          <div #navItem class="nav-item-group opacity-0">
            <a class="nav-link-utility" href="#">How It Works</a>
          </div>

          <!-- FAQS -->
          <div #navItem class="nav-item-group opacity-0">
            <a class="nav-link-utility" href="#">FAQs</a>
          </div>
        </div>

        <!-- Zone 3: Actions (Right) -->
        <div class="flex items-center justify-end gap-x-2">
          <!-- AUTH SUITE -->
          <ng-container *ngIf="!authService.isLoggedIn()">
             <!-- Desktop Only Login Button -->
            <a #loginBtn routerLink="/login" class="Btn-Container hidden lg:flex">
              <span class="text">LOGIN</span>
              <span class="icon-Container">
                <span class="material-symbols-outlined text-white text-[18px]">login</span>
              </span>
            </a>
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
                  <div class="w-10 h-10 bg-[#09337B] flex items-center justify-center shadow-sm border-2 border-white transition-all group-hover/avatar:ring-2 group-hover/avatar:ring-[#FF7C2A] group-hover/avatar:ring-offset-2 overflow-hidden" style="border-radius: 50% !important;">
                    <span class="text-[15px] font-bold text-white tracking-tighter" style="font-family: 'Manrope', sans-serif;">{{ userInitials }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[16px] font-medium text-[#0c023c] group-hover/avatar:text-[#FF7C2A] transition-colors" style="font-family: 'Manrope', sans-serif; line-height: 24px;">{{ username }}</span>
                    <span class="material-symbols-outlined text-[20px] text-slate-300 font-light group-hover/avatar:translate-y-0.5 transition-transform">expand_more</span>
                  </div>
                </button>

                <!-- Dropdown Menu -->
                <div class="absolute right-0 top-[85%] pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[110]">
                  <div class="w-[220px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 p-2 flex flex-col gap-0.5">
                    
                    <!-- ADMIN SPECIFIC ITEMS -->
                    <ng-container *ngIf="authService.isAdmin()">
                      <a routerLink="/admin" class="modern-dropdown-link group !bg-slate-50 mb-1">
                        <span class="material-symbols-outlined icon-v text-[#09337B] !fill-1">dashboard</span>
                        <span class="flex-1 font-bold text-[#09337B]">Admin Panel</span>
                      </a>
                    </ng-container>
                    
                    <!-- USER SPECIFIC ITEMS -->
                    <a routerLink="/sell" class="modern-dropdown-link group !bg-[#fff9f2] !text-[#0c023c] hover:!bg-[#fff0e0] mb-1">
                      <span class="material-symbols-outlined icon-v !text-[#0c023c] !font-bold !fill-1">sell</span>
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

                    <div class="h-px bg-zinc-100/60 my-2 mx-3"></div>
                    
                    <a href="#" class="modern-dropdown-link group">
                      <span class="material-symbols-outlined icon-v">help_outline</span>
                      <span class="flex-1">Help center</span>
                    </a>
                    
                    <button (click)="onLogout()" class="modern-dropdown-link !text-rose-600 hover:bg-rose-50/50 group mt-1">
                      <span class="material-symbols-outlined icon-v !text-rose-500 !fill-1">logout</span>
                      <span class="flex-1 text-left font-bold">Sign out</span>
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
        <div class="flex items-center gap-4">
          <button *ngIf="authService.isLoggedIn()" class="w-12 h-12 flex items-center justify-center text-slate-600 relative">
            <span class="material-symbols-outlined text-[28px]">notifications</span>
            <span *ngIf="hasNotifications" class="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button (click)="isMenuOpen = false" class="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] text-white">
            <span class="material-symbols-outlined text-[28px]">close</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex-1 overflow-y-auto px-8 py-10 flex flex-col">
        <div class="flex flex-col">
          <!-- BUY BUSINESS SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('buy')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#0c023c]" style="font-family: 'Work Sans', sans-serif;">Buy Business</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['buy']">expand_more</span>
            </button>
            <div *ngIf="sections['buy']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a routerLink="/browse" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Browse Businesses</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Buy with CA Expert</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Business Valuation</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Due Diligence</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Financing Options</a>
               <a routerLink="/buyer-dashboard" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Buyer Dashboard</a>
            </div>
          </div>

          <!-- SELL BUSINESS SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('sell')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#0c023c]" style="font-family: 'Work Sans', sans-serif;">Sell Business</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['sell']">expand_more</span>
            </button>
            <div *ngIf="sections['sell']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a routerLink="/sell" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">List Your Business</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Sell with CA Expert ⭐</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Business Valuation</a>
               <a routerLink="/sell" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Get Verified Listing</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Due Diligence Support</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Pricing Plans</a>
            </div>
          </div>

          <!-- INVESTMENT SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('investment')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#0c023c]" style="font-family: 'Work Sans', sans-serif;">Investment</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['investment']">expand_more</span>
            </button>
            <div *ngIf="sections['investment']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Invest in Verified Businesses</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Startup Investment Opportunities</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">High Return Deals</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Business Partnership Opportunities</a>
            </div>
          </div>

          <!-- FRANCHISE SECTION -->
          <div class="border-b border-slate-50 py-4">
            <button (click)="toggleSection('franchise')" class="w-full flex items-center justify-between text-left">
               <span class="text-[18px] font-bold text-[#0c023c]" style="font-family: 'Work Sans', sans-serif;">Franchise</span>
               <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="sections['franchise']">expand_more</span>
            </button>
            <div *ngIf="sections['franchise']" class="flex flex-col gap-3 pl-4 mt-4 overflow-hidden">
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Explore Franchise Opportunities</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Top Franchise Brands</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">Low Investment Franchises</a>
               <a href="#" (click)="isMenuOpen = false" class="text-[14px] text-slate-500 font-medium hover:text-[#FF7C2A]">High Growth Franchise Deals</a>
            </div>
          </div>

          <!-- SECONDARY LINKS -->
          <div class="border-b border-slate-50 py-4 flex flex-col gap-3">
            <a href="#" class="text-[16px] font-medium text-[#0c023c] hover:text-[#FF7C2A]" style="font-family: 'Roboto', sans-serif; line-height: 24px;">How It Works</a>
            <a href="#" class="text-[16px] font-medium text-[#0c023c] hover:text-[#FF7C2A]" style="font-family: 'Roboto', sans-serif; line-height: 24px;">FAQs</a>
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
          <div class="py-4 border-b border-slate-50 mb-4">
             <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Active Account</p>
             <p class="text-[16px] font-medium text-[#0c023c] pl-1" style="font-family: 'Manrope', sans-serif; line-height: 24px;">{{ username }}</p>
             <p class="text-[12px] text-slate-500 pl-1">{{ userEmail }}</p>
          </div>
          
          <div class="flex flex-col">
            <a routerLink="/admin" *ngIf="authService.isAdmin()" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
              Admin Dashboard <span class="material-symbols-outlined text-[20px]">dashboard</span>
            </a>

            <a routerLink="/sell" (click)="isMenuOpen = false" class="py-4 text-[16px] font-bold text-[#FF7C2A] border-b border-slate-50 flex items-center justify-between">
              Sell A Business <span class="material-symbols-outlined text-[20px]">sell</span>
            </a>

            <a routerLink="/profile/settings" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
              Account Settings <span class="material-symbols-outlined text-[20px]">settings</span>
            </a>

            <ng-container *ngIf="!authService.isAdmin()">
              <a href="#" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
                My Entities <span class="material-symbols-outlined text-[20px]">corporate_fare</span>
              </a>
              <a href="#" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
                Saved Businesses <span class="material-symbols-outlined text-[20px]">favorite</span>
              </a>
              <a href="#" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
                My Listings <span class="material-symbols-outlined text-[20px]">list_alt</span>
              </a>
              <a href="#" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-[#1a1a1a] border-b border-slate-50 flex items-center justify-between">
                Market Alerts <span class="material-symbols-outlined text-[20px]">notifications_active</span>
              </a>
            </ng-container>

            <a href="#" (click)="isMenuOpen = false" class="py-4 text-[16px] font-medium text-slate-400 border-b border-slate-50 flex items-center justify-between">
              Help Center <span class="material-symbols-outlined text-[20px]">help_outline</span>
            </a>

            <button (click)="onLogout(); isMenuOpen = false" class="py-5 text-[16px] font-bold text-rose-500 border-b border-slate-50 flex items-center justify-between text-left">
              Sign Out <span class="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </ng-container>
      </div>

    </div>

    <style>
      .nav-link-v2 {
        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #0c023c;
        text-decoration: none;
        transition: color 0.3s ease;
        padding: 4px 0;
      }
      .nav-link-utility {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #0c023c;
        text-decoration: none;
        transition: color 0.3s ease;
        padding: 4px 0;
      }
      .nav-link-utility:hover {
        color: #FF7C2A;
      }
      .active-line {
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #FF7C2A;
        border-radius: 2px;
      }
      .dropdown-menu-v2 {
        position: absolute;
        top: calc(100% + 10px);
        left: 0;
        min-width: 240px;
        background: white;
        border-radius: 6px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        padding: 4px 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(15px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        z-index: 100;
        border: 1px solid rgba(0,0,0,0.05);
        transform-origin: top left;
      }
      /* Triangle Arrow */
      .dropdown-menu-v2::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 24px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid white;
      }
      .group:hover .dropdown-menu-v2 {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }
      .dropdown-item-v2 {
        display: block;
        padding: 14px 22px;
        font-family: 'Work Sans', sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: #0c023c;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        border-bottom: 1px solid #f8f8f8;
        position: relative;
        overflow: hidden;
      }
      .dropdown-item-v2:last-child {
        border-bottom: none;
      }
      .dropdown-item-v2:hover {
        background-color: #FF7C2A;
        color: white;
        padding-left: 28px;
      }
      .dropdown-item-v2::after {
        content: 'arrow_forward';
        font-family: 'Material Symbols Outlined';
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%) translateX(-10px);
        opacity: 0;
        font-size: 18px;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
      }
      .dropdown-item-v2:hover::after {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }

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
        text-decoration: none;
        display: none; /* Hidden by default for mobile */
      }
      /* Desktop Specific Sizing      /* COMPACT MODERN DROPDOWN */
      .modern-dropdown-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        border-radius: 12px;
        color: #1e293b; 
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Work Sans', sans-serif;
        position: relative;
      }
      
      .modern-dropdown-link:hover {
        background-color: #f4f4f5; 
        padding-left: 20px;
      }
      .modern-dropdown-link::after {
        content: 'arrow_forward';
        font-family: 'Material Symbols Outlined';
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%) translateX(-10px);
        opacity: 0;
        font-size: 18px;
        color: #FF7C2A;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
      }
      .modern-dropdown-link:hover::after {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }

      .icon-v {
        font-size: 20px;
        color: #475569;
        font-variation-settings: 'FILL' 0, 'wght' 400;
        transition: all 0.2s ease;
      }
      .group:hover .icon-v {
        color: inherit;
        transform: scale(1.1);
      }
      .fill-1 {
        font-variation-settings: 'FILL' 1 !important;
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
        color: white; font-size: 11px; font-weight: 700; 
        letter-spacing: 0.1em; white-space: nowrap;
        font-family: 'Work Sans', sans-serif;
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
          backgroundColor: 'rgba(248, 249, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
          height: '80px',
          duration: 0.4
        });
      },
      onLeaveBack: () => {
        gsap.to(this.navbar.nativeElement, {
          backgroundColor: 'rgba(248, 249, 255, 1)',
          backdropFilter: 'blur(0px)',
          boxShadow: 'none',
          height: '96px',
          duration: 0.4
        });
      }
    });
  }
}

