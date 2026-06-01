export default function PhotoCard({ photo, onClick }) {
  return (
    <div className="card">
      {photo.media_type === "image" ? (
        <div className="head_text">
          <h2>{photo.title}</h2>

          <img
            src={photo.url}
            alt={photo.title}
            onClick={onClick}
          />

          <p className="text_on_image">
            Click photo to see explanation...
          </p>
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
  );
}