"use client"

import { useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Building2,
  Wrench,
  AlertTriangle,
  Droplets
} from "lucide-react"
import EventDialog from './event-dialog'

// Set up moment.js localizer
const localizer = momentLocalizer(moment)

// Job Event Interface
interface JobEvent {
  id: string
  title: string
  start: Date
  end: Date
  customer?: {
    name: string
    phone: string
    address: string
    county: string
  }
  jobType?: 'inspection' | 'installation' | 'maintenance' | 'repair' | 'pumping'
  status?: 'scheduled' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  notes?: string
  cep5FormId?: string
}

// Sample job events for Alabama septic contractors - Current week and next week
const sampleJobs: JobEvent[] = [
  // Monday, Sep 8, 2025
  {
    id: '1',
    title: 'Smith Residence - CEP-5 Inspection',
    start: new Date(2025, 8, 8, 9, 0), // Sep 8, 2025 9:00 AM
    end: new Date(2025, 8, 8, 11, 0), // Sep 8, 2025 11:00 AM
    customer: {
      name: 'John Smith',
      phone: '(205) 555-0123',
      address: '123 Maple Street, Birmingham, AL',
      county: 'Jefferson'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Annual CEP-5 inspection required',
    cep5FormId: 'CEP5-2025-001'
  },
  {
    id: '2',
    title: 'Johnson Property - System Maintenance',
    start: new Date(2025, 8, 8, 14, 0), // Sep 8, 2025 2:00 PM
    end: new Date(2025, 8, 8, 16, 0), // Sep 8, 2025 4:00 PM
    customer: {
      name: 'Mary Johnson',
      phone: '(334) 555-0456',
      address: '456 Oak Avenue, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Routine maintenance check'
  },
  {
    id: '3',
    title: 'Williams Farm - Tank Pumping',
    start: new Date(2025, 8, 8, 17, 0), // Sep 8, 2025 5:00 PM
    end: new Date(2025, 8, 8, 18, 30), // Sep 8, 2025 6:30 PM
    customer: {
      name: 'Robert Williams',
      phone: '(251) 555-0789',
      address: '789 Pine Road, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'pumping',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Scheduled tank pumping'
  },
  // Tuesday, Sep 9, 2025
  {
    id: '4',
    title: 'Davis Farm - Emergency Repair',
    start: new Date(2025, 8, 9, 8, 0), // Sep 9, 2025 8:00 AM
    end: new Date(2025, 8, 9, 12, 0), // Sep 9, 2025 12:00 PM
    customer: {
      name: 'Robert Davis',
      phone: '(251) 555-0234',
      address: '321 Elm Street, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'repair',
    status: 'scheduled',
    priority: 'urgent',
    notes: 'Emergency system failure - urgent repair needed'
  },
  {
    id: '5',
    title: 'Wilson Home - CEP-5 Inspection',
    start: new Date(2025, 8, 9, 13, 0), // Sep 9, 2025 1:00 PM
    end: new Date(2025, 8, 9, 15, 0), // Sep 9, 2025 3:00 PM
    customer: {
      name: 'Sarah Wilson',
      phone: '(256) 555-0567',
      address: '654 Cedar Street, Huntsville, AL',
      county: 'Madison'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'New construction inspection',
    cep5FormId: 'CEP5-2025-002'
  },
  {
    id: '6',
    title: 'Garcia Property - System Maintenance',
    start: new Date(2025, 8, 9, 16, 0), // Sep 9, 2025 4:00 PM
    end: new Date(2025, 8, 9, 18, 0), // Sep 9, 2025 6:00 PM
    customer: {
      name: 'Carlos Garcia',
      phone: '(334) 555-0890',
      address: '987 Birch Lane, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Pre-winter maintenance'
  },
  // Wednesday, Sep 10, 2025
  {
    id: '7',
    title: 'Brown Residence - Tank Pumping',
    start: new Date(2025, 8, 10, 10, 0), // Sep 10, 2025 10:00 AM
    end: new Date(2025, 8, 10, 11, 30), // Sep 10, 2025 11:30 AM
    customer: {
      name: 'Michael Brown',
      phone: '(205) 555-0123',
      address: '147 Willow Drive, Birmingham, AL',
      county: 'Jefferson'
    },
    jobType: 'pumping',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Regular pumping service'
  },
  {
    id: '8',
    title: 'Taylor Property - New Installation',
    start: new Date(2025, 8, 10, 14, 0), // Sep 10, 2025 2:00 PM
    end: new Date(2025, 8, 10, 17, 0), // Sep 10, 2025 5:00 PM
    customer: {
      name: 'Jennifer Taylor',
      phone: '(334) 555-0456',
      address: '258 Spruce Court, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'installation',
    status: 'scheduled',
    priority: 'high',
    notes: 'New septic system installation'
  },
  {
    id: '9',
    title: 'Thompson Farm - CEP-5 Inspection',
    start: new Date(2025, 8, 10, 18, 0), // Sep 10, 2025 6:00 PM
    end: new Date(2025, 8, 10, 20, 0), // Sep 10, 2025 8:00 PM
    customer: {
      name: 'Patricia Thompson',
      phone: '(251) 555-0789',
      address: '369 Poplar Street, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Routine CEP-5 inspection',
    cep5FormId: 'CEP5-2025-003'
  },
  // Thursday, Sep 11, 2025
  {
    id: '10',
    title: 'Anderson Farm - CEP-5 Inspection',
    start: new Date(2025, 8, 11, 9, 0), // Sep 11, 2025 9:00 AM
    end: new Date(2025, 8, 11, 12, 0), // Sep 11, 2025 12:00 PM
    customer: {
      name: 'David Anderson',
      phone: '(251) 555-0234',
      address: '741 Hickory Lane, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Annual inspection required',
    cep5FormId: 'CEP5-2025-004'
  },
  {
    id: '11',
    title: 'Miller Home - System Repair',
    start: new Date(2025, 8, 11, 13, 0), // Sep 11, 2025 1:00 PM
    end: new Date(2025, 8, 11, 16, 0), // Sep 11, 2025 4:00 PM
    customer: {
      name: 'Lisa Miller',
      phone: '(256) 555-0567',
      address: '852 Sycamore Avenue, Huntsville, AL',
      county: 'Madison'
    },
    jobType: 'repair',
    status: 'scheduled',
    priority: 'high',
    notes: 'System backup issue - repair needed'
  },
  {
    id: '12',
    title: 'Johnson Residence - Tank Pumping',
    start: new Date(2025, 8, 11, 17, 0), // Sep 11, 2025 5:00 PM
    end: new Date(2025, 8, 11, 18, 0), // Sep 11, 2025 6:00 PM
    customer: {
      name: 'James Johnson',
      phone: '(205) 555-0890',
      address: '963 Pine Street, Birmingham, AL',
      county: 'Jefferson'
    },
    jobType: 'pumping',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Regular pumping service'
  },
  // Friday, Sep 12, 2025
  {
    id: '13',
    title: 'White Property - CEP-5 Inspection',
    start: new Date(2025, 8, 12, 8, 0), // Sep 12, 2025 8:00 AM
    end: new Date(2025, 8, 12, 10, 0), // Sep 12, 2025 10:00 AM
    customer: {
      name: 'Susan White',
      phone: '(334) 555-0123',
      address: '159 Cherry Street, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Property sale inspection',
    cep5FormId: 'CEP5-2025-005'
  },
  {
    id: '14',
    title: 'Black Farm - System Maintenance',
    start: new Date(2025, 8, 12, 11, 0), // Sep 12, 2025 11:00 AM
    end: new Date(2025, 8, 12, 13, 0), // Sep 12, 2025 1:00 PM
    customer: {
      name: 'Robert Black',
      phone: '(256) 555-0456',
      address: '357 Walnut Drive, Huntsville, AL',
      county: 'Madison'
    },
    jobType: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Routine maintenance check'
  },
  {
    id: '15',
    title: 'Green Residence - Emergency Repair',
    start: new Date(2025, 8, 12, 14, 0), // Sep 12, 2025 2:00 PM
    end: new Date(2025, 8, 12, 17, 0), // Sep 12, 2025 5:00 PM
    customer: {
      name: 'Linda Green',
      phone: '(251) 555-0789',
      address: '468 Ash Lane, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'repair',
    status: 'scheduled',
    priority: 'urgent',
    notes: 'System overflow - emergency repair'
  },
  // Saturday, Sep 13, 2025
  {
    id: '16',
    title: 'Blue Property - CEP-5 Inspection',
    start: new Date(2025, 8, 13, 9, 0), // Sep 13, 2025 9:00 AM
    end: new Date(2025, 8, 13, 11, 0), // Sep 13, 2025 11:00 AM
    customer: {
      name: 'Michael Blue',
      phone: '(205) 555-0234',
      address: '579 Cedar Court, Birmingham, AL',
      county: 'Jefferson'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Weekend inspection requested',
    cep5FormId: 'CEP5-2025-006'
  },
  {
    id: '17',
    title: 'Red Farm - Tank Pumping',
    start: new Date(2025, 8, 13, 12, 0), // Sep 13, 2025 12:00 PM
    end: new Date(2025, 8, 13, 13, 30), // Sep 13, 2025 1:30 PM
    customer: {
      name: 'Patricia Red',
      phone: '(334) 555-0567',
      address: '680 Oak Avenue, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'pumping',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Regular pumping service'
  },
  // Additional jobs for next week
  {
    id: '18',
    title: 'Yellow Home - System Maintenance',
    start: new Date(2025, 8, 14, 10, 0), // Sep 14, 2025 10:00 AM
    end: new Date(2025, 8, 14, 12, 0), // Sep 14, 2025 12:00 PM
    customer: {
      name: 'John Yellow',
      phone: '(256) 555-0890',
      address: '791 Maple Street, Huntsville, AL',
      county: 'Madison'
    },
    jobType: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Preventive maintenance'
  },
  {
    id: '19',
    title: 'Purple Farm - CEP-5 Inspection',
    start: new Date(2025, 8, 14, 14, 0), // Sep 14, 2025 2:00 PM
    end: new Date(2025, 8, 14, 16, 0), // Sep 14, 2025 4:00 PM
    customer: {
      name: 'Maria Purple',
      phone: '(251) 555-0123',
      address: '802 Pine Road, Mobile, AL',
      county: 'Mobile'
    },
    jobType: 'inspection',
    status: 'scheduled',
    priority: 'high',
    notes: 'Compliance inspection',
    cep5FormId: 'CEP5-2025-007'
  },
  {
    id: '20',
    title: 'Orange Residence - New Installation',
    start: new Date(2025, 8, 15, 8, 0), // Sep 15, 2025 8:00 AM
    end: new Date(2025, 8, 15, 12, 0), // Sep 15, 2025 12:00 PM
    customer: {
      name: 'David Orange',
      phone: '(205) 555-0456',
      address: '913 Elm Lane, Birmingham, AL',
      county: 'Jefferson'
    },
    jobType: 'installation',
    status: 'scheduled',
    priority: 'high',
    notes: 'New construction installation'
  },
  {
    id: '21',
    title: 'Pink Property - System Maintenance',
    start: new Date(2025, 8, 15, 13, 0), // Sep 15, 2025 1:00 PM
    end: new Date(2025, 8, 15, 15, 0), // Sep 15, 2025 3:00 PM
    customer: {
      name: 'Susan Pink',
      phone: '(334) 555-0654',
      address: '654 Cedar Street, Montgomery, AL',
      county: 'Montgomery'
    },
    jobType: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Pre-holiday maintenance check'
  },
  {
    id: '22',
    title: 'Gray Residence - Tank Pumping',
    start: new Date(2025, 8, 16, 11, 0), // Sep 16, 2025 11:00 AM
    end: new Date(2025, 8, 16, 12, 0), // Sep 16, 2025 12:00 PM
    customer: {
      name: 'Michael Gray',
      phone: '(256) 555-0123',
      address: '123 Oak Avenue, Huntsville, AL',
      county: 'Madison'
    },
    jobType: 'pumping',
    status: 'scheduled',
    priority: 'medium',
    notes: 'Regular pumping service'
  }
]

// Event Component for displaying job events
const EventComponent = ({ event }: { event: JobEvent }) => {
  const getJobTypeIcon = (jobType: string) => {
    switch (jobType) {
      case 'inspection': return <FileText className="w-3 h-3" />
      case 'installation': return <Building2 className="w-3 h-3" />
      case 'maintenance': return <Wrench className="w-3 h-3" />
      case 'repair': return <AlertTriangle className="w-3 h-3" />
      case 'pumping': return <Droplets className="w-3 h-3" />
      default: return <FileText className="w-3 h-3" />
    }
  }

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'inspection': return 'bg-sky-50 text-sky-700 border-sky-200'
      case 'installation': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'maintenance': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'repair': return 'bg-red-50 text-red-700 border-red-200'
      case 'pumping': return 'bg-violet-50 text-violet-700 border-violet-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className={`p-2 rounded-lg border ${getJobTypeColor(event.jobType || 'inspection')} text-xs hover:shadow-sm transition-shadow`}>
      <div className="flex items-center gap-1 mb-1">
        {getJobTypeIcon(event.jobType || 'inspection')}
        <span className="font-medium truncate">{event.title}</span>
        {event.jobType === 'inspection' && event.cep5FormId && (
          <Badge variant="outline" className="text-xs bg-sky-100 text-sky-700 border-sky-200 ml-1">
            CEP-5
          </Badge>
        )}
      </div>
      {event.customer && (
        <div className="text-xs text-gray-600 truncate mb-1">{event.customer.name}</div>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{moment(event.start).format('h:mm A')}</span>
        {event.customer?.county && (
          <span className="truncate ml-2">{event.customer.county}</span>
        )}
      </div>
    </div>
  )
}

// Main Calendar View Component
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<JobEvent[]>(sampleJobs)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<JobEvent | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)

  // Event handlers
  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate)
  }


  const handleSelectEvent = (event: JobEvent) => {
    setSelectedEvent(event)
    setSelectedSlot(null)
    setShowEventDialog(true)
  }

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedEvent(null)
    setSelectedSlot(slotInfo)
    setShowEventDialog(true)
  }

  const handleSaveEvent = (eventData: JobEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? eventData : e))
    } else {
      // Create new event
      setEvents(prev => [...prev, { ...eventData, id: Date.now().toString() }])
    }
    setShowEventDialog(false)
    setSelectedEvent(null)
    setSelectedSlot(null)
  }

  const handleCloseDialog = () => {
    setShowEventDialog(false)
    setSelectedEvent(null)
    setSelectedSlot(null)
  }

  const handleCreateCEP5 = () => {
    // Placeholder for CEP-5 form integration
    console.log('Creating CEP-5 form...')
  }

  // Event style getter
  const eventStyleGetter = (event: JobEvent) => {
    const getJobTypeColor = (jobType: string) => {
      switch (jobType) {
        case 'inspection': return { backgroundColor: '#dbeafe', borderColor: '#3b82f6' }
        case 'installation': return { backgroundColor: '#dcfce7', borderColor: '#22c55e' }
        case 'maintenance': return { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }
        case 'repair': return { backgroundColor: '#fee2e2', borderColor: '#ef4444' }
        case 'pumping': return { backgroundColor: '#e9d5ff', borderColor: '#a855f7' }
        default: return { backgroundColor: '#f3f4f6', borderColor: '#6b7280' }
      }
    }

    return {
      style: {
        ...getJobTypeColor(event.jobType || 'inspection'),
        borderRadius: '8px',
        border: '1px solid',
        color: '#1f2937',
        fontSize: '12px',
        fontWeight: '500'
      }
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Seamless Header with Navigation */}
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {moment(currentDate).format('MMMM YYYY')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {`${moment(currentDate).startOf('week').format('MMM D')} - ${moment(currentDate).endOf('week').format('MMM D, YYYY')}`}
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(moment(currentDate).subtract(1, 'week').toDate())}
                className="h-9 px-4"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(new Date())}
                className="h-9 px-4"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(moment(currentDate).add(1, 'week').toDate())}
                className="h-9 px-4"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Seamless Calendar Component */}
      <div className="flex-1">
        <div className="h-full">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            defaultView={Views.WEEK}
            date={currentDate}
            onNavigate={handleNavigate}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            toolbar={false}
            components={{
              event: EventComponent
            }}
            step={30}
            timeslots={2}
            min={new Date(2024, 0, 1, 6, 0)} // 6 AM
            max={new Date(2024, 0, 1, 20, 0)} // 8 PM
            showMultiDayTimes
            allDayMaxRows={2}
            popup
            popupOffset={30}
            className="rbc-calendar"
          />
        </div>
      </div>

      {/* Job Type Legend */}
      <div className="px-8 py-4">
        <div className="calendar-legend flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span className="text-gray-600">CEP-5 Inspection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span className="text-gray-600">Installation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wrench className="w-4 h-4 text-amber-600" />
            <span className="text-gray-600">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-gray-600">Repair</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-violet-600" />
            <span className="text-gray-600">Pumping</span>
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <EventDialog
        isOpen={showEventDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveEvent}
        selectedDate={selectedSlot?.start}
        selectedTimeSlot={selectedSlot || undefined}
        event={selectedEvent}
      />
    </div>
  )
}

export default CalendarView