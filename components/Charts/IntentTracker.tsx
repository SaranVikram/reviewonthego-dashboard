"use client"
import { ApexOptions } from "apexcharts"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import api from "@/utils/api"

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })

interface IntentTrackerState {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
}

const IntentTracker: React.FC = () => {
  const [state, setState] = useState<IntentTrackerState>({
    series: [85],
  })

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/support-tickets-data`)
      } catch (error) {
        console.error("An error occurred while fetching data:", error)
      }
    }

    fetchData()
  }, []) // Empty dependency array means this useEffect runs once when the component mounts

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          strokeWidth: "80%", // Adjust the width of the track
          margin: 5, // margin is in pixel
        },
        hollow: {
          margin: 1, // Adjust as needed
          size: "50%", // Adjust the percentage to control the width of the bars
          // Other properties like background, image, etc.
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 30,
          },
          value: {
            offsetY: -10,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%"
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.5,
        gradientToColors: ["#007882"], // Colors to create gradient with
        opacityFrom: 0.3,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
      dashArray: 0,
    },
    labels: ["Happy Meter"],
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div>
        <h4 className="text-xl font-semibold text-black dark:text-white">Customer Happiness Meter</h4>
        <p>Last 7 days</p>
      </div>
      <div className="flex items-center justify-center">
        <ApexCharts options={options} series={state.series} type="radialBar" height={350} />
      </div>
    </div>
  )
}

export default IntentTracker
