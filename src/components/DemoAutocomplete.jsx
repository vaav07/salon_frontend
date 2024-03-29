import { useState, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import FormModal from "./FormModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AutocompleteSearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [selectedResult, setSelectedResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoice, setInvoice] = useState({});
  // console.log("total", totalPrice);
  let [isOpen, setIsOpen] = useState(false);

  const fromSale = "fromSale";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setSearchTerm("");
  }
  // const [employeeData, setEmployeeData] = useState([]);

  const { control, handleSubmit, register, reset } = useForm();

  const {
    http,
    config,
    userId,

    user,
    selectedResult,
    setSelectedResult,
  } = useAuthContext();
  // let localUser = JSON.parse(user);
  // console.log("Selected Result", selectedResult);
  // console.log("Admin", localUser.admin_id);
  const adminID = JSON.parse(user);
  // console.log("adminID", adminID?.admin_id);
  const paymentOptions = [
    { value: "upi", label: "UPI" },
    { value: "cash", label: "CASH" },
    { value: "card", label: "CARD" },
  ];

  // const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     setShowButton(searchTerm && searchResults.length <= 4);
  //   }, 1000);

  //   return () => clearTimeout(delay);
  // }, [searchTerm, searchResults]);

  useEffect(() => {
    setSelectedResult(null);
  }, []);

  useEffect(() => {
    // Call your search API endpoint with the searchTerm
    // and update searchResults with the response data
    async function fetchSearchResults() {
      const response = await http.get(
        `/api/search?q=${searchTerm}&user_id=${userId}`,
        config
      );
      setSearchResults(response.data.users);
      // console.log(response.data.users);
    }

    // Only call the API if searchTerm is not an empty string
    if (searchTerm !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }

    // loadEmployee();
  }, [searchTerm]);

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
    setSelectedResult(null);
    setFormSubmitted(false);
  }

  function handleResultClick(result) {
    setSelectedResult(result);
    setSearchTerm("");
    setFormSubmitted(false);
  }

  function handlePriceChange(e) {
    setTotalPrice(e.target.value);
  }

  function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", { hour12: false });
  }

  // Usage
  // const currentDate = getCurrentDate();
  // const currentTime = getCurrentTime();

  const indiaDate = useQuery({
    queryKey: ["get-latest-date"],
    queryFn: async () => {
      try {
        const response = await fetch("https://worldtimeapi.org/api/ip");
        const data = await response.json();
        if (data && data.datetime) {
          return data?.datetime.slice(0, 10);
        } else {
          throw new Error("Unable to fetch current date from the server.");
        }
      } catch (error) {
        console.error(error);
        return new Date().toISOString().slice(0, 10);
      }
    },
  });

  async function onSubmit(data) {
    // Submit the form data to your API
    // and handle the response as needed

    // "admin_id": 1,
    // "user_id": 1,
    // "employee_id": 2,
    // "customer_id": 3,
    // "sale_date": "2023-05-24",
    // "sale_time": "15:49:00",
    // "payment_method": "UPI",
    // "total_price": "500",
    // "services": [1,2]

    const formattedData = {
      admin_id: adminID?.admin_id,
      user_id: userId,
      customer_id: selectedResult.id,
      employee_id: data.employee_id.value,
      services: data.selectedOptions.map((option) => option.value),
      total_price: totalPrice,
      // need to add
      payment_method: data.payment_method.value,
      sale_date: indiaDate.data,
      sale_time: getCurrentTime(),

      //just to show data on next page
      name: data.name,
      email: data.email,
      employee_name: data.employee_id.label,
      label: data.selectedOptions.map((option) => option.label),
    };

    // console.log("formatted data", formattedData);

    try {
      await http.post(`/api/addsale`, formattedData, config);
      // console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error creating user:", error.response.data);
    }

    // http.post(`/api/addSale`, formattedData, config);

    setInvoice(formattedData);
    setFormSubmitted(true);
    setShowForm(false);
  }

  // const filterEmployeeData = (inputValue) => {
  //   return employeeData.filter((i) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(loadEmployee(inputValue));
      }, 1000);
    });

  // Define an async function to fetch the options from the backend

  const { data, isLoading } = useQuery({
    queryKey: ["get-all-services"],
    queryFn: async () => {
      try {
        const response = await http.get(`/api/getservices/${userId}`, config);

        const data = response?.data?.result;
        const options = data.map((item) => ({
          value: item.id,
          label: item.service_name,
          price: parseFloat(item.price),
        }));

        return options;
      } catch (error) {
        console.error(error);
      }
    },
  });

  // const loadOptions = async () => {
  //   // Make the API call to fetch the options from the backend
  //   const response = await http.get(`/api/getservices/${userId}`, config);
  //   const data = await response.data.result;
  //   // console.log("Data", data);

  //   // Transform the data to match the required format of React Select
  //   const options = data.map((item) => ({
  //     value: item.id,
  //     label: item.service_name,
  //     price: parseFloat(item.price),
  //   }));

  //   return options;
  // };

  const loadEmployee = async (inputValue) => {
    try {
      const response = await http.get(`/api/getemployees/${userId}`, config);
      const data = response.data.result;
      // console.log("Employee", data);

      const filteredData = data.filter((item) =>
        item.fullname.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filteredData.map((item) => ({
        value: item.id,
        label: item.fullname,
      }));

      return options;
    } catch (error) {
      console.error("Error fetching employee data", error);
      return [];
    }
  };

  const handleNewSale = () => {
    // console.log("click");
    setSearchTerm("");
    setSelectedResult(null);
    setFormSubmitted(false);
    setShowForm(true);
    setTotalPrice(0);
    setInvoice({});
    reset();
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  function renderInvoice() {
    if (!selectedResult || !formSubmitted) {
      return null;
    }

    return (
      <>
        <div className="p-4 border border-gray-400 rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold mb-4">Invoice</h2>
          <div className="w-2/3 mx-auto space-y-4">
            <div>
              <p className="font-bold">Name:</p>
              <p>
                {selectedResult.fullname}
                {/* {selectedResult.lastName} */}
              </p>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <p>{selectedResult.email}</p>
            </div>
            <div>
              <p className="font-bold">Employee Name:</p>
              <p>{invoice.employee_name}</p>
            </div>

            <div>
              <p className="font-bold">Service Types:</p>
              <p>{invoice.label.join(", ")}</p>
            </div>

            {/* Render more form fields as needed */}
            <div className="">
              <hr className="my-4" />
              <p className="font-bold text-right">
                Total: Rs {invoice.total_price}/-
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNewSale}
            >
              New Sale
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container px-2  sm:w-1/2 mx-auto">
        <div className="my-2">
          {!selectedResult && (
            <div className="flex">
              <input
                className="w-80 py-1 px-2 rounded-sm"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
              />
              {/* {searchResults.length <= 4 && showButton && ( */}
              <div className="">
                <button
                  onClick={openModal}
                  className="ml-2 py-1 px-2 rounded-sm bg-purple-300 hover:bg-purple-400"
                >
                  Add Customer
                </button>
              </div>
              {/* )} */}
            </div>
          )}

          {searchResults.map((result) => (
            <div
              className="mt-1 py-1 px-2 w-80 rounded-sm bg-slate-300 flex cursor-pointer hover:bg-slate-400"
              key={result.id}
              onClick={() => handleResultClick(result)}
            >
              {result.fullname} {result.phone_no}
            </div>
          ))}
        </div>

        <div className="mt-6">
          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {selectedResult && (
                <div className="space-y-3">
                  <div className="flex  space-x-3">
                    <label htmlFor="name" className="w-1/3">
                      Name
                    </label>
                    <input
                      className="w-2/3 border border-gray-400 rounded-lg px-2 py-1"
                      type="text"
                      id="name"
                      {...register("name")}
                      value={selectedResult.fullname}
                    />
                  </div>
                  <div className=" flex space-x-3">
                    <label className="w-1/3" htmlFor="email">
                      Phone No
                    </label>
                    <input
                      className="w-2/3 border border-gray-400 rounded-lg px-2 py-1"
                      type="tel"
                      id="phone"
                      {...register("phone_no")}
                      value={selectedResult.phone_no}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <p className="w-1/3">Service Type</p>

                    <Controller
                      name="selectedOptions"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          cacheOptions
                          defaultOptions
                          options={data}
                          className="w-2/3 border border-gray-400 rounded-lg"
                          onChange={(selectedOptions) => {
                            field.onChange(selectedOptions); // Update the value of the field object
                            // console.log("first", selectedOptions);
                            let price = selectedOptions.map(
                              (option) => option.price
                            );
                            const total = price.reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0
                            );
                            setTotalPrice(total);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <label htmlFor="" className="w-1/3">
                      Employee Name
                    </label>

                    <Controller
                      name="employee_id"
                      control={control}
                      render={({ field }) => (
                        <AsyncSelect
                          className="w-2/3 border border-gray-400 rounded-lg"
                          {...field}
                          cacheOptions
                          defaultOptions
                          isSearchable
                          loadOptions={promiseOptions}
                        />
                      )}
                    />
                  </div>

                  <div className="flex  space-x-3">
                    <label htmlFor="name" className="w-1/3">
                      Payment Method
                    </label>
                    <Controller
                      name="payment_method"
                      control={control}
                      // rules={{ required: 'Payment Method is required' }}
                      render={({ field }) => (
                        <Select
                          className="w-2/3 border border-gray-400 rounded-lg text-sm"
                          {...field}
                          options={paymentOptions}
                          isClearable
                          placeholder="Select Payment Method"
                        />
                      )}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <label htmlFor="" className="w-1/3">
                      Price
                    </label>
                    <input
                      className="w-2/3  border-gray-400 rounded-lg px-2 py-1"
                      type="number"
                      {...register("price")}
                      value={totalPrice}
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
              )}

              {/* {searchResults.map((result) => (
            <div key={result.id} onClick={() => handleResultClick(result)}>
              {result.firstName}
            </div>
          ))} */}
              {selectedResult && (
                <div className="flex justify-between mx-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNewSale}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          )}

          {renderInvoice()}
        </div>
      </div>

      <FormModal
        closeModal={closeModal}
        isOpen={isOpen}
        header="Customer"
        fromSale={fromSale}
      />
    </>
  );
}

export default AutocompleteSearchBox;
