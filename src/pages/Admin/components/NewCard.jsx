/* eslint-disable react/prop-types */
const NewCard = ({
  username,
  customerCount,
  employeeCount,
  salesCount,
  openModal,
  userId,
}) => {
  return (
    <div className="bg-purple-200 rounded-lg shadow-md p-6 relative">
      <h2 className="text-lg font-semibold mb-4">Store: {username}</h2>
      <button
        onClick={() => openModal(userId)}
        className="absolute top-2 right-2 p-1 rounded-md bg-purple-300  hover:bg-purple-400"
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24.00 24.00"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <title />{" "}
            <g id="Complete">
              {" "}
              <g id="edit">
                {" "}
                <g>
                  {" "}
                  <path
                    d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                    fill="none"
                    stroke="#00000073"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />{" "}
                  <polygon
                    fill="none"
                    points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                    stroke="#00000073"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
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
