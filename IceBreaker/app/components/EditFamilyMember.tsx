'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateFamilyMember } from "../actions/family-actions"

type FamilyMember = {
  id: string
  name: string
  relationship: string
}

type EditFamilyMemberProps = {
  member: FamilyMember
  onClose: () => void
  userId: string
}

export function EditFamilyMember({ member, onClose, userId }: EditFamilyMemberProps) {
  const [formData, setFormData] = useState({
    name: member.name,
    relationship: member.relationship,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateFamilyMember(userId, member.id, formData)
      onClose()
    } catch (error) {
      console.error('Error updating family member:', error)
      alert('Failed to update family member. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Family Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Input
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}