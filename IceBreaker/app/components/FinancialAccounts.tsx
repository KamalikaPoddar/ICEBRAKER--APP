'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type Account = {
  id: string
  bankName: string
  hasNominee: boolean
  FIType: string
}

export function FinancialAccounts() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', bankName: 'BankA', hasNominee: true, FIType: 'Savings' },
    { id: '2', bankName: 'BankB', hasNominee: false, FIType: 'Term-Deposit' },
    { id: '3', bankName: 'BankC', hasNominee: false, FIType: 'Recurring-Deposit' },
    { id: '4', bankName: 'BankD', hasNominee: false, FIType: 'Savings' }
  ])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  const handleSelectAll = () => {
    const unregisteredAccountIds = accounts
      .filter(account => !account.hasNominee)
      .map(account => account.id)
    setSelectedAccounts(unregisteredAccountIds)
  }

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    )
  }

  const handleAddNominee = () => {
    console.log('Adding nominee for accounts:', selectedAccounts)
    router.push(`/family-allocation?accounts=${selectedAccounts.join(',')}`)
  }

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Financial Accounts</h1>
      <div className="mb-4">
        <Checkbox
          id="select-all"
          checked={selectedAccounts.length === accounts.filter(a => !a.hasNominee).length}
          onCheckedChange={handleSelectAll}
        />
        <label htmlFor="select-all" className="ml-2">Select All Unregistered</label>
      </div>
      <div className="grid gap-4 pb-20">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.bankName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium">Account Type: {account.FIType}</p>
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${account.hasNominee ? 'text-green-500' : 'text-red-500'}`}>
                    Nominee: {account.hasNominee ? 'Registered' : 'Unregistered'}
                  </p>
                  {!account.hasNominee && (
                    <Checkbox
                      id={`select-${account.id}`}
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={() => handleSelectAccount(account.id)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={handleAddNominee} disabled={selectedAccounts.length === 0}>
          Add Nominee Details
        </Button>
      </div>
    </div>
  )
}