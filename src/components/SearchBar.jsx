// import { useState } from "react";
// import { Combobox } from "@headlessui/react";

// const people = [
//   "Durward Reynolds",
//   "Kenton Towne",
//   "Therese Wunsch",
//   "Benedict Kessler",
//   "Katelyn Rohan",
// ];

// export default function SearchBar() {
//   const [selectedPerson, setSelectedPerson] = useState(people[0]);
//   const [query, setQuery] = useState("");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedResult, setSelectedResult] = useState(null);

//   useEffect(() => {
//     // Call your search API endpoint with the searchTerm
//     // and update searchResults with the response data
//     async function fetchSearchResults() {
//       const response = await fetch(
//         `https://dummyjson.com/users/search?q=${searchTerm}`
//       );
//       const data = await response.json();
//       setSearchResults(data.users);
//       console.log(data.users);
//     }

//     // Only call the API if searchTerm is not an empty string
//     if (searchTerm !== "") {
//       fetchSearchResults();
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   function handleInputChange(event) {
//     setSearchTerm(event.target.value);
//     setSelectedResult(null);
//   }

//   function handleResultClick(result) {
//     setSelectedResult(result);
//   }

//   function handleFormSubmit(event) {
//     event.preventDefault();
//     // Submit the form data to your API
//     // and handle the response as needed
//   }

//   return (
//     <Combobox value={selectedPerson} onChange={handleInputChange}>
//       <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
//       <Combobox.Options>
//         {searchResults.map((result) => (
//           <Combobox.Option key={result.id} value={result.firstName}>
//             {result.firstName}
//           </Combobox.Option>
//         ))}
//       </Combobox.Options>
//     </Combobox>
//   );
// }

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export default function Example() {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"></Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
