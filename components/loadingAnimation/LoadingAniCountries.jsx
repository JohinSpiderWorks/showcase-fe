import React from 'react'

function LoadingAniCountries() {
  return (
    <div className="flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"> {/* Adjusted viewBox and size */}
        <circle fill="#03DBAB" stroke="#03DBAB" strokeWidth="4" r="5" cx="20" cy="50"> {/* Smaller radius */}
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill="#03DBAB" stroke="#03DBAB" strokeWidth="4" r="5" cx="50" cy="50"> {/* Smaller radius */}
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill="#03DBAB" stroke="#03DBAB" strokeWidth="4" r="5" cx="80" cy="50"> {/* Smaller radius */}
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    </div>
  )
}

export default LoadingAniCountries