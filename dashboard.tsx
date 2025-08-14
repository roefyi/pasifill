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

            {/* Weather & Field Conditions - Moved to top */}
            <div className="mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Weather Card */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather</h3>
                  <Card className="bg-white border-gray-200 flex-1">
                    <CardContent className="px-6 py-6">
                      <div className="space-y-4">
                        {/* Current Weather */}
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
                        
                        {/* Hourly Forecast */}
                        <div className="border-t border-gray-100 pt-4">
                          <div className="text-xs font-medium text-gray-700 mb-3">Today's Forecast</div>
                          <div className="flex space-x-4 overflow-x-auto pb-2">
                            {mockData.weather.hourlyForecast.map((hour, index) => (
                              <div key={index} className="flex flex-col items-center space-y-1 min-w-0">
                                <div className="text-xs text-gray-500">{hour.time}</div>
                                <div className="w-6 h-6 flex items-center justify-center">
                                  {hour.icon === 'sun' ? (
                                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                                  ) : hour.icon === 'cloud-sun' ? (
                                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                                  ) : (
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs font-medium text-gray-900">{hour.temp}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Overview - Split with weather */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
                  <div className="grid grid-cols-2 gap-4 flex-1">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockData.todayJobs.map((job) => (
                  <Card key={job.id} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{job.time}</div>
                            <div className="text-sm text-gray-600">{job.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                          {job.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{job.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{job.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{job.county} County</span>
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
              <div className="space-y-3">
                {mockData.pendingForms.map((form) => (
                  <Card key={form.id} className="bg-white border-gray-200 hover:shadow-sm transition-shadow">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{form.customer}</div>
                            <div className="text-sm text-gray-600">Form ID: {form.id}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200 mb-2">
                            {form.status}
                          </Badge>
                          <div className="text-xs text-gray-500">Open {form.daysOpen} day{form.daysOpen !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{form.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              form.progress >= 80 ? 'bg-green-500' : 
                              form.progress >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${form.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>County: {form.county}</span>
                          <span>Updated: {form.lastUpdated}</span>
                        </div>
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
                  <h1 className="text-lg font-bold text-gray-800">Pasifill</h1>
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
    </div>
  )
}

export default DashboardPage
