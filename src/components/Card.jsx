/* eslint-disable react/prop-types */
const Card = ({ name, data }) => {
  return (
    <div>
      <div className="container mx-auto pr-4">
        <div className="w-56 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
          <div className="h-12 bg-purple-500 flex items-center justify-between font-bold">
            <p className="mr-0 text-white text-lg pl-5">{name}</p>
          </div>
          <div className="flex justify-between px-5 pt-2 mb-2 text-sm text-gray-600">
            <p>TOTAL</p>
          </div>
          <p className="py-2 text-3xl ml-5">
            ₹ {parseInt(data).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
