import { useState, useEffect } from "react";


export default function App() {

  const [number, setNumber] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);


  async function fetchRandom() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=RQlqLMnsMGXA1tDO50bIqQ2Sk30xXKVWmE9xNekJ&count=${number}`
      );
      const data = await res.json();
      setPhotos(data);
      console.log(data)
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
      


      <div className="display_api_container">
        {photos.map((photo) => (
          <div className="card" key={photo.url}>
            {photo.media_type === "image" ? (
              <div>
                <h1>{photo.title}</h1>
                <img src={photo.url} alt="api_photo" onClick={() => setSelectedPhoto(photo)} />
              </div>
            ) : (
              <iframe
                src={photo.url}
                title={photo.title}
                width="500"
                height="300"
              />
            )}
           
          </div>
        ))}
      </div>
      {selectedPhoto && (
  <div className="modal" onClick={() => setSelectedPhoto(null)}>
    <h2>{selectedPhoto.title}</h2>   /// dodać style
    <img
      src={selectedPhoto.url}
      alt="big"
      onClick={(e) => e.stopPropagation()}
    />
    <p>{selectedPhoto.explanation}</p>  /// dodać style   
  </div>
)}
<input
        type="number"
        min={1}
        max={5}
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={fetchRandom}>Pobierz</button>
    </>
  );
}
