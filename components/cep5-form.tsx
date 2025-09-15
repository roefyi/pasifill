"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Save, Printer, Upload, Camera, MapPin, FileText, Building2, User, Phone, Mail, Home, Car, TreePine, Droplets, Thermometer, Ruler } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Alabama counties for the dropdown
const ALABAMA_COUNTIES = [
  "Autauga", "Baldwin", "Barbour", "Bibb", "Blount", "Bullock", "Butler", "Calhoun", "Chambers", "Cherokee",
  "Chilton", "Choctaw", "Clarke", "Clay", "Cleburne", "Coffee", "Colbert", "Conecuh", "Coosa", "Covington",
  "Crenshaw", "Cullman", "Dale", "Dallas", "DeKalb", "Elmore", "Escambia", "Etowah", "Fayette", "Franklin",
  "Geneva", "Greene", "Hale", "Henry", "Houston", "Jackson", "Jefferson", "Lamar", "Lauderdale", "Lawrence",
  "Lee", "Limestone", "Lowndes", "Macon", "Madison", "Marengo", "Marion", "Marshall", "Mobile", "Monroe",
  "Montgomery", "Morgan", "Perry", "Pickens", "Pike", "Randolph", "Russell", "Shelby", "St. Clair", "Sumter",
  "Talladega", "Tallapoosa", "Tuscaloosa", "Walker", "Washington", "Wilcox", "Winston"
]

// Soil classification types
const SOIL_TYPES = [
  "Clay", "Silty Clay", "Clay Loam", "Silty Clay Loam", "Sandy Clay", "Sandy Clay Loam",
  "Loam", "Silt Loam", "Sandy Loam", "Silt", "Loamy Sand", "Sand"
]

// CEP5 Form Schema
const cep5FormSchema = z.object({
  // Basic Information
  lhdPermitNumber: z.string().min(1, "LHD Permit Number is required"),
  dateReceived: z.date().min(new Date('1900-01-01'), "Date received is required"),
  ownerName: z.string().min(1, "Owner/Applicant name is required"),
  propertyAddress: z.string().min(1, "Property address is required"),
  cityStateZip: z.string().min(1, "City, State, ZIP is required"),
  subdivisionName: z.string().optional(),
  lotNumber: z.string().optional(),
  blockNumber: z.string().optional(),
  
  // Property Details
  county: z.string().min(1, "County is required"),
  soilType: z.string().min(1, "Soil type is required"),
  groundwaterDepth: z.string().min(1, "Groundwater depth is required"),
  slopePercentage: z.string().min(1, "Slope percentage is required"),
  
  // System Information
  systemType: z.enum(["conventional", "at-grade", "mound", "other"]),
  otherSystemType: z.string().optional(),
  tankCapacity: z.string().min(1, "Tank capacity is required"),
  absorptionArea: z.string().min(1, "Absorption area is required"),
  
  // Inspection Details
  inspectionDate: z.date().min(new Date('1900-01-01'), "Inspection date is required"),
  inspectorName: z.string().min(1, "Inspector name is required"),
  inspectorLicense: z.string().min(1, "Inspector license is required"),
  
  // Soil Profile
  soilProfileDepth: z.string().min(1, "Soil profile depth is required"),
  restrictiveLayer: z.boolean(),
  restrictiveLayerDepth: z.string().optional(),
  restrictiveLayerType: z.string().optional(),
  
  // Environmental Factors
  floodZone: z.boolean(),
  floodZoneType: z.string().optional(),
  wetlands: z.boolean(),
  wetlandsDistance: z.string().optional(),
  
  // Additional Notes
  additionalNotes: z.string().optional(),
  
  // Photos and Attachments
  soilProfilePhoto: z.string().optional(),
  sitePhoto: z.string().optional(),
  
  // Compliance
  meetsStandards: z.boolean(),
  recommendations: z.string().optional(),
})

type CEP5FormValues = z.infer<typeof cep5FormSchema>

interface CEP5FormProps {
  onSave?: (data: CEP5FormValues) => void
  onPrint?: (data: CEP5FormValues) => void
  initialData?: Partial<CEP5FormValues>
}

