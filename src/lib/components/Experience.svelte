<script>
    // Add your real team name, dates, achievements, and tools here.
    // Duplicate this object if you want to add another role later.
    const experiences = [
        {
            role: 'Flight Software Engineer',
            organization: 'Team Sammard',
            period: 'Add dates',
            summary:
                "I worked on flight software for my university's rocketry team. ",
            highlights: [
                'I worked on the flight software for CANSAT',
                'I also worked on the initial design of the propulsion testing software for our newly developed SRAD motors'
            ],
            stack: ['Embedded software development']
        }
    ];
</script>

<section class="experience page-section" id="experience">
    <div class="section-heading" data-reveal>
        <p class="section-label">Previous experience</p>
    </div>

    <div class="experience-list">
        {#each experiences as experience, index}
            <article class="experience-entry" data-reveal data-reveal-tilt={index % 2 ? '1' : '-1'}>
                <div class="mission-marker" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i></i>
                </div>

                <div class="experience-card">
                    <header class="experience-header">
                        <div>
                            <p class="mission-label">Flight software</p>
                            <h3>{experience.role}</h3>
                            <p class="organization">{experience.organization}</p>
                        </div>
                        
                    </header>

                    <p class="summary">{experience.summary}</p>

                    <div class="experience-details">
                        <div class="highlights">
                            <h4>Mission highlights</h4>
                            <ul>
                                {#each experience.highlights as highlight}
                                    <li>{highlight}</li>
                                {/each}
                            </ul>
                        </div>

                        <div class="stack">
                            <h4>Tools &amp; systems</h4>
                            <div class="stack-list">
                                {#each experience.stack as item}
                                    <span>{item}</span>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <span class="card-tape" aria-hidden="true"></span>
                </div>
            </article>
        {/each}
    </div>
</section>

<style>
    .experience {
        position: relative;
    }

    .experience::before {
        position: absolute;
        top: 19rem;
        right: -10rem;
        width: 24rem;
        aspect-ratio: 1;
        border: 1px dashed rgba(105, 196, 202, 0.2);
        border-radius: 50%;
        content: '';
        pointer-events: none;
    }

    .section-heading {
        max-width: 63rem;
    }

    .experience-list {
        display: grid;
        gap: 3rem;
        margin-top: 5rem;
    }

    .experience-entry {
        display: grid;
        position: relative;
        grid-template-columns: 5rem minmax(0, 1fr);
        gap: clamp(1rem, 3vw, 2.5rem);
        align-items: stretch;
    }

    .mission-marker {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .mission-marker span {
        display: grid;
        width: 4.2rem;
        aspect-ratio: 1;
        flex: 0 0 auto;
        place-items: center;
        border: 3px solid var(--ink);
        border-radius: 50%;
        background: var(--gold);
        box-shadow: 5px 6px 0 var(--ink);
        color: var(--ink);
        font-family: var(--display);
        font-size: 0.95rem;
    }

    .mission-marker i {
        width: 3px;
        height: 100%;
        min-height: 9rem;
        margin-top: 1rem;
        border-radius: 999px;
        background: repeating-linear-gradient(
            to bottom,
            var(--mint) 0 0.8rem,
            transparent 0.8rem 1.35rem
        );
    }

    .experience-card {
        position: relative;
        padding: clamp(1.6rem, 4vw, 3.2rem);
        border: 3px solid var(--ink);
        border-radius: 1.2rem 3rem 1.4rem 2.4rem;
        background: var(--cream);
        box-shadow: 12px 14px 0 var(--coral), 16px 18px 0 var(--ink);
        color: var(--ink);
    }

    .experience-header {
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 2rem;
        border-bottom: 2px dashed rgba(9, 12, 18, 0.3);
    }

    .mission-label,
    h4,
    .period span {
        font-size: 0.7rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .mission-label {
        margin-bottom: 0.65rem;
        color: #4c635d;
    }

    h3 {
        max-width: 42rem;
        font-family: var(--display);
        font-size: clamp(2rem, 5vw, 4.4rem);
        font-weight: 900;
        letter-spacing: -0.055em;
        line-height: 0.98;
        text-wrap: balance;
    }

    .organization {
        margin-top: 0.75rem;
        color: #4b4438;
        font-size: 1rem;
        font-weight: 800;
    }

    .period {
        display: grid;
        min-width: 9.5rem;
        gap: 0.35rem;
        padding: 0.9rem 1rem;
        border: 2px solid var(--ink);
        border-radius: 0.7rem 1.2rem 0.7rem 1rem;
        background: var(--mint);
        box-shadow: 4px 5px 0 var(--ink);
        transform: rotate(1.5deg);
    }

    .period strong {
        font-size: 0.9rem;
    }

    .summary {
        max-width: 59rem;
        margin-top: 2rem;
        font-size: clamp(1.05rem, 2vw, 1.2rem);
        line-height: 1.7;
    }

    .experience-details {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(13rem, 0.65fr);
        gap: clamp(2rem, 6vw, 5rem);
        margin-top: 2.5rem;
    }

    h4 {
        margin-bottom: 1rem;
        color: #4c635d;
    }

    .highlights ul {
        display: grid;
        gap: 0.8rem;
        list-style: none;
    }

    .highlights li {
        position: relative;
        padding-left: 1.8rem;
        font-weight: 650;
        line-height: 1.5;
    }

    .highlights li::before {
        position: absolute;
        top: 0.45rem;
        left: 0;
        width: 0.72rem;
        height: 0.72rem;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: var(--coral);
        content: '';
    }

    .stack-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
    }

    .stack-list span {
        padding: 0.55rem 0.75rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--sky);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 0.7rem;
        font-weight: 900;
        letter-spacing: 0.04em;
    }

    .stack-list span:nth-child(2) { background: var(--gold); }
    .stack-list span:nth-child(3n) { background: var(--coral); }

    .card-tape {
        position: absolute;
        top: -1.1rem;
        left: 13%;
        width: 7rem;
        height: 2rem;
        background: rgba(105, 196, 202, 0.75);
        clip-path: polygon(3% 6%, 97% 0, 94% 96%, 0 100%);
        transform: rotate(-3deg);
    }

    @media (max-width: 760px) {
        .experience-entry { grid-template-columns: 1fr; }
        .mission-marker { display: none; }
        .experience-header { flex-direction: column; }
        .period { min-width: 0; }
        .experience-details { grid-template-columns: 1fr; }
    }

    @media (max-width: 520px) {
        .experience-card {
            border-radius: 1rem 2rem 1rem 1.6rem;
            box-shadow: 8px 10px 0 var(--coral), 11px 13px 0 var(--ink);
        }
    }
</style>
