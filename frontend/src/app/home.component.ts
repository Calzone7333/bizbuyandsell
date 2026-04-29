import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ListingService } from './listing.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .services-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 2.5rem;
    }
    @media (min-width: 768px) {
      .services-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .service-card-wrap {
      position: relative;
      height: 420px;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.04);
      cursor: pointer;
      transition: all 0.4s ease;
      background: #fff;
    }

    .service-card-wrap:hover {
      box-shadow: 0 30px 60px rgba(0,0,0,0.1);
    }

    .service-overlay {
      position: absolute;
      inset: 0;
      z-index: 30;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
      transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      background: white;
      color: rgb(25, 40, 48);
      border: 1px solid rgba(0,0,0,0.05);
    }

    .service-card-wrap:hover .service-overlay {
      transform: translateY(-100%);
    }

    .service-main-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 1;
      transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .service-card-wrap:hover .service-main-img {
      transform: scale(1.1);
    }

    .service-overlay-content {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to top, rgba(25, 40, 48, 0.8) 0%, transparent 60%);
      padding: 2rem;
      transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .service-main-icon {
      width: 90px;
      height: 90px;
      object-fit: contain;
      margin-top: 1.5rem;
      transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .service-card-wrap:hover .service-main-icon {
      transform: translateY(20px) scale(0.9);
    }

    .service-detail-content {
      position: absolute;
      inset: 0;
      z-index: 20;
      padding: 2rem;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(0,0,0,0.05);
    }

    .tree-animate {
      animation-duration: 0.7s;
      animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
      animation-fill-mode: backwards;
    }

    @keyframes tree-pop {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }

    .tree-pop { animation-name: tree-pop; }

    @keyframes tree-slide-up {
      0% { opacity: 0; transform: translateY(3em); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .tree-slide-up { animation-name: tree-slide-up; }

    .delay-1 { animation-delay: 0.3s; }
    .delay-2 { animation-delay: 0.6s; }
    .delay-3 { animation-delay: 0.9s; }
    .delay-4 { animation-delay: 1.2s; }
    .delay-5 { animation-delay: 1.5s; }

    .service-dots {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: transform 0.7s ease;
    }
    .service-dot {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: #FF7C2A;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .service-card-wrap:hover .service-dots {
      transform: translateY(1rem);
    }

    .listing-container {
      width: 100%;
      overflow: hidden;
      padding: 2rem 0;
      position: relative;
    }
    .listing-track {
      display: flex;
      gap: 2rem;
      width: max-content;
      will-change: transform;
    }
    .listing-card-mini {
      width: 300px;
      flex-shrink: 0;
      background: white;
      border: 1px solid #f1f1f1;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.4s ease;
    }
    .listing-card-mini:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      transform: translateY(-5px);
    }
  `],
  template: `
    <main class="pt-28 lg:pt-0 w-full">
      <section #heroSection class="relative min-h-[600px] lg:h-[calc(100vh-80px)] flex items-center lg:items-start lg:pt-24 overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <img class="w-full h-full object-cover" src="/Hero/HeroBackgroundimage.png" alt="Hero Background">
          <div class="absolute inset-0 bg-white/40 lg:bg-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6 order-1 lg:order-1 text-center lg:text-left">
              <h1 #heroHeading class="mb-8 lg:mb-10 tracking-tight max-w-4xl opacity-0 px-2 lg:px-0" style='font-family: "Manrope", sans-serif; font-size: 52px; font-weight: 800; line-height: 59.8px; color: rgb(9, 51, 123);'>
                India’s First <span>CA-Verified</span> <br class="hidden lg:block">
                <span class="relative inline-block">
                  Business Marketplace
                  <img src="/Hero/textunderline.png" alt="underline" class="absolute -bottom-2 md:-bottom-5 left-[-5%] md:left-[-10%] w-[110%] md:w-[120%] h-2 md:h-4 pointer-events-none object-contain">
                </span>
              </h1>
              <p #heroText class="text-zinc-600 max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-8 opacity-0 px-4 lg:px-0" style="font-size: 15px; lg:font-size: 16px; font-weight: 400; line-height: 28px; lg:line-height: 32px; font-family: 'Work Sans', sans-serif;">
                Verified & Analysed Business Marketplace
              </p>
              <div #searchBox class="bg-white px-1.5 py-1.5 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] flex flex-col xl:flex-row items-center gap-1.5 max-w-4xl w-full mx-auto lg:mx-0 opacity-0 relative z-20">
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 w-full text-left">
                  <div class="px-5 py-2.5 min-w-0 flex flex-col justify-center">
                    <label class="block text-[0.625rem] font-bold text-zinc-400 tracking-widest uppercase mb-1 overflow-hidden text-ellipsis whitespace-nowrap">Industry</label>
                    <div class="relative flex items-center">
                      <select class="w-full bg-transparent border-none p-0 text-[14px] font-semibold text-zinc-900 focus:ring-0 appearance-none cursor-pointer pr-4 truncate leading-tight">
                        <option>All Sectors</option>
                        <option>Manufacturing</option>
                        <option>Technology</option>
                        <option>Hospitality</option>
                      </select>
                    </div>
                  </div>
                  <div class="px-5 py-2.5 min-w-0 flex flex-col justify-center">
                    <label class="block text-[0.625rem] font-bold text-zinc-400 tracking-widest uppercase mb-1 overflow-hidden text-ellipsis whitespace-nowrap">Location</label>
                    <input class="w-full bg-transparent border-none p-0 text-[14px] font-semibold text-zinc-900 focus:ring-0 placeholder:text-zinc-300 truncate leading-tight" placeholder="City or State..." type="text"/>
                  </div>
                  <div class="px-5 py-2.5 min-w-0 flex flex-col justify-center">
                    <label class="block text-[0.625rem] font-bold text-zinc-400 tracking-widest uppercase mb-1 overflow-hidden text-ellipsis whitespace-nowrap">Investment</label>
                    <div class="relative flex items-center">
                      <select class="w-full bg-transparent border-none p-0 text-[14px] font-semibold text-zinc-900 focus:ring-0 appearance-none cursor-pointer pr-4 truncate leading-tight">
                        <option>All Ranges</option>
                        <option>Under ₹50L</option>
                        <option>₹50L - ₹2Cr</option>
                        <option>₹2Cr - ₹10Cr</option>
                        <option>₹10Cr+</option>
                      </select>
                    </div>
                  </div>
                </div>
                <a #searchBtn routerLink="/browse" class="w-full xl:w-auto bg-[#FF7C2A] text-white px-5 py-2.5 rounded-lg font-bold tracking-tight hover:bg-[#FF7C2A]/90 transition-all flex items-center justify-center gap-1.5 flex-shrink-0">
                  <span class="material-symbols-outlined text-lg">search</span>
                  <span class="uppercase tracking-widest text-[9px]">Search</span>
                </a>
              </div>
            </div>
            
            <div class="lg:col-span-6 order-2 lg:order-2 relative h-[450px] sm:h-[500px] lg:h-full flex items-center justify-center mt-8 lg:mt-0">
              <div #phoneGroup class="relative scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.82] xl:scale-[0.88] origin-center transition-transform duration-700 h-full flex items-center justify-center">
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] flex items-center justify-center">
                  <div class="absolute inset-0 pointer-events-none overflow-visible">
                    <svg #ringSVG class="w-full h-full opacity-0" viewBox="0 0 750 750" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                      <circle #ring1 cx="375" cy="375" r="140" stroke="#4185D0" stroke-width="3" stroke-dasharray="1 15" stroke-linecap="round" />
                      <circle #ring2 cx="375" cy="375" r="200" stroke="#4185D0" stroke-width="2" stroke-dasharray="1 18" stroke-linecap="round" />
                      <circle #ring3 cx="375" cy="375" r="260" stroke="#4185D0" stroke-width="3" stroke-dasharray="1 22" stroke-linecap="round" />
                    </svg>
                  </div>
                  <div class="absolute inset-0 pointer-events-none">
                    <div class="relative w-full h-full">
                      <div class="absolute left-1/2 top-1/2" style="transform: translate(-50%, -50%) rotate(330deg) translateY(-260px);">
                        <div #floatIcon class="opacity-0">
                          <div class="flex flex-col items-center gap-1" style="transform: rotate(-330deg);">
                            <div class="w-11 h-11 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden bg-white group hover:scale-110 transition-transform cursor-pointer pointer-events-auto border-2 border-white">
                              <img class="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf3yY0yAbpfaVki6ODkxJTCFaEABdMfby8jZYpJ3z_Ay2HFm546O3IriOkiRQW9ie6XGg_pBGMWmq15x7kuwUuoz_GT07C8zL7dGq5EAjf0_DoWxZPfu5DHG1F3L7Bkeoo2hEBuPetIhWfDxzgl_ruJdS2jfORfrZIBJhg_jhmneQ0MnYKhtAdoaAPrpHryHyB94a4Ip609ovsWYhskHdvw8Nn2TDOhL1eLnRDV0jZALSgmvpDbmYbfVMQJbmbbDrU2zlogC-mHNOj" alt="Industrial">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="absolute left-1/2 top-1/2" style="transform: translate(-50%, -50%) rotate(90deg) translateY(-260px);">
                        <div #floatIcon class="opacity-0">
                          <div class="flex flex-col items-center gap-1" style="transform: rotate(-90deg);">
                            <div class="w-11 h-11 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden bg-white group hover:scale-110 transition-transform cursor-pointer pointer-events-auto border-2 border-white">
                              <img class="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoqcOMHP6TzrgAvQ9ANQ5tOUlgp-F7VDRonTuIVNAIUhOq7AFWCfxEB2T7TcdMY5_oSq_HW18kSM4md-JxON-wc6yPSY6WEZheEsJbNQ23fYbxvzMLv6HnnumwDomoiwEcj5ofdpqE0HiLlY7EpzbjPfPrTS3IEapJJS-ddQnR1NYInou1nbKUl-Sew0-I13d6JzB7oao0NJpQZ_5CEczp2co_RHrfreq-YblEy239NFuhUGa0jfcJjgIwf6CsoS7t-uC50BkNDsRb" alt="Hospitality">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="absolute left-1/2 top-1/2" style="transform: translate(-50%, -50%) rotate(240deg) translateY(-260px);">
                        <div #floatIcon class="opacity-0">
                          <div class="flex flex-col items-center gap-1" style="transform: rotate(-240deg);">
                            <div class="w-11 h-11 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden bg-white group hover:scale-110 transition-transform cursor-pointer pointer-events-auto border-2 border-white">
                              <img class="w-full h-full object-cover rounded-xl shadow-inner" src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=150&h=150" alt="Agriculture">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="absolute left-1/2 top-1/2" style="transform: translate(-50%, -50%) rotate(285deg) translateY(-200px);">
                        <div #floatIcon class="opacity-0">
                          <div class="flex flex-col items-center gap-1" style="transform: rotate(-285deg);">
                            <div class="w-11 h-11 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden bg-white group hover:scale-110 transition-transform cursor-pointer pointer-events-auto border-2 border-white">
                              <img class="w-full h-full object-cover rounded-xl shadow-inner" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=150&h=150" alt="Retail">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="absolute left-1/2 top-1/2" style="transform: translate(-50%, -50%) rotate(37.5deg) translateY(-200px);">
                        <div #floatIcon class="opacity-0">
                          <div class="flex flex-col items-center gap-1" style="transform: rotate(-37.5deg);">
                            <div class="w-11 h-11 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden bg-white group hover:scale-110 transition-transform cursor-pointer pointer-events-auto border-2 border-white">
                              <img class="w-full h-full object-cover rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG7pCgLJd9ZBHlyOrb79N_lc5xYxumvkQ7C9QNI5y6WlFatvd-K_yZxEtnbMmD8ngvr8H-uLyPE3BnTfZfsVyHIr0dEJcBw63YCkevVEeNb_tw4iJzBQE_Uas6xje-5SVMHwmGPBlDTeUbaD_zmXlH-eeOFmKiBmseOZEyuWp8YuNwuWQ8qcwR_hxn2XwgwjUW5yVo2AN8uGOPrkc9QSwffjer9_KNm-lBFBcRbbe6eYY_XNvWVqB2VwR88MRTUanc2-ZH9WOtnE23" alt="Technology">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img #heroMainImg class="relative z-10 w-auto h-auto max-h-[440px] sm:max-h-[580px] lg:max-h-[600px] opacity-0 lg:translate-x-16" src="/Hero/Heroimage1.png" alt="Trusted Business Marketplace Illustration">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative z-20 mt-4 px-6 lg:px-8 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] border border-zinc-100 bg-white min-h-[160px]">
          <div #actionCard class="p-8 text-zinc-900 border-r border-zinc-50 flex flex-col justify-between opacity-0 translate-y-12">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-2xl text-[rgb(25,40,48)]">shopping_cart</span>
              </div>
              <div>
                <h3 class="text-[15px] font-bold uppercase tracking-tight text-[rgb(25,40,48)] mb-1" style="font-family: 'Work Sans', sans-serif;">Buy A Business</h3>
                <p class="text-zinc-500 text-[13px] font-normal leading-relaxed" style="font-family: 'Roboto', sans-serif;">
                  Browse 1,400+ verified industrial listings.
                </p>
              </div>
            </div>
            <div class="mt-6 flex items-center gap-2 text-[rgb(25,40,48)] hover:gap-3 transition-all cursor-pointer">
              <span class="text-[10px] font-black uppercase tracking-widest">Active Listings</span>
              <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </div>
          </div>
          <div #actionCard class="p-8 text-zinc-900 border-r border-zinc-50 flex flex-col justify-between opacity-0 translate-y-12 bg-orange-50/30">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-2xl text-[#FF7C2A]">sell</span>
              </div>
              <div>
                <h3 class="text-[15px] font-bold uppercase tracking-tight text-[#FF7C2A] mb-1" style="font-family: 'Work Sans', sans-serif;">Sell Business</h3>
                <p class="text-zinc-500 text-[13px] font-normal leading-relaxed" style="font-family: 'Roboto', sans-serif;">
                  Confidential valuation and expert exit strategy.
                </p>
              </div>
            </div>
            <button class="mt-6 w-full bg-[rgb(25,40,48)] text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7C2A] transition-all flex items-center justify-center gap-2 group">
              Get Valuation <span class="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">analytics</span>
            </button>
          </div>
          <div #actionCard class="p-8 text-zinc-900 flex flex-col justify-between opacity-0 translate-y-12">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-2xl text-[#1EBBA3]">payments</span>
              </div>
              <div>
                <h3 class="text-[15px] font-bold uppercase tracking-tight text-zinc-900 mb-1" style="font-family: 'Work Sans', sans-serif;">Seek Funding</h3>
                <div class="flex gap-2 mt-1">
                  <span class="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-tighter">Angel</span>
                  <span class="px-2 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-tighter">PE</span>
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Global Reach</span>
                <span class="text-[12px] font-black text-zinc-900 tracking-tighter">Institutional</span>
              </div>
              <span class="material-symbols-outlined text-2xl text-zinc-300">hub</span>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-6 lg:px-8 bg-[#F8FAFC] relative overflow-hidden">
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div #scrollItem class="text-center mb-20 opacity-0 translate-y-8">
            <span class="text-xs font-bold text-[#FF7C2A] uppercase tracking-[0.3em] mb-4 block" style="font-family: 'Work Sans', sans-serif;">Institutional Grade Support</span>
            <h2 style='font-family: "Work Sans", sans-serif; font-size: 38px; font-weight: 600; line-height: 48px; color: rgb(25, 40, 48);' class="tracking-tighter">
              End-to-End Excellence for Strategic Business Transitions.
            </h2>
          </div>

          <div class="services-grid max-w-6xl mx-auto">
            <div #scrollItem class="service-card-wrap opacity-0 translate-y-12 group">
              <div class="service-overlay !p-0">
                <div class="absolute inset-0 bg-[rgb(25,40,48)]/20 group-hover:bg-[rgb(25,40,48)]/40 transition-all duration-700 z-[2]"></div>
                <img src="/Home/Advisory.png" alt="Advisory" class="service-main-img">
                <div class="service-overlay-content tree-animate tree-pop delay-2">
                  <span class="text-[0.6rem] font-black uppercase tracking-[0.4em] text-[#FF7C2A] mb-2 block">Division 01</span>
                  <h3 class="text-3xl font-black leading-tight text-white" style='font-family: "Work Sans", sans-serif;'>Advisory & <br> Strategy</h3>
                  <div class="w-12 h-1 bg-[#FF7C2A] mt-4"></div>
                </div>
                <div class="absolute bottom-6 right-6 service-dots tree-animate tree-slide-up delay-4">
                  <div class="service-dot !bg-[#FF7C2A]"></div>
                  <div class="service-dot !bg-slate-200"></div>
                  <div class="service-dot !bg-slate-200"></div>
                </div>
              </div>
              <div class="service-detail-content">
                <div>
                  <div class="mb-8">
                    <span class="material-symbols-outlined text-6xl text-[rgb(25,40,48)] font-light opacity-80">analytics</span>
                  </div>
                  <h3 class="text-2xl font-extrabold text-[rgb(25,40,48)] mb-4" style='font-family: "Work Sans", sans-serif;'>Sector Advisory</h3>
                  <p class="text-slate-500 text-sm leading-relaxed mb-8" style="font-family: 'Roboto', sans-serif;">
                    Expert consulting focused on preparing your enterprise for high-value acquisitions and market transitions.
                  </p>
                  <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Valuation Analysis
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Exit Strategy Planning
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Market Positioning
                    </li>
                  </ul>
                </div>
                <button class="w-full bg-[rgb(25,40,48)] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7C2A] transition-all flex items-center justify-center gap-2 group shadow-lg">
                  Consultation <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </div>

            <div #scrollItem class="service-card-wrap opacity-0 translate-y-12 group">
              <div class="service-overlay !p-0">
                <div class="absolute inset-0 bg-[rgb(25,40,48)]/20 group-hover:bg-[rgb(25,40,48)]/40 transition-all duration-700 z-[2]"></div>
                <img src="/Home/DD.jpeg" alt="Due Diligence" class="service-main-img">
                <div class="service-overlay-content tree-animate tree-pop delay-3">
                  <span class="text-[0.6rem] font-black uppercase tracking-[0.4em] text-[#FF7C2A] mb-2 block">Division 02</span>
                  <h3 class="text-3xl font-black leading-tight text-white" style='font-family: "Work Sans", sans-serif;'>Due <br> Diligence</h3>
                  <div class="w-12 h-1 bg-[#FF7C2A] mt-4"></div>
                </div>
                <div class="absolute bottom-6 right-6 service-dots tree-animate tree-slide-up delay-5">
                  <div class="service-dot !bg-slate-200"></div>
                  <div class="service-dot !bg-[#FF7C2A]"></div>
                  <div class="service-dot !bg-slate-200"></div>
                </div>
              </div>
              <div class="service-detail-content">
                <div>
                  <div class="mb-8">
                    <span class="material-symbols-outlined text-6xl text-[rgb(25,40,48)] font-light opacity-80">verified_user</span>
                  </div>
                  <h3 class="text-2xl font-extrabold text-[rgb(25,40,48)] mb-4" style='font-family: "Work Sans", sans-serif;'>Transaction Integrity</h3>
                  <p class="text-slate-500 text-sm leading-relaxed mb-8" style="font-family: 'Roboto', sans-serif;">
                    Multi-layered verification protocols to ensure every transaction detail is accurate, verified, and secure.
                  </p>
                  <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Financial Verification
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Legal Compliance
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Risk Assessment
                    </li>
                  </ul>
                </div>
                <button class="w-full bg-[rgb(25,40,48)] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7C2A] transition-all flex items-center justify-center gap-2 group shadow-lg">
                  Verify Record <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </div>

            <div #scrollItem class="service-card-wrap opacity-0 translate-y-12 group">
              <div class="service-overlay !p-0">
                <div class="absolute inset-0 bg-[rgb(25,40,48)]/20 group-hover:bg-[rgb(25,40,48)]/40 transition-all duration-700 z-[2]"></div>
                <img src="/Home/growth.png" alt="Growth Capital" class="service-main-img">
                <div class="service-overlay-content tree-animate tree-pop delay-4">
                  <span class="text-[0.6rem] font-black uppercase tracking-[0.4em] text-[#FF7C2A] mb-2 block">Division 03</span>
                  <h3 class="text-3xl font-black leading-tight text-white" style="font-family: 'Manrope', sans-serif;">Growth <br> Capital</h3>
                  <div class="w-12 h-1 bg-[#FF7C2A] mt-4"></div>
                </div>
                <div class="absolute bottom-6 right-6 service-dots tree-animate tree-slide-up delay-6">
                  <div class="service-dot !bg-slate-200"></div>
                  <div class="service-dot !bg-slate-200"></div>
                  <div class="service-dot !bg-[#FF7C2A]"></div>
                </div>
              </div>
              <div class="service-detail-content">
                <div>
                  <div class="mb-8">
                    <span class="material-symbols-outlined text-6xl text-[rgb(25,40,48)] font-light opacity-80">account_balance</span>
                  </div>
                  <h3 class="text-2xl font-extrabold text-[rgb(25,40,48)] mb-4" style='font-family: "Work Sans", sans-serif;'>Financial Engineering</h3>
                  <p class="text-slate-500 text-sm leading-relaxed mb-8" style="font-family: 'Roboto', sans-serif;">
                    Architecting complex capital structures to fuel rapid expansion and sustainable enterprise growth.
                  </p>
                  <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Equity Financing
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> Debt Structuring
                    </li>
                    <li class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span class="material-symbols-outlined text-[#FF7C2A] text-xl font-bold">arrow_right_alt</span> M&A Support
                    </li>
                  </ul>
                </div>
                <button class="w-full bg-[rgb(25,40,48)] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7C2A] transition-all flex items-center justify-center gap-2 group shadow-lg">
                  Secure Capital <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-8 max-w-7xl mx-auto">
        <div #scrollItem class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 opacity-0 translate-y-8">
          <div>
            <span class="text-[0.6rem] lg:text-[0.7rem] font-bold text-outline tracking-widest uppercase mb-2 block">Market Pulse</span>
            <h2 class="text-3xl lg:text-4xl font-headline font-extrabold text-primary tracking-tight" style='font-family: "Work Sans", sans-serif;'>Premium Listings</h2>
          </div>
          <button class="text-secondary font-bold border-b border-secondary/30 pb-1 hover:border-secondary transition-all text-sm lg:text-base">View All 1,400+ Opportunities</button>
        </div>

        <div class="listing-container">
          <div #listingTrack class="listing-track group" (mouseenter)="pauseListingTicker()" (mouseleave)="resumeListingTicker()">
            <div *ngFor="let listing of listings" class="listing-card-mini group/card">
              <div class="relative h-40 overflow-hidden">
                <img class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                     [src]="listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : 'https://picsum.photos/seed/' + listing.id + '/400/250'" alt="listing image"/>
                <div class="absolute inset-0 bg-[rgb(25,40,48)]/20"></div>
                <div class="absolute top-3 left-3 z-10">
                  <span class="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded">{{ listing.category }}</span>
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-sm font-black text-[rgb(25,40,48)] line-clamp-1" style="font-family: 'Manrope', sans-serif;">{{ listing.title }}</h3>
                  <p class="text-xs font-black text-[#FF7C2A]">{{ formatPrice(listing.askingPrice) }}</p>
                </div>
                <div class="flex justify-between mb-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span>{{ listing.city }}, {{ listing.state }}</span>
                  <span>{{ formatPrice(listing.annualRevenue) }} Rev</span>
                </div>
                <button (click)="viewListing(listing.id)" class="w-full py-2 bg-slate-50 text-[rgb(25,40,48)] text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-[rgb(25,40,48)] hover:text-white transition-all">Details</button>
              </div>
            </div>
            <div *ngFor="let listing of listings" class="listing-card-mini group/card">
              <div class="relative h-40 overflow-hidden">
                <img class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                     [src]="listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : 'https://picsum.photos/seed/' + listing.id + '/400/250'" alt="listing image"/>
                <div class="absolute inset-0 bg-[rgb(25,40,48)]/20"></div>
                <div class="absolute top-3 left-3 z-10">
                  <span class="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded">{{ listing.category }}</span>
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-sm font-black text-[rgb(25,40,48)] line-clamp-1" style="font-family: 'Manrope', sans-serif;">{{ listing.title }}</h3>
                  <p class="text-xs font-black text-[#FF7C2A]">{{ formatPrice(listing.askingPrice) }}</p>
                </div>
                <div class="flex justify-between mb-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span>{{ listing.city }}, {{ listing.state }}</span>
                  <span>{{ formatPrice(listing.annualRevenue) }} Rev</span>
                </div>
                <button (click)="viewListing(listing.id)" class="w-full py-2 bg-slate-50 text-[rgb(25,40,48)] text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-[rgb(25,40,48)] hover:text-white transition-all">Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div #scrollItem class="opacity-0 -translate-x-12 relative">
              <div class="relative w-full max-w-[650px] mx-auto">
                <div class="aspect-[16/10] overflow-hidden relative">
                  <img src="/Home/about_us_vector.png" 
                       class="w-full h-full object-contain" alt="Business Growth Illustration">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#A294F9]/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
            <div #scrollItem class="flex flex-col opacity-0 translate-x-12">
              <span class="text-[13px] font-bold text-[rgb(12,2,60)] uppercase tracking-[0.2em] mb-4 block" style="font-family: 'Work Sans', sans-serif;">About Us</span>
              <h2 class="mb-6 tracking-tight" style='font-family: "Work Sans", sans-serif; font-size: 42px; font-weight: 700; line-height: 52px; color: rgb(12, 2, 60);'>
                Mastering The Quality Of <br> <span class="bg-[#A294F9]/20 px-3 py-1 rounded-xl">Your Business</span> Transitions.
              </h2>
              <p class="mb-10" style="font-family: 'Roboto', sans-serif; font-size: 15px; font-weight: 400; line-height: 26px; color: rgb(62, 61, 61);">
                Our core mission is to streamline the path from discovery to closing with unprecedented precision. We work with you to develop individualized transaction plans, including risk management and market research.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div class="flex flex-col gap-4">
                  <div class="w-12 h-12 flex items-center justify-center text-[#FF7C2A]">
                    <span class="material-symbols-outlined text-4xl">thumb_up_off</span>
                  </div>
                  <div>
                    <h4 class="text-[18px] font-bold text-[rgb(12,2,60)] mb-2" style="font-family: 'Work Sans', sans-serif;">Best Solutions</h4>
                    <p class="text-[14px] text-zinc-500 leading-relaxed" style="font-family: 'Roboto', sans-serif;">Individualized transaction plans for every unique business need.</p>
                  </div>
                </div>
                <div class="flex flex-col gap-4">
                  <div class="w-12 h-12 flex items-center justify-center text-[#FF7C2A]">
                    <span class="material-symbols-outlined text-4xl">workspace_premium</span>
                  </div>
                  <div>
                    <h4 class="text-[18px] font-bold text-[rgb(12,2,60)] mb-2" style="font-family: 'Work Sans', sans-serif;">Best Award</h4>
                    <p class="text-[14px] text-zinc-500 leading-relaxed" style="font-family: 'Roboto', sans-serif;">Recognized as the region's premier business marketplace platform.</p>
                  </div>
                </div>
              </div>
              <button class="w-fit bg-[#FFB22C] text-[rgb(12,2,60)] px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#FFB22C]/90 transition-all shadow-lg shadow-orange-100">
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-6 lg:px-8 bg-[#FDFDFD]">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div #scrollItem class="lg:col-span-5 opacity-0 -translate-x-12">
              <span class="text-xs font-bold text-[#FF7C2A] uppercase tracking-[0.3em] mb-4 block" style="font-family: 'Work Sans', sans-serif;">Institutional Support</span>
              <h2 class="mb-6 tracking-tight" style='font-family: "Work Sans", sans-serif; font-size: 38px; font-weight: 600; line-height: 48px; color: rgb(12, 2, 60);'>
                Need assistance navigating a <span class="text-[#FF7C2A]">high-value</span> acquisition?
              </h2>
              <p class="mb-10" style="font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 400; line-height: 28px; color: rgb(62, 61, 61);">
                Our bespoke advisory team provides end-to-end support for transactions exceeding ₹50 Cr, including advanced valuation models and negotiation facilitation.
              </p>
              <button class="px-10 py-4 bg-[rgb(12,2,60)] text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#FF7C2A] transition-all shadow-xl shadow-blue-900/10 flex items-center gap-3 group">
                Book Advisory Consultation
                <span class="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </button>
            </div>
            <div #scrollItem class="lg:col-span-7 opacity-0 translate-x-12">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col gap-6 transition-all group">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">M&A <br> Advisory</span>
                  <span class="material-symbols-outlined text-4xl text-[rgb(12,2,60)] group-hover:text-[#FF7C2A] transition-colors">hub</span>
                </div>
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col gap-6 transition-all group">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">Advanced <br> Valuation</span>
                  <span class="material-symbols-outlined text-4xl text-[rgb(12,2,60)] group-hover:text-[#FF7C2A] transition-colors">analytics</span>
                </div>
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col gap-6 transition-all group">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">Due <br> Diligence</span>
                  <span class="material-symbols-outlined text-4xl text-[rgb(12,2,60)] group-hover:text-[#FF7C2A] transition-colors">verified_user</span>
                </div>
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col gap-6 transition-all group">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">Market <br> Research</span>
                  <span class="material-symbols-outlined text-4xl text-[rgb(12,2,60)] group-hover:text-[#FF7C2A] transition-colors">troubleshoot</span>
                </div>
                <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col gap-6 transition-all group">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">Negotiation <br> Support</span>
                  <span class="material-symbols-outlined text-4xl text-[rgb(12,2,60)] group-hover:text-[#FF7C2A] transition-colors">handshake</span>
                </div>
                <div class="bg-[rgb(12,2,60)] p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/20 flex flex-col gap-6 hover:scale-[1.02] transition-all cursor-pointer">
                  <span class="text-[11px] font-bold text-white/60 uppercase tracking-widest leading-tight">Exit <br> Strategy</span>
                  <span class="material-symbols-outlined text-4xl text-white">logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent implements OnInit, AfterViewInit {
  static firstLoad = true;
  listings: any[] = [];

  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('heroHeading') heroHeading!: ElementRef;
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;
  @ViewChild('searchBtn') searchBtn!: ElementRef;
  @ViewChild('heroMainImg') heroMainImg!: ElementRef;
  @ViewChild('ringSVG') ringSVG!: ElementRef;
  @ViewChild('ring1') ring1!: ElementRef;
  @ViewChild('ring2') ring2!: ElementRef;
  @ViewChild('ring3') ring3!: ElementRef;
  @ViewChild('listingTrack') listingTrack!: ElementRef;
  @ViewChildren('floatIcon') floatIcons!: QueryList<ElementRef>;
  @ViewChildren('actionCard') actionCards!: QueryList<ElementRef>;
  @ViewChildren('scrollItem') scrollItems!: QueryList<ElementRef>;

  private listingTicker: gsap.core.Tween | null = null;

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit() {
    this.loadListings();
  }

  loadListings() {
    this.listingService.getAllListings().subscribe(data => {
      this.listings = data;
      setTimeout(() => {
        if (this.listingTicker) this.listingTicker.kill();
        this.initListingTicker();
      }, 500);
    });
  }

  viewListing(id: number) {
    this.router.navigate(['/browse'], { queryParams: { id } });
  }

  formatPrice(amount: number): string {
    if (!amount) return '₹0';
    if (amount >= 10000000) {
      const cr = (amount / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 });
      return `₹${cr} Cr`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    const isFirst = HomeComponent.firstLoad;
    const baseDelay = isFirst ? 4.0 : 0.2;
    if (isFirst) HomeComponent.firstLoad = false;

    // 1. Properly Smooth Hero Entrance (Advanced Staggered Reveal)
    const heroTl = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: 'expo.out'
      }
    });

    heroTl.fromTo(this.heroHeading?.nativeElement,
      { x: -150, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out' },
      `+=${baseDelay}`
    );

    heroTl.fromTo(this.heroText?.nativeElement,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      '-=1.3'
    );

    heroTl.fromTo(this.searchBox?.nativeElement,
      { y: 80, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' },
      '-=1.4'
    );

    // Hero Graphic Entrance (From Right) + Impact Shake (Right to Left)
    gsap.fromTo(this.heroMainImg?.nativeElement,
      { x: 250, opacity: 0, scale: 0.8, rotate: -5 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 2.2,
        delay: baseDelay + 0.1,
        ease: 'elastic.out(1.2, 0.5)',
        onComplete: () => {
          // Sharp Initial Right-to-Left Shake
          const initialShake = gsap.timeline();
          initialShake.to(this.heroMainImg?.nativeElement, { x: -10, duration: 0.05, repeat: 3, yoyo: true });

          // Continuous Loop: Right-to-Left Floating Shake
          const shakeTl = gsap.timeline({ repeat: -1, yoyo: true });
          shakeTl.to(this.heroMainImg?.nativeElement, {
            x: "+=15",
            y: "+=8",
            rotation: 1,
            duration: 2.5,
            ease: "sine.inOut"
          });
          shakeTl.to(this.heroMainImg?.nativeElement, {
            x: "-=15",
            rotation: -1,
            duration: 3,
            ease: "sine.inOut"
          });
        }
      }
    );

    // 2. High-Precision Ring 'Reveal' Effect
    gsap.fromTo(this.ringSVG?.nativeElement,
      { scale: 0.7, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 0, duration: 2.5, delay: baseDelay - 0.2, ease: 'power3.out' }
    );

    // Individually Animating Rings with Dash-array Reveal logic
    [this.ring1, this.ring2, this.ring3].forEach((ring: ElementRef, i: number) => {
      const originalArray = ring?.nativeElement?.getAttribute('stroke-dasharray');
      gsap.fromTo(ring?.nativeElement,
        { strokeDasharray: "0 1000", opacity: 0 },
        { strokeDasharray: originalArray, opacity: 1, duration: 2, delay: baseDelay + (i * 0.15), ease: 'power2.out' }
      );
    });

    // Continuous Gentle Orbital Rotation for Rings
    [this.ring1, this.ring3].forEach((ring: ElementRef, i: number) => {
      gsap.to(ring?.nativeElement, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 80 + (i * 30),
        repeat: -1,
        ease: 'none'
      });
    });

    [this.ring2].forEach((ring: ElementRef, i: number) => {
      gsap.to(ring?.nativeElement, {
        rotation: -360,
        transformOrigin: "center center",
        duration: 100 + (i * 20),
        repeat: -1,
        ease: 'none'
      });
    });

    // 3. Floating Icons Reveal (Static position, scaled entrance)
    this.floatIcons?.forEach((icon: ElementRef, i: number) => {
      gsap.fromTo(icon?.nativeElement,
        { scale: 0, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: baseDelay + 0.5 + (i * 0.15),
          ease: 'back.out(1.7)'
        }
      );
    });

    const btn = this.searchBtn?.nativeElement;
    if (btn) {
    btn.style.willChange = 'transform';
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.45;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1.2, 0.4)' });
      gsap.to(btn, { scale: 1, duration: 0.5 });
    });
  }

    // 5. Directional "Split Reveal" Animation System
    const allItems = this.scrollItems?.toArray() || [];

    allItems.forEach((item: ElementRef, index: number) => {
      if (!item?.nativeElement) return;
      item.nativeElement.style.willChange = 'transform, opacity';

      // Advanced Directional Logic: Left, Center, or Right based on grid position
      let xPos = 0;
      let yPos = 100; // Base vertical offset
      let rotateDeg = 0;

      if (index % 3 === 0) {
        xPos = -120; // Enter from Left
        rotateDeg = -5;
      } else if (index % 3 === 1) {
        xPos = 0;    // Enter from Center
        yPos = 150;
        rotateDeg = 0;
      } else if (index % 3 === 2) {
        xPos = 120;  // Enter from Right
        rotateDeg = 5;
      }

      gsap.fromTo(item.nativeElement,
        {
          y: 40,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: item.nativeElement,
            start: 'top 98%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          delay: (index % 3) * 0.1,
          overwrite: 'auto'
        }
      );
    });

    // 6. Action Cards (Horizontal Magnetic Split)
    const cards = this.actionCards?.toArray() || [];
    const cardDirs = [-100, 0, 100];
    cards.forEach((card: ElementRef, i: number) => {
      if (!card?.nativeElement) return;
      gsap.fromTo(card.nativeElement,
        { x: cardDirs[i], y: 50, opacity: 0, scale: 0.9, rotate: i === 1 ? 0 : (i === 0 ? -4 : 4) },
        {
          scrollTrigger: {
            trigger: card.nativeElement,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 2.0,
          ease: 'expo.out',
          delay: i * 0.15
        }
      );
    });

    this.initListingTicker();
  }

  initListingTicker() {
    const track = this.listingTrack?.nativeElement;
    if (!track) return;
    
    const scrollDistance = track.scrollWidth / 2;
    if (scrollDistance <= 0) return;

    this.listingTicker = gsap.to(track, {
      x: -scrollDistance,
      duration: 80, // Much slower scroll
      ease: 'none',
      repeat: -1
    });
  }

  pauseListingTicker() {
    this.listingTicker?.pause();
  }

  resumeListingTicker() {
    this.listingTicker?.resume();
  }
}
