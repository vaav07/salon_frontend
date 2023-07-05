/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAuthContext from "../context/AuthContext";
// import { DevTool } from "@hookform/devtools";

const FormModal = ({ isOpen, closeModal, header, fromSale, refetch }) => {
  //   console.log("MOdal", isOpenF);
  const { http, user, setSelectedResult, selectedResult, config } =
    useAuthContext();

  const storedData = JSON.parse(user);

  // const [response, setResponse] = useState(null);

  //need to change customer fullname to only fullname reminder
  const form = useForm({
    defaultValues: {
      admin_id: storedData.admin_id,
      user_id: storedData.id,
      // customer_fullname: "",
      // email: "",
      // phone_no: "",
      // alt_phone_no: "",
      // address: "",
      // state: "",
      // city: "",
      // pincode: "",
      // gender: "",
      // date_of_joining: "",
    },
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    setSelectedResult(data);
    // console.log("form submitted", data);
    if (header === "Customer" && fromSale === "fromSale") {
      http
        .post(`/api/addcustomer`, data, config)
        .then((response) => {
          // console.log("Posted Customer ID", response.data.Customer_ID);

          setSelectedResult((prevSelectedResult) => ({
            ...prevSelectedResult,
            id: response.data.Customer_ID,
          }));
          // console.log("selectedResult1", selectedResult);
        })
        .catch((error) => {
          console.error(error);
        });

      // console.log("selectedResult0", selectedResult);
    } else if (header === "Customer") {
      http.post(`/api/addcustomer`, data, config);
    } else {
      http.post(`/api/addemployee`, data, config);
    }
    closeModal();
    reset();
    refetch();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {header} Details
                  </Dialog.Title>
                  <div className="mt-1">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="border-b border-gray-900/10 pb-4">
                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                          <div className="sm:col-span-full">
                            <label
                              htmlFor="fullname"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="fullname"
                                {...register("fullname", {
                                  required: {
                                    value: true,
                                    message: "fullname is required",
                                  },
                                })}
                                autoComplete="fullname"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.fullname?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-full">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                                id="email"
                                {...register("email", {
                                  // required: {
                                  //   value: true,
                                  //   message: "email is required",
                                  // },
                                  pattern: {
                                    value:
                                      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                    message: "Invalid email format",
                                  },
                                })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.email?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone_no"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone No:
                            </label>
                            <div className="mt-1">
                              <input
                                type="tel"
                                maxLength="10"
                                // pattern="/(7|8|9)\d{9}/"
                                {...register("phone_no", {
                                  // required: {
                                  //   value: true,
                                  //   message: "phone is required",
                                  // },
                                  pattern: {
                                    value: /(7|8|9)\d{9}/,
                                    message: "Invalid Phone number",
                                  },
                                })}
                                id="phone_no"
                                autoComplete="phone_no"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.phone_no?.message}
                            </p>
                          </div>

                          {/* <div className="sm:col-span-3">
                            <label
                              htmlFor="alt_phone_no"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Alternate Phone No:
                            </label>
                            <div className="mt-1">
                              <input
                                type="tel"
                                maxLength="10"
                                pattern="/(7|8|9)\d{9}/"
                                {...register("alt_phone_no")}
                                id="alt_phone_no"
                                autoComplete="alt_phone_no"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div> */}

                          {/* <div className="col-span-full">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                {...register("address", {
                                  required: {
                                    value: true,
                                    message: "address is required",
                                  },
                                })}
                                id="address"
                                autoComplete="address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.address?.message}
                            </p>
                          </div> */}

                          {/* <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                {...register("state", {
                                  required: {
                                    value: true,
                                    message: "state is required",
                                  },
                                })}
                                id="state"
                                autoComplete="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.state?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                {...register("city", {
                                  required: {
                                    value: true,
                                    message: "city is required",
                                  },
                                })}
                                id="city"
                                autoComplete="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.city?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Pincode
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                {...register("pincode", {
                                  required: {
                                    value: true,
                                    message: "pincode is required",
                                  },
                                })}
                                id="pincode"
                                autoComplete="pincode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.pincode?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="dob"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Birth Date:
                            </label>
                            <div className="mt-1">
                              <input
                                type="date"
                                {...register("dob", {
                                  required: {
                                    value: true,
                                    message: "dob is required",
                                  },
                                })}
                                id="dob"
                                autoComplete="dob"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.dob?.message}
                            </p>
                          </div> */}

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="gender"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Gender
                            </label>
                            <div className="mt-1">
                              <select
                                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("gender", {
                                  required: {
                                    value: true,
                                    message: "gender is required",
                                  },
                                })}
                              >
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                              </select>

                              {/* <input
                                type="text"
                                {...register("gender")}
                                id="gender"
                                autoComplete="gender"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              /> */}
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.gender?.message}
                            </p>
                          </div>

                          {header === "Employee" ? (
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="doj"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Date of Joining:
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  {...register("date_of_joining", {
                                    required: {
                                      value: false,
                                      message: "doj is required",
                                    },
                                  })}
                                  id="date_of_joining"
                                  autoComplete="date_of_joining"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <p className="text-xs text-red-600 ml-2 mt-1">
                                {errors.date_of_joining?.message}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="mt-1 flex justify-between">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          // onClick={closeModal}
                          onClick={() => {
                            reset();
                            closeModal();
                          }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          // onClick={() => reset()}
                        >
                          Add {header}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default FormModal;
