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
  User
} from "lucide-react"

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
    forecast: "Sunny, 75°F"
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

  const handleNewForm = () => {
    // Navigate to new CEP-5 form
    console.log("Create new CEP-5 form")
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
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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
                <Button 
                  onClick={handleNewForm}
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 ml-6"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New CEP-5 Form
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
                    <CardTitle className="text-sm font-medium text-gray-700">CEP-5 Forms</CardTitle>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.monthlyForms}</div>
                    <p className="text-xs text-gray-500">
                      +{mockData.stats.monthlyForms - 20} from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
                    <CardTitle className="text-sm font-medium text-gray-700">Time Saved</CardTitle>
                    <Clock className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.timeSaved}h</div>
                    <p className="text-xs text-gray-500">
                      {Math.round((parseFloat(mockData.stats.timeSaved) / 40) * 100)}% of workday
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
                    <CardTitle className="text-sm font-medium text-gray-700">Customers</CardTitle>
                    <Users className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.totalCustomers}</div>
                    <p className="text-xs text-gray-500">
                      Across {mockData.contractor.counties.length} counties
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
                    <CardTitle className="text-sm font-medium text-gray-700">Compliance Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="text-2xl font-bold text-gray-900">{mockData.stats.complianceRate}%</div>
                    <p className="text-xs text-gray-500">
                      ADPH acceptance rate
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Alabama-Specific Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Weather & Field Conditions */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="px-6 pt-6 pb-4">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <CloudRain className="w-5 h-5 text-blue-600" />
                    <span>Alabama Field Conditions</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Current weather for optimal field work planning
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{mockData.weather.current}</div>
                      <div className="text-sm text-gray-600">{mockData.weather.condition}</div>
                      <div className="text-xs text-gray-500 mt-1">Forecast: {mockData.weather.forecast}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Ideal for:</div>
                      <div className="text-xs text-gray-600">Soil evaluation</div>
                      <div className="text-xs text-gray-600">Groundwater testing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="px-6 pt-6 pb-4">
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Alabama county permit and reporting deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3">
                    {mockData.upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{deadline.type}</div>
                          <div className="text-xs text-gray-600">Due: {deadline.date}</div>
                        </div>
                        <Badge variant="destructive" className="text-xs bg-red-100 text-red-800 border-red-200">
                          {deadline.daysLeft} days
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent CEP-5 Forms */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent CEP-5 Forms</h3>
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
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
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                      Download Mobile App
                    </Button>
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">CEP-5 Forms</h2>
              <Button onClick={handleNewForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
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
              <Button onClick={handleFindCustomer} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
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
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
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
                  <h1 className="text-lg font-bold text-gray-800">Pasifill</h1>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bell className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
              
              {/* Search Bar with Collapse Button */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Find customer"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
          
          {/* Collapse Toggle Button for collapsed state */}
          {isSidebarCollapsed && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-2' : ''
          }`} title={isSidebarCollapsed ? 'Profile' : undefined}>
            <User className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Profile</span>}
          </button>
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-2' : ''}`} title={isSidebarCollapsed ? 'Notifications' : undefined}>
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Notifications</span>}
          </button>
          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
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
                className="h-8 w-8 p-0 hover:bg-gray-100 lg:hidden"
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
    </div>
  )
}

export default DashboardPage
