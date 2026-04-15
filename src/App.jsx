import { useState, useEffect } from "react";

export default function App() {
  const [photo, setPhoto] = useState(null);

  function fetchRandom() {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchRandom();
    console.log("start fetch");
  }, []);

  if (photo) {
    console.log(photo);
    return (
      <>
        <div className="display_api_container">
          {photo.media_type === "image" ? (
            <img src={photo.url} alt="api_photo" />
          ) : (
            <iframe
              src={photo.url}
              title={photo.title}
              width="500"
              height="300"
            />
          )}
          <h1>{photo.title}</h1>
          <button
            onClick={() => {
              setPhoto(null);
              fetchRandom;
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
        <button
          onClick={() => {
            setPhoto(null);
            fetchRandom();
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}
