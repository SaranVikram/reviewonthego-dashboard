"use client"
import { useState } from "react"
import { Package } from "@/types/package"

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
]

const PrivateFeedback = () => {
  const [dateFilter, setDateFilter] = useState("today") // default filter
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex w-full max-w-45 ml-auto mb-5">
        <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
          <button onClick={() => setDateFilter("today")} className={`rounded ${dateFilter === "today" ? "bg-white shadow-card" : ""}  py-1 px-3 text-xs font-medium text-black  hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark`}>
            Day
          </button>
          <button onClick={() => setDateFilter("thisWeek")} className={`rounded ${dateFilter === "thisWeek" ? "bg-white shadow-card" : ""} py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
            Week
          </button>
          <button onClick={() => setDateFilter("thisMonth")} className={`rounded ${dateFilter === "thisMonth" ? "bg-white shadow-card" : ""} py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
            Month
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4 ">
              <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Phone Number</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Review date</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{packageItem.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.invoiceDate}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.invoiceDate}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === "Paid" ? "text-success bg-success" : packageItem.status === "Unpaid" ? "text-danger bg-danger" : "text-warning bg-warning"}`}>{packageItem.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PrivateFeedback
