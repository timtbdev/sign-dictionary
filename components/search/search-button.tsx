import React from "react";

const SearchButton = () => {
  return (
    <form className="max-w-md mx-auto mt-6 sm:flex sm:items-center" action="#">
      <div className="grid grid-cols-1 sm:flex-auto">
        <input
          type="text"
          name="emails"
          id="emails"
          className="peer relative ring-1 px-5 ring-gray-200 rounded-md col-start-1 row-start-1 border-0 bg-white py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder="Search ..."
        />
        <div
          className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600"
          aria-hidden="true"
        />
      </div>
    </form>
  );
};

export default SearchButton;
