export default function PhotoCard({ photo, setSelectedPhoto }) {
    return (
      <div className="card">
        {photo.media_type === "image" ? (
          <div className="head_text">
            <h1>{photo.title}</h1>
  
            <img
              src={photo.url}
              alt={photo.title}
              onClick={() => setSelectedPhoto(photo)}
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