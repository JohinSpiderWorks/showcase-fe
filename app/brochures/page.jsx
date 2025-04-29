"use client";

import CardsBrochures from "@/components/cards/CardsBrochures";



function Brochures() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${BASE_URL}/api/brochures?populate[brochure_pages][populate]=image_name&populate=thumbnail`
  //     )
  //     .then((response) => {
  //       console.log("response", response.data);
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       // if (error.response) {
  //       //   console.error("Response data:", error.response.data);
  //       //   console.error("Response status:", error.response.status);
  //       // }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      {/* {loading ? (
        <LoadingAnimation />
      ) : ( */}
        <div className="container sm:mx-auto">
          <CardsBrochures />
        </div>
      {/* )} */}
    </>
  );
}

export default Brochures;
