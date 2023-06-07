/* eslint-disable react/prop-types */
const ServicesList = ({ openModal, data }) => {
  return (
    <>
      <table className="w-full text-center border-collapse">
        <thead className="">
          <tr className="border-b border-gray-700 h-14">
            <th></th>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.service_name}
              className="border-b border-gray-700 h-14"
            >
              <td>{index + 1}</td>
              <td>{item.service_name}</td>
              <td>Rs {parseFloat(item.price)}/-</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" w-80 text-sm ml-auto mt-10">
        <button
          onClick={openModal}
          className=" ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
        >
          ADD SERVICES
        </button>
      </div>
    </>
  );
};

export default ServicesList;
