import CardVideos from '@/components/cards/CardVideos'
import React from 'react'

function Videos() {
  return (
    <>
      <div>
        {/* {loading ? (
          <LoadingAnimation />
        ) : ( */}
          <div className="m-10 px-9">
            <CardVideos  />
          </div>
        {/* )} */}
      </div>
    </>
  )
}

export default Videos