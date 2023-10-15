"use client"
import React, { useEffect, createContext, useContext, useReducer, Dispatch } from "react"
import { useRouter } from "next/navigation"
import api from "@/utils/api"

// Define the shape of your state
interface CheckinDetail {
  customerName: string
  phoneNumber: string
  isMsgOpen: boolean
}

interface FeedbackDetail {
  name: string
  mobile: string
  feedback: string
}

interface CheckinState {
  total: number
  details: CheckinDetail[]
}

interface FeedbackState {
  total: number
  details: FeedbackDetail[]
}

interface CustomerData {
  name: string
  company: string
  mobile: string
  email: string
  whatsappApiLimit: number
  status: "active" | "inactive"
}
interface PageVisitDetails {
  total: number
}

interface PageVisits {
  today: PageVisitDetails
  thisWeek: PageVisitDetails
  thisMonth: PageVisitDetails
}
interface DashboardState {
  customerData: null | CustomerData // Replace 'any' with the shape of your customer data
  pageVisits: PageVisits
  customerCheckins: {
    today: CheckinState
    thisWeek: CheckinState
    thisMonth: CheckinState
  }
  privateFeedback: {
    today: FeedbackState
    thisWeek: FeedbackState
    thisMonth: FeedbackState
  }
}

// Define the shape of your actions
type DashboardAction =
  | { type: "SET_CUSTOMER_DATA"; payload: CustomerData } // Replace 'any' with the shape of your customer data
  | { type: "UPDATE_PAGE_VISITS"; payload: { period: string; total: number } }
  | { type: "UPDATE_CHECKINS"; payload: { period: string; total: number; details: CheckinDetail[] } }
  | { type: "UPDATE_PRIVATE_FEEDBACK"; payload: { period: string; total: number; details: FeedbackDetail[] } }
  | { type: "UPDATE_WHATSAPP_LIMIT"; payload: number }

// Initial state
const initialState: DashboardState = {
  customerData: {
    name: "John Doe",
    company: "Example Corp",
    mobile: "123-456-7890",
    email: "john.doe@example.com",
    whatsappApiLimit: 0,
    status: "inactive",
  },
  pageVisits: {
    today: {
      total: 0,
    },
    thisWeek: {
      total: 0,
    },
    thisMonth: {
      total: 0,
    },
  },
  customerCheckins: {
    today: { total: 0, details: [] },
    thisWeek: { total: 0, details: [] },
    thisMonth: { total: 0, details: [] },
  },
  privateFeedback: {
    today: { total: 0, details: [] },
    thisWeek: { total: 0, details: [] },
    thisMonth: { total: 0, details: [] },
  },
}

// Reducer function
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case "SET_CUSTOMER_DATA":
      return { ...state, customerData: action.payload }
    case "UPDATE_PAGE_VISITS":
      return {
        ...state,
        pageVisits: {
          ...state.pageVisits,
          [action.payload.period]: {
            total: action.payload.total,
          },
        },
      }
    case "UPDATE_CHECKINS":
      return {
        ...state,
        customerCheckins: {
          ...state.customerCheckins,
          [action.payload.period]: {
            total: action.payload.total,
            details: action.payload.details,
          },
        },
      }

    case "UPDATE_PRIVATE_FEEDBACK":
      return {
        ...state,
        privateFeedback: {
          ...state.privateFeedback,
          [action.payload.period]: {
            total: action.payload.total, // Use total from action payload
            details: action.payload.details,
          },
        },
      }
    default:
      return state
  }
}

// Create context
const DashboardContext = createContext<{ state: DashboardState; dispatch: Dispatch<DashboardAction> } | undefined>(undefined)

// Custom hook to use the DashboardContext
export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

// Provider component
interface DashboardProviderProps {
  children: React.ReactNode
}

const fetchCustomerData = async (dispatch: React.Dispatch<DashboardAction>, router: ReturnType<typeof useRouter>) => {
  try {
    const response = await api.get("/client-profile")

    if (response.status === 200) {
      dispatch({ type: "SET_CUSTOMER_DATA", payload: response.data })
    } else {
      console.error("Failed to fetch customer data:", response.status, response.statusText)
    }
  } catch (error: any) {
    console.error("An error occurred while fetching customer data:", error)
    if (error.response && error.response.status === 401) {
      // Redirect to login page if status code is 401
      router.push("/login")
    }
  }
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)
  const router = useRouter() // Initialize the useRouter hook

  useEffect(() => {
    fetchCustomerData(dispatch, router)
  }, []) // Empty dependency array means this useEffect runs once when the component mounts

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>
}
