import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showAllCountries, setShowAllCountries] = useState(true);

  const [timeOutId, setTimeOutId] = useState();

  const fetchCountries = async () => {
    try {
      let res = await fetch("https://restcountries.com/v3.1/all");
      let data = await res.json();
      setCountries(data);
      setShowAllCountries(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountriesByName = (country) => {
    if (!country) {
      fetchCountries();
    }
    let result = countries.filter((item) => {
      // return item.name.common.toLowerCase().startsWith(country.toLowerCase());
      return item.name.common.toLowerCase().includes(country.toLowerCase());
    });
    console.log("result is: ", result);
    setFilteredCountries(result);
    setShowAllCountries(false);
  };

  const debounceSearch = (e, time) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    let timeOutIdTemp = setTimeout(() => {
      fetchCountriesByName(e.target.value);
    }, time);

    setTimeOutId(timeOutIdTemp);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a countries..."
          onChange={(e) => debounceSearch(e, 500)}
        />
      </div>
      {showAllCountries ? (
        <div className="countries_container">
          {countries?.map((country) => {
            return <Card key={country.name.common} country={country} />;
          })}
        </div>
      ) : (
        <div className="countries_container">
          {filteredCountries?.map((country) => {
            return <Card key={country.name.common} country={country} />;
          })}
        </div>
      )}
    </div>
  );
}