export default function PhotoCard({ photo, onClick }) {
  return (
    <div className="photo-card">
      {photo.media_type === "image" ? (
        <div className="photo-content">
          <h2 className="photo-title">{photo.title}</h2>

          <img
            className="photo-image"
            src={photo.url}
            alt={photo.title}
            onClick={onClick}
          />

          <p className="photo-hint">
            Click photo to see explanation...
          </p>
        </div>
      ) : (
        <iframe
          className="photo-video"
          src={photo.url}
          title={photo.title}
          width="500"
          height="300"
        />
      )}
    </div>
  );
}