import React, { useState, useRef } from "react";
import { ZoomIn, Maximize2, X, Sparkles } from "lucide-react";

interface ProductZoomImageProps {
  image: string;
  galleryImages?: string[];
  name: string;
  category?: string;
}

export const ProductZoomImage: React.FC<ProductZoomImageProps> = ({
  image,
  galleryImages = [],
  name,
  category,
}) => {
  const allImages = galleryImages && galleryImages.length > 0 ? galleryImages : [image];
  const [activeImage, setActiveImage] = useState<string>(image);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if prop image changes
  React.useEffect(() => {
    setActiveImage(image);
  }, [image]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm cursor-crosshair aspect-square flex items-center justify-center group"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 bg-amber-900/90 backdrop-blur-md text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <Sparkles size={13} className="text-amber-300" />
            Handcrafted Artisan
          </span>
          {category === "Doors" && (
            <span className="inline-flex items-center bg-emerald-800/90 backdrop-blur-md text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              100% Solid Sagwan / Teak
            </span>
          )}
        </div>

        {/* Action icons (Lightbox button) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-amber-800 shadow-md backdrop-blur-md transition duration-200 opacity-90 group-hover:opacity-100"
          title="Click for full-screen view"
          aria-label="Expand image"
        >
          <Maximize2 size={18} />
        </button>

        {/* Hint on hover */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ZoomIn size={14} />
          Hover to zoom • Click to expand
        </div>

        {/* Image element with zoom transition */}
        <div className="w-full h-full p-4 flex items-center justify-center overflow-hidden">
          <img
            src={activeImage}
            alt={name}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: isZoomed ? "scale(2.1)" : "scale(1)",
            }}
            className="w-full h-full object-contain transition-transform duration-150 ease-out select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Thumbnail Gallery (if more than 1 image) */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                activeImage === img
                  ? "border-amber-700 shadow-md ring-2 ring-amber-700/20"
                  : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <img
              src={activeImage}
              alt={name}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-center text-white/90 text-sm font-medium">
              {name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductZoomImage;
