const ReportList = () => {
  return (
    <>
      <table className="w-full text-center table-auto lg:table-fixed cursor-pointer border-collapse">
        <thead className="">
          <tr className=" bg-blue-300 rounded-lg h-10 text-gray-600">
            <th>Customer</th>
            <th>Date</th>
            <th>Service Type</th>
            <th>Number of times attended salon this month</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-red-100 h-10 hover:bg-red-300">
            <td>John Cena</td>
            <td>22/03/2022</td>
            <td>Manicure</td>
            <td>2</td>
          </tr>
          <tr className="border-b border-red-100 h-10  hover:bg-red-300">
            <td>Witchy Woman</td>
            <td>22/03/2022</td>
            <td>Pedicure, Haircut</td>
            <td>1</td>
          </tr>
          <tr className="border-b border-red-100 h-10 hover:bg-red-300">
            <td>Shining Star</td>
            <td>22/03/2022</td>
            <td>Haircut</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ReportList;
