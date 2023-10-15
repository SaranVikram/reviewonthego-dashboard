import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import CustomerCheckins from "@/components/Tables/CustomerCheckins"
import PrivateFeedback from "@/components/Tables/PrivateFeedback"

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Customers | Reviewonthego Dashboard ",
  description: "A detailed tables for customer interactions ",
  // other metadata
}

function customerCheckins() {
  return (
    <>
      <Breadcrumb pageName="Customer Checkins" />

      <div className="flex flex-col gap-10">
        <CustomerCheckins />
      </div>
    </>
  )
}

export default customerCheckins
