import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePropertyForm, type PhotoItem } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

export function Step4Photos() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  function readFiles(files: FileList | null) {
    if (!files) return;
    const allowed = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!allowed.length) return;
    const readers = allowed.map(
      file =>
        new Promise<PhotoItem>(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve({ url: e.target!.result as string, name: file.name });
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then(items => {
      update({ photos: [...data.photos, ...items] });
      setError('');
    });
  }

  function removePhoto(i: number) {
    const next = data.photos.filter((_, idx) => idx !== i);
    update({
      photos: next,
      primaryPhotoIndex: Math.min(data.primaryPhotoIndex, Math.max(0, next.length - 1)),
    });
  }

  function handleNext() {
    if (data.photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }
    navigate('/add-property/goals');
  }

  return (
    <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16">

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); readFiles(e.dataTransfer.files); }}
        className="rounded-2xl flex flex-col items-center justify-center gap-4 mb-6 cursor-pointer transition-all"
        style={{
          minHeight: 200,
          backgroundColor: dragging ? 'rgba(133,255,0,0.08)' : 'rgba(0,0,0,0.22)',
          border: `2px dashed ${dragging ? '#85ff00' : 'rgba(255,255,255,0.18)'}`,
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(133,255,0,0.12)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#85ff00" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <div className="text-center">
          <p style={{ ...heavyStyle, fontSize: 15, color: 'white', margin: 0 }}>
            Drag & drop photos here
          </p>
          <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
            or click to browse — JPG, PNG, WEBP
          </p>
        </div>
        <button
          className="rounded-lg px-5 py-2 transition-opacity hover:opacity-80"
          style={{ ...heavyStyle, fontSize: 13, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
          onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Browse Files
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => readFiles(e.target.files)}
      />

      {error && (
        <p style={{ ...bookStyle, fontSize: 13, color: '#ff6b6b', marginBottom: 12 }}>{error}</p>
      )}

      {/* Photo grid */}
      {data.photos.length > 0 && (
        <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ ...heavyStyle, fontSize: 14, color: 'white', margin: 0 }}>
              {data.photos.length} photo{data.photos.length !== 1 ? 's' : ''} uploaded
            </p>
            <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Click ★ to set primary
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {data.photos.map((photo, i) => {
              const isPrimary = i === data.primaryPhotoIndex;
              return (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group"
                  style={{
                    aspectRatio: '4/3',
                    border: `2px solid ${isPrimary ? '#85ff00' : 'transparent'}`,
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Primary badge */}
                  {isPrimary && (
                    <div
                      className="absolute top-1.5 left-1.5 rounded-full px-2 py-0.5 flex items-center gap-1"
                      style={{ backgroundColor: '#85ff00' }}
                    >
                      <span style={{ ...heavyStyle, fontSize: 10, color: '#004dab' }}>PRIMARY</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                  >
                    {!isPrimary && (
                      <button
                        onClick={() => update({ primaryPhotoIndex: i })}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                        style={{ backgroundColor: 'rgba(133,255,0,0.3)', border: '1px solid #85ff00', cursor: 'pointer', color: '#85ff00', fontSize: 16 }}
                        title="Set as primary"
                      >
                        ★
                      </button>
                    )}
                    <button
                      onClick={() => removePhoto(i)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                      style={{ backgroundColor: 'rgba(255,70,70,0.3)', border: '1px solid rgba(255,70,70,0.6)', cursor: 'pointer' }}
                      title="Remove photo"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Add more tile */}
            <div
              onClick={() => inputRef.current?.click()}
              className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-80"
              style={{
                aspectRatio: '4/3',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '2px dashed rgba(255,255,255,0.15)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Add more</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/add-property/features')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
          style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}