import CardTheatreAd from '@/components/cards/CardTheatreAd'
import React from 'react'

function TheatreAds() {
  return (
    <>
      <div>
        {/* {loading ? (
          <LoadingAnimation />
        ) : ( */}
          <div className="m-10 px-9">
            <CardTheatreAd />
          </div>
        {/* )} */}
      </div>
    </>
  )
}

export default TheatreAds