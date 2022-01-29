import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { maxDate } from "../components/Header";

const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT;
const nasaAPIKey = process.env.REACT_APP_NASA_API_KEY;

const APIContext = React.createContext();

export function useAPI() {
  return useContext(APIContext);
}

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();
  
  function httpRequest(startDateRef, endDateRef, days) {

    setNumberOfDays(days);

    axios
      .get(
        `${nasaEndpoint}${nasaAPIKey}&start_date=${startDateRef}&end_date=${endDateRef}&thumbs=True`,
        setLoading(true)
      )
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }

  useEffect(() => {

    setNumberOfDays(1);

    axios
      .get(
        `${nasaEndpoint}${nasaAPIKey}&start_date=${maxDate}&end_date=${maxDate}&thumbs=True`,
        setLoading(true)
      )
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const value = {
    httpRequest,
    post,
    loading,
    numberOfDays,
  };

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  );
}