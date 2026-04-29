import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer-container">


      <!-- Main Footer Content -->
      <div class="main-footer">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column (Standardized Image) -->
            <div class="brand-col animate-col">
              <img src="/Home/LOGO.png" alt="Bizbuysell" class="h-[54px] w-auto mb-6">
              <div class="divider"></div>
              <p class="brand-desc">
                Simplifying the complexity of business transitions through institutional-grade deal flow and expert advisory services.
              </p>
              <div class="social-links">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-x-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
              </div>
            </div>

            <!-- BUY BUSINESS -->
            <div class="links-col animate-col">
              <h3>Buy Business</h3>
              <ul>
                <li><a routerLink="/browse">Browse Businesses</a></li>
                <li><a href="#">Buy with CA Expert</a></li>
                <li><a href="#">Business Valuation</a></li>
                <li><a routerLink="/buyer-dashboard">Buyer Dashboard</a></li>
              </ul>
            </div>

            <!-- SELL BUSINESS -->
            <div class="links-col animate-col">
              <h3>Sell Business</h3>
              <ul>
                <li><a routerLink="/sell">List Your Business</a></li>
                <li><a href="#">Sell with CA Expert</a></li>
                <li><a href="#">Business Valuation</a></li>
                <li><a href="#">Pricing Plans</a></li>
              </ul>
            </div>

            <!-- INVESTMENT -->
            <div class="links-col animate-col">
              <h3>Investment</h3>
              <ul>
                <li><a href="#">Startup Deals</a></li>
                <li><a href="#">Verified Businesses</a></li>
                <li><a href="#">High Return Deals</a></li>
                <li><a href="#">Partnerships</a></li>
              </ul>
            </div>

            <!-- FRANCHISE -->
            <div class="links-col animate-col">
              <h3>Franchise</h3>
              <ul>
                <li><a href="#">Explore Brands</a></li>
                <li><a href="#">Top Franchises</a></li>
                <li><a href="#">Low Investment</a></li>
                <li><a href="#">Franchise Deals</a></li>
              </ul>
            </div>

            <!-- UTILITY & SUBSCRIBE -->
            <div class="links-col animate-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>              
            </div>
          </div>


        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar">
        <div class="container bottom-flex">
          <div class="legal-links">
            <a routerLink="/privacy">Privacy Policy</a>
            <span class="sep">|</span>
            <a href="#">Terms of Service</a>
            <span class="sep">|</span>
            <a href="#">Broker Standards</a>
          </div>
          <p class="copyright">© 2026 Hado Global Services Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      --primary: #09337B; /* Login Button Blue */
      --accent: #FF7C2A;  /* Energy Orange */
      --bg-light: #fdfdfd;
      --bg-mute: #f8f9fa;
      --text-main: #333333;
      --text-muted: #666666;
      --white: #ffffff;
      --black: #111111;
      display: block;
      width: 100%;
      font-family: 'Work Sans', sans-serif;
    }

    .container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .footer-container {
      background: var(--bg-light);
      position: relative;
    }

    /* Subscribe Row */
    .subscribe-row {
      border-top: 1px solid var(--accent);
      padding: 70px 0;
      background: var(--white);
    }

    .accent-bar {
      width: 60px;
      height: 6px;
      background: var(--accent);
      border-radius: 3px;
      margin-bottom: 24px;
    }

    .subscribe-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
    }

    .subscribe-pill {
      font-family: 'Work Sans', sans-serif;
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--black);
      margin: 0;
      letter-spacing: -0.05em;
      text-transform: uppercase;
    }

    .subscribe-text {
      flex: 1;
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 600px;
    }

    .subscribe-form {
      display: flex;
      align-items: stretch;
      background: #f1f1f1;
      border-radius: 4px;
      overflow: hidden;
      min-width: 350px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .subscribe-form:focus-within {
      box-shadow: 0 0 0 2px var(--accent);
      background: #fff;
    }

    .email-input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 15px 20px;
      font-size: 1rem;
      color: var(--text-main);
      outline: none;
    }

    .subscribe-btn {
      background: var(--accent);
      border: none;
      color: white;
      padding: 0 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }

    .subscribe-btn:hover {
      background: #e63946;
      padding-left: 20px;
      padding-right: 10px;
    }

    /* Main Footer */
    .main-footer {
      background: var(--bg-mute);
      padding: 80px 0 60px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr repeat(5, 1fr);
      gap: 30px;
      margin-bottom: 60px;
    }

    .brand-col .brand-name {
      font-family: 'Work Sans', sans-serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--black);
      margin: 0;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .brand-col .slogan {
      color: var(--accent);
      font-weight: 700;
      font-size: 1.1rem;
      margin: 10px 0;
    }

    .divider {
      width: 180px;
      height: 1px;
      background: #ccc;
      margin: 20px 0;
    }

    .brand-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 25px;
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #555;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid transparent;
    }

    .social-icon:first-child {
      background: var(--accent);
      color: white;
    }

    .social-icon:hover {
      background: var(--accent);
      color: white;
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 5px 15px rgba(255, 77, 77, 0.3);
    }

    .links-col h3 {
      font-family: 'Work Sans', sans-serif;
      font-size: 16px;
      font-weight: 900;
      color: var(--black);
      margin: 0 0 25px 0;
    }

    .links-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .links-col ul li {
      margin-bottom: 15px;
      position: relative;
      padding-left: 15px;
    }

    .links-col ul li::before {
      content: '';
      width: 4px;
      height: 4px;
      background: #aaa;
      position: absolute;
      left: 0;
      top: 10px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .links-col ul li:hover::before {
      background: var(--accent);
      transform: scale(2);
    }

    .links-col ul li a {
      text-decoration: none;
      color: var(--text-muted);
      font-size: 15px;
      font-weight: 500;
      font-family: 'Work Sans', sans-serif;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .links-col ul li a:hover {
      color: var(--accent);
      transform: translateX(5px);
    }

    .contact-info {
      font-size: 15px;
      color: var(--text-muted);
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .contact-info span {
      display: block;
      color: var(--black);
      font-weight: 500;
    }

    .map-col .map-wrapper {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      background: white;
      padding: 5px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .map-col:hover .map-wrapper {
      transform: scale(1.02);
    }

    .footer-map {
      width: 100%;
      display: block;
      border-radius: 8px;
    }

    .mini-subscribe {
      background: #fdfdfd;
    }

    .subscribe-form.mini {
      min-width: 0;
    }

    .subscribe-form.mini .email-input {
      padding: 10px 15px;
      font-size: 0.9rem;
    }

    .thank-you-box {
      border: 2px solid #ddd;
      border-radius: 10px;
      padding: 15px 40px;
      display: inline-block;
      margin-left: 21%;
      background: var(--bg-mute);
      transition: all 0.3s ease;
    }

    .thank-you-box:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    }

    .thank-you-box p {
      margin: 0;
      font-weight: 700;
      color: var(--black);
      font-size: 1.1rem;
    }

    /* Bottom Bar */
    .bottom-bar {
      background: var(--primary);
      color: rgba(255,255,255,0.6);
      padding: 20px 0;
    }

    .bottom-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .legal-links {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .legal-links a {
      color: white;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .legal-links a:hover {
      color: var(--accent);
    }

    .sep {
      color: var(--accent);
      font-weight: bold;
    }

    .copyright {
      margin: 0;
      font-size: 0.85rem;
    }

    /* GSAP reveal states */
    .animate-section, .animate-col {
      opacity: 0;
      transform: translateY(30px);
    }

    /* Responsive */
    @media (max-width: 1100px) {
      .footer-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .subscribe-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .thank-you-box {
        margin-left: 0;
        display: block;
        text-align: center;
      }
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .bottom-flex {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      .subscribe-pill {
        font-size: 2rem;
      }
      .subscribe-form {
        min-width: 100%;
      }
    }

    @media (max-width: 480px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const sections = this.el.nativeElement.querySelectorAll('.animate-section');
    const cols = this.el.nativeElement.querySelectorAll('.animate-col');

    sections.forEach((section: HTMLElement) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.to(cols, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.el.nativeElement.querySelector('.footer-grid'),
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }
}


