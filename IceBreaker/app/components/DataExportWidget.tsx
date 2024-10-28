'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { exportUserData } from "../actions/data-actions"

type DataCategory = {
  id: string
  name: string
  description: string
}

const dataCategories: DataCategory[] = [
  { id: 'personal', name: 'Personal Information', description: 'Name, contact details, etc.' },
  { id: 'financial', name: 'Financial Accounts', description: 'Bank accounts, investments, etc.' },
  { id: 'family', name: 'Family Information', description: 'Family tree and relationships' },
  { id: 'nominees', name: 'Nominee Details', description: 'Registered nominees for accounts' },
]

export function DataExportWidget({ userId }: { userId: string }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleExportData = async () => {
    try {
      const result = await exportUserData(userId, selectedCategories)
      if (result.success) {
        alert('Data exported successfully!')
      } else {
        alert('Failed to export data. Please try again.')
      }
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('An error occurred while exporting data. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Export Your Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Select the categories of data you want to export:</p>
        <div className="space-y-2">
          {dataCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleSelectCategory(category.id)}
              />
              <label htmlFor={`category-${category.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category.name}
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </label>
            </div>
          ))}
        </div>
        <Button onClick={handleExportData} className="mt-4 w-full" disabled={selectedCategories.length === 0}>
          Export Selected Data
        </Button>
      </CardContent>
    </Card>
  )
}