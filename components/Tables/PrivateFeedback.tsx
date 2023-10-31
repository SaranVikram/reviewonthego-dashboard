"use client"
import { useState, useEffect } from "react"
import { useDashboard } from "@/contexts/DashboardContext"
import api from "@/utils/api"

const PrivateFeedback = () => {
  const { state, dispatch } = useDashboard()
  const [dateFilter, setDateFilter] = useState("today") // default filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/client-reviews`, {
          params: {
            dateFilter,
          },
        })

        if (response.status === 200) {
          dispatch({ type: "UPDATE_PRIVATE_FEEDBACK", payload: { period: dateFilter, total: state.privateFeedback[dateFilter as keyof typeof state.privateFeedback].total, details: response.data } }) // Replace details with actual data
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [dateFilter])
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
              <th className=" py-4 px-4 font-medium text-black dark:text-white">Feedback</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Rating</th>
            </tr>
          </thead>
          <tbody>
            {state.privateFeedback[dateFilter as keyof typeof state.customerCheckins].details.map((FeedbackDetail, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{FeedbackDetail.customerName}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{FeedbackDetail.phoneNumber}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{FeedbackDetail.reviewText}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${FeedbackDetail.rating >= 4 ? "text-success bg-success" : FeedbackDetail.rating <= 2 ? "text-danger bg-danger" : "text-warning bg-warning"}`}>{FeedbackDetail.rating}</p>
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
