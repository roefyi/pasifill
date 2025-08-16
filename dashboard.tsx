"use client"

import React from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Search, 
  Upload, 
  FileText, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp,
  CloudRain,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  Download,
  Mail,
  LayoutDashboard,
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Settings,
  User,
  CalendarDays,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Save,
  Printer
} from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CEP5Form } from "@/components/cep5-form"

// Mock data - replace with actual data from your backend
const mockData = {
  contractor: {
    name: "Alabama Septic Solutions",
    license: "AL-12345",
    counties: ["Jefferson", "Shelby", "Tuscaloosa"],
    avatar: "/company-logo.png"
  },
  stats: {
    formsCompleted: 47,
    timeSaved: "35.2",
    totalCustomers: 89,
    activeProperties: 156,
    monthlyForms: 23,
    complianceRate: 98.5
  },
  todayJobs: [
    { 
      id: "JOB-001", 
      time: "9:00 AM", 
      customer: "Williams Property", 
      county: "Jefferson", 
      type: "CEP-5 Inspection",
      address: "123 Oak Street, Hoover AL 35244",
      status: "Scheduled"
    },
    { 
      id: "JOB-002", 
      time: "11:00 AM", 
      customer: "Johnson Farm", 
      county: "Shelby", 
      type: "New CEP-5",
      address: "456 Pine Ave, Birmingham AL 35242",
      status: "Scheduled"
    },
    { 
      id: "JOB-003", 
      time: "2:00 PM", 
      customer: "Davis Property", 
      county: "Tuscaloosa", 
      type: "Follow-up Inspection",
      address: "789 Elm Road, Tuscaloosa AL 35401",
      status: "Scheduled"
    },
    { 
      id: "JOB-004", 
      time: "4:00 PM", 
      customer: "Smith Residence", 
      county: "Jefferson", 
      type: "CEP-5 Inspection",
      address: "321 Maple Drive, Vestavia AL 35216",
      status: "Scheduled"
    }
  ],
  pendingForms: [
    { 
      id: "CEP-001", 
      customer: "Williams Property", 
      county: "Jefferson", 
      status: "Draft", 
      daysOpen: 2,
      lastUpdated: "2024-01-15",
      progress: 65
    },
    { 
      id: "CEP-002", 
      customer: "Johnson Farm", 
      county: "Shelby", 
      status: "In Progress", 
      daysOpen: 1,
      lastUpdated: "2024-01-16",
      progress: 85
    },
    { 
      id: "CEP-003", 
      customer: "Davis Property", 
      county: "Tuscaloosa", 
      status: "Review", 
      daysOpen: 3,
      lastUpdated: "2024-01-14",
      progress: 90
    }
  ],
  recentForms: [
    {
      id: "CEP-001",
      customer: "John Smith",
      property: "123 Oak Street, Birmingham",
      county: "Jefferson",
      status: "completed",
      date: "2024-01-15",
      timeSaved: "42"
    },
    {
      id: "CEP-002", 
      customer: "Sarah Johnson",
      property: "456 Pine Ave, Hoover",
      county: "Shelby",
      status: "draft",
      date: "2024-01-14",
      timeSaved: "38"
    },
    {
      id: "CEP-003",
      customer: "Mike Davis",
      property: "789 Elm Road, Tuscaloosa",
      county: "Tuscaloosa",
      status: "completed",
      date: "2024-01-13",
      timeSaved: "45"
    }
  ],
  cep5Forms: [
    {
      id: "CEP-001",
      customer: "John Smith",
      property: "123 Oak Street, Birmingham",
      county: "Jefferson",
      status: "completed",
      date: "2024-01-15",
      type: "New Installation"
    },
    {
      id: "CEP-002", 
      customer: "Sarah Johnson",
      property: "456 Pine Ave, Hoover",
      county: "Shelby",
      status: "draft",
      date: "2024-01-14",
      type: "System Replacement"
    },
    {
      id: "CEP-003",
      customer: "Mike Davis",
      property: "789 Elm Road, Tuscaloosa",
      county: "Tuscaloosa",
      status: "completed",
      date: "2024-01-13",
      type: "New Installation"
    },
    {
      id: "CEP-004",
      customer: "Williams Property",
      property: "321 Maple Drive, Vestavia",
      county: "Jefferson",
      status: "in_progress",
      date: "2024-01-16",
      type: "System Upgrade"
    },
    {
      id: "CEP-005",
      customer: "Johnson Farm",
      property: "654 Oak Lane, Birmingham",
      county: "Shelby",
      status: "draft",
      date: "2024-01-12",
      type: "New Installation"
    },
    {
      id: "CEP-006",
      customer: "Davis Property",
      property: "987 Pine Street, Hoover",
      county: "Tuscaloosa",
      status: "completed",
      date: "2024-01-11",
      type: "System Replacement"
    },
    {
      id: "CEP-007",
      customer: "Miller Residence",
      property: "147 Elm Avenue, Birmingham",
      county: "Jefferson",
      status: "in_progress",
      date: "2024-01-17",
      type: "New Installation"
    },
    {
      id: "CEP-008",
      customer: "Wilson Farm",
      property: "258 Cedar Road, Hoover",
      county: "Shelby",
      status: "draft",
      date: "2024-01-10",
      type: "System Upgrade"
    }
  ],
  customers: [
    {
      id: "CUST-001",
      name: "Williams Property",
      contact: "John Williams",
      phone: "(205) 555-0101",
      email: "john@williamsproperty.com",
      county: "Jefferson",
      properties: 3,
      forms: 8,
      status: "active",
      lastContact: "2024-01-15"
    },
    {
      id: "CUST-002",
      name: "Johnson Farm",
      contact: "Sarah Johnson",
      phone: "(205) 555-0102",
      email: "sarah@johnsonfarm.com",
      county: "Shelby",
      properties: 1,
      forms: 2,
      status: "active",
      lastContact: "2024-01-14"
    },
    {
      id: "CUST-003",
      name: "Davis Property",
      contact: "Mike Davis",
      phone: "(205) 555-0103",
      email: "mike@davisproperty.com",
      county: "Tuscaloosa",
      properties: 2,
      forms: 5,
      status: "active",
      lastContact: "2024-01-13"
    },
    {
      id: "CUST-004",
      name: "Miller Estate",
      contact: "Lisa Miller",
      phone: "(205) 555-0104",
      email: "lisa@millerestate.com",
      county: "Jefferson",
      properties: 1,
      forms: 3,
      status: "inactive",
      lastContact: "2023-12-20"
    },
    {
      id: "CUST-005",
      name: "Smith Residence",
      contact: "Robert Smith",
      phone: "(205) 555-0105",
      email: "robert@smithresidence.com",
      county: "Shelby",
      properties: 1,
      forms: 1,
      status: "active",
      lastContact: "2024-01-11"
    },
    {
      id: "CUST-006",
      name: "Brown Property",
      contact: "Jennifer Brown",
      phone: "(205) 555-0106",
      email: "jennifer@brownproperty.com",
      county: "Jefferson",
      properties: 2,
      forms: 4,
      status: "active",
      lastContact: "2024-01-10"
    }
  ],
  weather: {
    current: "72°F",
    condition: "Partly Cloudy",
    forecast: "Sunny, 75°F",
    hourlyForecast: [
      { time: "Now", temp: "72°F", condition: "Partly Cloudy", icon: "cloud-sun" },
      { time: "10 AM", temp: "74°F", condition: "Partly Cloudy", icon: "cloud-sun" },
      { time: "11 AM", temp: "76°F", condition: "Sunny", icon: "sun" },
      { time: "12 PM", temp: "78°F", condition: "Sunny", icon: "sun" },
      { time: "1 PM", temp: "79°F", condition: "Sunny", icon: "sun" },
      { time: "2 PM", temp: "80°F", condition: "Sunny", icon: "sun" },
      { time: "3 PM", temp: "79°F", condition: "Partly Cloudy", icon: "cloud-sun" },
      { time: "4 PM", temp: "77°F", condition: "Partly Cloudy", icon: "cloud-sun" },
      { time: "5 PM", temp: "75°F", condition: "Partly Cloudy", icon: "cloud-sun" },
      { time: "6 PM", temp: "73°F", condition: "Partly Cloudy", icon: "cloud-sun" }
    ]
  },
  upcomingDeadlines: [
    {
      type: "Jefferson County Permit Renewal",
      date: "2024-02-01",
      daysLeft: 17
    },
    {
      type: "Shelby County Annual Report",
      date: "2024-02-15",
      daysLeft: 31
    }
  ]
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [showNewForm, setShowNewForm] = React.useState(false)
  const [showAddCustomer, setShowAddCustomer] = React.useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [formSource, setFormSource] = React.useState('dashboard')
  const [showSearch, setShowSearch] = React.useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false)
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = React.useState(false)
  const [pendingNavigation, setPendingNavigation] = React.useState<(() => void) | null>(null)
  
  // Debug useEffect to monitor state changes
  React.useEffect(() => {
    console.log("State changed - showNewForm:", showNewForm, "showAddCustomer:", showAddCustomer)
  }, [showNewForm, showAddCustomer])

  const handleNewForm = () => {
    console.log("handleNewForm called")
    console.log("activeTab:", activeTab)
    console.log("Before state change - showNewForm:", showNewForm)
    setFormSource(activeTab)
    setShowNewForm(true)
    console.log("After state change - showNewForm set to true")
    
    // Force a re-render check
    setTimeout(() => {
      console.log("After timeout - showNewForm:", showNewForm)
    }, 100)
  }

  const handleAddCustomer = () => {
    setFormSource(activeTab)
    setShowAddCustomer(true)
  }

  const handleBackToSource = () => {
    if (hasUnsavedChanges) {
      setShowLeaveConfirmDialog(true)
      setPendingNavigation(() => () => {
        setShowNewForm(false)
        setShowAddCustomer(false)
        setActiveTab(formSource)
        setHasUnsavedChanges(false)
        setShowLeaveConfirmDialog(false)
        setPendingNavigation(null)
      })
    } else {
      setShowNewForm(false)
      setShowAddCustomer(false)
      setActiveTab(formSource)
    }
  }

  const handleBackButtonClick = () => {
    setShowConfirmDialog(true)
  }

  const handleSaveDraft = () => {
    // Here you would implement the actual save logic
    console.log("Saving draft...")
    setShowConfirmDialog(false)
    setShowNewForm(false)
    setActiveTab(formSource)
    setHasUnsavedChanges(false)
  }

  const handleDeleteForm = () => {
    // Here you would implement the actual delete logic
    console.log("Deleting form...")
    setShowConfirmDialog(false)
    setShowNewForm(false)
    setActiveTab(formSource)
  }

  const handleCancelDialog = () => {
    setShowConfirmDialog(false)
  }

  const handleFormInputChange = () => {
    setHasUnsavedChanges(true)
  }

  const handleConfirmLeave = () => {
    if (pendingNavigation) {
      pendingNavigation()
    }
  }

  const handleCancelLeave = () => {
    setShowLeaveConfirmDialog(false)
    setPendingNavigation(null)
  }

  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
  }

  const handleFindCustomer = () => {
    // Navigate to customer search
    console.log("Find customer")
  }

  const handleImportData = () => {
    // Open import modal
    console.log("Import data")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "draft":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "draft":
        return <ClockIcon className="h-3 w-3" />
      case "in_progress":
        return <AlertCircle className="h-3 w-3" />
      case "pending":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <ClockIcon className="h-3 w-3" />
    }
  }

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "inactive":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getCustomerStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />
      case "inactive":
        return <ClockIcon className="h-3 w-3" />
      default:
        return <ClockIcon className="h-3 w-3" />
    }
  }

  const renderContent = () => {
    console.log("renderContent called, showNewForm:", showNewForm, "showAddCustomer:", showAddCustomer)
    
    if (showNewForm) {
      console.log("Rendering CEP5 form section")
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => {
                    if (hasUnsavedChanges) {
                      setShowLeaveConfirmDialog(true)
                      setPendingNavigation(() => () => {
                        setShowNewForm(false)
                        setActiveTab(formSource)
                        setHasUnsavedChanges(false)
                        setShowLeaveConfirmDialog(false)
                        setPendingNavigation(null)
                      })
                    } else {
                      handleBackToSource()
                    }
                  }}>
                    {formSource === 'dashboard' ? (
                      <>
                        <Home className="w-4 h-4 mr-1" />
                        Dashboard
                      </>
                    ) : formSource === 'cep5' ? (
                      <>
                        <FileText className="w-4 h-4 mr-1" />
                        CEP-5
                      </>
                    ) : formSource === 'customers' ? (
                      <>
                        <Users className="w-4 h-4 mr-1" />
                        Customers
                      </>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4 mr-1" />
                        Properties
                      </>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>New CEP-5 Form</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* CEP5 Form Component */}
          <CEP5Form 
            onSave={async (data) => {
              console.log("Saving CEP5 form:", data)
              setHasUnsavedChanges(false)
              setShowNewForm(false)
              setActiveTab(formSource)
            }}
            onPrint={(data) => {
              console.log("Printing CEP5 form:", data)
              // Implement print functionality
            }}
          />
        </div>
      )
    } else if (showAddCustomer) {
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => {
                    if (hasUnsavedChanges) {
                      setShowLeaveConfirmDialog(true)
                      setPendingNavigation(() => () => {
                        setShowAddCustomer(false)
                        setActiveTab(formSource)
                        setHasUnsavedChanges(false)
                        setShowLeaveConfirmDialog(false)
                        setPendingNavigation(null)
                      })
                    } else {
                      handleBackToSource()
                    }
                  }}>
                    {formSource === 'dashboard' ? (
                      <>
                        <Home className="w-4 h-4 mr-1" />
                        Dashboard
                      </>
                    ) : formSource === 'cep5' ? (
                      <>
                        <FileText className="w-4 h-4 mr-1" />
                        CEP-5
                      </>
                    ) : formSource === 'customers' ? (
                      <>
                        <Users className="w-4 h-4 mr-1" />
                        Customers
                      </>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4 mr-1" />
                        Properties
                      </>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Add New Customer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Add New Customer</h2>
                <p className="text-gray-600">Create a new customer profile for your business</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      setShowLeaveConfirmDialog(true)
                      setPendingNavigation(() => () => {
                        setShowAddCustomer(false)
                        setActiveTab(formSource)
                        setHasUnsavedChanges(false)
                        setShowLeaveConfirmDialog(false)
                        setPendingNavigation(null)
                      })
                    } else {
                      handleBackToSource()
                    }
                  }}
                  size="sm"
                  className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Here you would implement the actual create customer logic
                    console.log("Creating customer...")
                    setHasUnsavedChanges(false)
                    handleBackToSource()
                  }}
                  size="sm"
                  className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Customer
                </Button>
              </div>
            </div>
          </div>
          
          {/* Form Sections */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">Customer business details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Enter business name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Person</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Full name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="(205) 555-0000"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="contact@business.com"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Address Information</CardTitle>
                <CardDescription className="text-gray-600">Business location and service area</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Address</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Street address"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="City"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="State"
                        defaultValue="AL"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="ZIP code"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Service County</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      onChange={handleFormInputChange}
                    >
                      <option value="">Select county</option>
                      <option value="Jefferson">Jefferson County</option>
                      <option value="Shelby">Shelby County</option>
                      <option value="Tuscaloosa">Tuscaloosa County</option>
                      <option value="Madison">Madison County</option>
                      <option value="Baldwin">Baldwin County</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Business Details</CardTitle>
                <CardDescription className="text-gray-600">Additional business information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Type</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      onChange={handleFormInputChange}
                    >
                      <option value="">Select business type</option>
                      <option value="LLC">LLC</option>
                      <option value="Corporation">Corporation</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Years in Business</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Number of years"
                      min="0"
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">
                Welcome back, {mockData.contractor.name.split(" ")[0]}!
              </h2>
              <p className="text-gray-600">
                Complete your Alabama CEP-5 forms faster than ever. You've saved {mockData.stats.timeSaved} hours this month.
              </p>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <Button 
                onClick={handleNewForm}
                size="sm"
                className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New CEP-5 Form
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
              >
                <Users className="w-4 h-4 mr-2" />
                New Customer
              </Button>
            </div>
          </div>

          {/* This Month Stats */}
          <div className="mb-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border-gray-200">
                  <CardContent className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-sm font-medium">CEP-5 Forms</CardTitle>
                      <FileText className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.monthlyForms}</div>
                    <p className="text-xs text-gray-500">
                      +{mockData.stats.monthlyForms - 20} from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardContent className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.totalCustomers}</div>
                    <p className="text-xs text-gray-500">
                      Across {mockData.contractor.counties.length} counties
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardContent className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.complianceRate}%</div>
                    <p className="text-xs text-gray-500">
                      ADPH acceptance rate
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Jobs</h3>
              <Button variant="outline" size="sm" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                <CalendarDays className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockData.todayJobs.map((job) => (
                <Card key={job.id} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                  <CardContent className="px-6 py-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <CalendarDays className="w-3 h-3 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.time}</div>
                          <div className="text-xs text-gray-500">{job.type}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200 px-2 py-1">
                        {job.status}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{job.customer}</div>
                    <div className="text-xs text-gray-500 mb-2">{job.address}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.county} County
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                <Clock className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {mockData.recentForms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{form.customer}</div>
                      <div className="text-xs text-gray-500">{form.property}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{form.status}</div>
                    <div className="text-xs text-gray-500">{form.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="px-6 py-4 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Forms</div>
                <div className="text-2xl font-bold text-gray-900">{mockData.stats.formsCompleted}</div>
                <div className="text-xs text-gray-500">Total completed</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="px-6 py-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Customers</div>
                <div className="text-2xl font-bold text-gray-900">{mockData.stats.totalCustomers}</div>
                <div className="text-xs text-gray-500">Active accounts</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="px-6 py-4 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Properties</div>
                <div className="text-2xl font-bold text-gray-900">{mockData.stats.activeProperties}</div>
                <div className="text-xs text-gray-500">Sites managed</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="px-6 py-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Growth</div>
                <div className="text-2xl font-bold text-gray-900">+{mockData.stats.monthlyForms - 20}</div>
                <div className="text-xs text-gray-500">This month</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Vertical Navigation Sidebar */}
      <nav className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-50 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Top Section - Branding and Search */}
        <div className="p-4 border-b border-gray-200">
          {!isSidebarCollapsed && (
            <>
              {/* App Branding */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <h1 className="text-lg font-semibold text-gray-800">Formifil</h1>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Search Bar with Collapse Button */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Find customer"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
          
          {/* Collapse Toggle Button and Logo for collapsed state */}
          {isSidebarCollapsed && (
            <div className="flex flex-col items-center space-y-4">
              {/* Logo */}
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              {/* Collapse Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-6">
          {/* Navigation Items */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={isSidebarCollapsed ? 'Dashboard' : undefined}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Dashboard</span>}
            </button>
            <button
              onClick={() => setActiveTab('cep5')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'cep5'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={isSidebarCollapsed ? 'CEP-5' : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">CEP-5</span>}
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'customers'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={isSidebarCollapsed ? 'Customers' : undefined}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Customers</span>}
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'properties'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={isSidebarCollapsed ? 'Properties' : undefined}
            >
              <Building2 className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Properties</span>}
            </button>
          </div>
        </div>

        {/* Bottom Section - User Settings */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-2' : ''
          }`} title={isSidebarCollapsed ? 'Profile' : undefined}>
            <User className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Profile</span>}
          </button>
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-2' : ''}`} title={isSidebarCollapsed ? 'Notifications' : undefined}>
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Notifications</span>}
          </button>
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-2' : ''}`} title={isSidebarCollapsed ? 'Settings' : undefined}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Settings</span>}
          </button>
        </div>
      </nav>

      {/* Main Content Area with dynamic margin */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900 lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'cep5' ? 'CEP-5' :
                   activeTab === 'customers' ? 'Customers' :
                   'Properties'}
                </h2>
                <p className="text-sm text-gray-600">
                  {activeTab === 'dashboard' ? 'Overview and quick actions' : 
                   activeTab === 'cep5' ? 'Manage CEP-5 forms and compliance' :
                   activeTab === 'customers' ? 'Customer database and relationships' :
                   'Property tracking and requirements'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{mockData.contractor.counties.join(", ")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {renderContent()}
      </main>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Unsaved Changes</DialogTitle>
            <DialogDescription className="text-gray-600">
              You have unsaved changes. Are you sure you want to leave? You can save your work as a draft or delete the form.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancelDialog}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteForm}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Form
            </Button>
            <Button
              onClick={handleSaveDraft}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white"
            >
              Save Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave Confirmation Dialog */}
      <Dialog open={showLeaveConfirmDialog} onOpenChange={setShowLeaveConfirmDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Leave Form?</DialogTitle>
            <DialogDescription className="text-gray-600">
              You have unsaved changes. Are you sure you want to leave? All unsaved work will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancelLeave}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
            >
              Stay on Form
            </Button>
            <Button
              onClick={handleConfirmLeave}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Leave Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashboardPage
