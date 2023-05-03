const ServicesList = ({ openModal }) => {
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
          <tr className="border-b border-gray-700 h-14">
            <td>1</td>
            <td>Manicure</td>
            <td>Rs 300/-</td>
          </tr>
          <tr className="border-b border-gray-700 h-14">
            <td>2</td>
            <td>Pedicure</td>
            <td>Rs 300/-</td>
          </tr>
          <tr className="border-b border-gray-700 h-14">
            <td>3</td>
            <td>Haircut</td>
            <td>Rs 300/-</td>
          </tr>
          <tr className="border-b border-gray-700 h-14">
            <td>4</td>
            <td>Eyebrows</td>
            <td>Rs 300/-</td>
          </tr>
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
