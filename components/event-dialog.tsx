"use client"

import React, { useState } from 'react'
import moment from 'moment'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  FileText,
  AlertCircle,
  X
} from "lucide-react"

interface JobEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  customer?: {
    name: string
    phone: string
    address: string
    county: string
  }
  jobType?: 'inspection' | 'installation' | 'maintenance' | 'repair' | 'pumping'
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  notes?: string
  cep5FormId?: string
}

interface EventDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: JobEvent) => void
  selectedDate?: Date
  selectedTimeSlot?: { start: Date; end: Date }
  event?: JobEvent | null
}

const EventDialog: React.FC<EventDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedTimeSlot,
  event
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    customerName: event?.customer?.name || '',
    customerPhone: event?.customer?.phone || '',
    customerAddress: event?.customer?.address || '',
    customerCounty: event?.customer?.county || '',
    jobType: event?.jobType || 'inspection',
    status: event?.status || 'scheduled',
    priority: event?.priority || 'medium',
    notes: event?.notes || '',
    cep5FormId: event?.cep5FormId || '',
    startDate: selectedDate || event?.start || new Date(),
    startTime: selectedTimeSlot?.start || event?.start || new Date(),
    endTime: selectedTimeSlot?.end || event?.end || new Date(),
    allDay: event?.allDay || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Customer phone is required'
    }
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Customer address is required'
    }
    if (!formData.customerCounty.trim()) {
      newErrors.customerCounty = 'Customer county is required'
    }
    if (formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    const newEvent: JobEvent = {
      id: event?.id || `event-${Date.now()}`,
      title: formData.title,
      start: formData.startTime,
      end: formData.endTime,
      allDay: formData.allDay,
      customer: {
        name: formData.customerName,
        phone: formData.customerPhone,
        address: formData.customerAddress,
        county: formData.customerCounty
      },
      jobType: formData.jobType as JobEvent['jobType'],
      status: formData.status as JobEvent['status'],
      priority: formData.priority as JobEvent['priority'],
      notes: formData.notes,
      cep5FormId: formData.cep5FormId
    }

    onSave(newEvent)
    onClose()
  }

  const handleClose = () => {
    setFormData({
      title: '',
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      customerCounty: '',
      jobType: 'inspection',
      status: 'scheduled',
      priority: 'medium',
      notes: '',
      cep5FormId: '',
      startDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      allDay: false
    })
    setErrors({})
    onClose()
  }

  const alabamaCounties = [
    'Autauga', 'Baldwin', 'Barbour', 'Bibb', 'Blount', 'Bullock', 'Butler', 'Calhoun',
    'Chambers', 'Cherokee', 'Chilton', 'Choctaw', 'Clarke', 'Clay', 'Cleburne', 'Coffee',
    'Colbert', 'Conecuh', 'Coosa', 'Covington', 'Crenshaw', 'Cullman', 'Dale', 'Dallas',
    'DeKalb', 'Elmore', 'Escambia', 'Etowah', 'Fayette', 'Franklin', 'Geneva', 'Greene',
    'Hale', 'Henry', 'Houston', 'Jackson', 'Jefferson', 'Lamar', 'Lauderdale', 'Lawrence',
    'Lee', 'Limestone', 'Lowndes', 'Macon', 'Madison', 'Marengo', 'Marion', 'Marshall',
    'Mobile', 'Monroe', 'Montgomery', 'Morgan', 'Perry', 'Pickens', 'Pike', 'Randolph',
    'Russell', 'St. Clair', 'Shelby', 'Sumter', 'Talladega', 'Tallapoosa', 'Tuscaloosa',
    'Walker', 'Washington', 'Wilcox', 'Winston'
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl w-[600px] mx-4 max-h-[80vh] overflow-hidden">
            <div className="px-8 pt-8 pb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Job</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-600 mt-2">
                {event ? 'Update the job details' : 'Create a new job'}
              </p>
            </div>
        
        <div className="px-8 pb-8 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium mb-3">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter job title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customerName" className="block text-sm font-medium mb-3">
                  Customer Name *
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter customer name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customerPhone" className="block text-sm font-medium mb-3">
                  Phone Number *
                </Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                    errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.customerPhone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customerAddress" className="block text-sm font-medium mb-3">
                  Property Address *
                </Label>
                <Input
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                    errors.customerAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full address"
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.customerAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="jobType" className="block text-sm font-medium mb-3">
                  Job Type *
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange('jobType', value)}
                >
                  <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem value="inspection" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      CEP-5 Inspection
                    </SelectItem>
                    <SelectItem value="installation" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      System Installation
                    </SelectItem>
                    <SelectItem value="maintenance" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Maintenance
                    </SelectItem>
                    <SelectItem value="repair" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Repair
                    </SelectItem>
                    <SelectItem value="pumping" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Tank Pumping
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status" className="block text-sm font-medium mb-3">
                  Status *
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem value="scheduled" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Scheduled
                    </SelectItem>
                    <SelectItem value="in-progress" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      In Progress
                    </SelectItem>
                    <SelectItem value="completed" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Completed
                    </SelectItem>
                    <SelectItem value="cancelled" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate" className="block text-sm font-medium mb-3">
                  Date *
                </Label>
                <DatePicker
                  date={formData.startDate}
                  onDateChange={(date) => handleInputChange('startDate', date)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="block text-sm font-medium mb-3">
                    Start Time *
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={moment(formData.startTime).format('HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':')
                      const newTime = new Date(formData.startDate)
                      newTime.setHours(parseInt(hours), parseInt(minutes))
                      handleInputChange('startTime', newTime)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="endTime" className="block text-sm font-medium mb-3">
                    End Time *
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={moment(formData.endTime).format('HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':')
                      const newTime = new Date(formData.startDate)
                      newTime.setHours(parseInt(hours), parseInt(minutes))
                      handleInputChange('endTime', newTime)
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                      errors.endTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endTime && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="px-8 pb-8">
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="px-6 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {event ? 'Update Job' : 'Create Job'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventDialog
