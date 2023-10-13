"use client"
import { Metadata } from "next"
import React, { useState, useEffect, useRef } from "react"
import api from "@/utils/api"
import FlagList from "@/components/Modals/FlagList"
import { useUiContext } from "@/contexts/UiContext"
import { useRouter } from "next/navigation"
import axios from "axios"

export const metadata: Metadata = {
  title: "Login page | Reviewonthego",
  description: "This is login page for reviewonthego dashboard",
  // other metadata
}

const LoginPage: React.FC = () => {
  const router = useRouter()

  const { dispatch } = useUiContext()
  const [showList, setShowList] = useState<boolean>(false)
  const [phoneRequest, setPhoneRequest] = useState<boolean>(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)

  const otpInput1 = useRef<HTMLInputElement>(null)
  const otpInput2 = useRef<HTMLInputElement>(null)
  const otpInput3 = useRef<HTMLInputElement>(null)
  const otpInput4 = useRef<HTMLInputElement>(null)

  const [backgroundPosition, setBackgroundPosition] = useState<string>("-2413px 0")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [otp, setOtp] = useState<string[]>(["", "", "", ""])

  const toggleList = (): void => {
    setShowList(!showList)
  }

  const combineOtp = (otp: string[]): number => {
    return parseInt(otp.join(""), 10)
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (containerRef.current && ulRef.current && !ulRef.current.contains(event.target as Node)) {
      setShowList(false)
    }
  }

  const handleCountryClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    const dialCode = event.currentTarget.getAttribute("data-dial-code")
    if (dialCode !== null) {
      setCountryCode(dialCode)
    }
    let newBackgroundPosition = "-2413px 0" // Default value

    switch (dialCode) {
      case "61":
        newBackgroundPosition = "-286px 0"
        break
      case "91":
        newBackgroundPosition = "-2413px 0"
        break
      case "1":
        newBackgroundPosition = "-5241px 0"
        break
      default:
        break
    }
    setBackgroundPosition(newBackgroundPosition)
    setShowList(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, nextInput?: React.RefObject<HTMLInputElement>) => {
    const newOtp = [...otp]
    newOtp[index] = e.target.value
    setOtp(newOtp)

    if (e.target.value.length === 1 && nextInput?.current) {
      nextInput.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, prevInput?: React.RefObject<HTMLInputElement>, nextInput?: React.RefObject<HTMLInputElement>) => {
    if (e.key === "Backspace" && prevInput?.current) {
      const newOtp = [...otp]
      newOtp[index] = ""
      setOtp(newOtp)
      prevInput.current.focus()
    } else if (e.key === "ArrowRight" && nextInput?.current) {
      nextInput.current.focus()
    } else if (e.key === "ArrowLeft" && prevInput?.current) {
      prevInput.current.focus()
    }
  }

  const handlePhoneRequest = async () => {
    const mobile = `${countryCode}${phoneNumber}`

    // Verify the mobile number here, if needed
    if (!mobile || mobile.length < 10) {
      dispatch({
        type: "SET_ALERT",
        payload: { type: "error", message: "Invalid mobile number" },
      })
      return
    }
    try {
      const response = await api.post("/login", {
        mobile,
      })
      if (response.data) {
        dispatch({
          type: "SET_ALERT",
          payload: {
            type: "success",
            message: "Please enter the OTP sent to your mobile number",
          },
        })
      }
      setPhoneRequest(false)
      // Handle success case
    } catch (error: any) {
      console.log("Error:", error)
      dispatch({
        type: "SET_ALERT",
        payload: { type: "error", message: error.response.data.message },
      })
    }
  }

  const handleSubmitOtp = async () => {
    const combinedOtp = combineOtp(otp) // Assuming otp is your OTP array

    try {
      const response = await api.post("/verify-otp", {
        otp: combinedOtp,
      })

      // Handle successful OTP verification
      // For example, you might receive a token in the response data
      const token = response.data.token
      if (response.data) {
        dispatch({
          type: "SET_ALERT",
          payload: { type: "success", message: "Authenticated Successfully" },
        })
        router.push("/")
      }
    } catch (error: any) {
      // You can use 'any' to bypass TypeScript's type checking
      if (axios.isAxiosError(error)) {
        // Handle errors returned by the server
        if (error.response) {
          console.error("Server error:", error.response.data.error)
          dispatch({
            type: "SET_ALERT",
            payload: { type: "error", message: error.response.data.error },
          })
          setPhoneRequest(true)
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request)
          dispatch({
            type: "SET_ALERT",
            payload: { type: "error", message: error.request },
          })
        }
      } else {
        // Handle other errors
        console.error("An error occurred:", error.message)
        dispatch({
          type: "SET_ALERT",
          payload: { type: "error", message: error.message },
        })
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-[450px] rounded-lg border border-formstrokedark py-[30px] px-[100px] bg-white">
      <div className="w-[170px] mt-5 mb-6 mx-auto block" style={{ height: "fit-content" }}>
        <img src="/images/brand/brand-01.svg" alt="" title="" height="35" />
      </div>
      <h1 className="text-center text-black font-normal text-lg !leading-9 mb-5">Hello, who’s this?</h1>
      <form className="flex flex-col mx-auto my-0">
        <div className="relative block m-0 rounded-[4px] !mb-4 w-full">
          <div className="absolute left-0 right-auto top-0 bottom-0 p-[1px]">
            <div ref={containerRef} className="relative cursor-pointer z-1 w-[46px] h-full flex justify-center items-center" tabIndex={0} title="India (भारत): +91" onClick={toggleList}>
              <div
                className="w-[20px] h-[14px] bg-[top] bg-no-repeat bg-gray-400"
                style={{
                  backgroundPosition: backgroundPosition,
                  boxShadow: "0 0 1px 0 #888",
                  backgroundImage: "url('/images/flags.02985cd6.png')",
                }}
              ></div>
              <div className="arrow down text-[6px] ml-[5px]"></div>
            </div>
            {showList && <FlagList ulRef={ulRef} handleCountryClick={handleCountryClick} />}
          </div>
          <input type="tel" autoComplete="off" className="py-4 !m-0 pr-[6px] pl-[52px] relative w-full border border-forminput focus:border-secondary" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
        </div>
        <div style={{ display: "flex" }} className="w-full mx-auto my-0 justify-between !mb-4">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input ref={otpInput1} type="tel" aria-label="Please enter verification code. Digit 1" autoComplete="off" style={{ width: "1em", textAlign: "center" }} className="block font-normal leading-normal text-black bg-white bg-clip-padding appearance-none rounded p-[10px] !w-[50px] border border-forminput focus:border-secondary" maxLength={1} value={otp[0]} onChange={(e) => handleInputChange(e, 0, otpInput2)} onKeyDown={(e) => handleKeyDown(e, 0, undefined, otpInput2)} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input ref={otpInput2} type="tel" aria-label="Digit 2" autoComplete="off" style={{ width: "1em", textAlign: "center" }} className="block font-normal leading-normal text-black bg-white bg-clip-padding appearance-none rounded p-[10px] !w-[50px] border border-forminput focus:border-secondary" maxLength={1} value={otp[1]} onChange={(e) => handleInputChange(e, 1, otpInput3)} onKeyDown={(e) => handleKeyDown(e, 1, otpInput1, otpInput3)} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input ref={otpInput3} type="tel" aria-label="Digit 3" autoComplete="off" style={{ width: "1em", textAlign: "center" }} className="block font-normal leading-normal text-black bg-white bg-clip-padding appearance-none rounded p-[10px] !w-[50px] border border-forminput focus:border-secondary" maxLength={1} value={otp[2]} onChange={(e) => handleInputChange(e, 2, otpInput4)} onKeyDown={(e) => handleKeyDown(e, 2, otpInput2, otpInput4)} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input ref={otpInput4} type="tel" aria-label="Digit 4" autoComplete="off" style={{ width: "1em", textAlign: "center" }} className="block font-normal leading-normal text-black bg-white bg-clip-padding appearance-none rounded p-[10px] !w-[50px] border border-forminput focus:border-secondary" maxLength={1} value={otp[3]} onChange={(e) => handleInputChange(e, 3)} onKeyDown={(e) => handleKeyDown(e, 3, otpInput3, undefined)} />
          </div>
        </div>
        {phoneRequest ? (
          <button type="button" className="cursor-pointer text-[#fff] bg-primary border-primary text-sm py-2 px-4" onClick={handlePhoneRequest}>
            Login
          </button>
        ) : (
          <button type="button" className="cursor-pointer text-[#fff] bg-primary border-primary text-sm py-2 px-4" onClick={handleSubmitOtp}>
            verify
          </button>
        )}
      </form>
    </div>
  )
}

export default LoginPage
