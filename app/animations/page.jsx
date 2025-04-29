"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "@/components/loadingAnimation/LoadingAnimation";
import CardAnimations from "@/components/cards/CardAnimations";


function Animations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/animations?populate=*`)
      .then((response) => {
        console.log("response", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <div>
            <CardAnimations data={data} />
          </div>
        )}
      </div>
    </>
  );
}

export default Animations;
