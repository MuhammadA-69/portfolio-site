"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import type { ProjectImage } from "../portfolio-data";
import { sitePath } from "../site-path";

export function CaseGallery({ images }: { images: ProjectImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const select = (offset: number) => setActive((index) => (index + offset + images.length) % images.length);
  return <section className="page-shell case-gallery section-block" aria-labelledby="project-gallery">
    <div className="gallery-heading"><h2 id="project-gallery">A closer look</h2><p>Photographs, artefacts and evidence from the work.</p></div>
    <div className="gallery-grid">
      {images.map((image, index) => <figure key={`${image.src}-${index}`} className={image.fit === "contain" ? "gallery-contain" : ""}>
        <button type="button" aria-label={`Enlarge: ${image.caption}`} onClick={() => { setActive(index); dialog.current?.showModal(); }}>
          <img src={sitePath(image.src)} alt={image.alt} loading="lazy" />
          <span className="gallery-enlarge" aria-hidden="true">View image ↗</span>
        </button>
        <figcaption>{image.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="image-dialog" aria-label="Project image viewer"
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); select(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(-1); }
      }}>
      <div className="image-dialog-controls">
        <span>{active + 1} of {images.length}</span>
        <div>
          {images.length > 1 && <><button type="button" onClick={() => select(-1)}>Previous</button><button type="button" onClick={() => select(1)}>Next</button></>}
          <button type="button" onClick={() => dialog.current?.close()} autoFocus>Close</button>
        </div>
      </div>
      <img src={sitePath(images[active].src)} alt={images[active].alt} />
      <p>{images[active].caption}</p>
    </dialog>
  </section>;
}
