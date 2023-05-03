import { useState } from "react";
import ListDetails from "../components/ListDetails";
import Sidebar from "../components/Sidebar";
import FormModal from "../components/FormModal";
import ViewDetails from "../components/ViewDetails";

const EmployeeDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);

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
          <ListDetails openModal={openModal} setViewModal={setViewModal} />
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
