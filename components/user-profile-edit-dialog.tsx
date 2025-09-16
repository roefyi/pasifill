'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, Save, User, Mail, Phone, MapPin, Calendar, Shield, Settings } from 'lucide-react'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  role: string
  department: string
  jobTitle: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  bio: string
  preferences: {
    theme: string
    notifications: boolean
    language: string
    timezone: string
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    loginAttempts: number
  }
  createdAt: string
  lastUpdated: string
}

interface UserProfileEditDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profile: UserProfile) => void
  initialData: UserProfile
}

const defaultUserProfile: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@alabamaseptic.com',
  phone: '(205) 555-0123',
  avatar: '',
  role: 'Contractor',
  department: 'Field Operations',
  jobTitle: 'Senior Septic Inspector',
  address: '123 Oak Street',
  city: 'Birmingham',
  state: 'AL',
  zipCode: '35244',
  country: 'United States',
  bio: 'Experienced septic system inspector with 10+ years in the field. Specializing in CEP-5 inspections and compliance management.',
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'America/Chicago'
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15',
    loginAttempts: 0
  },
  createdAt: '2024-01-01',
  lastUpdated: '2024-01-15'
}

export default function UserProfileEditDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = defaultUserProfile 
}: UserProfileEditDialogProps) {
  const [formData, setFormData] = useState<UserProfile>(initialData)
  const [isDirty, setIsDirty] = useState(false)
  const [activeTab, setActiveTab] = useState<'personal' | 'preferences' | 'security'>('personal')

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData)
    setIsDirty(false)
  }, [initialData])

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setIsDirty(true)
  }

  const handlePreferencesChange = (field: keyof UserProfile['preferences'], value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }))
    setIsDirty(true)
  }

  const handleSecurityChange = (field: keyof UserProfile['security'], value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }))
    setIsDirty(true)
  }

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    onSave(updatedProfile)
    setIsDirty(false)
    onClose()
  }

  const handleCancel = () => {
    setFormData(initialData)
    setIsDirty(false)
    onClose()
  }

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

  const countries = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Mexico', label: 'Mexico' }
  ]

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ]

  const timezones = [
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' }
  ]

  const roles = [
    { value: 'Contractor', label: 'Contractor' },
    { value: 'Inspector', label: 'Inspector' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin', label: 'Administrator' }
  ]

  const departments = [
    { value: 'Field Operations', label: 'Field Operations' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Management', label: 'Management' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1200px] max-w-[95vw] h-[80vh] bg-white border-gray-200 shadow-xl overflow-hidden [&>button]:hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-8 pt-8 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-600" />
                <DialogTitle className="text-gray-900">Edit User Profile</DialogTitle>
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
              Update your personal information, preferences, and security settings
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 py-6 space-y-8 flex-1 overflow-y-auto">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'personal'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4 mr-2 inline" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'preferences'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="h-4 w-4 mr-2 inline" />
                Preferences
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'security'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Shield className="h-4 w-4 mr-2 inline" />
                Security
              </button>
            </div>

            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={formData.avatar} alt={`${formData.firstName} ${formData.lastName}`} />
                      <AvatarFallback className="text-lg">
                        {formData.firstName[0]}{formData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => {/* Handle avatar upload */}}
                    >
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(205) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="role" className="block text-sm font-medium mb-2">
                      Role
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department" className="block text-sm font-medium mb-2">
                      Department
                    </Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="Enter job title"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-900">Address Information</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="address" className="block text-sm font-medium mb-3">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city" className="block text-sm font-medium mb-3">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
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
                              <SelectItem key={state.value} value={state.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="block text-sm font-medium mb-3">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="35244"
                          maxLength={5}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country" className="block text-sm font-medium mb-3">
                        Country
                      </Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-lg">
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="block text-sm font-medium mb-3">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Preferences
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="theme" className="block text-sm font-medium mb-3">
                      Theme
                    </Label>
                    <Select value={formData.preferences.theme} onValueChange={(value) => handlePreferencesChange('theme', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {themes.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="block text-sm font-medium mb-3">
                      Language
                    </Label>
                    <Select value={formData.preferences.language} onValueChange={(value) => handlePreferencesChange('language', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="block text-sm font-medium mb-3">
                      Timezone
                    </Label>
                    <Select value={formData.preferences.timezone} onValueChange={(value) => handlePreferencesChange('timezone', value)}>
                      <SelectTrigger className="w-full h-12 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg">
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value} className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700">
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={formData.preferences.notifications}
                    onChange={(e) => handlePreferencesChange('notifications', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                    Email notifications
                  </Label>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${formData.security.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                        {formData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSecurityChange('twoFactorEnabled', !formData.security.twoFactorEnabled)}
                      >
                        {formData.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Password Change
                      </Label>
                      <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                        {formData.security.lastPasswordChange}
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Failed Login Attempts
                      </Label>
                      <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                        {formData.security.loginAttempts}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="mr-3">
                      Change Password
                    </Button>
                    <Button variant="outline">
                      View Login History
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
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
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}