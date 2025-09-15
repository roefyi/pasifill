"use client"

import { CEP5Form } from "@/components/cep5-form"

export default function TestCEP5Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CEP5 Form Test Page</h1>
        <CEP5Form 
          onSave={(data) => {
            console.log("Form saved:", data)
            alert("Form saved successfully!")
          }}
          onPrint={(data) => {
            console.log("Form printed:", data)
            alert("Form printed!")
          }}
        />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
