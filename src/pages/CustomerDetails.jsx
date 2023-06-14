/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import FormModal from "../components/FormModal";
import ViewDetails from "../components/ViewDetails";
import useAuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import UserLayout from "../layouts/UserLayout";

const CustomerDetails = () => {
  const { http, userId, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [specificCustomer, setSpecificCustomer] = useState({});

  const getCustomerList = async () => {
    return await http.get(`/api/getcustomers/${userId}`, config);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["customerList"],
    queryFn: getCustomerList,
  });

  const getSpecificCustomer = async (id) => {
    try {
      const response = await http.get(`/api/getspecificCustomer/${id}`, config);
      const specificCustomer = response.data.result;
      // return specificCustomer;
      setSpecificCustomer(specificCustomer);
    } catch (error) {
      console.error(error);
    }
  };

  function closeModal() {
    setIsOpen(false);
    setSpecificCustomer({});
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleButtonClick = (id) => {
    // Use the id value for further processing
    console.log("Button clicked for ID:", id);
    // Perform additional actions with the id value
    setViewModal(true);
    openModal();
    getSpecificCustomer(id);
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
        Header: "Customer Name",
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

  const customerData = useMemo(() => data?.data, [data?.data]);
  // console.log(customerData);

  return (
    <UserLayout>
      <div className="bg-zinc-200 ">
        {/* <div>
          <Sidebar />
        </div> */}

        <div className=" max-w-5xl m-auto">
          <div className="flex justify-between items-center mx-4">
            <h1 className="py-6 text-2xl font-bold">CUSTOMER DETAILS</h1>
            <div>
              <button
                onClick={openModal}
                className="  rounded-lg px-3 py-1 bg-gradient-to-r bg-purple-400  hover:from-purple-600 hover:to-purple-500"
              >
                Add Customer
                {/* {header} */}
              </button>
            </div>
          </div>

          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <Table columns={columns} data={customerData} header="Customer" />
          )}
        </div>
      </div>

      {viewModal && Object.keys(specificCustomer).length > 1 && (
        <ViewDetails
          closeModal={closeModal}
          isOpen={isOpen}
          setViewModal={setViewModal}
          header="Customer"
          // data={getSpecificCustomer}
          specificData={specificCustomer}
        />
      )}
      {!viewModal && (
        <FormModal closeModal={closeModal} isOpen={isOpen} header="Customer" />
      )}
    </UserLayout>
  );
};

export default CustomerDetails;
