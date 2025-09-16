'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { X, Save, Building2, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

interface ContractorProfile {
  name: string
  license: string
  counties: string[]
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  licenseExpiration: string
  insuranceStatus: string
  adphRegistration: string
  lastInspection: string
  nextRenewal: string
}

interface ProfileEditDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profile: ContractorProfile) => void
  initialData: ContractorProfile
}

const defaultProfile: ContractorProfile = {
  name: 'Alabama Septic Solutions',
  license: 'AL-12345',
  counties: ['Jefferson', 'Shelby', 'Tuscaloosa'],
  address: '123 Business Street',
  city: 'Birmingham',
  state: 'AL',
  zipCode: '35201',
  phone: '(205) 555-0100',
  email: 'contact@alabamaseptic.com',
  licenseExpiration: 'December 31, 2025',
  insuranceStatus: 'Current',
  adphRegistration: 'Registered',
  lastInspection: 'November 15, 2024',
  nextRenewal: 'November 15, 2025'
}

export default function ProfileEditDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = defaultProfile 
}: ProfileEditDialogProps) {
  const [formData, setFormData] = useState<ContractorProfile>(initialData)
  const [selectedCounties, setSelectedCounties] = useState<string[]>(initialData.counties)
  const [isDirty, setIsDirty] = useState(false)

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData)
    setSelectedCounties(initialData.counties)
    setIsDirty(false)
  }, [initialData])

  const handleInputChange = (field: keyof ContractorProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setIsDirty(true)
  }

  const handleCountyToggle = (county: string) => {
    const newCounties = selectedCounties.includes(county)
      ? selectedCounties.filter(c => c !== county)
      : [...selectedCounties, county]
    
    setSelectedCounties(newCounties)
    setFormData(prev => ({
      ...prev,
      counties: newCounties
    }))
    setIsDirty(true)
  }

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      counties: selectedCounties
    }
    onSave(updatedProfile)
    setIsDirty(false)
    onClose()
  }

  const handleCancel = () => {
    setFormData(initialData)
    setSelectedCounties(initialData.counties)
    setIsDirty(false)
    onClose()
  }

  const availableCounties = [
    'Jefferson', 'Shelby', 'Tuscaloosa', 'Madison', 'Mobile', 'Montgomery',
    'Baldwin', 'Lee', 'Calhoun', 'Marshall', 'Walker', 'Lauderdale',
    'Cullman', 'Morgan', 'Etowah'
  ]

  const states = [
    { value: 'AL', label: 'Alabama (AL)' },
    { value: 'FL', label: 'Florida (FL)' },
    { value: 'GA', label: 'Georgia (GA)' },
    { value: 'MS', label: 'Mississippi (MS)' },
    { value: 'TN', label: 'Tennessee (TN)' },
    { value: 'LA', label: 'Louisiana (LA)' },
    { value: 'AR', label: 'Arkansas (AR)' },
    { value: 'SC', label: 'South Carolina (SC)' },
    { value: 'NC', label: 'North Carolina (NC)' },
    { value: 'TX', label: 'Texas (TX)' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[95vw] bg-white border-gray-200 shadow-xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-600" />
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Edit Company Profile
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600 mt-2">
            Update your company information and compliance details
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-3">
                    Company Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <Label htmlFor="license" className="block text-sm font-medium mb-3">
                    License Number
                  </Label>
                  <Input
                    id="license"
                    value={formData.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Enter license number"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-3">
                    Service Counties
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {availableCounties.map((county) => (
                      <Badge
                        key={county}
                        variant={selectedCounties.includes(county) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          selectedCounties.includes(county)
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                        }`}
                        onClick={() => handleCountyToggle(county)}
                      >
                        {county} County
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="address" className="block text-sm font-medium mb-3">
                    Business Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Enter business address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="block text-sm font-medium mb-3">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '')
                        handleInputChange('city', value)
                      }}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="block text-sm font-medium mb-3">
                      State
                    </Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {states.map((state) => (
                          <SelectItem 
                            key={state.value} 
                            value={state.value}
                            className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700"
                          >
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode" className="block text-sm font-medium mb-3">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                      handleInputChange('zipCode', value)
                    }}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="12345"
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium mb-3">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="(205) 555-0100"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-3">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Licensing */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Compliance & Licensing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="licenseExpiration" className="block text-sm font-medium mb-3">
                    License Expiration
                  </Label>
                  <Input
                    id="licenseExpiration"
                    value={formData.licenseExpiration}
                    onChange={(e) => handleInputChange('licenseExpiration', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="December 31, 2025"
                  />
                </div>

                <div>
                  <Label htmlFor="insuranceStatus" className="block text-sm font-medium mb-3">
                    Insurance Status
                  </Label>
                  <Select value={formData.insuranceStatus} onValueChange={(value) => handleInputChange('insuranceStatus', value)}>
                    <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                      <SelectValue placeholder="Select insurance status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg">
                      <SelectItem value="Current" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Current
                      </SelectItem>
                      <SelectItem value="Expired" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Expired
                      </SelectItem>
                      <SelectItem value="Pending" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Pending
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="adphRegistration" className="block text-sm font-medium mb-3">
                    ADPH Registration
                  </Label>
                  <Select value={formData.adphRegistration} onValueChange={(value) => handleInputChange('adphRegistration', value)}>
                    <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                      <SelectValue placeholder="Select ADPH registration status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg">
                      <SelectItem value="Registered" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Registered
                      </SelectItem>
                      <SelectItem value="Not Registered" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Not Registered
                      </SelectItem>
                      <SelectItem value="Pending" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                        Pending
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="lastInspection" className="block text-sm font-medium mb-3">
                    Last Inspection
                  </Label>
                  <Input
                    id="lastInspection"
                    value={formData.lastInspection}
                    onChange={(e) => handleInputChange('lastInspection', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="November 15, 2024"
                  />
                </div>

                <div>
                  <Label htmlFor="nextRenewal" className="block text-sm font-medium mb-3">
                    Next Renewal Due
                  </Label>
                  <Input
                    id="nextRenewal"
                    value={formData.nextRenewal}
                    onChange={(e) => handleInputChange('nextRenewal', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="November 15, 2025"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isDirty}
            className="px-6 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
