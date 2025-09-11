"use client"

import React, { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
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
  AlertCircle
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-96 bg-white border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-8 pt-8 pb-6">
          <DialogTitle className="text-gray-900">
            {event ? 'Edit CEP-5 Job' : 'Create New CEP-5 Job'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {event ? 'Update the Alabama CEP-5 job details' : 'Schedule a new Alabama CEP-5 inspection or service'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Job Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium mb-3">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="e.g., Smith Residence - CEP-5 Inspection"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType" className="block text-sm font-medium mb-3">
                    Job Type
                  </Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg">
                      <SelectItem value="inspection" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        CEP-5 Inspection
                      </SelectItem>
                      <SelectItem value="installation" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        System Installation
                      </SelectItem>
                      <SelectItem value="maintenance" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Maintenance
                      </SelectItem>
                      <SelectItem value="repair" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Repair
                      </SelectItem>
                      <SelectItem value="pumping" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Tank Pumping
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority" className="block text-sm font-medium mb-3">
                    Priority
                  </Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg">
                      <SelectItem value="low" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Low
                      </SelectItem>
                      <SelectItem value="medium" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Medium
                      </SelectItem>
                      <SelectItem value="high" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        High
                      </SelectItem>
                      <SelectItem value="urgent" className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        Urgent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Customer Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="block text-sm font-medium mb-3">
                    Customer Name *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="John Smith"
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
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="(205) 555-0123"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.customerPhone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="customerAddress" className="block text-sm font-medium mb-3">
                  Property Address *
                </Label>
                <Input
                  id="customerAddress"
                  type="text"
                  value={formData.customerAddress}
                  onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="123 Oak Street, Birmingham, AL"
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.customerAddress}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customerCounty" className="block text-sm font-medium mb-3">
                  Alabama County *
                </Label>
                <Select value={formData.customerCounty} onValueChange={(value) => handleInputChange('customerCounty', value)}>
                  <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg max-h-60">
                    {alabamaCounties.map((county) => (
                      <SelectItem key={county} value={county} className="cursor-pointer hover:bg-gray-50 focus:bg-sky-50 focus:text-sky-700">
                        {county} County
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.customerCounty && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.customerCounty}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Schedule
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="block text-sm font-medium mb-3">
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime.toISOString().slice(0, 16)}
                    onChange={(e) => handleInputChange('startTime', new Date(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="endTime" className="block text-sm font-medium mb-3">
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime.toISOString().slice(0, 16)}
                    onChange={(e) => handleInputChange('endTime', new Date(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
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

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes" className="block text-sm font-medium mb-3">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="Additional notes about this job..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="cep5FormId" className="block text-sm font-medium mb-3">
                  CEP-5 Form ID (Optional)
                </Label>
                <Input
                  id="cep5FormId"
                  type="text"
                  value={formData.cep5FormId}
                  onChange={(e) => handleInputChange('cep5FormId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="CEP5-2024-001"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 pb-8">
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
              className="px-6 bg-sky-500 hover:bg-sky-600 text-white"
            >
              {event ? 'Update CEP-5 Job' : 'Create CEP-5 Job'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EventDialog
