"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Phone, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Contact {
  id: string
  name: string
  relationship: string
  notes: string
  lastContact: string
  reminderType: string
}

interface ConnectionPlannerProps {
  defaultContacts: string[]
  reminderOptions: string[]
  storageKey?: string
}

export function ConnectionPlanner({
  defaultContacts,
  reminderOptions,
  storageKey = "social-connections",
}: ConnectionPlannerProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [mounted, setMounted] = useState(false)

  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    notes: "",
    reminderType: reminderOptions[0],
  })

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setContacts(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored contacts:", e)
      }
    } else {
      // Initialize with default contacts
      const initialContacts: Contact[] = defaultContacts.map((name, index) => ({
        id: `default-${index}`,
        name,
        relationship: "Friend",
        notes: "Add notes about your connection...",
        lastContact: "Never",
        reminderType: reminderOptions[0],
      }))
      setContacts(initialContacts)
    }
  }, [defaultContacts, reminderOptions, storageKey])

  useEffect(() => {
    if (mounted && contacts.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(contacts))
    }
  }, [contacts, storageKey, mounted])

  const addContact = () => {
    if (!newContact.name.trim()) return

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name.trim(),
      relationship: newContact.relationship || "Friend",
      notes: newContact.notes.trim() || "Add notes about your connection...",
      lastContact: "Never",
      reminderType: newContact.reminderType,
    }

    setContacts((prev) => [...prev, contact])
    setNewContact({ name: "", relationship: "", notes: "", reminderType: reminderOptions[0] })
    setIsAddingContact(false)
  }

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts((prev) => prev.map((contact) => (contact.id === id ? { ...contact, ...updates } : contact)))
  }

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  const markAsContacted = (id: string) => {
    updateContact(id, { lastContact: new Date().toLocaleDateString() })
  }

  if (!mounted) {
    return <div className="animate-pulse bg-muted rounded-xl h-96" />
  }

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <span>Connection Planner</span>
        </CardTitle>
        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Connection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Relationship (Friend, Family, Mentor, etc.)"
                value={newContact.relationship}
                onChange={(e) => setNewContact((prev) => ({ ...prev, relationship: e.target.value }))}
              />
              <Select
                value={newContact.reminderType}
                onValueChange={(value) => setNewContact((prev) => ({ ...prev, reminderType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reminderOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Notes about this connection..."
                value={newContact.notes}
                onChange={(e) => setNewContact((prev) => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                  Cancel
                </Button>
                <Button onClick={addContact}>Add Contact</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-muted/50 rounded-lg border border-border/50 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{contact.name}</h4>
                  <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingContact(contact)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteContact(contact.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{contact.notes}</p>

              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  <span>Last contact: {contact.lastContact}</span>
                  <span className="mx-2">•</span>
                  <span>{contact.reminderType}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => markAsContacted(contact.id)} className="text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Called
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => markAsContacted(contact.id)} className="text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Messaged
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No connections added yet. Start building your support network!</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Contact Dialog */}
      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Connection</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={editingContact.name}
                onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
              />
              <Input
                placeholder="Relationship"
                value={editingContact.relationship}
                onChange={(e) => setEditingContact({ ...editingContact, relationship: e.target.value })}
              />
              <Select
                value={editingContact.reminderType}
                onValueChange={(value) => setEditingContact({ ...editingContact, reminderType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reminderOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Notes"
                value={editingContact.notes}
                onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingContact(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateContact(editingContact.id, editingContact)
                    setEditingContact(null)
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
