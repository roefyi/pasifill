# SepticForms MVP - Product Requirements Document (Alabama CEP-5 Only)

## Executive Summary

**Product Vision**: Eliminate manual CEP-5 form completion for Alabama septic contractors by auto-populating Alabama Department of Public Health forms with saved customer and property data.

**MVP Scope**: Alabama CEP-5 (Certificate of Evaluation and Permit) form automation with customer/property data management, specifically designed for Alabama Department of Public Health requirements.

**Target Market**: Small-to-medium Alabama septic contractors (1-10 trucks) handling 50+ CEP-5 evaluations per month across Alabama's 67 counties.

**Success Metrics**: 
- 90% time reduction in Alabama CEP-5 completion (45 min → 4.5 min)
- $39/month price point with 80%+ gross margins
- 8% monthly churn rate or lower after month 3
- <1% Alabama Department of Public Health rejection rate

---

## Problem Statement

Alabama septic contractors waste 15-20 hours monthly on manual CEP-5 form completion for the Alabama Department of Public Health, leading to:
- Administrative overhead reducing billable evaluation hours
- Data entry errors causing ADPH form rejections and compliance delays
- Delayed customer service due to evening/weekend paperwork sessions  
- Risk of Alabama Department of Public Health penalties for incomplete or incorrect CEP-5 submissions
- Difficulty managing Alabama-specific soil classifications and geological requirements

---

## MVP Solution Overview

### Core Value Proposition
"Complete Alabama Department of Public Health CEP-5 forms in under 5 minutes using your saved customer data - no more rewriting the same information on every Alabama septic evaluation."

### Key Features (MVP v1.0)

#### 1. Alabama Customer & Property Database
**Purpose**: Centralized Alabama-specific data storage for CEP-5 auto-population
**Features**:
- Alabama customer profiles (name, address, contact info)
- Alabama property records with county-specific details
- Alabama soil classification database (clay, sandy loam, etc.)
- Service history tracking for Alabama properties
- CSV import for existing Alabama customer lists

**Acceptance Criteria**:
- Import 500+ Alabama customer records via CSV in <2 minutes
- Search Alabama customers by name/address/county in <3 seconds
- Support all 67 Alabama counties with county-specific data fields
- Alabama soil type dropdown with geological classifications
- Mobile-optimized data entry forms for Alabama field conditions

#### 2. Alabama CEP-5 Form Template
**Purpose**: Alabama Department of Public Health CEP-5 generation with complete auto-population
**Features**:
- Exact Alabama Department of Public Health CEP-5 template replication
- Auto-fill customer/property data meeting ADPH requirements
- Alabama-specific inspection fields (soil evaluation, groundwater assessment)
- Alabama contractor license number integration
- County-specific permit information handling

**Acceptance Criteria**:
- Form matches current Alabama Department of Public Health CEP-5 exactly
- 85%+ fields auto-populated from saved Alabama customer data
- PDF generation matches official Alabama ADPH CEP-5 layout
- Includes all required Alabama geological and environmental assessments
- Forms remain ADPH-compliant for 6+ months without updates

#### 3. Alabama Field-Optimized Mobile Interface
**Purpose**: CEP-5 completion on tablets/smartphones in Alabama field conditions
**Features**:
- Responsive design tested in Alabama sun/heat conditions
- Offline CEP-5 completion capability for rural Alabama properties
- Soil profile photo attachment for Alabama geological requirements
- Digital signature capture meeting Alabama Department of Public Health standards
- Sync when Alabama cellular connectivity restored

**Acceptance Criteria**:
- Works offline for 8+ hours in rural Alabama locations
- Sync completed Alabama CEP-5 forms in <30 seconds
- Photo compression optimized for Alabama soil profile documentation
- Touch interface works with work gloves in Alabama heat
- GPS integration for Alabama property location verification

#### 4. Alabama CEP-5 Management System
**Purpose**: Organization and retrieval of completed Alabama Department of Public Health forms
**Features**:
- Alabama CEP-5 forms library with ADPH compliance tracking
- Search by Alabama customer/county/property/date
- Alabama Department of Public Health-compliant PDF generation
- CEP-5 status tracking (draft/completed/submitted to ADPH)
- Alabama contractor dashboard with county-based organization

**Acceptance Criteria**:
- Store 1000+ completed Alabama CEP-5 forms
- Search Alabama forms by county/soil type/date in <3 seconds
- Generate Alabama Department of Public Health-compliant PDFs in <10 seconds
- Email delivery 99% success rate to Alabama customers
- Integration ready for future Alabama Department of Public Health digital submission

---

## User Stories & Acceptance Criteria

### Epic 1: Alabama Data Management
**As an Alabama septic contractor**, I want to store my Alabama customer information once so I never have to re-enter basic details on CEP-5 forms.

**User Stories**:
- **US-001**: Import existing Alabama customer list from Excel/CSV
- **US-002**: Create Alabama customer profiles with county and soil-specific details
- **US-003**: Edit/update Alabama customer information and property classifications
- **US-004**: Link multiple Alabama properties to single customer across counties

