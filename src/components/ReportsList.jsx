const ReportsList = () => {
  return (
    <div className="mx-auto w-80 lg:w-1/2  rounded-md my-1 px-2">
      <div className="lg:ml-2 my-2  bg-red-300 rounded-lg shadow flex justify-around items-center space-y-4 lg:h-40 hover:drop-shadow hover:shadow-zinc-600 hover:cursor-pointer">
        <div className=" flex flex-col justify-center items-center text-center text-sm border-4 border-red-200 rounded-full w-32 h-32 text-gray-600">
          <div className=" flex flex-col justify-center items-center text-center border-4 border-red-200 rounded-full w-24 h-24 text-gray-600">
            <p className="text-2xl font-bold">4</p>
            <div className="text-xs">John doe</div>
          </div>
        </div>
        {/* <div>
          <span className="font-semibold text-red-500 ">John doe</span>
        </div> */}
        <div className="flex space-x-4">
          <select name="cars" id="cars" className="text-sm">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;
