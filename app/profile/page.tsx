import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Image from "next/image"

import { Metadata } from "next"
import NotFound from "@/components/NotFound"
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
}

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <NotFound />
    </>
  )
}

export default Profile
