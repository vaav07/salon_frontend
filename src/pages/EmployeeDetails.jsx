/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import FormModal from "../components/FormModal";
import ViewDetails from "../components/ViewDetails";
import useAuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import UserLayout from "../layouts/UserLayout";

const EmployeeDetails = () => {
  const { http, userId, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [specificEmployee, setSpecificEmployee] = useState({});

  const getEmployeeList = async () => {
    return await http.get(`/api/getemployees/${userId}`, config);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["employeeList"],
    queryFn: getEmployeeList,
  });

  const getSpecificEmployee = async (id) => {
    try {
      const response = await http.get(`/api/getspecificEmployee/${id}`, config);
      const specificEmployee = response.data.result;
      // return specificCustomer;
      setSpecificEmployee(specificEmployee);
    } catch (error) {
      console.error(error);
    }
  };

  function closeModal() {
    setIsOpen(false);
    setSpecificEmployee({});
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleButtonClick = (id) => {
    // Use the id value for further processing
    // console.log("Button clicked for ID:", id);
    // Perform additional actions with the id value
    setViewModal(true);
    openModal();
    getSpecificEmployee(id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "",
        Cell: ({ row }) => {
          const { index } = row;
          return <span>{index + 1}</span>;
        },
      },

      {
        Header: "Employee Name",
        accessor: "fullname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone_no",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "",
        accessor: "id",
        Cell: ({ value }) => (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-1 px-2 rounded"
            onClick={() => handleButtonClick(value)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const employeeData = useMemo(() => data?.data?.result, [data?.data?.result]);
  return (
    <UserLayout>
      <div className="bg-zinc-200">
        {/* <Sidebar /> */}

        <div className=" max-w-5xl m-auto">
          <div className="flex justify-between items-center mx-4">
            <h1 className="py-6 text-2xl font-bold">Employee DETAILS</h1>
            <div>
              <button
                onClick={openModal}
                className="  rounded-lg px-3 py-1 bg-gradient-to-r bg-purple-400  hover:from-purple-600 hover:to-purple-500"
              >
                Add Employee
                {/* {header} */}
              </button>
            </div>
          </div>

          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            // <ListDetails
            //   openModal={openModal}
            //   setViewModal={setViewModal}
            //   data={data.data.result}
            //   header="Employee"
            //   getSpecificData={getSpecificEmployee}
            // />
            <Table columns={columns} data={employeeData} header="Employee" />
          )}
        </div>
      </div>

      {viewModal && Object.keys(specificEmployee).length > 1 && (
        <ViewDetails
          closeModal={closeModal}
          isOpen={isOpen}
          setViewModal={setViewModal}
          header="Employee"
          specificData={specificEmployee}
        />
      )}
      {!viewModal && (
        <FormModal
          closeModal={closeModal}
          isOpen={isOpen}
          header="Employee"
          refetch={refetch}
        />
      )}
    </UserLayout>
  );
};

export default EmployeeDetails;
