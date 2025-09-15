'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { X, Edit2, Save, User, Mail, Phone, MapPin, Building2 } from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  county: string
  company?: string
  notes?: string
  createdAt: string
  lastUpdated: string
}

interface CustomerProfilePopupProps {
  customer?: Customer
  onSave?: (customer: Customer) => void
  children: React.ReactNode
}

const defaultCustomer: Customer = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '(205) 555-0123',
  address: '123 Oak Street',
  city: 'Birmingham',
  state: 'AL',
  zipCode: '35244',
  county: 'Jefferson',
  company: 'Smith Properties LLC',
  notes: 'Regular customer with multiple properties. Prefers morning appointments.',
  createdAt: '2024-01-15',
  lastUpdated: '2024-01-15'
}

export default function CustomerProfilePopup({ 
  customer = defaultCustomer, 
  onSave,
  children 
}: CustomerProfilePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(customer)

  const handleInputChange = (field: keyof Customer, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    const updatedCustomer = {
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    if (onSave) {
      onSave(updatedCustomer)
    }
    
    setIsEditing(false)
    console.log('Customer profile saved:', updatedCustomer)
  }

  const handleCancel = () => {
    setFormData(customer)
    setIsEditing(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsEditing(false)
      setFormData(customer)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="w-[1200px] max-w-[95vw] bg-white border-gray-200 shadow-xl max-h-[90vh] overflow-hidden [&>button]:hidden">
        <DialogHeader className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Customer Profile
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="slate"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="slate"
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogDescription className="text-gray-600 mt-2">
            {isEditing ? 'Update customer information' : 'View customer details'}
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-3">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {formData.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-3">
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="break-all">{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium mb-3">
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="break-all">{formData.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="company" className="block text-sm font-medium mb-3">
                    Company (Optional)
                  </Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={formData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter company name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="break-all">{formData.company || 'N/A'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Address Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="address" className="block text-sm font-medium mb-3">
                    Street Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter street address"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="break-all">{formData.address}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="city" className="block text-sm font-medium mb-3">
                    City
                  </Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '')
                        handleInputChange('city', value)
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Enter city name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {formData.city}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="state" className="block text-sm font-medium mb-3">
                    State
                  </Label>
                  {isEditing ? (
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        <SelectItem value="AL" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Alabama (AL)
                        </SelectItem>
                        <SelectItem value="FL" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Florida (FL)
                        </SelectItem>
                        <SelectItem value="GA" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Georgia (GA)
                        </SelectItem>
                        <SelectItem value="MS" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Mississippi (MS)
                        </SelectItem>
                        <SelectItem value="TN" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Tennessee (TN)
                        </SelectItem>
                        <SelectItem value="LA" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Louisiana (LA)
                        </SelectItem>
                        <SelectItem value="AR" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Arkansas (AR)
                        </SelectItem>
                        <SelectItem value="SC" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          South Carolina (SC)
                        </SelectItem>
                        <SelectItem value="NC" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          North Carolina (NC)
                        </SelectItem>
                        <SelectItem value="TX" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Texas (TX)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {formData.state}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="zipCode" className="block text-sm font-medium mb-3">
                    ZIP Code
                  </Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                        handleInputChange('zipCode', value)
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="12345"
                      maxLength={5}
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {formData.zipCode}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="county" className="block text-sm font-medium mb-3">
                    County
                  </Label>
                  {isEditing ? (
                    <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        <SelectItem value="Jefferson" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Jefferson County
                        </SelectItem>
                        <SelectItem value="Shelby" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Shelby County
                        </SelectItem>
                        <SelectItem value="Tuscaloosa" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Tuscaloosa County
                        </SelectItem>
                        <SelectItem value="Madison" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Madison County
                        </SelectItem>
                        <SelectItem value="Mobile" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Mobile County
                        </SelectItem>
                        <SelectItem value="Montgomery" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Montgomery County
                        </SelectItem>
                        <SelectItem value="Baldwin" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Baldwin County
                        </SelectItem>
                        <SelectItem value="Lee" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Lee County
                        </SelectItem>
                        <SelectItem value="Calhoun" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Calhoun County
                        </SelectItem>
                        <SelectItem value="Marshall" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Marshall County
                        </SelectItem>
                        <SelectItem value="Walker" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Walker County
                        </SelectItem>
                        <SelectItem value="Lauderdale" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Lauderdale County
                        </SelectItem>
                        <SelectItem value="Cullman" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Cullman County
                        </SelectItem>
                        <SelectItem value="Morgan" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Morgan County
                        </SelectItem>
                        <SelectItem value="Etowah" className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                          Etowah County
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {formData.county}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Notes
            </h3>
            <div>
              {isEditing ? (
                <Textarea
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter any notes about this customer..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 min-h-[100px]">
                  {formData.notes || 'No notes available'}
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Customer ID:</span> {formData.id}
              </div>
              <div>
                <span className="font-medium">Created:</span> {formData.createdAt}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {formData.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}