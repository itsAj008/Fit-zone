# FitZone Gym Landing Page

A modern, responsive gym landing page built with React, TypeScript, Tailwind CSS, and Framer Motion. This is a portfolio project showcasing a complete landing page for a fitness gym with membership plans, trainer profiles, facilities, and contact forms.

## 🚀 Features

### Core Features
- **Hero Section** - Animated hero banner with call-to-action buttons
- **About Section** - Gym information with statistics and highlights
- **Facilities** - Showcase of gym amenities and equipment
- **Trainers** - Professional trainer profiles with specializations
- **Membership Plans** - Three-tier pricing with monthly/yearly toggle
- **Testimonials** - Member reviews and ratings
- **Contact Form** - Inquiry form with EmailJS integration (configurable)
- **Google Maps** - Location embed
- **Payment Integration** - Structure ready for Stripe or Razorpay

### Technical Features
- ✅ **React 19** with TypeScript
- ✅ **Tailwind CSS v4** for styling
- ✅ **Zustand** for state management
- ✅ **Framer Motion** for smooth animations
- ✅ **Fully Responsive** design (mobile, tablet, desktop)
- ✅ **Smooth Scrolling** navigation
- ✅ **Modern UI/UX** with hover effects and transitions

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd "Gym landing page"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **EmailJS** - Email service (optional, for contact form)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Facilities.tsx  # Facilities showcase
│   ├── Trainers.tsx    # Trainer profiles
│   ├── MembershipPlans.tsx  # Pricing plans
│   ├── Testimonials.tsx     # Member reviews
│   ├── Contact.tsx          # Contact form & map
│   ├── Payment.tsx          # Payment modal
│   └── Footer.tsx           # Footer
├── store/
│   └── membershipStore.ts   # Zustand store
├── types/
│   └── index.ts             # TypeScript types
├── data/
│   └── mockData.ts          # Sample data
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## 🔧 Configuration

### EmailJS Setup (Optional)

To enable contact form emails:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `src/components/Contact.tsx`:

```typescript
const result = await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formData,
  'YOUR_PUBLIC_KEY'
);
```

### Payment Integration

The payment component is structured for integration with Stripe or Razorpay:

#### Stripe Integration
1. Install Stripe: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Create a checkout session API endpoint
3. Update `src/components/Payment.tsx` with Stripe Checkout

#### Razorpay Integration (India)
1. Install Razorpay: `npm install razorpay`
2. Set up Razorpay checkout in `src/components/Payment.tsx`
3. Configure Razorpay keys

### Google Maps

Update the Google Maps embed URL in `src/components/Contact.tsx` with your actual gym location.

## 🎨 Customization

### Colors
The primary color scheme uses red (`red-600`) as the accent. To change:

1. Update Tailwind classes in components
2. Or configure Tailwind theme in `tailwind.config.js`

### Content
All content is in `src/data/mockData.ts`:
- Membership plans
- Trainers
- Testimonials
- Facilities

Edit these files to customize content.

### Images
Replace Unsplash image URLs with your own:
- Hero background
- About section
- Trainer photos

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Deploy `dist` folder to Netlify

### Other Platforms
- Build the project: `npm run build`
- Deploy the `dist` folder to your hosting platform

## 📝 Future Enhancements

Potential features to add:
- [ ] Admin dashboard for managing content
- [ ] User authentication
- [ ] Member portal
- [ ] Class booking system
- [ ] Blog section
- [ ] Multi-language support
- [ ] Dark mode toggle

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available for portfolio use.

## 👤 Author

Built as a portfolio project demonstrating modern React development practices.

---

**Note**: This is a frontend-only application. For production use, you'll need to:
- Set up a backend for payment processing
- Configure EmailJS or another email service
- Add proper form validation and error handling
- Implement analytics
- Add SEO optimization
