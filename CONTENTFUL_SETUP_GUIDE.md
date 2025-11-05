# Contentful CMS Integration Guide

## 🎯 Overview

This gym landing page now supports **Contentful CMS** for dynamic content management. You can update content without redeploying the application!

## 🚀 Quick Setup

### 1. Create Contentful Account
1. Go to [contentful.com](https://www.contentful.com)
2. Sign up for a free account
3. Create a new space for your gym website

### 2. Configure Environment Variables
Update `.env.local` with your Contentful credentials:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

**Where to find these:**
- **Space ID**: Space Settings → General Settings
- **Access Token**: Space Settings → API Keys → Content Delivery API

### 3. Content Models Setup

Create these content models in your Contentful space:

#### 🏠 Hero Section (`heroSection`)
**Fields:**
- `title` (Short text) - Main headline
- `subtitle` (Short text) - Secondary headline  
- `description` (Long text) - Description text
- `ctaButtonText` (Short text) - Primary button text
- `secondaryButtonText` (Short text) - Secondary button text
- `backgroundImage` (Media) - Optional background image

#### ℹ️ About Section (`aboutSection`)
**Fields:**
- `title` (Short text) - Section title
- `subtitle` (Short text) - Section subtitle
- `description` (Long text) - About description
- `stats` (JSON Object) - Array of stat objects with `number` and `label`
- `image` (Media) - About section image

#### 🏋️ Facility (`facility`)
**Fields:**
- `name` (Short text) - Facility name
- `description` (Long text) - Facility description
- `icon` (Short text) - Emoji or icon
- `order` (Integer) - Display order

#### 👨‍💼 Trainer (`trainer`)
**Fields:**
- `name` (Short text) - Trainer name
- `specialization` (Short text) - Area of expertise
- `experience` (Short text) - Years of experience
- `image` (Media) - Trainer photo
- `order` (Integer) - Display order

#### 💳 Membership Plan (`membershipPlan`)
**Fields:**
- `name` (Short text) - Plan name
- `price` (Number) - Monthly price
- `yearlyPrice` (Number) - Yearly price
- `features` (Short text, list) - List of features
- `popular` (Boolean) - Mark as popular
- `order` (Integer) - Display order

#### 💬 Testimonial (`testimonial`)
**Fields:**
- `name` (Short text) - Customer name
- `comment` (Long text) - Testimonial text
- `rating` (Number) - Star rating (1-5)
- `plan` (Short text) - Membership plan
- `order` (Integer) - Display order

#### 🏢 Company Info (`companyInfo`)
**Fields:**
- `companyName` (Short text) - Business name
- `tagline` (Short text) - Company tagline
- `description` (Long text) - Company description
- `email` (Short text) - Contact email
- `phone` (Short text) - Contact phone
- `address` (Long text) - Business address
- `socialLinks` (JSON Object) - Social media links

## 📱 How It Works

### Automatic Fallback System
- **With Contentful**: Content loads from CMS
- **Without Contentful**: Uses fallback data automatically
- **No interruptions**: Site works regardless of CMS status

### Real-time Updates
1. Update content in Contentful
2. Changes appear on website within minutes
3. No code deployment needed

### Example Usage
```typescript
// In your components
import { useHeroContent } from '../hooks/useContentful';

const Hero = () => {
  const { content } = useHeroContent();
  
  return (
    <h1>{content?.title || 'Fallback Title'}</h1>
  );
};
```

## 🔧 Advanced Features

### Content Hooks Available
- `useHeroContent()` - Hero section data
- `useAboutContent()` - About section data
- `useFacilities()` - Facilities list
- `useTrainers()` - Trainers list
- `useMembershipPlans()` - Membership plans
- `useTestimonials()` - Customer testimonials
- `useCompanyInfo()` - Company information
- `useAllContent()` - All content in one hook

### Example JSON for Stats Field
```json
[
  { "number": "500+", "label": "Active Members" },
  { "number": "50+", "label": "Expert Trainers" },
  { "number": "100+", "label": "Fitness Programs" },
  { "number": "24/7", "label": "Access Available" }
]
```

### Example JSON for Social Links
```json
{
  "facebook": "https://facebook.com/yourpage",
  "instagram": "https://instagram.com/yourpage",
  "twitter": "https://twitter.com/yourpage",
  "linkedin": "https://linkedin.com/company/yourpage"
}
```

## 🎨 Content Management Tips

### For Best Results:
1. **Images**: Use high-quality images (1920x1080 recommended)
2. **Text Length**: Keep headlines under 60 characters
3. **Features Lists**: Use bullet points for clarity
4. **Consistent Naming**: Use consistent naming for better SEO

### Content Guidelines:
- **Hero Title**: Action-oriented, inspiring
- **Descriptions**: Clear, benefit-focused
- **Features**: Specific and valuable
- **Testimonials**: Authentic and relatable

## 🚨 Troubleshooting

### Content Not Loading?
1. Check environment variables in `.env.local`
2. Verify Space ID and Access Token
3. Ensure content models match exactly
4. Check browser console for errors

### Images Not Displaying?
1. Ensure images are published in Contentful
2. Check image file formats (JPG, PNG, WebP)
3. Verify image URLs in network tab

### Content Models Missing?
1. Create content models with exact field names
2. Publish content models
3. Add sample content and publish

## 📈 Benefits

### For Content Managers:
- ✅ **No Technical Skills Needed**
- ✅ **Real-time Updates**
- ✅ **Rich Media Support**
- ✅ **Version Control**
- ✅ **Preview Before Publishing**

### For Developers:
- ✅ **Type-safe Content**
- ✅ **Automatic Fallbacks**
- ✅ **Easy Integration**
- ✅ **Performance Optimized**
- ✅ **Future-proof Architecture**

## 🔮 Future Enhancements

Potential additions:
- Blog/News section
- Event management
- Class schedules
- Trainer profiles with detailed bios
- Member portal integration
- Multi-language support

---

**Setup Time**: ~30 minutes  
**Maintenance**: Zero code changes needed  
**Content Updates**: Instant (no deployment)  
**Fallback**: Always available
