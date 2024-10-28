'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type FamilyMember = {
  id: string
  name: string
  relationship: string
  allocation: number
}

export default function FamilyAllocationPage() {
  const searchParams = useSearchParams()
  const accountIds = searchParams.get('accounts')?.split(',') || []
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Rahul Sharma', relationship: 'Father', allocation: 0 },
    { id: '2', name: 'Geeta Sharma', relationship: 'Mother', allocation: 0 },
    { id: '3', name: 'Simran Sharma', relationship: 'Spouse', allocation: 0 },
    { id: '4', name: 'Kunal Sharma', relationship: 'Child', allocation: 0 },
  ])

  const [totalAllocation, setTotalAllocation] = useState(0)

  useEffect(() => {
    const newTotal = familyMembers.reduce((sum, member) => sum + member.allocation, 0)
    setTotalAllocation(newTotal)
  }, [familyMembers])

  const handleAllocationChange = (id: string, value: number) => {
    setFamilyMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, allocation: value } : member
      )
    )
  }

  const handleSubmit = () => {
    if (totalAllocation !== 100) {
      alert('Total allocation must be 100%')
      return
    }
    console.log('Submitting allocations for accounts:', accountIds)
    console.log('Family member allocations:', familyMembers)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Allocate Nominees</h1>
      <p className="mb-4">Allocate percentages to family members for the selected accounts: {accountIds.join(', ')}</p>
      <div className="space-y-4">
        {familyMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name} ({member.relationship})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`allocation-${member.id}`}>Allocation %</Label>
                <Input
                  id={`allocation-${member.id}`}
                  type="number"
                  min="0"
                  max="100"
                  value={member.allocation}
                  onChange={(e) => handleAllocationChange(member.id, Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Label>Total Allocation</Label>
        <Progress value={totalAllocation} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {totalAllocation}% allocated (must be 100%)
        </p>
      </div>
      <Button onClick={handleSubmit} className="mt-6" disabled={totalAllocation !== 100}>
        Submit Allocations
      </Button>
    </div>
  )
}