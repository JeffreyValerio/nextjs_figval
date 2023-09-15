import ContentLayout from '@/app/layouts/ContentLayout'
import { strapiFetch } from '@/libs'
import React from 'react'

const AboutUsPage = async () => {

    const [resAboutPage] = await Promise.all([
        strapiFetch('/about-us', 'force-cache')
    ])
  return (
    <div>
        <h1>Quiénes somos</h1>

    </div>
  )
}

export default AboutUsPage