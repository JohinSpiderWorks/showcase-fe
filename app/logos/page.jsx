import CardsLogo from '@/components/cards/CardsLogo'
import React from 'react'

function Logo() {
  return (
    <>
    <div>
      {/* {loading ? (
        <LoadingAnimation />
      ) : ( */}
        <div className="p-7">
          <CardsLogo />
        </div>
      {/* )} */}
    </div>
  </>
  )
}

export default Logo