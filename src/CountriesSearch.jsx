import React from "react";

const CountriesSearch = ({ data }) => {
  return (
    <div className="countryCard">
      <img src={data.flags.svg} alt={data.name.common} />
      <h2>{data.name.common}</h2>
    </div>
  );
};

export default CountriesSearch;