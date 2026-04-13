import { useState, useEffect } from "react";

export default function App() {
  const [photo, setPhoto] = useState(null);

  function fetchRandom() {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=1"
    )
      .then((res) => res.json())
      .then((data) => setPhoto(data[0]))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  if (!photo) {
    return <p>Loading...</p>;
  }

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
      </div>
      <button onClick={fetchRandom}>Next</button>
    </>
  );
}
