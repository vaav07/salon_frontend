import { useState, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import FormModal from "./FormModal";

function AutocompleteSearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [selectedResult, setSelectedResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoice, setInvoice] = useState({});
  console.log("total", totalPrice);
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

  const { http, config, userId, user, selectedResult, setSelectedResult } =
    useAuthContext();
  let localUser = JSON.parse(user);
  console.log("Selected Result", selectedResult);
  console.log("Admin", localUser.admin_id);

  const paymentOptions = [
    { value: "upi", label: "UPI" },
    { value: "cash", label: "CASH" },
    { value: "card", label: "CARD" },
  ];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowButton(searchTerm && searchResults.length <= 2);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTerm, searchResults]);

  useEffect(() => {
    // Call your search API endpoint with the searchTerm
    // and update searchResults with the response data
    async function fetchSearchResults() {
      const response = await http.get(
        `/api/search?q=${searchTerm}&user_id=${userId}`,
        config
      );
      setSearchResults(response.data.users);
      console.log(response.data.users);
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
      admin_id: selectedResult.admin_id,
      user_id: selectedResult.user_id,
      customer_id: selectedResult.id,
      employee_id: data.employee_id.value,
      services: data.selectedOptions.map((option) => option.value),
      total_price: totalPrice,
      // need to add
      payment_method: data.payment_method.value,
      sale_date: getCurrentDate(),
      sale_time: getCurrentTime(),

      //just to show data on next page
      name: data.name,
      email: data.email,
      label: data.selectedOptions.map((option) => option.label),
    };

    console.log("formatted data", formattedData);

    try {
      await http.post(`/api/addsale`, formattedData, config);
      console.log("Data submitted successfully");
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

  const loadOptions = async () => {
    // Make the API call to fetch the options from the backend
    const response = await http.get(`/api/getservices`, config);
    const data = await response.data.result;
    console.log("Data", data);

    // Transform the data to match the required format of React Select
    const options = data.map((item) => ({
      value: item.id,
      label: item.service_name,
      price: parseFloat(item.price),
    }));

    return options;
  };

  const loadEmployee = async (inputValue) => {
    try {
      const response = await http.get(`/api/getemployees/${userId}`, config);
      const data = response.data.result;
      console.log("Employee", data);

      const filteredData = data.filter((item) =>
        item.fullname.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filteredData.map((item) => ({
        value: item.id,
        label: item.fullname,
      }));

      return options;
    } catch (error) {
      console.log("Error fetching employee data", error);
      return [];
    }
  };

  function renderInvoice() {
    if (!selectedResult || !formSubmitted) {
      return null;
    }

    return (
      <div className="p-4 border border-gray-400 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Invoice</h2>
        <div className="grid grid-cols-2 gap-4">
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
          {/* Render more form fields as needed */}
          <div className="col-span-2">
            <hr className="my-4" />
            <p className="font-bold">Summary:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Service Type: </p>
                <p>{invoice.label.join(", ")}</p>

                {/* Render more summary fields as needed */}
              </div>
              {/* <div>
                <p>Price:</p>
                <p></p> */}
              {/* Render more summary fields as needed */}
              {/* </div> */}
            </div>
            <hr className="my-4" />
            <p className="font-bold">Total: Rs {invoice.total_price}/-</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container px-2  sm:w-1/2 mx-auto">
        <div className="my-2">
          {!selectedResult && (
            <div className="flex">
              <input
                className="w-80 py-1 px-2"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
              />
              {searchResults.length <= 2 && showButton && (
                <div className="">
                  <button
                    onClick={openModal}
                    className="ml-2 py-1 px-2 rounded-sm bg-purple-300 hover:bg-purple-400"
                  >
                    Add Customer
                  </button>
                </div>
              )}
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
                      Email
                    </label>
                    <input
                      className="w-2/3 border border-gray-400 rounded-lg px-2 py-1"
                      type="email"
                      id="email"
                      {...register("email")}
                      value={selectedResult.email}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <p className="w-1/3">Service Type</p>

                    <Controller
                      name="selectedOptions"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <AsyncSelect
                          {...field}
                          isMulti
                          cacheOptions
                          defaultOptions
                          loadOptions={loadOptions}
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
                <button
                  type="submit"
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
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