export function CEP5Form({ onSave, onPrint, initialData }: CEP5FormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showPrintDialog, setShowPrintDialog] = React.useState(false)
  
  // Debug logging
  console.log("CEP5Form component rendered")
  console.log("Props:", { onSave, onPrint, initialData })

  const form = useForm<CEP5FormValues>({
    resolver: zodResolver(cep5FormSchema),
    defaultValues: {
      systemType: "conventional",
      restrictiveLayer: false,
      floodZone: false,
      wetlands: false,
      meetsStandards: true,
      ...initialData,
    },
  })

  const onSubmit = async (data: CEP5FormValues) => {
    setIsSubmitting(true)
    try {
      if (onSave) {
        await onSave(data)
      }
      // Show success message or redirect
    } catch (error) {
      console.error("Error saving form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrint = (data: CEP5FormValues) => {
    if (onPrint) {
      onPrint(data)
    }
    setShowPrintDialog(false)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Alabama CEP-5 Form</h2>
          <p className="text-lg text-gray-600">Certificate of Evaluation and Permit - Onsite Sewage Disposal System</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="h-12 px-6 text-base font-medium bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Form"}
          </Button>
          <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="h-12 px-6 text-base font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Form
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Print CEP-5 Form</DialogTitle>
                <DialogDescription>
                  Generate a printable PDF of the completed CEP-5 form.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => handlePrint(form.getValues())}>
                  <Printer className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <FileText className="w-6 h-6 text-sky-600" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">LHD permit and owner details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lhdPermitNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">LHD Permit Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter permit number" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateReceived"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Date Received *</FormLabel>
                      <FormControl>
                        <DatePicker
                          placeholder="Select date received"
                          className="w-full h-12"
                          onDateChange={field.onChange}
                          date={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Owner/Applicant's Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Full name" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Property (911) Address *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Street address" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="cityStateZip"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">City, State, ZIP *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="City, State, ZIP" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subdivisionName"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Subdivision Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subdivision name" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lotNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-700">Lot</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Lot #" 
                            {...field} 
                            className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="blockNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-700">Block</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Block #" 
                            {...field} 
                            className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <MapPin className="w-6 h-6 text-sky-600" />
                Property Details
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Location and environmental characteristics</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">County *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500">
                            <SelectValue placeholder="Select county" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ALABAMA_COUNTIES.map((county) => (
                            <SelectItem key={county} value={county}>
                              {county} County
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Soil Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500">
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SOIL_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="groundwaterDepth"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Groundwater Depth *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 6 feet" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slopePercentage"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Slope Percentage *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 5%" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Building2 className="w-6 h-6 text-sky-600" />
                System Information
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Septic system specifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="systemType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">System Type *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="conventional" id="conventional" />
                            <Label htmlFor="conventional">Conventional</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="at-grade" id="at-grade" />
                            <Label htmlFor="at-grade">At-Grade</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mound" id="mound" />
                            <Label htmlFor="mound">Mound</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tankCapacity"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Tank Capacity *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 1000 gallons" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="absorptionArea"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Absorption Area *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 300 sq ft" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Inspection Details */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <User className="w-6 h-6 text-sky-600" />
                Inspection Details
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Inspector information and certification</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="inspectionDate"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Inspection Date *</FormLabel>
                      <FormControl>
                        <DatePicker
                          placeholder="Select inspection date"
                          className="w-full h-12"
                          onDateChange={field.onChange}
                          date={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inspectorName"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Inspector Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Full name" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inspectorLicense"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Inspector License *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="License number" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Soil Profile */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <TreePine className="w-6 h-6 text-sky-600" />
                Soil Profile
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Soil characteristics and restrictive layers</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="soilProfileDepth"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700">Soil Profile Depth *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 24 inches" 
                          {...field} 
                          className="h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="restrictiveLayer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Restrictive Layer Present
                        </FormLabel>
                        <FormDescription className="text-sm text-gray-600">
                          Check if there is a restrictive layer in the soil profile
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Environmental Factors */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Droplets className="w-6 h-6 text-sky-600" />
                Environmental Factors
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Flood zones and wetland considerations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="floodZone"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Property in Flood Zone
                        </FormLabel>
                        <FormDescription className="text-sm text-gray-600">
                          Check if the property is located in a flood zone
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="wetlands"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Wetlands Present
                        </FormLabel>
                        <FormDescription className="text-sm text-gray-600">
                          Check if wetlands are present on or near the property
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <FileText className="w-6 h-6 text-sky-600" />
                Additional Notes
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Additional observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-gray-700">Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional observations, special conditions, or notes..."
                        className="min-h-[100px] border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Thermometer className="w-6 h-6 text-sky-600" />
                Compliance Assessment
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">Final evaluation and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="meetsStandards"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Meets Alabama Department of Public Health Standards
                      </FormLabel>
                      <FormDescription className="text-sm text-gray-600">
                        Check if the system design meets all ADPH requirements
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recommendations"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-gray-700">Recommendations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any recommendations for system improvements or maintenance..."
                        className="min-h-[100px] border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="h-12 px-6 text-base font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-6 text-base font-medium bg-sky-500 hover:bg-sky-600 shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save CEP-5 Form"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
