"use client";
import React from "react";
import Loader from "@/components/common/Loader";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Alert from "@/components/Alert";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = pathname === "/login";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className={`flex h-screen overflow-hidden `}>
              {/* <!-- ===== Sidebar Start ===== --> */}

              {!isPublicPage && (
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              )}
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div
                className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${
                  isPublicPage ? "justify-center items-center" : ""
                }`}
              >
                <Alert />
                {/* <!-- ===== Header Start ===== --> */}

                {!isPublicPage && (
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                )}
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

export default LayoutProvider;
