import React, { useState } from "react";

const ReadMore = ({ text, foodId }) => {
  const [isReadMore, setReadMore] = useState({});
  const isFoodReadMore = isReadMore[foodId] || false;
  console.log(text, "descripgdhjd,", foodId, "foooddd");
  const toggleReadMore = (foodId) => {
    console.log("hello");
    setReadMore((prevStates) => ({
      ...prevStates,
      [foodId]: !prevStates[foodId],
    }));
  };
  return (
    <div>
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
