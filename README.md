# Pasifill Dashboard

A comprehensive dashboard for Alabama septic contractors to automate CEP-5 form completion, built with Next.js, React, and shadcn/ui.

## Features

### 🎯 **Alabama-Focused Design**
- **67 County Support**: Covers all Alabama counties with specific permit requirements
- **ADPH Compliance**: Built specifically for Alabama Department of Public Health requirements
- **Local Weather Integration**: Field condition monitoring for optimal soil evaluation timing

### 📱 **Mobile-First & Offline Capable**
- **PWA Ready**: Progressive Web App for mobile field work
- **Offline Functionality**: Complete CEP-5 forms without internet connectivity
- **Touch Optimized**: Designed for tablet and smartphone use in field conditions

### ⚡ **Quick Actions**
- **New CEP-5 Form**: Start a new form in seconds
- **Customer Search**: Find existing customers quickly
- **Data Import**: Bulk import customer lists via CSV

### 📊 **Real-Time Metrics**
- **Time Saved**: Track hours saved vs. manual form completion
- **Compliance Rate**: Monitor ADPH acceptance rates
- **Monthly Progress**: View form completion trends
- **County Coverage**: Track work across Alabama counties

### 🚨 **Smart Notifications**
- **Permit Deadlines**: County-specific renewal reminders
- **Weather Alerts**: Optimal field work conditions
- **Compliance Updates**: ADPH requirement changes

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks
- **Mobile**: PWA with offline-first architecture

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pasifill-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install shadcn/ui components**
   ```bash
   npx shadcn@latest add card button badge avatar
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
pasifill-dashboard/
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── card.tsx
│       ├── button.tsx
│       ├── badge.tsx
│       └── avatar.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── dashboard.tsx          # Main dashboard component
├── package.json
└── README.md
```

## Dashboard Sections

### 1. **Header**
- Company branding and Pasifill logo
- Alabama contractor license display
- County coverage indicator
- User profile avatar

### 2. **Welcome Section**
- Personalized greeting
- Monthly time savings summary
- Motivation for continued use

### 3. **Quick Actions**
- **New CEP-5 Form**: Primary action button
- **Find Customer**: Customer search shortcut
- **Import Data**: Bulk data import

### 4. **Monthly Statistics**
- CEP-5 forms completed
- Hours saved calculation
- Total customers served
- ADPH compliance rate

### 5. **Alabama-Specific Features**
- **Field Conditions**: Weather and soil evaluation timing
- **Upcoming Deadlines**: County permit renewals

### 6. **Recent Activity**
- Latest CEP-5 forms with status
- Customer and property information
- Quick actions (download, email)

### 7. **Mobile Optimization**
- PWA download prompts
- Offline capability information
- Field work optimization tips

## Customization

### Data Integration
Replace the `mockData` object in `dashboard.tsx` with your actual data sources:

```typescript
// Connect to your backend API
const [dashboardData, setDashboardData] = useState(null)

useEffect(() => {
  fetchDashboardData().then(setDashboardData)
}, [])
```

### Styling
Modify Tailwind classes or create custom CSS variables for your brand colors:

```css
:root {
  --primary: #2563eb;      /* Your brand blue */
  --secondary: #64748b;    /* Your brand gray */
  --accent: #f59e0b;       /* Your brand orange */
}
```

### County Configuration
Update the county list and specific requirements for your service area:

```typescript
const alabamaCounties = [
  { name: "Jefferson", requirements: ["Soil test", "Groundwater assessment"] },
  { name: "Shelby", requirements: ["Percolation test", "Site plan"] },
  // ... all 67 counties
]
```

## Mobile Optimization

The dashboard is designed with mobile-first principles:

- **Responsive Grid**: Adapts to all screen sizes
- **Touch Targets**: Minimum 44px for mobile interaction
- **Offline Storage**: Service worker for field work
- **Progressive Enhancement**: Works without JavaScript

## Alabama Department of Public Health Compliance

This dashboard is built specifically for ADPH requirements:

- **CEP-5 Template**: Exact form replication
- **County Variations**: Specific requirements per county
- **Validation Rules**: Built-in compliance checking
- **Digital Signatures**: ADPH-approved signature capture

## Performance

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Next.js Image component
- **Bundle Splitting**: Code splitting for faster loads
- **Caching**: Aggressive caching for offline use

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
# Deploy the 'out' directory to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@pasifill.com
- Documentation: docs.pasifill.com
- Alabama Contractor Hotline: 1-800-PASIFILL

---

**Built specifically for Alabama septic contractors by Pasifill Team**
