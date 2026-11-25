"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import editsData from "../video-edits.json";
import { sitePath } from "../site-path";

type VideoEdit = {
  title: string;
  group: string;
  src: string;
  duration?: string;
  width?: number;
  height?: number;
};

const edits = editsData as VideoEdit[];

const GROUP_ORDER = [
  "All",
  "KAFART 2026",
  "In conversation with Kemi",
  "KIVTSD",
  "KAFART",
  "KAFART 2024",
] as const;

function posterFor(src: string) {
  return src.replace("/videos/", "/videos/posters/").replace(/\.mp4$/, ".webp");
}

export function VideoEdits() {
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [selectedSrc, setSelectedSrc] = useState<string>(edits[0].src);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { All: edits.length };
    for (const item of edits) {
      counts[item.group] = (counts[item.group] ?? 0) + 1;
    }
    return counts;
  }, []);

  const visibleEdits = useMemo(
    () =>
      activeGroup === "All"
        ? edits
        : edits.filter((item) => item.group === activeGroup),
    [activeGroup],
  );

  const currentIndex = Math.max(
    0,
    visibleEdits.findIndex((item) => item.src === selectedSrc),
  );
  const video = visibleEdits[currentIndex] ?? visibleEdits[0];
  const isPortrait =
    video.width && video.height ? video.height > video.width : true;

  const groupedForSelect = useMemo(() => {
    const map = new Map<string, VideoEdit[]>();
    for (const item of visibleEdits) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [visibleEdits]);

  function selectGroup(group: string) {
    setActiveGroup(group);
    const nextList =
      group === "All" ? edits : edits.filter((item) => item.group === group);
    if (nextList.length > 0 && !nextList.some((e) => e.src === selectedSrc)) {
      setSelectedSrc(nextList[0].src);
    }
  }

  function step(offset: number) {
    const next =
      (currentIndex + offset + visibleEdits.length) % visibleEdits.length;
    setSelectedSrc(visibleEdits[next].src);
  }

  return (
    <section
      className="page-shell case-videos section-block"
      aria-labelledby="case-videos-heading"
    >
      <div className="video-intro">
        <h2 id="case-videos-heading">In motion</h2>
        <p>A selection of videos I edited for KAFART.</p>
        <p className="video-count tabular">
          {visibleEdits.length} of {edits.length} edits ·{" "}
          {activeGroup === "All" ? "All series" : activeGroup}
        </p>
        <div
          className="video-series-filters"
          role="group"
          aria-label="Filter video edits by series"
        >
          {GROUP_ORDER.filter((group) => (groupCounts[group] ?? 0) > 0).map(
            (group) => (
              <button
                key={group}
                type="button"
                aria-pressed={activeGroup === group}
                onClick={() => selectGroup(group)}
              >
                {group}{" "}
                <span className="tabular" aria-hidden="true">
                  ({groupCounts[group]})
                </span>
              </button>
            ),
          )}
        </div>
      </div>

      <div className="video-library">
        <div className="video-controls-bar">
          <div className="video-select-wrap">
            <label htmlFor="video-picker">Choose a video</label>
            <select
              id="video-picker"
              value={video.src}
              onChange={(event) => setSelectedSrc(event.target.value)}
            >
              {groupedForSelect.map(([groupName, items]) => (
                <optgroup key={groupName} label={groupName}>
                  {items.map((item) => (
                    <option value={item.src} key={item.src}>
                      {item.title}
                      {item.duration ? ` (${item.duration})` : ""}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="video-step-controls">
            <button
              type="button"
              aria-label="Previous video edit"
              onClick={() => step(-1)}
            >
              Prev
            </button>
            <span className="video-position tabular" aria-live="polite">
              {currentIndex + 1} / {visibleEdits.length}
            </span>
            <button
              type="button"
              aria-label="Next video edit"
              onClick={() => step(1)}
            >
              Next
            </button>
          </div>
        </div>

        <div
          className="video-stage"
          data-orientation={isPortrait ? "portrait" : "landscape"}
        >
          <video
            key={video.src}
            controls
            preload="none"
            playsInline
            aria-label={`${video.group}: ${video.title}`}
            poster={sitePath(posterFor(video.src))}
            width={video.width}
            height={video.height}
          >
            <source src={sitePath(video.src)} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>

        <div className="video-meta-row">
          <p className="video-now-playing">
            <strong>{video.title}</strong>
            <span>
              {" "}
              · {video.group}
              {video.duration ? ` · ${video.duration}` : ""}
            </span>
          </p>
          <a
            className="text-link"
            href={sitePath(video.src)}
            target="_blank"
            rel="noreferrer"
          >
            Open video directly
          </a>
        </div>

        <ul
          className="video-poster-rail"
          aria-label="Video thumbnails in current series"
        >
          {visibleEdits.map((item) => {
            const active = item.src === video.src;
            return (
              <li key={item.src}>
                <button
                  type="button"
                  className={`video-poster-card ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setSelectedSrc(item.src)}
                >
                  <img
                    src={sitePath(posterFor(item.src))}
                    alt=""
                    width={160}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="video-poster-title">{item.title}</span>
                  {item.duration && (
                    <span className="video-poster-duration tabular">
                      {item.duration}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
