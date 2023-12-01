"use client"
import { useState, useEffect } from "react"
import { useDashboard } from "@/contexts/DashboardContext"
import api from "@/utils/api"

const PrivateFeedback = () => {
  const { state, dispatch } = useDashboard()
  const [dateFilter, setDateFilter] = useState("today") // default filter

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Actions</th>
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
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1219.547 1225.016" id="whatsapp">
                        <path fill="#E0E0E0" d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"></path>
                        <linearGradient id="a" x1="609.77" x2="609.77" y1="1190.114" y2="21.084" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stop-color="#20b038"></stop>
                          <stop offset="1" stop-color="#60d66a"></stop>
                        </linearGradient>
                        <path fill="url(#a)" d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"></path>
                        <path fill="#FFF" fill-rule="evenodd" d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z" clip-rule="evenodd"></path>
                        <path fill="#FFF" d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"></path>
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 6.35 6.35" id="coupon">
                        <path d="M 6 1 A 1.0001 1.0001 0 0 0 5 2 L 5 22 A 1.0001 1.0001 0 0 0 6 23 L 10 23 A 1.0001 1.0001 0 0 0 11 22 C 11 21.435868 11.435871 21 12 21 C 12.564129 21 13 21.435868 13 22 A 1.0001 1.0001 0 0 0 14 23 L 18 23 A 1.0001 1.0001 0 0 0 19 22 L 19 2 A 1.0001 1.0001 0 0 0 18 1 L 14 1 A 1.0001 1.0001 0 0 0 13 2 C 13 2.5641323 12.564129 3 12 3 C 11.435871 3 11 2.5641323 11 2 A 1.0001 1.0001 0 0 0 10 1 L 6 1 z M 7 3 L 9.4160156 3 C 9.8594101 4.1066835 10.743347 5 12 5 C 13.256653 5 14.14059 4.1066835 14.583984 3 L 17 3 L 17 7 L 14.003906 7 C 12.670238 7 12.670238 9 14.003906 9 L 17 9 L 17 21 L 14.583984 21 C 14.14059 19.893317 13.256653 19 12 19 C 10.743347 19 9.8594101 19.893317 9.4160156 21 L 7 21 L 7 9 L 10.001953 9 C 11.335623 9 11.335623 7 10.001953 7 L 7 7 L 7 3 z" color="#000" fontFamily="sans-serif" fontWeight="400" overflow="visible" transform="scale(.26458)" style={{ lineHeight: "normal", fontVariantLigatures: "normal", fontVariantPosition: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantAlternates: "normal", fontFeatureSettings: "normal", textIndent: 0, textAlign: "start", textDecorationLine: "none", textDecorationStyle: "solid", textDecorationColor: "#000", textTransform: "none", textOrientation: "mixed", isolation: "auto", mixBlendMode: "normal" }}></path>
                      </svg>
                    </button>
                  </div>
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
