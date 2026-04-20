import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="pt-20 bg-white min-h-screen font-inter">
      <!-- HERO HEADER: High-Impact Design -->
      <section class="relative py-32 px-6 lg:px-8 overflow-hidden bg-[#f0f9ff]">
        <!-- Design Gradient Mesh -->
        <div class="absolute inset-0 z-0">
          <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-400/20 via-teal-300/20 to-transparent rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/10 via-emerald-300/10 to-transparent rounded-full blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div class="max-w-3xl">
            <h2 class="text-xl font-bold text-[#192830] mb-2 tracking-tight">Bizbuysell</h2>
            <h1 class="text-5xl lg:text-7xl font-black mb-8 tracking-tighter bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p class="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl" style="font-size: 16px; font-weight: 400; line-height: 32px;">
              At Bizbuysell, we prioritize data privacy. Our Privacy Policy explains how we collect, share, and process your Personal Data. Please read it carefully to understand your rights and choices.
            </p>
          </div>
        </div>
      </section>

      <!-- CONTENT GRID: Two-Column Layout -->
      <section class="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <!-- MAIN CONTENT COLUMN (Left) -->
          <div class="lg:col-span-8 space-y-16">
            <div class="border-b border-slate-100 pb-8">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Effective Date: April 18, 2026</span>
            </div>

            <section id="roles" class="scroll-mt-32">
              <h2 class="text-3xl font-black text-[#192830] tracking-tighter mb-8">Roles & Responsibilities</h2>
              <p class="text-slate-500 mb-6" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                Bizbuysell is the controller of your Personal Data as outlined in this Privacy Policy, unless stated otherwise. If we act as a processor on behalf of our customers, this policy does not apply. Customers control the information they submit, and their practices may differ from ours. For privacy details related to our customers, contact the customer who submitted your data to us.
              </p>
            </section>

            <section id="collect" class="scroll-mt-32">
              <h2 class="text-3xl font-black text-[#192830] tracking-tighter mb-8">Data Collect & Data Sources</h2>
              <div class="space-y-8">
                <div>
                  <h3 class="text-lg font-bold text-[#192830] mb-4">Covered Data Processing Activities</h3>
                  <p class="text-slate-500 mb-6" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                    This Privacy Policy covers how we collect and process your Personal Data, including:
                  </p>
                  <ul class="space-y-4">
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-blue-500 font-black">•</span>
                      <span><strong>Information You Provide:</strong> We gather contact and professional details when you interact with us, sign up for services, or attend events. This includes data like your name, email, job title, and organization.</span>
                    </li>
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-blue-500 font-black">•</span>
                      <span><strong>Administrator Data:</strong> When you create an account or manage services with Bizbuysell, we collect details like your name, email, phone number, billing info, and service configurations.</span>
                    </li>
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-blue-500 font-black">•</span>
                      <span><strong>Biographical and Community Data:</strong> We collect data from our support forums and community activities, including usernames, photos, and feedback.</span>
                    </li>
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-blue-500 font-black">•</span>
                      <span><strong>Job Applicant Data:</strong> We collect resumes, educational and work background, and potentially sensitive information during the job application process.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-[#192830] mb-4">Personal Data We Collect From Other Sources</h3>
                  <p class="text-slate-500 mb-6" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                    In the course of our business (and over the past 12 months), Bizbuysell receives Personal Data and other information from third parties for various purposes:
                  </p>
                  <ul class="space-y-4">
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-teal-500 font-black">•</span>
                      <span><strong>Business Contact Information:</strong> We obtain details like names, job titles, emails, phone numbers, and social profiles from third-party sources for marketing and business intelligence.</span>
                    </li>
                    <li class="flex gap-3 text-slate-500" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                      <span class="text-teal-500 font-black">•</span>
                      <span><strong>Security Data:</strong> We gather data to enhance security, like breached credentials, to protect our services and support our customers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="device" class="scroll-mt-32">
              <h2 class="text-3xl font-black text-[#192830] tracking-tighter mb-8">Device & Usage Data</h2>
              <p class="text-slate-500 mb-6" style="font-size: 16px; font-weight: 400; line-height: 32px;">
                Bizbuysell collects various types of data when you use our websites, applications, and services to enhance performance and security. This data includes device information, IP addresses, and operational metrics.
              </p>
            </section>
          </div>

          <!-- SIDEBAR NAVIGATION (Right) -->
          <div class="lg:col-span-4 lg:block">
            <div class="sticky top-32 space-y-10">
              <div>
                <h4 class="text-xs font-black text-[#192830] uppercase tracking-[0.2em] mb-6">Navigations</h4>
                <nav class="flex flex-col gap-4 border-l border-slate-100">
                  <a (click)="scrollTo('roles')" 
                     class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Roles & Responsibilities
                  </a>
                  <a (click)="scrollTo('collect')" 
                     class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Data Collect & Data Sources
                  </a>
                  <a (click)="scrollTo('device')" 
                     class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Device Data & Usage
                  </a>
                  <a class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Personal Data Disclosed
                  </a>
                  <a class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Security Posture
                  </a>
                  <a class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    How long we keep data?
                  </a>
                  <a class="pl-6 text-[14px] font-medium text-slate-400 hover:text-blue-600 py-1 transition-all border-l-2 border-transparent hover:border-blue-600 cursor-pointer">
                    Changes to the policy
                  </a>
                </nav>
              </div>

              <!-- Contact Card -->
              <div class="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h5 class="text-sm font-bold text-[#192830] mb-4">Questions?</h5>
                <p class="text-xs text-slate-500 leading-relaxed mb-6">
                  Our privacy team is available to assist you with any inquiries regarding your personal data.
                </p>
                <a href="mailto:privacy@bizbuysell.in" class="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Contact Privacy Team</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; }
    .scroll-mt-32 { scroll-margin-top: 8rem; }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
