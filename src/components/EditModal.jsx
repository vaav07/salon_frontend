/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../context/AuthContext";

const EditModal = ({ isOpen, closeModal, id }) => {
  const { http, user, adminId, config } = useAuthContext();

  const form = useForm({
    defaultValues: {
      admin_id: adminId,
    },
  });

  const { register, control, watch, handleSubmit, formState, reset, setError } =
    form;
  const { errors } = formState;

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      // Passwords match, perform form submission or data update logic here

      http
        .put(`api/admin/${adminId}/${id}/change-password`, data, config)
        .then((response) => {
          closeModal();
          reset();

          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Passwords do not match, display an error message
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }
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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="border-b border-gray-900/10 pb-4">
                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                          <div className="sm:col-span-full">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Username
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="username"
                                {...register("username", {
                                  //   required: {
                                  //     value: true,
                                  //     message: "fullname is required",
                                  //   },
                                })}
                                placeholder="optional"
                                autoComplete="fullname"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.username?.message}
                            </p>
                          </div>

                          <div className="sm:col-span-full">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              New Password
                            </label>
                            <div className="mt-1">
                              <input
                                id="password"
                                {...register("password", {
                                  required: {
                                    value: true,
                                    message: "password is required",
                                  },
                                })}
                                type="password"
                                autoComplete=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.password?.message}
                            </p>
                          </div>
                          <div className="sm:col-span-full">
                            <label
                              htmlFor="cpassword"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Confirm Password
                            </label>
                            <div className="mt-1">
                              <input
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                  required: true,
                                  validate: (value) =>
                                    value === watch("confirmPassword"),
                                })}
                                type="password"
                                autoComplete=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p className="text-xs text-red-600 ml-2 mt-1">
                              {errors.confirmPassword && (
                                <span className="">Passwords do not match</span>
                              )}
                            </p>
                          </div>
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
                          Submit
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
    </>
  );
};

export default EditModal;
