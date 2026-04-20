import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { CookieConsentComponent } from './cookie-consent.component';
import { WelcomePopupComponent } from './welcome-popup.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieConsentComponent, WelcomePopupComponent, CommonModule],
  template: `
    <div #loader class="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
      <div class="loader">
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
      </div>
    </div>

    <app-navbar *ngIf="showUI"></app-navbar>
    <router-outlet></router-outlet>
    <app-footer *ngIf="showUI"></app-footer>
    <app-cookie-consent></app-cookie-consent>
    <app-welcome-popup></app-welcome-popup>
    `,
    styles: [`
      @keyframes square-animation {
        0% { left: 0; top: 0; }
        10.5% { left: 0; top: 0; }
        12.5% { left: 24px; top: 0; }
        23% { left: 24px; top: 0; }
        25% { left: 48px; top: 0; }
        35.5% { left: 48px; top: 0; }
        37.5% { left: 48px; top: 24px; }
        48% { left: 48px; top: 24px; }
        50% { left: 24px; top: 24px; }
        60.5% { left: 24px; top: 24px; }
        62.5% { left: 24px; top: 48px; }
        73% { left: 24px; top: 48px; }
        75% { left: 0; top: 48px; }
        85.5% { left: 0; top: 48px; }
        87.5% { left: 0; top: 24px; }
        98% { left: 0; top: 24px; }
        100% { left: 0; top: 0; }
      }

      .loader {
        position: relative;
        width: 72px;
        height: 72px;
        transform: rotate(45deg);
      }

      .loader-square {
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        margin: 2px;
        background: #FF7C2A;
        animation: square-animation 10s ease-in-out infinite both;
      }

      .loader-square:nth-of-type(odd) { background: #4185D0; }
      .loader-square:nth-of-type(even) { background: #FF7C2A; }

      .loader-square:nth-of-type(1) { animation-delay: -1.42s; }
      .loader-square:nth-of-type(2) { animation-delay: -2.85s; }
      .loader-square:nth-of-type(3) { animation-delay: -4.28s; }
      .loader-square:nth-of-type(4) { animation-delay: -5.71s; }
      .loader-square:nth-of-type(5) { animation-delay: -7.14s; }
      .loader-square:nth-of-type(6) { animation-delay: -8.57s; }
      .loader-square:nth-of-type(7) { animation-delay: -10s; }
    `]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('loader') loader!: ElementRef;
  showUI = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const hiddenRoutes = ['/login', '/register', '/forgot-password', '/dashboard', '/admin'];
      this.showUI = !hiddenRoutes.some(route => event.url.startsWith(route));
    });
  }

  ngAfterViewInit() {
    // Elegant Entrance sequence
    gsap.to(this.loader.nativeElement, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      delay: 2.8,
      ease: 'expo.inOut',
      onStart: () => {
        this.loader.nativeElement.style.pointerEvents = 'none';
      },
      onComplete: () => {
        this.loader.nativeElement.style.display = 'none';
      }
    });
  }
}
