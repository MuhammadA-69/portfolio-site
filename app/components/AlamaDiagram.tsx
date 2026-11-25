const stages = [
  {
    step: "01",
    title: "Offline-first capture",
    channel: "USSD · Feature phones",
    detail:
      "Informal craft creators document motifs, patterns and works over basic mobile networks without requiring smartphones or constant internet access.",
  },
  {
    step: "02",
    title: "Community validation & AI checks",
    channel: "Local guilds · Assisted verification",
    detail:
      "Community custodians verify provenance and cultural context alongside AI-assisted similarity checks, keeping cultural sovereignty centred on the makers.",
  },
  {
    step: "03",
    title: "Equitable licensing pathway",
    channel: "Attribution · Diaspora buyers",
    detail:
      "Verified records open a transparent licensing bridge between informal creators and diaspora buyers looking to commission or license authentic work.",
  },
];

export function AlamaDiagram() {
  return (
    <section
      className="page-shell alama-diagram section-block"
      aria-labelledby="alama-architecture-heading"
    >
      <div className="alama-diagram-header">
        <div>
          <p className="eyebrow">Concept architecture</p>
          <h2 id="alama-architecture-heading">How the model connects</h2>
        </div>
        <p className="alama-diagram-note">
          Early-stage service architecture — focused on problem definition and
          responsible technical choices, with no claims of a launched product.
        </p>
      </div>
      <ol className="alama-flow">
        {stages.map((stage) => (
          <li key={stage.step} className="alama-step">
            <div className="alama-step-top">
              <span className="alama-step-index tabular" aria-hidden="true">
                {stage.step}
              </span>
              <span className="alama-step-channel">{stage.channel}</span>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
