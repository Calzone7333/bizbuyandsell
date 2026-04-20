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
      <!-- Top Subscription Section -->
      <div class="subscribe-row animate-section">
        <div class="container">
          <div class="subscribe-content">
            <div class="flex flex-col">
              <div class="accent-bar"></div>
              <h2 class="subscribe-pill">Stay Updated</h2>
            </div>
            <p class="subscribe-text">
              Subscribe to get the latest premium business listings and market insights delivered straight to your inbox. Join 50,000+ investors and business owners.
            </p>
            <div class="subscribe-form">
              <input type="email" placeholder="Enter Your Email Address" class="email-input">
              <button class="subscribe-btn">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
                <a href="#" class="social-icon">F</a>
                <a href="#" class="social-icon">T</a>
                <a href="#" class="social-icon">L</a>
                <a href="#" class="social-icon">I</a>
              </div>
            </div>

            <!-- Links Columns -->
            <div class="links-col animate-col">
              <h3>Marketplace</h3>
              <ul>
                <li><a href="#">Browse Listings</a></li>
                <li><a href="#">Premium Picks</a></li>
                <li><a href="#">Small Businesses</a></li>
                <li><a href="#">Asset Sales</a></li>
              </ul>
            </div>

            <div class="links-col animate-col">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Sell a Business</a></li>
                <li><a href="#">Valuation Services</a></li>
                <li><a href="#">M&A Advisory</a></li>
                <li><a href="#">Funding Support</a></li>
              </ul>
            </div>

            <div class="links-col animate-col">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Network</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Newsroom</a></li>
              </ul>
            </div>

            <div class="links-col animate-col">
              <h3>Location</h3>
              <p class="contact-info">Call Support:<br><span>+91 44 2626 2626</span></p>
              <p class="contact-info">Email Us:<br><span>support@bizbuysell.in</span></p>
            </div>

            <!-- Map Column -->
            <div class="map-col animate-col">
              <div class="map-wrapper">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5568896669224!2d80.18824307436758!3d13.06385311285044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267324f4ab783%3A0x5a5319e17f3a0a4b!2sGayathri%20Thiruvengadam%20%26%20Associates!5e0!3m2!1sen!2sin!4v1776487234443!5m2!1sen!2sin" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="footer-map grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"></iframe>
              </div>
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
          <p class="copyright">© 2026 Bizbuysell India. All rights reserved.</p>
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
      font-family: 'Inter', 'Manrope', sans-serif;
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
      font-family: 'Manrope', sans-serif;
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
      grid-template-columns: 1.5fr repeat(4, 1fr) 1.5fr;
      gap: 40px;
      margin-bottom: 60px;
    }

    .brand-col .brand-name {
      font-family: 'Manrope', sans-serif;
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
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #666;
      font-weight: bold;
      font-size: 0.8rem;
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
      font-family: 'Manrope', sans-serif;
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--black);
      margin: 0 0 25px 0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
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
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .links-col ul li a:hover {
      color: var(--accent);
      transform: translateX(5px);
    }

    .contact-info {
      font-size: 0.95rem;
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
      height: auto;
      display: block;
      border-radius: 8px;
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


