# FabriControl - Product Requirements Document

## Original Problem Statement
Convert a static HTML/CSS website for "FabriControl" ERP into a fully functional, bilingual (ES/EN/HE) marketing site with AI chatbot, pricing, and lead capture forms.

**Current Business Model:** 100% Cloud SaaS (FabriControl is accessed entirely via web browser — NO downloads, NO installations)

## Application Architecture

```
/app/
├── backend/                          FastAPI (port 8001)
│   ├── .env                          MONGO_URL, EMERGENT_LLM_KEY, RESEND_API_KEY, NOTIFICATION_EMAIL
│   ├── knowledge_base/
│   │   └── fabricontrol_complete.md  AI chatbot knowledge base (100% cloud model)
│   ├── routes/
│   │   ├── chat.py                   AI chatbot (Gemini via Emergent LLM Key)
│   │   ├── enterprise_quote.py       Enterprise quote form → email via Resend
│   │   └── license_request.py        Trial license request → email via Resend
│   └── server.py
├── frontend/                         React (port 3000)
│   ├── public/
│   │   ├── assets/js/
│   │   │   └── chat-widget.js        JS chatbot widget for static HTML pages
│   │   ├── en/                       English static HTML pages
│   │   │   ├── index.html, pricing.html, features.html
│   │   │   ├── documentation.html    Updated for 100% cloud
│   │   │   └── faq.html, products/
│   │   └── he/                       Hebrew static HTML pages (RTL)
│   │       ├── index.html
│   │       └── pricing.html
│   └── src/
│       ├── components/
│       │   ├── Header.js             3-language switcher (ES/EN/HE)
│       │   ├── LicenseRequestModal.js Cloud-based trial form
│       │   └── EnterpriseQuoteModal.js
│       ├── pages/
│       │   ├── Home.js, Caracteristicas.js, Precios.js
│       │   ├── FAQ.js, Enterprise.js
│       └── fabricontrol.css          Global styles + RTL support
```

## Key Integrations
- **AI Chat:** Google Gemini via Emergent LLM Key (`emergentintegrations` library)
- **Email:** Resend (API key needed — see setup below)
- **Payment:** Hotmart link `https://pay.hotmart.com/L103719113Q`

## Resend Email Setup
1. Sign up at https://resend.com
2. Dashboard → API Keys → Create API Key
3. Add to `/app/backend/.env`: `RESEND_API_KEY=re_your_key_here`
4. Run: `sudo supervisorctl restart backend`
5. Emails go to `NOTIFICATION_EMAIL=julito36911@gmail.com`

## Pricing (Current)
- FREE Trial: 30 days, all features, no credit card
- Annual Plan: $195/year (best value)
- Installment Plan: $290/year (monthly payments)
- Enterprise: Custom quote

## What's Been Implemented

### Completed (Dec 2025)
- ✅ Trilingual site: Spanish (React), English (static HTML), Hebrew (static HTML RTL)
- ✅ AI chatbot: Gemini via Emergent LLM Key, trilingual, with updated 100% cloud knowledge base
- ✅ Cloud pivot: ALL pages updated — no download/install mentions anywhere
- ✅ Documentation updated (ES + EN) to reflect 100% cloud model
- ✅ Pricing pages: $195/year annual, $290/year installments on ES/EN/HE
- ✅ Hotmart payment link on all pricing pages
- ✅ Live Demo section on all pages (ES/EN/HE) with credentials and direct links
- ✅ WhatsApp floating button (green, +972526489461) on all pages above chat widget
- ✅ Demo button in navigation menu (all languages)
- ✅ Resend email integration for license requests and enterprise quotes
- ✅ License request form (cloud-based trial flow)
- ✅ Enterprise quote form
- ✅ Mobile responsive navigation (all languages)
- ✅ Language switcher always redirects to homepage

### MOCKED (needs real key)
- ⚠️ Email sending via Resend — placeholder API key, needs real key from resend.com

## Prioritized Backlog

### P0 (Critical)
- [ ] Add Resend API key to `/app/backend/.env` (user needs to get from resend.com)

### P1 (Important)
- [ ] Complete Hebrew site pages: features, documentation, FAQ, enterprise
- [ ] Add FAQ link to English navigation menu

### P2 (Enhancement)
- [ ] Create /en/enterprise.html page (missing in English)
- [ ] Create /en/comparacion.html comparison page (exists in ES, missing in EN)
- [ ] Add image lightbox to features pages (/caracteristicas, /en/features.html)

### P3 (Future/Backlog)
- [ ] Educational resources section with 22 PDFs provided by user
- [ ] Full SEO optimization pass on all pages
- [ ] Consider migrating static HTML (EN/HE) to React for easier maintenance
