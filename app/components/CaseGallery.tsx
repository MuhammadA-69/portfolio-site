"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { imageSize } from "../image-meta";
import type { ProjectImage } from "../portfolio-data";
import { sitePath } from "../site-path";

export function CaseGallery({
  images,
  title = "A closer look",
  id = "project-gallery",
  subtitle,
  embedded = false,
}: {
  images: ProjectImage[];
  title?: string;
  id?: string;
  subtitle?: string;
  embedded?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (images.length === 0) return null;

  const activeImage = images[active] ?? images[0];
  const activeDims = imageSize(activeImage.src);
  const isLoaded = loadedSrc === activeImage.src;

  const select = (offset: number) =>
    setActive((index) => (index + offset + images.length) % images.length);

  const openViewer = (index: number) => {
    setActive(index);
    dialog.current?.showModal();
    setOpen(true);
  };

  function handleTouchStart(event: React.TouchEvent) {
    if (images.length <= 1 || event.touches.length !== 1) return;
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (!touchStart.current || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      select(dx < 0 ? 1 : -1);
    }
  }

  const previewCount = images.length > 8 ? 4 : images.length;

  function thumbnail(image: ProjectImage, index: number) {
    const thumbSrc = image.thumbnail ?? image.src;
    const dims = imageSize(thumbSrc);
    return (
      <figure
        key={image.src}
        className={image.fit === "contain" ? "gallery-contain" : ""}
      >
        <button
          type="button"
          aria-label={`Enlarge: ${image.caption}`}
          onClick={() => openViewer(index)}
        >
          <img
            src={sitePath(thumbSrc)}
            alt={image.alt}
            width={dims.width}
            height={dims.height}
            loading="lazy"
            decoding="async"
            style={
              image.position ? { objectPosition: image.position } : undefined
            }
          />
          <span className="gallery-enlarge" aria-hidden="true">
            View image
          </span>
        </button>
        <figcaption>{image.caption}</figcaption>
      </figure>
    );
  }

  const content = (
    <>
      <div className="gallery-heading">
        {embedded ? <h3 id={id}>{title}</h3> : <h2 id={id}>{title}</h2>}
        <p className="tabular">
          {subtitle ??
            `${images.length} ${images.length === 1 ? "image" : "images"}`}
        </p>
      </div>
      <div className="gallery-grid">
        {images.slice(0, previewCount).map(thumbnail)}
      </div>
      {images.length > previewCount && (
        <details className="gallery-more">
          <summary>
            <span className="when-collapsed">
              Show {images.length - previewCount} more images
            </span>
            <span className="when-expanded">Show fewer images</span>
          </summary>
          <div className="gallery-grid">
            {images
              .slice(previewCount)
              .map((image, i) => thumbnail(image, i + previewCount))}
          </div>
        </details>
      )}
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label="Project image viewer"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialog.current?.close();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            select(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            select(-1);
          }
        }}
      >
        <div className="image-dialog-controls">
          <span
            className="tabular"
            aria-live={open ? "polite" : "off"}
            aria-atomic="true"
          >
            {active + 1} of {images.length}
          </span>
          <div>
            <button
              ref={closeButton}
              type="button"
              onClick={() => dialog.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
        <div
          className={`image-dialog-stage ${
            images.length === 1 ? "image-dialog-single" : ""
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 1 && (
            <button
              className="image-dialog-arrow image-dialog-previous"
              type="button"
              aria-label="Previous image"
              title="Previous image (left arrow)"
              onClick={() => select(-1)}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>
          )}
          <div className="image-dialog-frame">
            {open && !isLoaded && (
              <span className="image-dialog-loading" aria-hidden="true">
                Loading…
              </span>
            )}
            {open && (
              <img
                key={activeImage.src}
                src={sitePath(activeImage.src)}
                alt={activeImage.alt}
                width={activeDims.width}
                height={activeDims.height}
                className={isLoaded ? "is-loaded" : "is-loading"}
                onLoad={() => setLoadedSrc(activeImage.src)}
              />
            )}
          </div>
          {images.length > 1 && (
            <button
              className="image-dialog-arrow image-dialog-next"
              type="button"
              aria-label="Next image"
              title="Next image (right arrow)"
              onClick={() => select(1)}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        <p
          className="image-dialog-caption"
          aria-live={open ? "polite" : "off"}
        >
          {activeImage.caption}
        </p>
      </dialog>
    </>
  );

  if (embedded) {
    return <div className="case-gallery-embedded">{content}</div>;
  }

  return (
    <section
      className="page-shell case-gallery section-block"
      aria-labelledby={id}
    >
      {content}
    </section>
  );
}
