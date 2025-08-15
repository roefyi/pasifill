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
  CalendarDays
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
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)

  const handleNewForm = () => {
    setShowNewForm(true)
  }

  const handleBackToDashboard = () => {
    setShowNewForm(false)
  }

  const handleBackButtonClick = () => {
    setShowConfirmDialog(true)
  }

  const handleSaveDraft = () => {
    // Here you would implement the actual save logic
    console.log("Saving draft...")
    setShowConfirmDialog(false)
    setShowNewForm(false)
  }

  const handleDeleteForm = () => {
    // Here you would implement the actual delete logic
    console.log("Deleting form...")
    setShowConfirmDialog(false)
    setShowNewForm(false)
  }

  const handleCancelDialog = () => {
    setShowConfirmDialog(false)
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
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "draft":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <ClockIcon className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  const renderContent = () => {
    if (showNewForm) {
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={handleBackButtonClick}
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New CEP-5 Form</h2>
                <p className="text-gray-600">Alabama Installer's Onsite Sewage Disposal System Certification</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                  Save Draft
                </Button>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                  Print Form
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
                <CardDescription className="text-gray-600">LHD permit and owner details</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LHD Permit #</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Enter permit number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Received</label>
                      <DatePicker
                        placeholder="Select date received"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner/Applicant's Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property (911) Address</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City, State, Zip</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="City, State, Zip"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subdivision Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Subdivision name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lot</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Lot #"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Block</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Block #"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Installation Information</CardTitle>
                <CardDescription className="text-gray-600">System installation details and specifications</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                      <DatePicker
                        placeholder="Select installation date"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Installation Type</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="installType" className="mr-2" />
                          <span className="text-sm text-gray-700">New</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="installType" className="mr-2" />
                          <span className="text-sm text-gray-700">Repair</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Septic Tank Size (Gallons)</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="e.g., 1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer's #</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Manufacturer number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Septic Tank Filter (NSF 46)</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="filter" className="mr-2" />
                        <span className="text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="filter" className="mr-2" />
                        <span className="text-sm text-gray-700">No/Not Required</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Treatment Unit (if applicable)</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Make"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Model"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Distribution System</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="distribution" className="mr-2" />
                        <span className="text-sm text-gray-700">Level Header</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="distribution" className="mr-2" />
                        <span className="text-sm text-gray-700">Serial Distribution</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="distribution" className="mr-2" />
                        <span className="text-sm text-gray-700">Distribution Box</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="distribution" className="mr-2" />
                        <span className="text-sm text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Type */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">System Type</CardTitle>
                <CardDescription className="text-gray-600">Select the type of sewage disposal system</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Gravel</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Equivalent Product</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="radio" className="mr-2" />
                      <span className="text-sm text-gray-700">Control Fill</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">LPP</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Drip</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Bed</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Combined Treatment/Disposal</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Pad</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">EDS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="systemType" className="mr-2" />
                      <span className="text-sm text-gray-700">Other</span>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Manufacturer(s)</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Manufacturer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model/Configuration</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Model or configuration"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Effluent Distribution Field */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Effluent Distribution Field</CardTitle>
                <CardDescription className="text-gray-600">EDF specifications and measurements</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">EDF Depth/Height (Inches)</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Depth in inches"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">NGS Position</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="ngs" className="mr-2" />
                          <span className="text-sm text-gray-700">Below NGS</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="ngs" className="mr-2" />
                          <span className="text-sm text-gray-700">Above NGS</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fill (if applicable) Inches</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Fill inches"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">EDF Size</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="edfSize" className="mr-2" />
                          <span className="text-sm text-gray-700">Linear Feet</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="edfSize" className="mr-2" />
                          <span className="text-sm text-gray-700">Square Feet</span>
                        </label>
                      </div>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent mt-2"
                        placeholder="Size value"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trench Width (if applicable) Inches</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Trench width"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Separate Washer Line (if installed)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Width"
                        />
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Length (linear feet)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installer Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Installer Information</CardTitle>
                <CardDescription className="text-gray-600">Your company and contact details</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Installer Name / Company</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Company name"
                      defaultValue={mockData.contractor.name}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Business address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="State"
                          defaultValue="AL"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Zip</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Zip code"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <DatePicker
                        placeholder="Select date"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License No.</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="License number"
                        defaultValue={mockData.contractor.license}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {mockData.contractor.name.split(" ")[0]}!
                  </h2>
                  <p className="text-gray-600">
                    Complete your Alabama CEP-5 forms faster than ever. You've saved {mockData.stats.timeSaved} hours this month.
                  </p>
                </div>
                <div className="flex items-center space-x-3 ml-6">
                  <Button 
                    onClick={handleNewForm}
                    className="h-12 px-6 bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New CEP-5 Form
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    New Customer
                  </Button>
                </div>
              </div>
            </div>

            {/* This Month Stats */}
            <div className="mb-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white border-gray-200">
                    <CardContent className="px-6 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">CEP-5 Forms</CardTitle>
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
                        <CardTitle className="text-sm font-medium text-gray-700">Total Customers</CardTitle>
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
                        <CardTitle className="text-sm font-medium text-gray-700">Compliance Rate</CardTitle>
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
                <h3 className="text-lg font-semibold text-gray-900">Today's Jobs</h3>
                <Button variant="outline" size="sm" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
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
                            <div className="font-semibold text-xs text-gray-900">{job.time}</div>
                            <div className="text-xs text-gray-600">{job.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200 px-2 py-1">
                          {job.status}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-900">{job.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{job.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{job.county} County</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pending Forms Status */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending CEP-5 Forms</h3>
                <Button variant="outline" size="sm" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Pending
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockData.pendingForms.map((form) => (
                  <Card key={form.id} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                    <CardContent className="px-6 py-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{form.customer}</div>
                          <div className="text-xs text-gray-500">ID: {form.id}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          {form.status}
                        </Badge>
                        <span className="text-gray-500">{form.county} County</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent CEP-5 Forms */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent CEP-5 Forms</h3>
                <Button variant="outline" size="sm" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                  View All
                </Button>
              </div>
              
              <Card className="bg-white border-gray-200">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Form ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            County
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockData.recentForms.map((form) => (
                          <tr key={form.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {form.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {form.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                              {form.property}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {form.county}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant="outline" 
                                className={`${getStatusColor(form.status)} border`}
                              >
                                <span className="flex items-center space-x-1">
                                  {getStatusIcon(form.status)}
                                  <span className="capitalize">{form.status}</span>
                                </span>
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {form.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Optimization Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">
                    Mobile-Optimized for Field Work
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Complete CEP-5 forms offline on your tablet or smartphone. All data syncs automatically when you're back online.
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                      Download Mobile App
                    </Button>
                    <Button size="sm" variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                      View Offline Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      case 'cep5':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CEP-5 Forms</h1>
                <p className="text-gray-600 mt-2">Manage and track your environmental compliance forms</p>
              </div>
              <Button 
                onClick={handleNewForm}
                className="h-12 px-6 bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                New CEP-5 Form
              </Button>
            </div>
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">CEP-5 Form Management</CardTitle>
                <CardDescription className="text-gray-600">Create, edit, and manage your Alabama CEP-5 forms</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-gray-600">CEP-5 form management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
              <Button onClick={handleFindCustomer} variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                <Search className="w-4 h-4 mr-2" />
                Find Customer
              </Button>
            </div>
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Customer Management</CardTitle>
                <CardDescription className="text-gray-600">Manage your customer database and information</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-gray-600">Customer management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      case 'properties':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
              <Button variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-gray-900">Property Management</CardTitle>
                <CardDescription className="text-gray-600">Track properties and their CEP-5 requirements</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-gray-600">Property management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
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
                  <h1 className="text-lg font-bold text-gray-800">Formifil</h1>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave? You can save your work as a draft or delete the form.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancelDialog}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteForm}
              className="w-full sm:w-auto"
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
    </div>
  )
}

export default DashboardPage