### Epic 2: Alabama CEP-5 Form Completion
**As an Alabama field technician**, I want to complete Department of Public Health CEP-5 forms quickly on my tablet without re-typing customer information.

**User Stories**:
- **US-005**: Select Alabama customer and auto-populate all CEP-5 fields
- **US-006**: Complete Alabama-specific inspection fields (soil classification, groundwater depth)
- **US-007**: Attach soil profile photos meeting Alabama Department of Public Health requirements
- **US-008**: Capture customer signature compliant with Alabama ADPH digital standards
- **US-009**: Work offline in rural Alabama and sync when connected

### Epic 3: Alabama CEP-5 Management
**As an Alabama septic business owner**, I want to organize and retrieve completed CEP-5 forms for customer service and Alabama Department of Public Health compliance.

**User Stories**:
- **US-010**: Search completed Alabama CEP-5 forms by county, customer, or soil type
- **US-011**: Download Alabama Department of Public Health-compliant CEP-5 PDFs
- **US-012**: Email Alabama CEP-5 forms directly to customers with ADPH header
- **US-013**: Track CEP-5 compliance status for Alabama Department of Public Health reporting

---

## Technical Requirements

### Architecture
- **Frontend**: React.js with PWA capabilities optimized for Alabama mobile usage
- **Backend**: Node.js/Express with PostgreSQL including Alabama-specific data schemas
- **Mobile**: PWA with offline-first architecture tested in Alabama rural conditions
- **File Storage**: AWS S3 for Alabama soil profile photos and CEP-5 PDFs
- **Authentication**: JWT-based with Alabama contractor license verification

### Performance Requirements
- **Page Load**: <3 seconds on Alabama 4G/rural networks
- **Alabama CEP-5 Generation**: <5 seconds for PDF creation
- **Rural Offline Capability**: 8+ hours without connectivity (critical for Alabama)
- **Data Sync**: <30 seconds for typical Alabama CEP-5 submission
- **Uptime**: 99.5% availability during Alabama business hours (6 AM - 7 PM CT)

### Security Requirements
- **Data Encryption**: TLS 1.3 in transit, AES-256 at rest for Alabama customer data
- **Authentication**: Multi-factor authentication for Alabama contractor accounts
- **Backup**: Daily automated backups with 30-day retention for Alabama compliance
- **Alabama Compliance**: SOC2 Type II within 12 months for ADPH partnership readiness
- **Privacy**: GDPR/CCPA compliant handling of Alabama customer data

### Alabama-Specific Integration Requirements
- **Alabama Soil Database**: Integration with Alabama geological survey data
- **County Mapping**: All 67 Alabama counties with specific permit requirements
- **ADPH Compliance**: Ready for future Alabama Department of Public Health API integration
- **Alabama Weather**: Mobile interface tested in Alabama heat/humidity conditions

---

## User Experience Requirements

### Alabama-Focused Onboarding Flow
1. **Account Creation**: Email + Alabama contractor license + primary Alabama counties served
2. **Quick Setup**: Upload Alabama customer CSV or manual entry of 3-5 Alabama properties
3. **First Alabama CEP-5**: Guided creation of sample Alabama Department of Public Health CEP-5
4. **Mobile Setup**: QR code download optimized for Alabama field conditions

### Alabama CEP-5 Workflow
1. **Select Alabama Customer**: Search Alabama customer database by county/name
2. **Load CEP-5 Template**: Alabama Department of Public Health CEP-5 form auto-loads
3. **Review Alabama Data**: Verify auto-populated customer/property/county information
4. **Complete Alabama Inspection**: Fill Alabama-specific geological and environmental fields
5. **Alabama Documentation**: Add soil profile photos and customer signature per ADPH requirements
6. **Generate Alabama CEP-5**: Create ADPH-compliant PDF and email to Alabama customer

### Alabama-Specific Error Handling
- **Rural Connectivity**: Clear offline indicator for Alabama rural properties
- **Alabama Validation**: ADPH-specific validation with helpful error messages for soil classifications
- **County Requirements**: Alerts for county-specific Alabama CEP-5 requirements
- **Form Compliance**: Auto-check for Alabama Department of Public Health completeness requirements

---

## Business Requirements

### Alabama-Focused Pricing Model
- **Alabama Starter**: $39/month for 1-2 users, up to 50 Alabama CEP-5 forms/month
- **Alabama Professional**: $79/month for 3-10 users, up to 200 Alabama CEP-5 forms/month
- **Alabama Enterprise**: $149/month for 10+ users, unlimited Alabama CEP-5 forms

### Alabama Market Revenue Projections (Year 1)
- **Addressable Market**: ~800 active Alabama septic contractors
- **Target Penetration**: 10% (80 customers) by end of year 1
- **Month 1-3**: 5 Alabama customers × $39 = $195/month
- **Month 4-6**: 15 Alabama customers × $39 = $585/month  
- **Month 7-12**: 40 Alabama customers × $39 = $1,560/month
- **Year 1 Target**: $12,000 ARR from Alabama market

### Alabama Customer Success Metrics
- **Time to Value**: First successful Alabama CEP-5 completed within 24 hours
- **Usage Frequency**: 15+ Alabama CEP-5 forms per customer per month
- **Alabama Satisfaction**: 9+ NPS score focused on ADPH compliance confidence
- **Feature Adoption**: 85% of Alabama customers using mobile app in field

---

## Launch Strategy

### Phase 1: Alabama Beta (Months 1-2)
- **Target**: 5 beta Alabama contractors (Birmingham, Mobile, Huntsville metro areas)
- **Focus**: Alabama CEP-5 accuracy validation and Alabama Department of Public Health compliance
- **Pricing**: Free during beta with Alabama contractor feedback sessions

### Phase 2: Alabama Limited Launch (Months 3-4)
- **Target**: 15 paying Alabama customers across major Alabama counties
- **Features**: Full Alabama CEP-5 automation with Alabama customer support
- **Pricing**: $29/month early Alabama adopter pricing

### Phase 3: Alabama Statewide Launch (Months 5-6)
- **Target**: All 67 Alabama counties, 40+ Alabama customers
- **Features**: Refined Alabama UX based on field feedback from Alabama contractors
- **Marketing**: Alabama septic association partnerships and Alabama trade show presence
- **Pricing**: Full $39/month pricing for Alabama market

---

## Success Criteria & KPIs

### Alabama Product Metrics
- **Alabama CEP-5 Completion Time**: Average 5 minutes or less
- **ADPH Compliance Rate**: <1% Alabama Department of Public Health rejections
- **Alabama Uptime**: 99.5% during Alabama business hours (6 AM - 7 PM CT)
- **Mobile Usage**: 80%+ of Alabama CEP-5 forms completed on mobile in field

### Alabama Business Metrics
- **Alabama Customer Acquisition**: 40 paying Alabama customers by month 6
- **Alabama Monthly Churn**: <8% after month 3 (accounting for seasonal Alabama variations)
- **Alabama Revenue**: $12,000 ARR by end of year 1 from Alabama market
- **Alabama Customer Satisfaction**: 9+ NPS score focused on ADPH compliance

### Alabama Market Engagement
- **Daily Active Users**: 70% of Alabama customers use product weekly during season
- **Feature Adoption**: 85% use mobile app, 75% use soil profile photo features
- **Alabama Support**: <1 support ticket per Alabama customer per month
- **Alabama Referrals**: 30% of new Alabama customers from existing customer referrals

---

## Risk Assessment & Mitigation

### High Risk: Alabama Department of Public Health Form Changes
**Risk**: Alabama ADPH updates CEP-5 format, breaking auto-population
**Mitigation**: Monthly monitoring of Alabama Department of Public Health website, direct ADPH contact established, 24-hour update SLA for Alabama customers

### High Risk: Alabama Market Size Limitations  
**Risk**: Alabama market may only support 50-80 active customers long-term
**Mitigation**: Focus on high-value customers, premium pricing for specialized Alabama features, prepare Tennessee/Georgia expansion

### Medium Risk: Alabama Seasonal Variations
**Risk**: Alabama septic work highly seasonal, affecting subscription retention
**Mitigation**: Annual pricing discounts, winter feature development focus, Alabama contractor off-season value-adds

### Medium Risk: Rural Alabama Connectivity
**Risk**: Offline functionality fails in remote Alabama locations
**Mitigation**: Extensive Alabama rural testing, local data storage optimization, Alabama-specific connectivity partnerships

### Low Risk: Alabama Regulatory Relationships
**Risk**: Alabama Department of Public Health develops competing solution
**Mitigation**: Position as ADPH partner, offer white-label solution, focus on contractor workflow vs. regulatory workflow

---

## Alabama-Specific Future Roadmap

### Phase 2 Alabama Features (Months 7-12)
- **Alabama Integration**: QuickBooks integration for Alabama contractor billing
- **Alabama Analytics**: Seasonal Alabama reporting and county-based analytics  
- **Alabama Team Features**: Multi-user access for Alabama contractor teams
- **ADPH Partnership**: Explore direct Alabama Department of Public Health integration

### Phase 3 Alabama Expansion (Year 2)
- **Border States**: Tennessee and Georgia CEP-5 equivalent forms for Alabama contractors working across state lines
- **Alabama Specialization**: Grease trap permits, Alabama lagoon systems, commercial Alabama septic forms
- **Alabama API**: Integration with Alabama contractor management software (Tank Track, ServiceTitan)

### Long-term Alabama Vision (Years 2-3)
- **Alabama Market Leader**: 200+ Alabama customers (25% market penetration)
- **ADPH Official Partner**: Recommended solution by Alabama Department of Public Health
- **$100K+ ARR**: Sustainable Alabama-focused business with expansion capability
- **Southeast Expansion**: Leverage Alabama success for regional growth (Tennessee, Georgia, Florida)
