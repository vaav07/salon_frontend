/* eslint-disable react/prop-types */
const NewCard = ({ username, customerCount, employeeCount, salesCount }) => {
  return (
    <div className="bg-purple-200 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Store: {username}</h2>
      <div className="flex justify-between">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{customerCount}</h3>
          <p className="text-gray-500">Customers</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{employeeCount}</h3>
          <p className="text-gray-500">Employees</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{salesCount}</h3>
          <p className="text-gray-500">Sales</p>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
