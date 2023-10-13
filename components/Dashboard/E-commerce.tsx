"use client"
import React, { useState, useEffect } from "react"
import ChartOne from "../Charts/ChartOne"
import ChartThree from "../Charts/ChartThree"
import ChartTwo from "../Charts/ChartTwo"
import ChatCard from "../Chat/ChatCard"
import TableOne from "../Tables/TableOne"
import CardDataStats from "../CardDataStats"
import api from "@/utils/api"
import { useDashboard } from "@/contexts/DashboardContext"

// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic"

const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
})

const ECommerce: React.FC = () => {
  const { state, dispatch } = useDashboard()
  const [dateFilter, setDateFilter] = useState("today") // default filter

  const fetchStats = async () => {
    try {
      const response = await api.get(`/client-stats?dateFilter=${dateFilter}`)
      if (response.status === 200) {
        const { pageviewsCount, reviewsCount, checkinsCount } = response.data

        // Dispatch actions to update the state
        dispatch({ type: "UPDATE_PAGE_VISITS", payload: { period: dateFilter, total: pageviewsCount } })
        dispatch({ type: "UPDATE_CHECKINS", payload: { period: dateFilter, total: checkinsCount, details: [] } }) // Replace details with actual data
        dispatch({ type: "UPDATE_PRIVATE_FEEDBACK", payload: { period: dateFilter, total: reviewsCount, details: [] } }) // Replace details with actual data
      } else {
        console.error("Failed to fetch stats:", response.status, response.statusText)
      }
    } catch (err) {
      console.error("Error fetching stats:", err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [dateFilter]) // re-fetch when dateFilter changes
  console.log(state)

  return (
    <>
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap mb-5">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">Analytics</h4>
          </div>
          <div className="flex w-full max-w-45 justify-end">
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
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Page Visits" total={state.pageVisits[dateFilter as keyof typeof state.pageVisits].total}>
            <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill="" />
              <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill="" />
            </svg>
          </CardDataStats>
          <CardDataStats title="Customer Checkins" total={state.customerCheckins[dateFilter as keyof typeof state.customerCheckins].total}>
            <svg className="fill-primary dark:fill-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
          </CardDataStats>
          <CardDataStats title="Negative Feedbacks" total={state.privateFeedback[dateFilter as keyof typeof state.privateFeedback].total}>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                {" "}
                <path fill="none" d="M0 0h24v24H0z" /> <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z" />{" "}
              </g>{" "}
            </svg>
          </CardDataStats>
          <CardDataStats title="Positive Ratings on GMB" total={state.pageVisits[dateFilter as keyof typeof state.pageVisits].total}>
            <svg className="fill-primary dark:fill-white" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />{" "}
            </svg>
          </CardDataStats>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  )
}

export default ECommerce
