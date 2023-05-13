// import axios from "axios";
import AutocompleteSearchBox from "../components/DemoAutocomplete";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
// import { useEffect, useState } from "react";
// import Data from "../Data.json";

const Sales = () => {
  // const [data, setData] = useState([]);

  // async function getUser() {
  //   try {
  //     const response = await axios.get(
  //       `https://jsonplaceholder.typicode.com/users`
  //     );
  //     // console.log(response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log("search:", data);

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <div className="bg-zinc-200 ">
        <Sidebar />
        <div className=" max-w-5xl m-auto">
          <div>
            <h1 className="py-6 text-2xl font-bold text-center">Sales</h1>
          </div>
          <div className="">
            {/* <SearchBar placeholder="Search" /> */}
            <AutocompleteSearchBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
