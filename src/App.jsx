import { useState, useEffect } from "react";

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchRandom() {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=1" /// dodaj ilosć losowanych obiektów
      );
      const data = await res.json();
      setPhoto(data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandom();
    console.log("start fetch");
  }, []);

  // chcemy zrobić inputa w którym pytamy się użytkownika ile chce wylosować zdjęc z serwera API
  // potem te zdjęcia pobieramy i wyświetlamy na stronnie dodaj css zxawijanie itp.

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
        <button onClick={fetchRandom}>Reset Connection to API</button>
      </div>
    );
  }

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
              fetchRandom(); // here was a big bug
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
