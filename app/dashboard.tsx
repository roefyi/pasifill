"use client"

import React, { useState, useEffect } from 'react'
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
  Printer,
  X,
  Info
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [formSource, setFormSource] = useState('dashboard')
  const [scheduleSource, setScheduleSource] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showSearchPopup, setShowSearchPopup] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [showNavigationConfirmDialog, setShowNavigationConfirmDialog] = useState(false)
    const [pendingTabChange, setPendingTabChange] = useState<string | null>(null)
  
  // Notifications System State
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'CEP-5 Form Approved',
      message: 'Your CEP-5 form for Williams Property has been approved by Jefferson County.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      action: 'view_form'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Upcoming Deadline',
      message: 'Installation completion report due for Smith Property in 3 days.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
      action: 'view_schedule'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Customer Added',
      message: 'Johnson Family has been added to your customer database.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      action: 'view_customer'
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $2,450 received for Davis Property installation.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      action: 'view_payment'
    },
    {
      id: 5,
      type: 'warning',
      title: 'License Renewal Reminder',
      message: 'Your septic contractor license expires in 30 days.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: false,
      action: 'view_profile'
    }
  ])
    
    // Layout System State
  const [layoutElements, setLayoutElements] = useState<Array<{
    id: string
    type: 'house' | 'septic-tank' | 'distribution-lines' | 'drip-field' | 'well' | 'other'
    label: string
    x: number
    y: number
    width: number
    height: number
  }>>([
    {
      id: 'house-1',
      type: 'house',
      label: 'House',
      x: 100,
      y: 20,
      width: 112,
      height: 112
    }
  ])
  const [selectedElement, setSelectedElement] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showAddElementDialog, setShowAddElementDialog] = useState(false)
  const [showLayoutHelp, setShowLayoutHelp] = useState(false)
  const [showElementEditDialog, setShowElementEditDialog] = useState(false)
  const [editingElement, setEditingElement] = useState<any>(null)

  const handleNewForm = () => {
    setFormSource(activeTab)
    setShowNewForm(true)
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

  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges && (showNewForm || showAddCustomer)) {
      setPendingTabChange(newTab)
      setShowNavigationConfirmDialog(true)
    } else {
      setActiveTab(newTab)
    }
  }

  const handleConfirmTabChange = () => {
    if (pendingTabChange) {
      setActiveTab(pendingTabChange)
      setShowNewForm(false)
      setShowAddCustomer(false)
      setHasUnsavedChanges(false)
      setPendingTabChange(null)
      setShowNavigationConfirmDialog(false)
    }
  }

  const handleCancelTabChange = () => {
    setPendingTabChange(null)
    setShowNavigationConfirmDialog(false)
  }

  // Browser beforeunload event handler
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && (showNewForm || showAddCustomer)) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return 'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges, showNewForm, showAddCustomer])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearchPopup(true)
      }
      if (e.key === 'Escape' && showSearchPopup) {
        setShowSearchPopup(false)
        setSearchQuery("")
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSearchPopup])

  // Layout System Functions
  const handleElementClick = (element: any) => {
    setSelectedElement(element)
    setEditingElement(element)
    setShowElementEditDialog(true)
  }

  const handleDragStart = (e: React.MouseEvent, element: any) => {
    if (e.button !== 0) return // Only left mouse button
    setIsDragging(true)
    setSelectedElement(element)
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return
    
    const container = e.currentTarget.getBoundingClientRect()
    const newX = e.clientX - container.left - dragOffset.x
    const newY = e.clientY - container.top - dragOffset.y
    
    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(newX, container.width - selectedElement.width))
    const constrainedY = Math.max(0, Math.min(newY, container.height - selectedElement.height))
    
    setLayoutElements(prev => prev.map(el => 
      el.id === selectedElement.id 
        ? { ...el, x: constrainedX, y: constrainedY } : el
    ))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setSelectedElement(null)
  }

  const handleAddElement = (type: 'house' | 'septic-tank' | 'distribution-lines' | 'drip-field' | 'well' | 'other', label: string, width: number, height: number) => {
    // Find a good position for the new element
    const containerWidth = 800 // Approximate container width
    const containerHeight = 320 // Container height (h-80 = 320px)
    
    // Position elements in the middle-top area, avoiding instructions and legend
    const x = Math.max(200, Math.min(containerWidth - width - 20, 300))
    const y = Math.max(60, Math.min(containerHeight - height - 80, 120))
    
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      label,
      x,
      y,
      width,
      height
    }
    setLayoutElements(prev => [...prev, newElement])
    setShowAddElementDialog(false)
  }

  const handleDeleteElement = (elementId: string) => {
    setLayoutElements(prev => prev.filter(el => el.id !== elementId))
    if (selectedElement?.id === elementId) {
      setSelectedElement(null)
    }
  }

  const handleUpdateElement = (elementId: string, updates: any) => {
    setLayoutElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ))
    setShowElementEditDialog(false)
    setEditingElement(null)
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
    setShowSearchPopup(true)
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the actual search logic
    console.log("Searching for:", searchQuery)
    // For now, just close the popup
    setShowSearchPopup(false)
    setSearchQuery("")
  }

  const handleSearchClose = () => {
    setShowSearchPopup(false)
    setSearchQuery("")
  }

  // Notifications Handlers
  const handleNotificationsToggle = () => {
    setShowNotificationsPanel(!showNotificationsPanel)
  }

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    )
    
    // Handle action
    switch (notification.action) {
      case 'view_form':
        setActiveTab('cep5')
        break
      case 'view_schedule':
        setActiveTab('schedule')
        break
      case 'view_customer':
        setActiveTab('customers')
        break
      case 'view_profile':
        setActiveTab('profile')
        break
      default:
        break
    }
    
    // Close panel
    setShowNotificationsPanel(false)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

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
    if (showNewForm) {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-6">
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
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">New CEP-5 Form</h2>
                <p className="text-gray-600">Alabama Installer's Onsite Sewage Disposal System Certification</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleSaveDraft}
                  variant="slate"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  size="sm"
                  className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Form
                </Button>
              </div>
            </div>
          </div>
          
          {/* Form Sections */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">LHD permit and owner details</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">LHD Permit #</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Enter permit number"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Date Received</label>
                      <DatePicker
                        placeholder="Select date received"
                        className="w-full"
                        onDateChange={() => handleFormInputChange()}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Owner/Applicant's Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Full name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Property (911) Address</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Street address"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-3">City, State, Zip</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="City, State, Zip"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3">Subdivision Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Subdivision name"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-3">Lot</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Lot #"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Block</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Block #"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Installation Information</CardTitle>
                <CardDescription className="text-gray-600">System installation details and specifications</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Installation Date</label>
                      <DatePicker
                        placeholder="Select installation date"
                        className="w-full"
                        onDateChange={() => handleFormInputChange()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Installation Type</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select installation type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="new" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            New
                          </SelectItem>
                          <SelectItem value="repair" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Repair
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Septic Tank Size (Gallons)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="e.g., 1000, 1500"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Manufacturer's #</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Manufacturer serial number"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Septic Tank Filter (NSF 46)</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select filter status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="yes" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Yes
                          </SelectItem>
                          <SelectItem value="no" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            No/Not Required
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Advanced Treatment Unit (if applicable)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Make</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            placeholder="Manufacturer"
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Model</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            placeholder="Model number"
                            onChange={handleFormInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Type of Distribution System</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select distribution system type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="level-header" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Level Header
                          </SelectItem>
                          <SelectItem value="serial-distribution" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Serial Distribution
                          </SelectItem>
                          <SelectItem value="distribution-box" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Distribution Box
                          </SelectItem>
                          <SelectItem value="other" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Type */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">System Type</CardTitle>
                <CardDescription className="text-gray-600">Treatment and disposal system specifications</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">System Type</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select system type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="gravel" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Gravel
                          </SelectItem>
                          <SelectItem value="equivalent-product" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Equivalent Product
                          </SelectItem>
                          <SelectItem value="control-fill" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Control Fill
                          </SelectItem>
                          <SelectItem value="lpp" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            LPP
                          </SelectItem>
                          <SelectItem value="drip" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Drip
                          </SelectItem>
                          <SelectItem value="bed" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Bed
                          </SelectItem>
                          <SelectItem value="combined-treatment-disposal" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Combined Treatment/Disposal
                          </SelectItem>
                          <SelectItem value="pad" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Pad
                          </SelectItem>
                          <SelectItem value="eds" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            EDS
                          </SelectItem>
                          <SelectItem value="other" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Product Manufacturer(s)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Manufacturer name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Model/Configuration</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Model number or configuration"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Effluent Distribution Field */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Effluent Distribution Field</CardTitle>
                <CardDescription className="text-gray-600">Distribution field specifications and measurements</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">EDF Depth/Height (Inches)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Depth in inches"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Below/Above NGS</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select NGS position" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="below-ngs" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Below NGS
                          </SelectItem>
                          <SelectItem value="above-ngs" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-500 focus:text-sky-700">
                            Above NGS
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Fill (if applicable) - Inches</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Fill depth in inches"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">EDF Size</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select size type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="linear-feet" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Linear Feet
                          </SelectItem>
                          <SelectItem value="square-feet" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Square Feet
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent mt-2"
                        placeholder="Size value"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Trench Width (if applicable) - Inches</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Trench width in inches"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Separate Washer Line (if installed)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Width</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            placeholder="Width in inches"
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Length (Linear Feet)</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            placeholder="Length in feet"
                            onChange={handleFormInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installer Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Installer Information</CardTitle>
                <CardDescription className="text-gray-600">Contractor and business details</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Installer Name / Company</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Company or installer name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Business Address</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Street address"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Telephone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Phone number"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3">City</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="City"
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3">State</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="State"
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3">Zip</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Zip code"
                          onChange={handleFormInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Layout */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">System Layout</CardTitle>
                <CardDescription className="text-gray-600">Sketch the layout of the system showing tanks and lines in proximity to the house and road</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 mb-4">
                      This record of the installation of an onsite sewage disposal system is submitted by:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-3">Installer Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Installer name"
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3">Date</label>
                        <DatePicker
                          placeholder="Select date"
                          className="w-full"
                          onDateChange={() => handleFormInputChange()}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3">License #</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="License number"
                          onChange={handleFormInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Layout Diagram */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium mb-3">System Layout Sketch</label>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          className="h-8 px-3 bg-sky-500 hover:bg-sky-600 text-white text-xs"
                          onClick={() => setShowAddElementDialog(true)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Element
                        </Button>
                        <Button 
                          size="sm"
                          className="h-8 px-3 bg-gray-500 hover:bg-gray-600 text-white text-xs"
                          onClick={() => setShowLayoutHelp(true)}
                        >
                          Help
                        </Button>
                      </div>
                    </div>
                    <div 
                      className="relative w-full h-80 bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      {/* Street */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900">
                        {/* Road Surface Texture */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 opacity-60"></div>
                        
                        {/* Road Name Input - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <input 
                            type="text" 
                            className="w-48 px-3 py-1.5 text-sm bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 shadow-lg"
                            placeholder="Road Name"
                            onChange={handleFormInputChange}
                          />
                        </div>
                        
                        {/* Shoulder Lines */}
                        <div className="absolute top-1 left-0 right-0 h-0.5 bg-white opacity-40"></div>
                        <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white opacity-40"></div>
                      </div>
                      

                      
                      {/* Interactive System Elements */}
                      {layoutElements.map((element, index) => (
                        <div
                          key={element.id}
                          className={`absolute cursor-move select-none z-10 ${
                            selectedElement?.id === element.id ? 'ring-2 ring-sky-500 ring-offset-2' : ''
                          }`}
                          style={{
                            top: element.y,
                            left: element.x,
                            width: element.width,
                            height: element.height,
                          }}
                          onClick={() => handleElementClick(element)}
                          onMouseDown={(e) => handleDragStart(e, element)}
                        >
                          <div 
                            className={`w-full h-full rounded border-2 transition-all duration-200 ${
                              element.type === 'house' ? 'bg-gray-300 border-gray-500 hover:bg-gray-400' :
                              element.type === 'septic-tank' ? 'bg-blue-200 border-blue-400 hover:bg-blue-300' :
                              element.type === 'distribution-lines' ? 'bg-green-400 border-green-600 hover:bg-green-500' :
                              element.type === 'drip-field' ? 'bg-orange-200 border-orange-400 hover:bg-orange-300' :
                              element.type === 'well' ? 'bg-purple-200 border-purple-400 hover:bg-purple-300' :
                              'bg-gray-200 border-gray-400 hover:bg-gray-300'
                            }`}
                          >
                            {element.type !== 'house' && (
                              <div className="text-xs text-center font-medium pt-1 px-1">
                                {element.label}
                              </div>
                            )}
                          </div>
                          
                          {/* Delete button */}
                          <button
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteElement(element.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      {/* Instructions - Top Left */}
                      <div className="absolute top-2 left-2 bg-white border border-gray-300 rounded p-2 text-xs max-w-48 z-20">
                        <div className="font-medium mb-1 text-gray-900">Quick Instructions:</div>
                        <div className="space-y-1 text-gray-600">
                          <div>• House and system elements are editable</div>
                          <div>• Click "Add Element" to add components</div>
                          <div>• Drag elements to reposition</div>
                          <div>• Click elements to edit</div>
                          <div>• Red × to delete</div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute top-2 right-2 bg-white border border-gray-300 rounded p-2 text-xs z-20">
                        <div className="font-medium mb-1">Legend:</div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-300 border border-gray-500"></div>
                            <span>House</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-200 border border-blue-400"></div>
                            <span>Septic Tank</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 border border-green-600"></div>
                            <span>Distribution Lines</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-200 border border-orange-400"></div>
                            <span>Drip Field</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-200 border border-purple-400"></div>
                            <span>Well</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-center">
                      {layoutElements.length > 0 ? `${layoutElements.length} system elements added` : 'No system elements added yet'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certification and Signature */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Certification and Signature</CardTitle>
                <CardDescription className="text-gray-600">Contractor certification and compliance statement</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      I hereby certify that the onsite sewage treatment and disposal system has been installed and completed in accordance with the construction plan or plot plan, the permit issued by the Local Health Department on <span className="font-medium text-gray-900">[Date]</span>, and that the installation of the OSS complies with Chapter 420-3-1 of the Rules of the Board and any applicable construction standards from a product manual. I further certify that I am licensed and in good standing with the applicable licensing board and in full compliance with the Code of Alabama 1975§ 34-21A, et seq.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Date</label>
                      <DatePicker
                        placeholder="Select certification date"
                        className="w-full"
                        onDateChange={() => handleFormInputChange()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">License Number</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Contractor license number"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Signature</label>
                      <div className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        <span className="text-sm text-gray-500">Click to sign</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    } else if (activeTab === 'dashboard') {
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
                  size="sm"
                  className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New CEP-5 Form
                </Button>
                <Button 
                  variant="slate"
                  size="sm"
                >
                  <Users className="w-4 h-4 mr-2" />
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
                    <div className="text-xl font-bold text-gray-900">{mockData.stats.monthlyForms}</div>
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
                    <div className="text-xl font-bold text-gray-900">{mockData.stats.totalCustomers}</div>
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
                    <div className="text-xl font-bold text-gray-900">{mockData.stats.complianceRate}%</div>
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
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
                onClick={() => {
                  setScheduleSource('dashboard')
                  handleTabChange('schedule')
                }}
              >
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
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">{job.customer}</span>
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
              <Button variant="slate" size="sm">
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
                        <div className="text-sm font-medium text-gray-900">{form.customer}</div>
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
              <Button variant="slate" size="sm">
                View All
              </Button>
            </div>
            
            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Saved</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockData.recentForms.map((form) => (
                        <tr key={form.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.property}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.county}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={`${getStatusColor(form.status)}`}>
                              {form.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.timeSaved} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )
    } else if (showAddCustomer) {
      return (
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-6">
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
              <div className="flex items-center space-x-4">
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
                  variant="slate"
                  size="sm"
                >
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
          <div className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">Customer business details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Business Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="Enter business name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Contact Person</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="Full name"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="(205) 555-0000"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
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
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Address Information</CardTitle>
                <CardDescription className="text-gray-600">Business location and service area</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Business Address</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Street address"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">City</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="City"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">State</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="State"
                        defaultValue="AL"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">ZIP Code</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="ZIP code"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3">Primary Service County</label>
                    <Select onValueChange={handleFormInputChange}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        <SelectItem value="Jefferson" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                          Jefferson County
                        </SelectItem>
                        <SelectItem value="Shelby" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                          Shelby County
                        </SelectItem>
                        <SelectItem value="Tuscaloosa" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                          Tuscaloosa County
                        </SelectItem>
                        <SelectItem value="Madison" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                          Madison County
                        </SelectItem>
                        <SelectItem value="Baldwin" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                          Baldwin County
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Business Information</CardTitle>
                <CardDescription className="text-gray-600">Business type, services, and additional details</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Business Type</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="contractor" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Contractor
                          </SelectItem>
                          <SelectItem value="installer" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Installer
                          </SelectItem>
                          <SelectItem value="maintenance" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="consultant" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Consultant
                          </SelectItem>
                          <SelectItem value="other" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">License Number</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="Enter license number"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Years in Business</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="Number of years"
                        min="0"
                        onChange={handleFormInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Website</label>
                      <input 
                        type="url" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        placeholder="https://example.com"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="block text-sm font-medium mb-3">Services Offered</label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                    rows={3}
                    placeholder="Describe the services your business offers..."
                    onChange={handleFormInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Business Details</CardTitle>
                <CardDescription className="text-gray-600">Additional business information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Customer Status</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="active" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Active
                          </SelectItem>
                          <SelectItem value="inactive" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Inactive
                          </SelectItem>
                          <SelectItem value="prospect" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Prospect
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Notes</label>
                      <textarea 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                        rows={3}
                        placeholder="Additional notes about this customer..."
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Preferred Contact Method</label>
                      <Select onValueChange={handleFormInputChange}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          <SelectItem value="email" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Email
                          </SelectItem>
                          <SelectItem value="phone" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Phone
                          </SelectItem>
                          <SelectItem value="text" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                            Text Message
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
          <h2 className="text-lg font-semibold mb-2">
            Welcome back, {mockData.contractor.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-600">
            Complete your Alabama CEP-5 forms faster than ever. You've saved {mockData.stats.timeSaved} hours this month.
          </p>
        </div>
                                  <div className="flex items-center space-x-3 ml-6">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSearchToggle}
              className="h-9 px-4 border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
              <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">⌘K</span>
            </Button>
            <Button 
              onClick={handleNewForm}
                      size="sm"
                      className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
            >
                      <Plus className="w-4 h-4 mr-2" />
                      New CEP-5 Form
            </Button>
            <Button 
              onClick={handleAddCustomer}
              variant="slate"
              size="sm"
            >
              <Users className="w-4 h-4 mr-2" />
              New Customer
            </Button>
                  </div>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
                  onClick={() => {
                    setScheduleSource('dashboard')
                    handleTabChange('schedule')
                  }}
                >
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
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{job.customer}</span>
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
                <h3 className="text-lg font-semibold">Pending CEP-5 Forms</h3>
                <Button variant="outline" size="sm" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
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
                          <div className="text-sm font-medium text-gray-900">{form.customer}</div>
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
                            <h3 className="text-lg font-semibold">Recent CEP-5 Forms</h3>
                                  <Button variant="outline" size="sm" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
              View All
            </Button>
          </div>
          
              <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Form ID
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Property
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        County
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
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
                    <Button size="sm" variant="outline" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                  Download Mobile App
                </Button>
                    <Button size="sm" variant="outline" className="h-9 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
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


            {/* Search and Filter Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Showing {mockData.cep5Forms.length} forms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSearchToggle}
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative group"
                >
                  <Search className="h-4 w-4" />
                  {/* Keyboard shortcut indicator */}
                  <div className="absolute -bottom-1 -right-1 bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌘K
                  </div>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleNewForm}
                  size="sm"
                  className="h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New CEP-5 Form
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            {showSearch && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search forms by customer, property, or ID..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Form ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          County
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockData.cep5Forms.map((form) => (
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
                          <td className="px-6 py-4 pr-2 whitespace-nowrap text-sm text-gray-600">
                            {form.county}
                          </td>
                          <td className="px-6 py-4 pl-2 whitespace-nowrap text-sm text-gray-600">
                            {form.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(form.status)} border`}
                            >
                              <span className="flex items-center space-x-1">
                                {getStatusIcon(form.status)}
                                <span className="capitalize">{form.status.replace('_', ' ')}</span>
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
        )
      case 'customers':
        return (
          <div className="space-y-6">


            {/* Search and Filter Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Showing {mockData.customers.length} customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSearchToggle}
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleAddCustomer}
                  variant="slate"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Customer
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            {showSearch && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers by name, contact, or email..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                {/* Column Headers */}
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center space-x-8">
                                                              <div className="min-w-[180px] text-sm font-medium uppercase tracking-wider text-left text-gray-700">Customer Name</div>
                     <div className="min-w-[140px] text-sm font-medium uppercase tracking-wider text-left text-gray-700">Contact</div>
                     <div className="min-w-[80px] text-sm font-medium uppercase tracking-wider text-center text-gray-700">Property</div>
                     <div className="min-w-[80px] text-sm font-medium uppercase tracking-wider text-center text-gray-700">Forms</div>
                     <div className="min-w-[100px] text-sm font-medium uppercase tracking-wider text-center text-gray-700">County</div>
                     <div className="min-w-[120px] text-sm font-medium uppercase tracking-wider text-center text-gray-700">Status</div>
                     <div className="min-w-[80px] text-sm font-medium uppercase tracking-wider text-center text-gray-700">Actions</div>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {mockData.customers.map((customer) => (
                    <AccordionItem key={customer.id} value={customer.id} className="border-b border-gray-200">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center w-full">
                          {/* Customer Info Section - Column Layout */}
                          <div className="flex items-center space-x-8">
                            {/* Customer Name and ID */}
                            <div className="min-w-[180px] text-left">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                              <div className="text-sm text-gray-600">{customer.id}</div>
                            </div>
                            
                            {/* Contact Person */}
                            <div className="min-w-[140px] text-left">
                              <div className="text-sm font-medium text-gray-900">{customer.contact}</div>
                            </div>
                            
                            {/* Property Count */}
                            <div className="min-w-[80px] text-center">
                              <div className="text-sm font-medium text-gray-900">{customer.properties}</div>
                            </div>
                            
                            {/* Forms Count */}
                            <div className="min-w-[80px] text-center">
                              <div className="text-sm font-medium text-gray-900">{customer.forms}</div>
                            </div>
                            
                            {/* County */}
                            <div className="min-w-[100px] text-center">
                              <div className="text-sm font-medium text-gray-900">{customer.county}</div>
                            </div>
                            
                            {/* Status */}
                            <div className="min-w-[120px] text-center">
                              <Badge 
                                variant="outline" 
                                className={`${getCustomerStatusColor(customer.status)} border text-xs`}
                              >
                                <span className="flex items-center space-x-1">
                                  {getCustomerStatusIcon(customer.status)}
                                  <span className="capitalize">{customer.status}</span>
                                </span>
                              </Badge>
                            </div>
                            
                            {/* Actions */}
                            <div className="min-w-[80px] text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {/* Contact Information */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-500" />
                              Contact Information
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Email:</span>
                                <span className="text-gray-900 truncate ml-2 max-w-[200px]">{customer.email}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Phone:</span>
                                <span className="text-gray-900">{customer.phone}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Contact:</span>
                                <span className="text-gray-900">{customer.contact}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Business Details */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                              <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                              Business Details
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">County:</span>
                                <span className="text-gray-900">{customer.county}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Properties:</span>
                                <span className="text-gray-900 font-medium">{customer.properties}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Total Forms:</span>
                                <span className="text-gray-900 font-medium">{customer.forms}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Activity & Status */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              Activity & Status
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Last Contact:</span>
                                <span className="text-gray-900">{customer.lastContact}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Status:</span>
                                <Badge 
                                  variant="outline" 
                                  className={`${getCustomerStatusColor(customer.status)} border`}
                                >
                                  <span className="flex items-center space-x-1">
                                    {getCustomerStatusIcon(customer.status)}
                                    <span className="capitalize">{customer.status}</span>
                                  </span>
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )
      case 'properties':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-end mb-6">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSearchToggle}
                  className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative group"
                >
                  <Search className="h-4 w-4" />
                  {/* Keyboard shortcut indicator */}
                  <div className="absolute -bottom-1 -right-1 bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌘K
                  </div>
                </Button>
                <Button variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </div>
            </div>
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Property Management</CardTitle>
                <CardDescription className="text-gray-600">Track properties and their CEP-5 requirements</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-gray-600">Property management interface coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
    }
    
    switch (activeTab) {
      case 'schedule':
        return (
          <div className="space-y-6">
            {/* Header - Only show breadcrumb if coming from dashboard */}
            <div className="flex items-center justify-between mb-6">
              {scheduleSource === 'dashboard' ? (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => handleTabChange('dashboard')}>
                        <Home className="w-4 h-4 mr-1" />
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Schedule</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                  <p className="text-gray-600 mt-2">Job scheduling and deadlines</p>
                </div>
              )}
              <Button 
                variant="outline"
                size="sm"
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </Button>
            </div>

            {/* Today's Schedule */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {mockData.todayJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{job.time}</div>
                          <div className="text-sm text-gray-600">{job.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{job.customer}</div>
                        <div className="text-sm text-gray-600">{job.address}</div>
                        <div className="text-xs text-gray-500">{job.county} County</div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {job.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {mockData.upcomingDeadlines.map((deadline) => (
                    <div key={deadline.type} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{deadline.type}</div>
                          <div className="text-sm text-gray-600">Due: {deadline.date}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        {deadline.daysLeft} days left
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-end mb-6">
              <Button 
                variant="outline"
                size="sm"
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Company Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <div className="text-sm text-gray-900">{mockData.contractor.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <div className="text-sm text-gray-900">{mockData.contractor.license}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Counties</label>
                      <div className="flex flex-wrap gap-2">
                        {mockData.contractor.counties.map((county) => (
                          <Badge key={county} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {county} County
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                      <div className="text-sm text-gray-900">123 Business Street</div>
                      <div className="text-sm text-gray-900">Birmingham, AL 35201</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="text-sm text-gray-900">(205) 555-0100</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="text-sm text-gray-900">contact@alabamaseptic.com</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Licensing */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Compliance & Licensing</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Status</label>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Expiration</label>
                      <div className="text-sm text-gray-900">December 31, 2025</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Status</label>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Current
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ADPH Registration</label>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Inspection</label>
                      <div className="text-sm text-gray-900">November 15, 2024</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Renewal Due</label>
                      <div className="text-sm text-gray-900">November 15, 2025</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Statistics */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="px-8 pt-8 pb-6">
                <CardTitle className="text-gray-900">Business Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.totalCustomers}</div>
                    <div className="text-sm text-gray-600">Total Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.formsCompleted}</div>
                    <div className="text-sm text-gray-600">Forms Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.complianceRate}%</div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                  </div>
                </div>
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
        <div className={`border-b border-gray-200 ${
          isSidebarCollapsed ? 'p-3' : 'p-6'
        }`}>
          {!isSidebarCollapsed && (
            <>
              {/* App Branding */}
              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </div>
                  <h1 className="text-lg font-semibold text-gray-800">Formifil</h1>
                </div>
              </div>
              
              {/* Search Bar with Collapse Button */}
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 cursor-pointer"
                    onClick={handleSearchToggle}
                    readOnly
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    ⌘K
                  </div>
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
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm"></div>
              </div>
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchToggle}
                className="h-10 w-10 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                title="Search (⌘K)"
              >
                <Search className="h-5 w-5" />
              </Button>
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
        <div className={`flex-1 space-y-8 ${
          isSidebarCollapsed ? 'p-3' : 'p-6'
        }`}>
          {/* Navigation Items */}
          <div className={`space-y-2 ${
            isSidebarCollapsed ? 'space-y-3' : 'space-y-2'
          }`}>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`flex items-center transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${
                isSidebarCollapsed 
                  ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                  : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
              }`}
              title={isSidebarCollapsed ? 'Dashboard' : undefined}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Dashboard</span>}
            </button>
            <button
              onClick={() => handleTabChange('cep5')}
              className={`flex items-center transition-colors ${
                activeTab === 'cep5'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${
                isSidebarCollapsed 
                  ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                  : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
              }`}
              title={isSidebarCollapsed ? 'CEP-5' : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">CEP-5</span>}
            </button>
            <button
              onClick={() => handleTabChange('customers')}
              className={`flex items-center transition-colors ${
                activeTab === 'customers'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${
                isSidebarCollapsed 
                  ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                  : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
              }`}
              title={isSidebarCollapsed ? 'Customers' : undefined}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Customers</span>}
            </button>
            <button
              onClick={() => handleTabChange('properties')}
              className={`flex items-center transition-colors ${
                activeTab === 'properties'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${
                isSidebarCollapsed 
                  ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                  : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
              }`}
              title={isSidebarCollapsed ? 'Properties' : undefined}
            >
              <Building2 className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Properties</span>}
            </button>
            <button
              onClick={() => handleTabChange('schedule')}
              className={`flex items-center transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${
                isSidebarCollapsed 
                  ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                  : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
              }`}
              title={isSidebarCollapsed ? 'Schedule' : undefined}
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Schedule</span>}
            </button>
          </div>
        </div>

        {/* Bottom Section - User Settings */}
        <div className={`border-t border-gray-200 space-y-3 ${
          isSidebarCollapsed ? 'p-3' : 'p-6'
        }`}>
          <button 
            onClick={() => handleTabChange('profile')}
            className={`flex items-center text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
              activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : ''
            } ${
              isSidebarCollapsed 
                ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
            }`} 
            title={isSidebarCollapsed ? 'Profile' : undefined}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Profile</span>}
          </button>
          <button 
            onClick={handleNotificationsToggle}
            className={`flex items-center text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors relative ${
              isSidebarCollapsed 
                ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
                : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
            }`} 
            title={isSidebarCollapsed ? 'Notifications' : undefined}
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Notifications</span>}
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </button>
          <button className={`flex items-center text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed 
              ? 'w-10 h-10 justify-center rounded-lg mx-auto' 
              : 'w-full space-x-4 px-4 py-3 rounded-lg text-left'
          }`} title={isSidebarCollapsed ? 'Settings' : undefined}>
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
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
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
                   activeTab === 'properties' ? 'Properties' :
                   activeTab === 'schedule' ? 'Schedule' :
                   activeTab === 'profile' ? 'Profile' :
                   'Properties'}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {activeTab === 'dashboard' ? 'Overview and quick actions' : 
                   activeTab === 'cep5' ? 'Manage CEP-5 forms and compliance' :
                   activeTab === 'customers' ? 'Customer database and relationships' :
                   activeTab === 'properties' ? 'Property tracking and requirements' :
                   activeTab === 'schedule' ? 'Job scheduling and deadlines' :
                   activeTab === 'profile' ? 'Company information and compliance' :
                   'Property tracking and requirements'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Jefferson County</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-8 py-8 overflow-y-auto">
          {renderContent()}
      </main>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Unsaved Changes</DialogTitle>
            <DialogDescription className="text-gray-600">
              You have unsaved changes. What would you like to do with your current work?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-3 px-6 pb-6">
            <Button
              variant="outline"
              onClick={handleCancelDialog}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
            >
              Continue Editing
            </Button>
            <Button
              onClick={handleSaveDraft}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white"
            >
              Save
            </Button>
            <Button
              onClick={handleDeleteForm}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Leave Confirmation Dialog */}
      <Dialog open={showLeaveConfirmDialog} onOpenChange={setShowLeaveConfirmDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Unsaved Changes</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              You have unsaved changes. What would you like to do with your current work?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-3 px-6 pb-6">
            <Button
              variant="outline"
              onClick={handleCancelLeave}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
            >
              Continue Editing
            </Button>
            <Button
              onClick={handleSaveDraft}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white"
            >
              Save
            </Button>
            <Button
              onClick={handleConfirmLeave}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation Confirmation Dialog */}
      <Dialog open={showNavigationConfirmDialog} onOpenChange={setShowNavigationConfirmDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Unsaved Changes</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              You have unsaved changes in your current form. Are you sure you want to navigate away? All unsaved work will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-3 px-6 pb-6">
            <Button
              variant="outline"
              onClick={handleCancelTabChange}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmTabChange}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Navigate Away
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Element Dialog */}
      <Dialog open={showAddElementDialog} onOpenChange={setShowAddElementDialog}>
        <DialogContent className="w-96 bg-white border-gray-200 shadow-xl">
          <DialogHeader className="px-8 pt-8 pb-6">
            <DialogTitle className="text-gray-900">Add System Element</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Add a new system component to your layout
            </DialogDescription>
          </DialogHeader>
          <div className="px-8 pb-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">Element Type</label>
              <Select onValueChange={(value) => {
                const type = value as 'house' | 'septic-tank' | 'distribution-lines' | 'drip-field' | 'well' | 'other'
                const label = type === 'house' ? 'House' : 
                             type === 'septic-tank' ? 'Septic Tank' : 
                             type === 'distribution-lines' ? 'Distribution Lines' : 
                             type === 'drip-field' ? 'Drip Field' : 
                             type === 'well' ? 'Well' : 'Other'
                const width = type === 'house' ? 112 : type === 'distribution-lines' ? 128 : type === 'drip-field' ? 160 : 64
                const height = type === 'house' ? 112 : type === 'distribution-lines' ? 8 : type === 'drip-field' ? 32 : 48
                handleAddElement(type, label, width, height)
              }}>
                <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select element type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg">
                  <SelectItem value="house" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                    House
                  </SelectItem>
                  <SelectItem value="septic-tank" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                    Septic Tank
                  </SelectItem>
                  <SelectItem value="distribution-lines" className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:text-sky-700">
                    Distribution Lines
                  </SelectItem>
                  <SelectItem value="drip-field" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                    Drip Field
                  </SelectItem>
                  <SelectItem value="well" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                    Well
                  </SelectItem>
                  <SelectItem value="other" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-3">
              <p className="text-sm text-gray-500">
                Select an element type above to add it to your layout
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Layout Help Dialog */}
      <Dialog open={showLayoutHelp} onOpenChange={setShowLayoutHelp}>
        <DialogContent className="sm:max-w-2xl bg-white border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Layout System Help</DialogTitle>
            <DialogDescription className="text-gray-600">
              Learn how to use the interactive layout system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Adding Elements</h4>
              <p className="text-sm text-gray-600">
                Click "Add Element" to add system components like septic tanks, distribution lines, and drip fields to your layout.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Moving Elements</h4>
              <p className="text-sm text-gray-600">
                Click and drag any element to reposition it on the layout. Elements will automatically snap to stay within the layout area.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Editing Elements</h4>
              <p className="text-sm text-gray-600">
                Click on any element to edit its properties like label, size, and position.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Deleting Elements</h4>
              <p className="text-sm text-gray-600">
                Use the red × button on any element to remove it from the layout.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLayoutHelp(false)} className="bg-sky-500 hover:bg-sky-600 text-white">
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

            {/* Element Edit Dialog */}
      <Dialog open={showElementEditDialog} onOpenChange={setShowElementEditDialog}>
        <DialogContent className="w-96 bg-white border-gray-200 shadow-xl">
          <DialogHeader className="px-8 pt-8 pb-6">
            <DialogTitle className="text-gray-900">Edit Element</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Modify the properties of this system element
            </DialogDescription>
          </DialogHeader>
          {editingElement && (
            <div className="px-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Label</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  value={editingElement.label}
                  onChange={(e) => setEditingElement({...editingElement, label: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Width</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                    value={editingElement.width}
                    onChange={(e) => setEditingElement({...editingElement, width: parseInt(e.target.value) || 64})}
                />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">Height</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                    value={editingElement.height}
                    onChange={(e) => setEditingElement({...editingElement, height: parseInt(e.target.value) || 48})}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="h-3"></div>
          <DialogFooter className="px-8 pb-8">
            <Button 
              variant="slate"
              onClick={() => setShowElementEditDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleUpdateElement(editingElement.id, editingElement)}
              className="bg-sky-500 hover:bg-sky-600 text-white"
            >
              Update Element
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notifications Panel */}
      {showNotificationsPanel && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="flex-1 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowNotificationsPanel(false)}
          />
          
          {/* Notifications Panel */}
          <div className="w-96 bg-white shadow-2xl flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotificationsPanel(false)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === 'success' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {notification.type === 'warning' && (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                          {notification.type === 'info' && (
                            <Info className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-xs text-gray-400">
                                {notification.timestamp.toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setActiveTab('notifications')
                  setShowNotificationsPanel(false)
                }}
              >
                View All Notifications
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Search className="h-6 w-6 text-sky-500" />
                <h2 className="text-xl font-semibold text-gray-900">Search</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchClose}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="p-6 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchQueryChange(e.target.value)}
                  placeholder="Search all pages, forms, customers, properties..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Recent Activities */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {mockData.recentForms.slice(0, 5).map((form) => (
                    <div
                      key={form.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setActiveTab('cep5')
                        setShowSearchPopup(false)
                        setSearchQuery("")
                      }}
                    >
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{form.customer}</div>
                        <div className="text-xs text-gray-500">{form.property}</div>
                      </div>
                      <Badge className={`${getStatusColor(form.status)}`}>
                        {form.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>



              {/* Search Results Placeholder */}
              {searchQuery && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Searching for "{searchQuery}"...</p>
                    <p className="text-sm text-gray-400 mt-2">Results will appear here</p>
                  </div>
                </div>
              )}

              {/* No Search Query State */}
              {!searchQuery && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {['CEP-5', 'Jefferson County', 'Williams Property', 'Septic Tank', 'Installation'].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearchQueryChange(term)}
                        className="text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-50 px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
