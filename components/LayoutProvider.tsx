"use client"
import { DashboardProvider } from "@/contexts/DashboardContext"
import { ModalProvider } from "@/contexts/ModalContext"
import React from "react"
import Loader from "@/components/common/Loader"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Alert from "@/components/Alert"
import CheckinModal from "./Modals/CheckinModal"

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublicPage = pathname === "/login"

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const renderPrivateLayout = () => (
    <DashboardProvider>
      <CheckinModal /> {/* Conditionally render the modal */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden`}>
        <Alert />
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
        </main>
      </div>
    </DashboardProvider>
  )

  const renderPublicLayout = () => <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden justify-center items-center`}>{children}</div>

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ModalProvider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{loading ? <Loader /> : <div className={`flex h-screen overflow-hidden`}>{isPublicPage ? renderPublicLayout() : renderPrivateLayout()}</div>}</div>
        </ModalProvider>
      </body>
    </html>
  )
}

export default LayoutProvider
