"use client"
import React, { useEffect } from "react"
import { useUiContext } from "@/contexts/UiContext"

function Alert() {
  const { alert, dispatch } = useUiContext()

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        // Clear the alert
        dispatch({
          type: "CLEAR_ALERT",
        })
      }, 3000)

      return () => clearTimeout(timer) // This will clear the timeout if the component is unmounted
    }
  }, [alert, dispatch])
  return (
    <div className={`alert-wrapper fixed top-22 right-0 z-50 animate-slideFade ${alert.message ? "block" : "hidden"}`}>
      {alert.type === "info" && (
        <div className="flex max-h-full max-w-full border-l-6 border-warning bg-warning bg-opacity-[30%] px-3 py-2 md:px-7 md:py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="w-full">
            <h5 className="mb-3 text-sm md:text-lg font-semibold text-[#9D5425]">Attention needed</h5>
            <p className="leading-relaxed text-sm md:text-lg text-[#D0915C]">{alert.message}</p>
          </div>
        </div>
      )}
      {alert.type === "success" && (
        <div className="flex max-h-full max-w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[30%] px-3 py-2 md:px-7 md:py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="w-full">
            <h5 className="mb-3 text-sm md:text-lg font-semibold text-black dark:text-[#34D399] ">Success</h5>
            <p className=" leading-relaxed text-sm md:text-lg text-body">{alert.message}</p>
          </div>
        </div>
      )}

      {alert.type === "error" && (
        <div className="flex max-h-full max-w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[30%] px-3 py-2 md:px-7 md:py-8  shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="w-full">
            <h5 className="mb-3 text-sm md:text-lg font-semibold text-[#B45454]">Error</h5>
            <ul>
              <li className="leading-relaxed text-sm md:text-lg text-[#B45454]">{alert.message}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alert
