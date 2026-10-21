"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "../portfolio-data";
import { sitePath } from "../site-path";

export function CaseGallery({ images }: { images: ProjectImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const select = (offset: number) => setActive((index) => (index + offset + images.length) % images.length);
  return <section className="page-shell case-gallery section-block" aria-labelledby="project-gallery">
    <div className="gallery-heading"><h2 id="project-gallery">A closer look</h2><p>Photographs, artefacts and evidence from the work.</p></div>
    <div className="gallery-grid">
      {images.map((image, index) => <figure key={`${image.src}-${index}`} className={image.fit === "contain" ? "gallery-contain" : ""}>
        <button type="button" aria-label={`Enlarge: ${image.caption}`} onClick={() => { setActive(index); dialog.current?.showModal(); setOpen(true); }}>
          <img src={sitePath(image.src)} alt={image.alt} loading="lazy" />
          <span className="gallery-enlarge" aria-hidden="true">View image ↗</span>
        </button>
        <figcaption>{image.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="image-dialog" aria-label="Project image viewer"
      onClose={() => setOpen(false)}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); select(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(-1); }
      }}>
      <div className="image-dialog-controls">
        <span aria-live="polite" aria-atomic="true">{active + 1} of {images.length}</span>
        <div>
          <button type="button" onClick={() => dialog.current?.close()} autoFocus>Close</button>
        </div>
      </div>
      <div className={`image-dialog-stage ${images.length === 1 ? "image-dialog-single" : ""}`}>
        {images.length > 1 && <button className="image-dialog-arrow image-dialog-previous" type="button" aria-label="Previous image" title="Previous image (left arrow)" onClick={() => select(-1)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
        </button>}
        <img src={sitePath(images[active].src)} alt={images[active].alt} />
        {images.length > 1 && <button className="image-dialog-arrow image-dialog-next" type="button" aria-label="Next image" title="Next image (right arrow)" onClick={() => select(1)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
        </button>}
      </div>
      <p className="image-dialog-caption">{images[active].caption}</p>
    </dialog>
  </section>;
}
