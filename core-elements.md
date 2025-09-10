# SepticForms - Alabama CEP-5 Automation SaaS UI Development Prompt

## Application Purpose

**Product**: SepticForms is a specialized web application that automates Alabama Department of Public Health CEP-5 (Certificate of Evaluation and Permit) form completion for septic contractors.

**Core Value**: Reduce CEP-5 form completion time from 45 minutes to under 5 minutes by auto-populating customer and property data, while ensuring Alabama ADPH compliance.

**Target Users**: Small-to-medium Alabama septic contractors (1-10 trucks) who complete 50+ CEP-5 evaluations monthly across Alabama's 67 counties.

**Key Workflows**:
1. **Customer Management**: Store Alabama customer/property data once, reuse across multiple CEP-5 forms
2. **Form Automation**: Select customer → auto-populate CEP-5 → complete inspection fields → generate ADPH-compliant PDF
3. **Mobile Field Work**: Complete CEP-5 forms on tablets/phones at Alabama properties with offline capability
4. **Compliance Tracking**: Ensure all forms meet Alabama Department of Public Health requirements

---

## Required UI Components

### **Authentication & Onboarding**
```
LoginForm
- Email/password fields
- "Alabama Contractor License #" field (required for ADPH compliance)
- "Remember me" checkbox
- "Forgot password" link
- Alabama state branding/colors

SignupForm  
- Business name, email, password fields
- Alabama contractor license verification
- County service areas (checkboxes for Alabama's 67 counties)
- Terms acceptance for Alabama regulatory compliance

ForgotPassword
- Email input with Alabama contractor verification
- Clear instructions for account recovery
```

### **Main Navigation & Layout**
```
Header
- SepticForms logo with Alabama focus
- User dropdown (profile, settings, logout)
- Notification bell for Alabama regulatory updates
- Mobile hamburger menu button

Sidebar
- Dashboard (overview of recent CEP-5 activity)
- Customers (Alabama customer database)
- Forms (completed Alabama CEP-5 library)
- Settings (account/billing)
- Help (Alabama-specific support)

PageLayout
- Responsive wrapper supporting desktop and tablet
- Breadcrumb navigation
- Page title with Alabama context
- Action buttons (+ New Customer, + New CEP-5)
```

### **Customer Management Components**
```
CustomerList
- Searchable table/cards of Alabama customers
- Columns: Name, City, County, Last Service, # Properties
- Search by name/address/Alabama county
- Filter by Alabama county or service area
- Sort by last service date, name, county
- "Add New Customer" prominent button

CustomerCard
- Customer name and primary contact
- Alabama address with county display
- Phone/email with click-to-call/email
- Last CEP-5 date and status
- "Create CEP-5" quick action button
- Edit customer icon

AddCustomerForm
- Customer info: Name, phone, email
- Primary property address with Alabama county auto-detection
- Property details: lot size, existing system type
- Service history import option
- Save & create CEP-5 workflow connection

CustomerSearch
- Search input with Alabama-specific placeholders
- Filter dropdowns: County, Service Type, Date Range
- Real-time search results with highlighting
- Recent customers quick access
```

### **Alabama CEP-5 Form Components**
```
CEP5Template
- Exact replica of Alabama Department of Public Health CEP-5 layout
- Auto-populated sections (customer, property, contractor info)
- Manual input sections (inspection findings, soil evaluation)
- Alabama-specific field validations
- Progress indicator for form completion
- Real-time ADPH compliance checking

CustomerDataSection
- Read-only auto-populated fields with edit option
- Customer name, address, phone (from database)
- Property details, lot size, system specifications
- Previous service history reference
- "Update customer info" link for corrections

SoilClassificationDropdown
- Alabama-specific soil types (clay, sandy loam, etc.)
- Geological survey integration for county-specific options
- Visual icons/descriptions for soil types
- "Other" option with text field for unusual conditions

CountySelector
- All 67 Alabama counties in dropdown
- County-specific ADPH requirements display
- Auto-population based on property address
- Visual county map reference (optional)

InspectionFieldsSection
- Soil evaluation inputs (depth, type, percolation)
- Groundwater assessment fields
- Slope percentage for Alabama topography
- System condition checkboxes/dropdowns
- Notes/comments text area with character limit
- Required field indicators

FormPreview
- Side-by-side view: form fields + PDF preview
- Real-time PDF update as fields change
- Alabama Department of Public Health formatting validation
- Print preview optimization
- Mobile-responsive preview panel
```

