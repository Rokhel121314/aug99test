import "./App.css";
import Home from "../src/components/Home";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(
        "https://api.spacexdata.com/v3/launches"
      );
      setApiData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchData = () => {
    if (apiData.length < 111) {
      setTimeout(() => {
        setApiData(apiData.concat(Array.from({ length: 10 })));
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  console.log("apiData", apiData);

  return (
    <div className="App">
      <SearchInput />
      <InfiniteScroll
        dataLength={apiData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>fetching more data...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>END OF THE LIST</b>
          </p>
        }
      >
        <Home isLoading={isLoading} apiData={apiData} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
