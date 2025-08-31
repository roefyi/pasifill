"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            "bg-white hover:bg-gray-50 focus:bg-white",
            "border-gray-300 hover:border-gray-400 focus:border-sky-500",
            "text-gray-900 placeholder:text-gray-500",
            "focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
            "transition-colors duration-200",
            !date && "text-gray-500",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          {date ? format(date, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className="rounded-md border-0"
        />
      </PopoverContent>
    </Popover>
  )
}

export function DatePickerWithPresets({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false
}: DatePickerProps) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  return (
    <div className="space-y-3">
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange?.(today)}
          className="h-8 px-2 text-xs"
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange?.(tomorrow)}
          className="h-8 px-2 text-xs"
        >
          Tomorrow
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange?.(nextWeek)}
          className="h-8 px-2 text-xs"
        >
          Next Week
        </Button>
      </div>
    </div>
  )
}
