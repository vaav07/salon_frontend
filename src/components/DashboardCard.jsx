import PropTypes from "prop-types";

const DashboardCard = ({ item, data }) => {
  return (
    <>
      <div className="rounded-md my-4 w-56 ">
        <div className=" h-32 bg-purple-300 rounded-lg shadow flex flex-col justify-center items-center space-y-4 lg:h-40 hover:drop-shadow hover:shadow-zinc-600 hover:cursor-pointer">
          <div className=" flex justify-center items-center text-center text-3xl border-4 border-purple-200 rounded-full w-16 h-16 text-black">
            {data}
          </div>
          <div>
            <span className="font-semibold text-zinc-700 ">{item}</span>
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
