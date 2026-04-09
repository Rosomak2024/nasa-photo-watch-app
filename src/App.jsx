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

  console.log(photo);
  return (
    <>
      <div>
        <button onClick={fetchRandom}>Next</button>
        {photo && <img src={photo.url} alt="api_photo"></img>}
      </div>
    </>
  );
}
