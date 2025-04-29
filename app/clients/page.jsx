"use client"

import CardClient from "@/components/cards/CardClient";

function Clients() {
  // const {
  //   countries,
  //   clientData,
  // } = useClient()
  // console.log("countries---drop", countries);
  // console.log("clientData---drop", clientData);
  
   //console.log("selectedCountrycleint",selectedCountry);
  // console.log("countriesclient", countries);
   //console.log("setselectedCountrycleint",setSelectedCountry);

  // const [data, setData] = useState([]);
  // const [loading, SetLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/clients?populate=*`)
  //     .then((response) => {
  //       setData(response.data?.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       if (error.response) {
  //         console.error("Response data:", error.response.data);
  //         console.error("Response status:", error.response.status);
  //       }
  //     })
  //     .finally(() => {
  //       SetLoading(false);
  //     });
  // }, []);

  //console.log("clientimage--",data);
  

  return (
    
    <div>
          <div className="p-4 w-full  justify-center items-center">
      <p className="text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
            </p>

      <div className="flex justify-center items-center m-4">
          <CardClient  />
      </div>
    </div>
      </div>
  );
}

export default Clients;
