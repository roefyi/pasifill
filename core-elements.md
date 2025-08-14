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

### **Component Library**: Headless UI + Tailwind CSS
### **Form Handling**: React Hook Form + Zod validation
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