### **Mobile/PWA Optimized Components**
```
MobileFormLayout
- Single-column layout for portrait tablets
- Large touch targets (minimum 44px)
- Optimized for work gloves usage
- Swipe navigation between form sections
- Auto-save progress indicators

TouchSignature
- Signature capture canvas
- "Clear" and "Save" buttons
- Customer name confirmation
- Alabama ADPH digital signature compliance
- Responsive sizing for different devices

CameraCapture
- Soil profile photo capture
- Multiple photo attachment (up to 5 per form)
- Photo compression for mobile data usage
- Annotation tools for photos
- GPS tagging for property verification

OfflineIndicator
- Clear connection status display
- "Working offline" mode messaging
- Sync queue status (forms pending upload)
- Data usage warnings for mobile users
```

### **Form Management & Actions**
```
FormsList
- Table/grid view of completed Alabama CEP-5 forms
- Columns: Customer, Property, Date, Status, County
- Status indicators: Draft, Completed, Submitted to ADPH
- Quick actions: View PDF, Email Customer, Duplicate Form
- Bulk actions for multiple form selection

FormActions
- Download PDF button (primary action)
- Email to customer with ADPH header
- Print optimization for office filing
- Duplicate form for repeat customers
- Archive/delete with confirmation

PDFPreview
- Embedded PDF viewer
- Alabama Department of Public Health formatting validation
- Print settings optimization
- Email preview before sending
- Download progress indicator
```

### **Utility & Feedback Components**
```
Button
- Primary (Alabama state colors)
- Secondary (neutral)
- Danger (red for deletions)
- Loading states with spinners
- Disabled states with explanations

Toast
- Success: "CEP-5 saved successfully"
- Error: "Alabama ADPH validation failed"
- Warning: "Missing required fields"
- Info: "Form auto-saved"
- Position: top-right, mobile-friendly

Modal
- Confirmation dialogs (delete customer, archive form)
- Form validation error details
- Alabama regulatory requirement explanations
- Mobile-optimized sizing and positioning

Loading
- Form submission progress
- PDF generation status
- Customer data sync indicators
- Skeleton loading for form fields
```

---

## Design Requirements

### **Visual Design**
- **Color Scheme**: Professional blue/gray with Alabama state accent colors
- **Typography**: Clean, readable fonts optimized for mobile and tablet
- **Icons**: Consistent icon library (Heroicons recommended)
- **Spacing**: Generous touch targets for mobile field work
- **Accessibility**: WCAG 2.1 AA compliance for government contractor requirements

### **Mobile-First Responsive Design**
- **Breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Touch Targets**: Minimum 44px for work-gloved hands
- **Orientation**: Support both portrait and landscape tablet usage
- **Performance**: Fast loading on Alabama rural cellular networks

### **Alabama-Specific Branding**
- **State Recognition**: Subtle Alabama state elements without being cheesy
- **Professional Authority**: Design conveys ADPH compliance and regulatory knowledge
- **Local Trust**: Visual cues that demonstrate Alabama septic industry understanding
- **Government Compatibility**: Professional enough for regulatory presentations

### **User Experience Priorities**
1. **Speed**: Form completion in under 5 minutes
2. **Reliability**: Works offline in rural Alabama locations
3. **Simplicity**: Usable by technicians with varying tech comfort levels
4. **Accuracy**: Clear validation prevents Alabama ADPH rejection
5. **Efficiency**: Minimize clicks and data entry for repeat workflows

---

## Technical Specifications

### **Component Library**: Radix UI + Tailwind CSS

#### **Standardized Radix UI Components**

