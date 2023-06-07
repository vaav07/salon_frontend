// import axios from "axios";
import AutocompleteSearchBox from "../components/DemoAutocomplete";

import Sidebar from "../components/Sidebar";

const Sales = () => {
  return (
    <>
      <div className="bg-zinc-200 ">
        <Sidebar />
        <div className=" max-w-5xl m-auto">
          <div>
            <h1 className="py-6 text-2xl font-bold ">Sales</h1>
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
