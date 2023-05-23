import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import useAuthContext from "../context/AuthContext";

const AddServicesModal = ({ isOpen, closeModal }) => {
  const { http, user, token } = useAuthContext();

  const storedData = JSON.parse(user);

  const form = useForm({
    defaultValues: {
      admin_id: storedData.admin_id,
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    http.post(`/api/addservice`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
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
                    Services Details
                  </Dialog.Title>

                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="border-b border-gray-900/10 pb-4">
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                          <div className="sm:col-span-full">
                            <label
                              htmlFor="service_name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Service Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("service_name", {
                                  required: {
                                    value: true,
                                    message: "service name is required",
                                  },
                                })}
                                id="service_name"
                                autoComplete=""
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.service_name?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-full">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Price
                            </label>
                            <div className="mt-2">
                              <input
                                id="price"
                                {...register("price", {
                                  required: {
                                    value: true,
                                    message: "price is required",
                                  },
                                })}
                                type="number"
                                autoComplete=""
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.price?.message}
                            </p>
                          </div>

                          {/* <div className="sm:col-span-full">
                          <label
                            htmlFor="servicetype"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Service Type
                          </label>
                          <div className="mt-2">
                            <input
                              id="servicetype"
                              name="servicetype"
                              type="text"
                              autoComplete=""
                              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div> */}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Add Service
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
      <DevTool control={control} />
    </>
  );
};

export default AddServicesModal;
