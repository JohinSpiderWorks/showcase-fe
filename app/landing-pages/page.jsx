"use client";

import CardLandingPages from "@/components/cards/CardLandingPages";

function Landingpages() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/landing-pages?populate=*`)
  //     .then((response) => {
  //       console.log("landingpage1:", response.data);

  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       if (error.response) {
  //         console.error("Response data:", error.response.data);
  //         console.error("Response status:", error.response.status);
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      <div>
        {/* {loading ? (
          <LoadingAnimation />
        ) : ( */}
          <div className="w-full justify-items-center">
            <CardLandingPages />
          </div>
        {/* )} */}
      </div>
    </>
  );
}

export default Landingpages;
