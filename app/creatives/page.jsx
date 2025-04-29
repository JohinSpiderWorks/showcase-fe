"use client"
import Card from '@/components/cards/CardCreateves';
import LoadingAnimation from '@/components/loadingAnimation/LoadingAnimation';
import { BASE_URL } from '@/services/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Creatives() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/creatives?populate=*`)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("error fetching data", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  
  

  return (
    <div>
      {/* {loading ? (
        <LoadingAnimation/>
      ) : ( */}
        <div className="w-full flex flex-col items-center">
          <p className="p-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
         
            
            <div className="flex p-7">
            <Card  />
          </div>
        </div>
      {/* )} */}
    </div>
  );
}


export default Creatives