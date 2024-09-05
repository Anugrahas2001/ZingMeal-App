import React, { useState } from "react";

const ReadMore = ({ text, foodId }) => {
  const [isReadMore, setReadMore] = useState({});
  const isFoodReadMore = isReadMore[foodId] || false;
  const toggleReadMore = (foodId) => {
    setReadMore((prevStates) => ({
      ...prevStates,
      [foodId]: !prevStates[foodId],
    }));
  };
  return (
    <div className="w-full lg:w-full md:w-96 sm:w-56 xs:w-40">
      {text.length > 100
        ? isFoodReadMore
          ? text
          : `${text.slice(0, 100)}...`
        : text}
      {text.length > 100 && (
        <span
          onClick={() => toggleReadMore(foodId)}
          className="text-blue-500 cursor-pointer"
        >
          {isFoodReadMore ? " show less" : " read more"}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
