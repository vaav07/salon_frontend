import { useForm } from "react-hook-form";
import AdminLayout from "../../../layouts/AdminLayout";
import useAuthContext from "../../../context/AuthContext";

const AdminCreateUser = () => {
  const { http, config, adminId } = useAuthContext();
  const form = useForm({
    defaultValues: {
      admin_id: adminId,
    },
  });
  const { register, handleSubmit, reset } = form;

  const onSubmit = (data) => {
    console.log("create user", data);
    http
      .post("api/admin/user/register", data, config)
      .then((response) => {
        reset();

        console.log("Request successful");
        console.log(response);
      })
      .catch((error) => {
        console.log("An error occurred");
        console.error(error);
      });
  };

  return (
    <AdminLayout>
      <div className="">
        {/* <div>AdminCreateUser</div> */}
        <div className="flex justify-center items-center  my-auto">
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl mb-4">Create New</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "name is required",
                    },
                  })}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Your username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "username is required",
                    },
                  })}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Your password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateUser;
