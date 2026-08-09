<script>
    import droopy from '../../assets/characters/droopy-astronaut.webp';
    import scooby from '../../assets/characters/scooby-astronaut.webp';
    import spike from '../../assets/characters/spike-astronaut.webp';

    // Add, remove, or reorder entries here. Leave `link` empty until a project has a page to visit.
    const projects = [
        {
            title: 'Your project title',
            description: 'Add a one-line description of what you built and why it matters.',
            link: ''
        },
        {
            title: 'Another project title',
            description: 'Keep this to one useful sentence about the problem, result, or interesting technical detail.',
            link: ''
        },
        {
            title: 'One more project title',
            description: 'Use this row for another project, experiment, or work in progress.',
            link: ''
        }
    ];
</script>

<section class="projects page-section" id="projects">
    <div class="projects-heading section-heading" data-reveal>
        <p class="section-label">Projects</p>
        <h2>A running log of <em>what I build.</em></h2>
        <p>
            A compact list of projects, experiments, and ideas—kept short, useful, and easy to scan.
        </p>
    </div>

    <div class="projects-layout">
        <div class="character-stage" aria-hidden="true">
            <div class="character-lineup">
                <div class="project-character character-droopy"><img src={droopy} alt="" /></div>
                <div class="project-character character-spike"><img src={spike} alt="" /></div>
                <div class="project-character character-scooby"><img src={scooby} alt="" /></div>
            </div>

            <svg
                class="character-box"
                viewBox="0 0 900 190"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <path class="box-face box-top" d="M 25 78 L 92 20 H 808 L 875 78 Z" />
                <ellipse class="box-contact-shadow" cx="165" cy="67" rx="62" ry="8" />
                <ellipse class="box-contact-shadow" cx="450" cy="67" rx="62" ry="8" />
                <ellipse class="box-contact-shadow" cx="735" cy="67" rx="62" ry="8" />
                <path class="box-face box-front" d="M 25 78 H 875 V 172 H 25 Z" />
                <path class="box-bottom-band" d="M 25 148 H 875 V 172 H 25 Z" />
                <path class="box-divider" d="M 308 82 V 148 M 592 82 V 148" />
                <circle class="box-badge badge-coral" cx="166" cy="113" r="13" />
                <circle class="box-badge badge-mint" cx="450" cy="113" r="13" />
                <circle class="box-badge badge-sky" cx="734" cy="113" r="13" />
            </svg>
        </div>

        <div class="project-log" data-reveal>
            <div class="project-log-heading">
                <div>
                    <p>Selected work</p>
                    <h3>Project log</h3>
                </div>
                <span>{String(projects.length).padStart(2, '0')} entries</span>
            </div>

            <ol class="project-list">
                {#each projects as project, index}
                    <li class="project-entry">
                        <span class="project-number">{String(index + 1).padStart(2, '0')}</span>
                        <div class="project-copy">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                        </div>

                        {#if project.link}
                            <a
                                class="project-link"
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${project.title}`}
                            >↗</a>
                        {/if}
                    </li>
                {/each}
            </ol>
        </div>
    </div>
</section>

<style>
    .projects {
        position: relative;
    }

    .projects-heading {
        max-width: 58rem;
        margin-bottom: clamp(3.5rem, 7vw, 6rem);
    }

    .projects-heading > p:last-child {
        max-width: 39rem;
        margin-top: 1.4rem;
        color: var(--paper-muted);
        font-size: 1.08rem;
        line-height: 1.65;
    }

    .projects-layout {
        display: grid;
        grid-template-columns: minmax(34rem, 1.25fr) minmax(23rem, 0.85fr);
        gap: clamp(2.5rem, 4vw, 4.5rem);
        align-items: center;
    }

    .character-stage {
        position: relative;
        min-height: 29rem;
        isolation: isolate;
    }

    .character-stage::after {
        position: absolute;
        z-index: -1;
        right: 2%;
        bottom: -1rem;
        left: 2%;
        height: 1.35rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.46);
        filter: blur(10px);
        content: '';
    }

    .character-lineup {
        display: grid;
        position: absolute;
        z-index: 2;
        right: 2%;
        bottom: 5.65rem;
        left: 2%;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: end;
    }

    .project-character {
        position: relative;
        height: clamp(15.5rem, 24vw, 20.5rem);
        justify-self: center;
        overflow: hidden;
        filter: drop-shadow(0 0.45rem 0.35rem rgba(0, 0, 0, 0.3));
    }

    .project-character img {
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        max-width: none;
    }

    .character-droopy {
        aspect-ratio: 1024 / 1332;
    }

    .character-droopy img {
        height: 115.32%;
    }

    .character-spike {
        aspect-ratio: 1024 / 1386;
    }

    .character-spike img {
        height: 110.83%;
    }

    .character-scooby {
        aspect-ratio: 1024 / 1436;
    }

    .character-scooby img {
        height: 106.97%;
    }

    .character-box {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 9rem;
        overflow: visible;
        filter: drop-shadow(7px 9px 0 var(--ink));
    }

    .box-face {
        stroke: var(--ink);
        stroke-width: 6px;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
    }

    .box-top {
        fill: var(--gold);
    }

    .box-front {
        fill: var(--cream);
    }

    .box-bottom-band {
        fill: var(--coral);
        stroke: var(--ink);
        stroke-width: 5px;
        vector-effect: non-scaling-stroke;
    }

    .box-contact-shadow {
        fill: rgba(9, 12, 18, 0.26);
    }

    .box-divider {
        fill: none;
        stroke: rgba(9, 12, 18, 0.24);
        stroke-width: 3px;
        vector-effect: non-scaling-stroke;
    }

    .box-badge {
        stroke: var(--ink);
        stroke-width: 5px;
        vector-effect: non-scaling-stroke;
    }

    .badge-coral { fill: var(--coral); }
    .badge-mint { fill: var(--mint); }
    .badge-sky { fill: var(--sky); }

    .project-log {
        position: relative;
        overflow: visible;
        border: 3px solid var(--ink);
        border-radius: 2.8rem 1rem 3.4rem 1.2rem;
        background: var(--cream);
        box-shadow: 13px 15px 0 var(--coral), 18px 20px 0 var(--ink);
        color: var(--ink);
    }

    .project-log::before {
        position: absolute;
        z-index: 3;
        top: -0.4rem;
        right: 13%;
        width: 7.2rem;
        height: 2rem;
        background: rgba(105, 196, 202, 0.76);
        clip-path: polygon(3% 8%, 97% 0, 94% 94%, 0 100%);
        content: '';
        transform: rotate(3deg);
    }

    .project-log-heading {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        align-items: flex-end;
        padding: clamp(2rem, 5vw, 3.1rem);
        border-bottom: 3px solid var(--ink);
        border-radius: 2.55rem 0.75rem 0 0;
        background:
            radial-gradient(circle at 87% 18%, rgba(221, 169, 59, 0.22), transparent 8rem),
            var(--cream);
    }

    .project-log-heading p {
        margin-bottom: 0.4rem;
        color: #6b6252;
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.13em;
        text-transform: uppercase;
    }

    .project-log-heading h3 {
        font-family: var(--display);
        font-size: clamp(2rem, 5vw, 3.4rem);
        letter-spacing: -0.045em;
        line-height: 0.95;
        text-transform: uppercase;
    }

    .project-log-heading > span {
        flex: 0 0 auto;
        padding: 0.48rem 0.72rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--gold);
        box-shadow: 3px 4px 0 var(--ink);
        font-size: 0.64rem;
        font-weight: 900;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        transform: rotate(2deg);
    }

    .project-list {
        list-style: none;
    }

    .project-entry {
        display: grid;
        grid-template-columns: 3.25rem minmax(0, 1fr) auto;
        gap: clamp(1rem, 3vw, 1.6rem);
        align-items: center;
        padding: clamp(1.5rem, 3.5vw, 2.1rem) clamp(1.6rem, 5vw, 3.1rem);
        border-bottom: 2px solid rgba(9, 12, 18, 0.18);
    }

    .project-entry:nth-child(even) {
        background: rgba(221, 169, 59, 0.08);
    }

    .project-entry:last-child {
        border-bottom: 0;
        border-radius: 0 0 3.1rem 0.9rem;
    }

    .project-number {
        display: grid;
        width: 3.1rem;
        aspect-ratio: 1;
        place-items: center;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: var(--coral);
        box-shadow: 3px 4px 0 var(--ink);
        color: var(--cream);
        font-family: var(--display);
        font-size: 0.78rem;
    }

    .project-copy h4 {
        font-family: var(--display);
        font-size: clamp(1.15rem, 2.4vw, 1.55rem);
        letter-spacing: -0.025em;
        line-height: 1.1;
    }

    .project-copy p {
        max-width: 36rem;
        margin-top: 0.48rem;
        color: #655d4f;
        font-size: 0.95rem;
        line-height: 1.55;
    }

    .project-link {
        display: grid;
        width: 2.8rem;
        aspect-ratio: 1;
        place-items: center;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: var(--mint);
        box-shadow: 3px 4px 0 var(--ink);
        color: var(--ink);
        font-size: 1.2rem;
        font-weight: 900;
        text-decoration: none;
        transition: transform 160ms ease, box-shadow 160ms ease;
    }

    .project-link:hover {
        box-shadow: 5px 6px 0 var(--ink);
        transform: translate(-2px, -2px);
    }

    @media (max-width: 1050px) {
        .projects-layout {
            grid-template-columns: 1fr;
        }

        .character-stage {
            width: min(48rem, 100%);
            min-height: 30rem;
            margin: 0 auto -1rem;
        }

        .project-log {
            width: min(44rem, calc(100% - 1.1rem));
            margin: 0 auto;
        }
    }

    @media (max-width: 560px) {
        .projects-heading {
            margin-bottom: 3rem;
        }

        .character-stage {
            min-height: 18rem;
        }

        .character-lineup {
            bottom: 4.35rem;
        }

        .character-box {
            height: 6.8rem;
            filter: drop-shadow(6px 8px 0 var(--ink));
        }

        .project-character {
            height: clamp(9.25rem, 38vw, 12.5rem);
        }

        .project-log {
            width: calc(100% - 0.65rem);
            border-radius: 2rem 0.8rem 2.4rem 1rem;
            box-shadow: 8px 10px 0 var(--coral), 12px 14px 0 var(--ink);
        }

        .project-log-heading {
            align-items: flex-start;
            flex-direction: column;
            padding: 2.2rem 1.35rem 1.6rem;
        }

        .project-log-heading > span {
            align-self: flex-end;
        }

        .project-entry {
            grid-template-columns: 2.7rem minmax(0, 1fr) auto;
            gap: 0.85rem;
            align-items: start;
            padding: 1.35rem;
        }

        .project-entry:last-child {
            border-radius: 0 0 2.1rem 0.75rem;
        }

        .project-number {
            width: 2.55rem;
            font-size: 0.66rem;
        }

        .project-copy p {
            font-size: 0.88rem;
        }

        .project-link {
            width: 2.4rem;
        }

    }
</style>
