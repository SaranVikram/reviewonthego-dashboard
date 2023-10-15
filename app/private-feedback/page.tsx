import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import PrivateFeedback from "@/components/Tables/PrivateFeedback"

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Customers | Reviewonthego Dashboard ",
  description: "A detailed tables for customer interactions ",
  // other metadata
}

function Feedback() {
  return (
    <>
      <Breadcrumb pageName="Private Feedback" />

      <div className="flex flex-col gap-10">
        <PrivateFeedback />
      </div>
    </>
  )
}

export default Feedback
