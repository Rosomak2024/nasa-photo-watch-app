import { useState } from "react";
import PhotoCard from "./components/PhotoCard";
import Modal from "./components/Modal";
import useFetchPhotos from "./hooks/useFetchPhotos";

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (loading) {
    return <h1>{loading && <Spinner />}</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <div className="gallery">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.date}
            photo={photo}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {selectedPhoto && (
        <Modal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </main>
  );
}

export default App;
