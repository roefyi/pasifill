"use client"

import { useState } from "react"
import CalendarView from "@/components/calendar-view"

export default function TestCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleDateChange = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendar Test Page</h1>
        <div className="h-[800px]">
          <CalendarView 
            currentDate={currentDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  )
}
