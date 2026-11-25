"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRef, useState } from "react";
import { imageSize } from "../image-meta";
import { sitePath } from "../site-path";

const scenes = [
  {
    label: "The exhibition",
    image: "/assets/kafart-hands-of-resilience-noir.jpg",
    alt: "Visitors in the Hands of Resilience exhibition",
    caption: "Hands of Resilience · KAFART",
    detail: "Curatorial coordination, and the conversations around the work.",
    position: "center 42%",
    href: "/work/kafart",
  },
  {
    label: "The community",
    image: "/assets/kafart-group-pic.jpg",
    alt: "Artists and participants gathered at KAFART",
    caption: "People behind the programme · KAFART",
    detail: "Building a public for art, and a community around its makers.",
    position: "center 24%",
    href: "/work/kafart",
  },
  {
    label: "The conversation",
    image: "/assets/kafart-panel.jpg",
    alt: "Speakers on stage at the KAFART panel",
    caption: "Future Forward · KAFART 2024",
    detail: "Moderating an exchange on culture, creativity and what comes next.",
    position: "center 32%",
    href: "/work/kafart",
  },
];

export function FieldNotes() {
  const [active, setActive] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scene = scenes[active];
  const dims = imageSize(scene.image);

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      (index + (event.key === "ArrowRight" ? 1 : -1) + scenes.length) %
      scenes.length;
    setActive(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div className="field-notes">
      <div
        className="scene-select"
        role="group"
        aria-label="Explore fieldwork photographs"
      >
        {scenes.map((item, index) => (
          <button
            key={item.label}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <figure aria-live="polite" aria-atomic="true">
        <div className="scene-image">
          <img
            key={scene.image}
            src={sitePath(scene.image)}
            alt={scene.alt}
            width={dims.width}
            height={dims.height}
            fetchPriority={active === 0 ? "high" : "auto"}
            decoding="async"
            style={{ objectPosition: scene.position }}
          />
        </div>
        <figcaption>
          <Link className="scene-caption-link" href={scene.href}>
            {scene.caption} <span aria-hidden="true">→</span>
          </Link>
          <span>{scene.detail}</span>
        </figcaption>
      </figure>
    </div>
  );
}
