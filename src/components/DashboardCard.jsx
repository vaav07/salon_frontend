import PropTypes from "prop-types";

const DashboardCard = ({ item, data }) => {
  return (
    <>
      <div className="mx-auto w-80 lg:w-1/2  rounded-md my-1 px-2">
        <div className="lg:ml-2 my-2 h-32 bg-red-300 rounded-lg shadow flex flex-col justify-center items-center space-y-4 lg:h-56 hover:drop-shadow hover:shadow-zinc-600 hover:cursor-pointer">
          <div className=" flex justify-center items-center text-center text-3xl border-4 border-red-200 rounded-full w-20 h-20 text-gray-600">
            {data}
          </div>
          <div>
            <span className="font-semibold text-red-500 ">{item}</span>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardCard.propTypes = {
  item: PropTypes.string,
  data: PropTypes.number,
  // use the PropTypes object to define valid prop types
};

export default DashboardCard;
