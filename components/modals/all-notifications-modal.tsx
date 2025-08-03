"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, DollarSign, Percent, Bell } from "lucide-react"
import { CustomModal } from "@/components/shared/custom-modal"
import type { Notification } from "@/types"

interface AllNotificationsModalProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
}

export function AllNotificationsModal({
  isOpen,
  onClose,
  notifications,
  setNotifications,
}: AllNotificationsModalProps) {
  const [selectedNotificationIds, setSelectedNotificationIds] = useState<string[]>([])
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotificationIds(notifications.map((n) => n.id))
    } else {
      setSelectedNotificationIds([])
    }
  }

  const handleSelectNotification = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedNotificationIds((prev) => [...prev, id])
    } else {
      setSelectedNotificationIds((prev) => prev.filter((nId) => nId !== id))
    }
  }

  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedNotificationIds.includes(n.id)))
    setSelectedNotificationIds([])
    setSelectedNotification(null)
  }

  const handleMarkSelectedAsRead = () => {
    setNotifications((prev) => prev.map((n) => (selectedNotificationIds.includes(n.id) ? { ...n, isRead: true } : n)))
    setSelectedNotificationIds([])
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "recharge":
        return <DollarSign className="w-5 h-5 text-purple-600" />
      case "promotion":
        return <Percent className="w-5 h-5 text-purple-600" />
      default:
        return <Bell className="w-5 h-5 text-purple-600" />
    }
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Notificaciones"
      className="max-w-4xl h-[90vh]"
    >
      <div className="flex flex-1 overflow-hidden">
          {/* Left Pane: Notification List */}
          <div className="w-1/2 border-r p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectedNotificationIds.length === notifications.length && notifications.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Seleccionar todo
                </label>
              </div>
              <div className="flex gap-2">
                {selectedNotificationIds.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDeleteSelected}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Eliminar seleccionados</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-purple-600 hover:bg-purple-50"
                      onClick={handleMarkSelectedAsRead}
                    >
                      Marcar como leído
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                      !notification.isRead ? "bg-purple-50" : "bg-gray-50"
                    } ${selectedNotification?.id === notification.id ? "border-2 border-purple-600" : ""}`}
                    onClick={() => setSelectedNotification(notification)}
                  >
                    <Checkbox
                      id={`notification-${notification.id}`}
                      checked={selectedNotificationIds.includes(notification.id)}
                      onCheckedChange={(checked: boolean) => handleSelectNotification(notification.id, checked)}
                    />
                    <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-10">No hay notificaciones.</p>
              )}
            </div>
          </div>

          {/* Right Pane: Notification Detail */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            {selectedNotification ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedNotification.message}</h3>
                <p className="text-sm text-gray-500">{selectedNotification.time}</p>
                <p className="text-gray-700 leading-relaxed">{selectedNotification.details}</p>
                {!selectedNotification.isRead && (
                  <Button
                    variant="outline"
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                    onClick={() => handleMarkSelectedAsRead()} // Mark only the current one as read
                  >
                    Marcar como leído
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Selecciona una notificación para ver los detalles.
              </div>
            )}
          </div>
        </div>
      </CustomModal>
    )
}
