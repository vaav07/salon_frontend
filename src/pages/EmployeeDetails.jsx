import { useEffect, useState } from "react";
import ListDetails from "../components/ListDetails";
import Sidebar from "../components/Sidebar";
import FormModal from "../components/FormModal";
import ViewDetails from "../components/ViewDetails";
import useAuthContext from "../context/AuthContext";

const EmployeeDetails = () => {
  const { http, userId, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await http.get(`/api/getemployees/${userId}`, config);
      const data = response.data.result;
      setEmployees(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
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
      <div className="bg-zinc-200 h-screen">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">EMPLOYEE DETAILS</h1>
          <ListDetails
            openModal={openModal}
            setViewModal={setViewModal}
            data={employees}
            header="Employee"
          />
        </div>
      </div>

      {viewModal && (
        <ViewDetails
          closeModal={closeModal}
          isOpen={isOpen}
          setViewModal={setViewModal}
          header="Employee"
        />
      )}
      {!viewModal && (
        <FormModal closeModal={closeModal} isOpen={isOpen} header="Employee" />
      )}
    </>
  );
};

export default EmployeeDetails;
