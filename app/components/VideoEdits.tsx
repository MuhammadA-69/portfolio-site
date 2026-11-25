"use client";
import { useState } from "react";
import edits from "../video-edits.json";
import { sitePath } from "../site-path";

export function VideoEdits() {
  const [selected, setSelected] = useState(0);
  const video = edits[selected];
  return <section className="page-shell case-videos section-block" aria-labelledby="case-videos-heading">
    <div><h2 id="case-videos-heading">In motion</h2><p>A selection of videos I edited for KAFART.</p><p className="video-count">{edits.length} edits · Select a title to watch</p></div>
    <div className="video-library">
      <label htmlFor="video-picker">Choose a video</label>
      <select id="video-picker" value={selected} onChange={event => setSelected(Number(event.target.value))}>
        {edits.map((item, index) => <option value={index} key={item.src}>{item.group} — {item.title}</option>)}
      </select>
      <video key={video.src} controls preload="none" playsInline aria-label={video.title}
        poster={sitePath(video.src.replace("/videos/", "/videos/posters/").replace(/\.mp4$/, ".webp"))}>
        <source src={sitePath(video.src)} type="video/mp4" /> Your browser does not support video playback.
      </video>
      <a className="text-link" href={sitePath(video.src)}>Open video directly</a>
    </div>
  </section>;
}
