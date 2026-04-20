import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Cookie Banner -->
    <div *ngIf="showBanner" class="fixed inset-0 z-[200] flex items-end justify-center pb-6 px-6 pointer-events-none">
      <div class="cookie-banner pointer-events-auto max-w-5xl w-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.12)] p-5 md:p-7 flex flex-col md:flex-row items-center gap-6 md:gap-4">
        
        <div class="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#FF7C2A]/10">
          <span class="material-symbols-outlined text-[#FF7C2A] text-2xl">cookie</span>
        </div>

        <div class="flex-grow text-center md:text-left pr-4">
          <p class="font-headline font-bold text-[rgb(25,40,48)] text-sm leading-relaxed">
            We use cookies to enhance your experience, analyze our traffic, and provide you with personalized investment opportunities. By clicking <span class="text-[#FF7C2A] font-extrabold">"Accept All"</span>, you consent to our use of cookies in accordance with our <a class="cursor-pointer underline decoration-[#FF7C2A]/20 hover:decoration-[#FF7C2A] underline-offset-4 transition-all">Cookie Policy</a>.
          </p>
        </div>

        <div class="flex items-center gap-12 w-full md:w-auto mr-4">
          <button (click)="decline()" class="text-[#192830] font-headline font-black text-[13px] uppercase tracking-[0.15em] hover:underline hover:decoration-[#FF7C2A] hover:underline-offset-8 transition-all whitespace-nowrap">
            Decline
          </button>
          <button (click)="accept()" class="text-[#FF7C2A] font-headline font-black text-[13px] uppercase tracking-[0.15em] underline decoration-[#FF7C2A] decoration-2 underline-offset-8 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap">
            Accept All
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `]
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;

  ngOnInit() {
    // Check both localStorage and document.cookie for maximum reliability
    const localStorageConsent = localStorage.getItem('cookieConsent');
    const documentCookieConsent = this.getCookie('cookieConsent');

    if (!localStorageConsent && !documentCookieConsent) {
      this.showBanner = true;
      setTimeout(() => {
        this.animateIn();
      }, 3500); 
    }
  }

  animateIn() {
    gsap.from('.cookie-banner', {
      y: 50,
      opacity: 1, // Start from 0 but ensure we use 1 for end
      duration: 1,
      ease: 'back.out(1.7)'
    });
  }

  accept() {
    this.setStorage('accepted');
    this.dismiss();
  }

  decline() {
    this.setStorage('declined');
    this.dismiss();
  }

  private setStorage(value: string) {
    // Persist in localStorage
    localStorage.setItem('cookieConsent', value);
    
    // Set an actual HTTP-accessible cookie with 365 days expiration
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "cookieConsent=" + value + ";" + expires + ";path=/;SameSite=Lax";
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  dismiss() {
    gsap.to('.cookie-banner', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in',
      onComplete: () => {
        this.showBanner = false;
      }
    });
  }
}
