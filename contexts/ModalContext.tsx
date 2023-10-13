"use client"
import React, { createContext, useState, useContext, ReactNode } from "react"

interface ModalContextProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider")
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return <ModalContext.Provider value={{ showModal, setShowModal }}>{children}</ModalContext.Provider>
}
