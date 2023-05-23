/* eslint-disable react/prop-types */
const ListDetails = ({
  openModal,
  setViewModal,
  data,
  header,
  getSpecificData,
}) => {
  const viewM = (id) => {
    setViewModal(true);
    openModal();
    getSpecificData(id);
  };
  return (
    <div className="bg-blue-200 rounded-lg p-4">
      <table className="w-full text-center border-collapse">
        <thead className="">
          <tr className=" bg-blue-300 rounded-lg h-10 text-gray-600">
            <th></th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-red-100 h-10 hover:bg-blue-400 cursor-pointer"
            >
              <td>{index + 1}</td>
              {/* need to change the name to only fullname after new migration */}
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.phone_no}</td>
              <td>
                {item.gender}
                <button
                  onClick={() => viewM(item.id)}
                  className="border border-black px-1 text-sm hover:bg-gray-700"
                >
                  view
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-80 text-sm justify-between md:w-1/2 m-auto mt-10">
        <div>
          <button className=" bg-red-500 rounded-lg px-3 py-1 hover:bg-red-600">
            BACK
          </button>
        </div>
        <div>
          <button
            onClick={openModal}
            className="  rounded-lg px-3 py-1 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500"
          >
            Add {header}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
