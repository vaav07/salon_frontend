import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import useAuthContext from "../context/AuthContext";
const PraticeComp = () => {
  const { handleSubmit, control } = useForm();

  const { config, http } = useAuthContext();

  // Define an async function to fetch the options from the backend
  const loadOptions = async () => {
    // Make the API call to fetch the options from the backend
    // getservicesName
    // getservices
    const response = await http.get(`/api/getservices`, config);
    const data = await response.data.result;
    // console.log("Data", data);

    // Transform the data to match the required format of React Select
    const options = data.map((item) => ({
      value: item.service_name,
      label: item.service_name,
    }));

    return options;
  };

  // Define your form submit handler
  const onSubmit = (data) => {
    const selectedOptions = data.selectedOptions.map((option) => option.value);
    console.log(selectedOptions);
  };

  return (
    <>
      <div>PraticeComp</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PraticeComp;
