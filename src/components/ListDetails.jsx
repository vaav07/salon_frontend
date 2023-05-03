const ListDetails = ({ openModal, setViewModal }) => {
  const viewM = () => {
    setViewModal(true);
    openModal();
  };
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4">
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
          <tr className="border-b border-red-100 h-10 hover:bg-red-300">
            <td>1</td>
            <td>John Cena</td>
            <td>Malcolm Lockyer</td>
            <td>9876543210</td>
            <td>
              Male{" "}
              <button
                onClick={viewM}
                className="border border-black px-1 text-sm hover:bg-gray-700"
              >
                view
              </button>
            </td>
          </tr>
          <tr className="border-b border-red-100 h-10  hover:bg-red-300">
            <td>2</td>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>9876543210</td>
            <td>
              Male{" "}
              <button className="border border-black px-1 text-sm hover:bg-gray-700">
                view
              </button>
            </td>
          </tr>
          <tr className="border-b border-red-100 h-10 hover:bg-red-300">
            <td>3</td>
            <td>Shining Star</td>
            <td>Earth, Wind</td>
            <td>9876543210</td>
            <td>
              Male{" "}
              <button className="border border-black px-1 text-sm hover:bg-gray-700">
                view
              </button>
            </td>
          </tr>
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
            ADD EMPLOYEE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
