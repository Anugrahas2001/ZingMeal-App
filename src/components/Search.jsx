import React, {useEffect,useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Header from "./common/Header";

const Search = () => {
  const inputRef = useRef(null);
  const [dishname, setDishName] = useState("");
 

  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <div>
      <Header>
        <div className="w-1/3 flexrounded-md text-gray-500 h-10  m-2 shadow rounded-md">
          <FontAwesomeIcon className="mt-3 ml-2" icon={faMagnifyingGlass} />
          <input
            className="w-96  text-gray-500 h-10 p-2 border-none outline-none"
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
           ref={inputRef}
            value={dishname}
            onChange={(e) => {
              setDishName(e.target.value);
            }}
          />
        </div>
      </Header>
    </div>
  );
};

export default Search;
