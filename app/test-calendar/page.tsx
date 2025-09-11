"use client"

import CalendarView from "@/components/calendar-view"

export default function TestCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendar Test Page</h1>
        <div className="h-[800px]">
          <CalendarView />
        </div>
      </div>
    </div>
  )
}
