import ECommerce from "@/components/Dashboard/E-commerce"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reviewonthego | Dashboard Analytics",
  description: "Analytics of user interactions for your review page",
  // other metadata
}

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  )
}
