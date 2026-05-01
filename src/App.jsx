import { useState, useEffect } from "react";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);

  async function fetchRandom() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=${number}`
      );
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <input
        type="number"
        min={1}
        max={5}
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={fetchRandom}>Pobierz</button>

      <div className="display_api_container">
        {photos.map((photo) => (
          <div key={photo.url}>
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
            <h2>{photo.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