**Select/Dropdown System**
```
Select (Standardized Picker Component)
- Consistent height: h-12 (48px) for all pickers
- Standardized styling: px-4 padding, focus:ring-2 focus:ring-sky-500
- Hover effects: hover:bg-gray-50 transition-colors
- Background: bg-white text-gray-900
- Shadow: shadow-lg for dropdown content
- Interactive states: hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700

Usage Examples:
- Primary Service County (Jefferson, Shelby, Tuscaloosa, Madison, Baldwin)
- Business Type (Contractor, Installer, Maintenance, Consultant, Other)
- Customer Status (Active, Inactive, Prospect)
- Element Type (House, Septic Tank, Distribution Lines, Drip Field, Well, Other)

Standard Select Structure:
<Select onValueChange={handleChange}>
  <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent className="bg-white border-gray-200 shadow-lg">
    <SelectItem value="option" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
      Option Label
    </SelectItem>
  </SelectContent>
</Select>
```

**Dialog System**
```
Dialog Components
- Standardized padding: px-8 pt-8 pb-6 for headers, px-8 pb-8 for content
- Consistent spacing: space-y-8 for main containers, space-y-6 for sections
- Modern styling: bg-white border-gray-200 shadow-xl
- Responsive sizing: w-96 for standard forms, sm:max-w-2xl for larger content
- Backdrop: backdrop-blur-sm with smooth animations

Dialog Structure:
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="w-96 bg-white border-gray-200 shadow-xl">
    <DialogHeader className="px-8 pt-8 pb-6">
      <DialogTitle className="text-gray-900">Title</DialogTitle>
      <DialogDescription className="text-gray-600 mt-2">Description</DialogDescription>
    </DialogHeader>
    <div className="px-8 pb-8 space-y-6">
      {/* Content */}
    </div>
  </DialogContent>
</Dialog>
```

**Button System**
```
Button Variants
- slate: Standard secondary button with consistent styling
- simple: Clean, minimal button design
- clean: Professional button with subtle borders
- Sizes: sm, compact, tiny for different use cases

Standard Button Usage:
<Button variant="slate" size="sm">
  Button Text
</Button>
```

**Form Input System**
```
Standardized Input Styling
- Consistent dimensions: px-4 py-3 (16px × 12px)
- Focus states: focus:ring-2 focus:ring-sky-500 focus:border-transparent
- Background: bg-white text-gray-900
- Border: border-gray-300 rounded-lg
- Labels: block text-sm font-medium mb-3 (24px margin)

Input Structure:
<input 
  type="text" 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
  placeholder="Enter text"
  onChange={handleChange}
/>
```

**Spacing System (8px Grid)**
```
Standardized Spacing Values
- 8px: space-y-2, px-2, py-2, mb-2, h-2
- 16px: space-y-4, px-4, py-4, mb-4, h-4
- 24px: space-y-6, px-6, py-6, mb-6, h-6
- 32px: space-y-8, px-8, py-8, mb-8, h-8
- 40px: space-y-10, px-10, py-10, mb-10, h-10
- 48px: h-12, text-2xl, space-y-12
- 56px: space-y-14, px-14, py-14
- 64px: space-y-16, px-16, py-16

Usage Guidelines:
- Card headers: px-8 pt-8 pb-6
- Card content: px-8 pb-8
- Form sections: space-y-8
- Input groups: space-y-6
- Button spacing: space-x-4, space-x-6
```
### **Form Handling**: React Hook Form + Zod validation

#### **Required Radix UI Imports**
```typescript
// Core UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Form Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Navigation Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
```

#### **Component Implementation Standards**
```
1. All pickers MUST use the standardized Select component
2. All dialogs MUST follow the standardized padding and spacing system
3. All buttons MUST use the predefined variants (slate, simple, clean)
4. All form inputs MUST follow the standardized styling pattern
5. All spacing MUST adhere to the 8px grid system
6. All interactive elements MUST include proper hover and focus states
```
### **State Management**: Zustand or React Context
### **PDF Generation**: jsPDF or Puppeteer for Alabama ADPH formatting
### **Offline Storage**: IndexedDB for PWA offline capability
### **Authentication**: Supabase Auth with Alabama contractor verification

---

## Success Criteria

The UI should enable:
- **Form Completion**: 45 minutes → under 5 minutes
- **Error Reduction**: <1% Alabama Department of Public Health rejection rate
- **Mobile Adoption**: 70%+ of forms completed on mobile devices
- **User Satisfaction**: 9+ NPS score from Alabama contractors
- **Accessibility**: Usable by contractors with varying technical experience

The interface should feel like it was built specifically for Alabama septic contractors by someone who understands their daily workflow and regulatory requirements.
