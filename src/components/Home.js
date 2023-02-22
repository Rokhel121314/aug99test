import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Home({ isLoading, apiData, handleShow, show }) {
  console.log(apiData.length);
  return (
    <>
      {isLoading
        ? "Loading..."
        : apiData?.map((data, index) => {
            return (
              <div className="container" key={index}>
                <div className="header">
                  <h2 className="headerText">{data.mission_name}</h2>
                  <span className={data.launch_success ? "status2" : "status1"}>
                    {data.launch_success ? "success" : "failed"}
                  </span>
                </div>

                <div className="detailContainer">
                  <div className="detailHeader">
                    <span className="launchYear">
                      {data.launch_year} years ago
                    </span>
                    <span className="detailLink">Article</span>
                    <span className="detailLink">Video</span>
                  </div>
                  <div
                    className={
                      !show
                        ? "imgDetailContainerHide"
                        : "imgDetailContainerShow"
                    }
                  >
                    <img
                      src={data.links.mission_patch_small}
                      className="missionImg"
                    />
                    <span className="detailText">{data.details}</span>
                  </div>
                </div>
                <button>VIEW</button>
              </div>
            );
          })}
    </>
  );
}

export default Home;
