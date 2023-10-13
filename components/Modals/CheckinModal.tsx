"use client"
import React, { useState, FormEvent, useRef, useEffect, MouseEvent } from "react"
import { useUiContext } from "@/contexts/UiContext"
import { useModalContext } from "@/contexts/ModalContext"
import api from "@/utils/api"

export default function CheckinModal() {
  const { dispatch } = useUiContext()
  const { showModal, setShowModal } = useModalContext()
  const [customerName, setCustomerName] = useState<string>("")
  const [customerPhone, setCustomerPhone] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const modalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCountryCode("+91")
    setShowModal(false)
    try {
      if (!customerName) {
        dispatch({
          type: "SET_ALERT",
          payload: { type: "error", message: "please enter customer name" },
        })
        return
      }
      if (!customerPhone || customerPhone.length >= 11) {
        dispatch({
          type: "SET_ALERT",
          payload: { type: "error", message: "please enter valid phone number" },
        })
        return
      }
      const phoneNumber = countryCode + customerPhone
      const response = await api.post("/customer-checkin", {
        customerName,
        phoneNumber,
      })
      dispatch({
        type: "SET_ALERT",
        payload: {
          type: "success",
          message: response.data.success,
        },
      })
      setCountryCode("+91")
      setCustomerName("")
      setCustomerPhone("")
      setShowModal(false)
    } catch (error: any) {
      dispatch({
        type: "SET_ALERT",
        payload: { type: "error", message: error.response.data.error },
      })

      setCountryCode("+91")
      setCustomerName("")
      setCustomerPhone("")
      setShowModal(false)
    }
  }

  const handleClose = () => {
    setCountryCode("+91")
    setShowModal(false)
  }

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false) // Close the modal if clicked outside
    }
  }

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-w-lg my-6 mx-auto w-auto">
              {/*content*/}
              <div className="flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md box-border outline-0 ">
                {/*header*/}
                <div className="flex flex-col p-10 border-none justify-between rounded-t-md m-0 outline-0 box-border pointer-events-auto font-normal">
                  <div className=" block box-border m-0 p-0 outline-0 outline-inherit font-semibold text-xl mb-0 pointer-events-auto">Customer Checkin</div>
                  <button className="flex items-center justify-center bg-red-300 text-red-600 opacity-80 rounded-full p-4 my-[-1rem] mr-[-1rem] ml-auto absolute top-6 right-6 w-8 h-8 float-right font-semibold text-2xl" onClick={handleClose}>
                    <span className="box-border p-0 m-0 outline-0">×</span>
                  </button>
                </div>
                {/*body*/}
                <div ref={modalRef} className="px-10 pt-0 pb-8 relative flex-grow flex-shrink basis-auto m-0 outline-0 box-border block pointer-events-auto">
                  <form className="m-0 p-0 outline-0 box-border block pointer-events-auto">
                    <div className="mb-10 relative items-center flex p-0 outline-0 box-border">
                      <svg className="fill-primary dark:fill-white absolute top-1 left-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                      </svg>
                      <input name="name" placeholder="Customer Name" type="text" id="name" className=" pl-8 py-2 pr-2 block w-full font-normal bg-white bg-clip-padding text-gray-700 overflow-visible border-b border-solid border-gray-300 rounded-none h-10 outline-none" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)} autoFocus />
                    </div>
                    <div className="relative mb-10 items-center flex">
                      <div className="p-0 md:flex-grow-0 md:flex-shrink-0 md:basis-1/3 w-full md:max-w-[33.33333%] m-0 block">
                        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value)} value={countryCode} name="countryCode" id="phone" className="block w-full h-10 py-1.5 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded whitespace-nowrap  ">
                          <option value="+91">India</option>
                          <option value="+1">USA</option>
                          <option value="+62">Indonesia</option>
                          {/* <option value="+61">Australia</option>
                      <option value="+65">Singapore</option>
                     
                      <option value="+977">Nepal</option>
                      <option value="+63">Philippines</option>
                      <option value="+971">UAE</option> */}
                        </select>
                      </div>
                      <div className=" relative w-full px-4 py-0 block box-border md:flex-grow-0 md:flex-shrink-0 md:basis-2/3 md:max-w-[66.66667%]">
                        <input name="phone" placeholder="Customer Phone" type="tel" id="phone" className="block w-full font-normal text-base overflow-visible pl-8 border-b border-solid border-gray-300 rounded-none h-10 outline-none py-0 pr-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerPhone(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className={`flex items-center justify-center w-full bg-primary dark:fill-white text-white  cursor-pointer min-w-[140px] h-12 whitespace-nowrap py-0 px-4 `} onClick={handleSubmit}>
                      Check In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : (
        ""
      )}
    </>
  )
}
