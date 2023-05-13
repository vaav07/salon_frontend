import { useState, useEffect } from "react";

function AutocompleteSearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    // Call your search API endpoint with the searchTerm
    // and update searchResults with the response data
    async function fetchSearchResults() {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.users);
      console.log(data.users);
    }

    // Only call the API if searchTerm is not an empty string
    if (searchTerm !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
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

  function handleFormSubmit(event) {
    event.preventDefault();
    // Submit the form data to your API
    // and handle the response as needed

    setFormSubmitted(true);
    setShowForm(false);
  }

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
              {selectedResult.firstName} {selectedResult.lastName}
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
                <p>Service Type:</p>
                <p>Price:</p>
                {/* Render more summary fields as needed */}
              </div>
              <div>
                <p>Pedicure</p>
                <p>$25.00</p>
                {/* Render more summary fields as needed */}
              </div>
            </div>
            <hr className="my-4" />
            <p className="font-bold">Total: $25.00</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4  sm:w-1/2 mx-auto">
      <div className="my-2">
        <input
          className="w-full py-1 px-2"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
        />
        {searchResults.map((result) => (
          <div key={result.id} onClick={() => handleResultClick(result)}>
            {result.firstName}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
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
                    name="name"
                    value={selectedResult.firstName}
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
                    name="email"
                    value={selectedResult.email}
                  />
                </div>

                <div className="flex space-x-3">
                  <label className="w-1/3" htmlFor="">
                    Service Type
                  </label>
                  <select className="w-2/3 border border-gray-400 rounded-lg px-2 py-1">
                    <option value="">Pedicure</option>
                    <option value="">Menicure</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <label htmlFor="" className="w-1/3">
                    Price
                  </label>
                  <input
                    className="w-2/3 border border-gray-400 rounded-lg px-2 py-1"
                    type="number"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            )}
          </form>
        )}

        {renderInvoice()}
      </div>
    </div>
  );
}

export default AutocompleteSearchBox;
