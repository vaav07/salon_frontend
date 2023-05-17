import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import ListDetails from "../components/ListDetails";
import Sidebar from "../components/Sidebar";
import ViewDetails from "../components/ViewDetails";
import useAuthContext from "../context/AuthContext";

const CustomerDetails = () => {
  const { http, userId, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  // const [viewModalData, setViewModalData] = useState({})

  const getCustomers = async () => {
    try {
      const response = await http.get(`/api/getcustomers/${userId}`, config);
      const data = response.data.result;
      setCustomers(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomers();
    // getUser();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="bg-zinc-200 ">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">CUSTOMER DETAILS</h1>
          <ListDetails
            openModal={openModal}
            setViewModal={setViewModal}
            data={customers}
            header="Customer"
            // config={config}
          />
        </div>
      </div>

      {viewModal && (
        <ViewDetails
          closeModal={closeModal}
          isOpen={isOpen}
          setViewModal={setViewModal}
          header="Customer"
        />
      )}
      {!viewModal && (
        <FormModal closeModal={closeModal} isOpen={isOpen} header="Customer" />
      )}
    </>
  );
};

export default CustomerDetails;
