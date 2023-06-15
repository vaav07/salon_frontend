/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { Fragment } from "react";
import useAuthContext from "../context/AuthContext";
const ViewDetails = ({
  isOpen,
  closeModal,
  setViewModal,
  header,
  specificData,
}) => {
  const { http, token } = useAuthContext();

  // const storedData = JSON.parse(user);

  const form = useForm({
    defaultValues: {
      admin_id: specificData.admin_id,
      user_id: specificData.user_id,
      //need to change this to only fullname everywhere reminder
      fullname: specificData.fullname,
      email: specificData.email,
      phone_no: specificData.phone_no,
      // alt_phone_no: specificData.alt_phone_no,
      // address: specificData.address,
      // state: specificData.state,
      // city: specificData.city,
      // pincode: specificData.pincode,
      // dob: specificData.dob,
      gender: specificData.gender,
      date_of_joining: specificData.date_of_joining,
    },
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  const view = () => {
    setViewModal(false);
    closeModal();
  };

  const onSubmit = (data) => {
    // console.log(data);
    if (header === "Customer") {
      http.put(`/api/updatespecificCustomer/${specificData.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // console.log("employee", data);
      http.put(`/api/updatespecificEmployee/${specificData.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={view}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hiinputen rounded-2xl bg-white p-6 text-left align-miinputle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {header} Details
                </Dialog.Title>

                <div>
                  <div className="mt-2 border-t border-gray-100">
                    <form
                      className="divide-y divide-gray-100"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="fullname"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <input
                          // value={specificData.customer_fullname}
                          type="text"
                          id="fullname"
                          {...register("fullname", {
                            required: {
                              value: true,
                              message: "fullname is required",
                            },
                          })}
                          autoComplete="fullname"
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        />
                        {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.customer_fullname?.message}
                        </p> */}
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Email Address
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        />

                        {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.email?.message}
                        </p> */}
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="phone_no"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          {...register("phone_no", {
                            // required: {
                            //   value: true,
                            //   message: "phone is required",
                            // },
                          })}
                          id="phone_no"
                          maxLength={10}
                          autoComplete="phone_no"
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        />

                        {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.phone_no?.message}
                        </p> */}
                      </div>
                      {/* <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="alt_phone_no"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Alternate Phone No
                        </label>
                        <input
                          type="tel"
                          pattern="/(7|8|9)\d{9}/"
                          {...register("alt_phone_no")}
                          id="alt_phone_no"
                          autoComplete="alt_phone_no"
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        />
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="address"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        /> */}

                      {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.address?.message}
                        </p> */}
                      {/* </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="state"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          State
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        /> */}

                      {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.state?.message}
                        </p> */}
                      {/* </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="city"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        /> */}
                      {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.city?.message}
                        </p> */}
                      {/* </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="pincode"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Pincode
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        /> */}
                      {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.pincode?.message}
                        </p> */}
                      {/* </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="dob"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Birth date
                        </label>
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
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        /> */}
                      {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.dob?.message}
                        </p> */}
                      {/* </div> */}
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <label
                          htmlFor="gender"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Gender
                        </label>
                        <input
                          {...register("gender", {
                            required: {
                              value: true,
                              message: "gender is required",
                            },
                          })}
                          className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                        />
                        {/* <p className="text-xs text-red-600 ml-2 mt-1">
                          {errors.gender?.message}
                        </p> */}
                      </div>

                      {header === "Employee" ? (
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <label
                            htmlFor="doj"
                            className="text-sm font-medium leading-6 text-gray-900"
                          >
                            Date Of Joining
                          </label>
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
                            className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                          />
                          {/* <p className="text-xs text-red-600 ml-2 mt-1">
                            {errors.date_of_joining?.message}
                          </p> */}
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="mt-2 flex justify-between">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={view}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          // onClick={view}
                        >
                          Update Details
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewDetails;
