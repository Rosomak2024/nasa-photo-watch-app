import { useState, useEffect } from "react";
import PhotoCard from "./components/PhotoCard";
import Modal from "./components/Modal";
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export default function App() {

  const [number, setNumber] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function fetchRandom() {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${number}`
      );
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="display_api_container">
      {photos.map((photo) => (
    <PhotoCard
      key={photo.url}
      photo={photo}
      setSelectedPhoto={setSelectedPhoto}
    />
  ))}
      </div>
      {selectedPhoto && (
  <Modal
    selectedPhoto={selectedPhoto}
    setSelectedPhoto={setSelectedPhoto}
  />
)}
<input
        type="number"
        min={1}
        max={5}
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={fetchRandom}>Pobierz</button>
      {error && <p className="error">{error}</p>}
    </>
  );
}
