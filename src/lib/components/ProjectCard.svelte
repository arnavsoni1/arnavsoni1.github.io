<script>
    export let number;
    export let title;
    export let description;
    export let tech = [];
    export let projectLink = '';
    export let sourceLink = '';
    export let status = 'In development';
</script>

<article class="project-card panel">
    <div class="project-index">
        <span>Mission</span>
        <strong>{String(number).padStart(2, '0')}</strong>
    </div>

    <div class="project-body">
        <div class="project-status"><i></i>{status}</div>
        <h3>{title}</h3>
        <p>{description}</p>

        <ul class="project-tech" aria-label="Technologies">
            {#each tech as item}
                <li>{item}</li>
            {/each}
        </ul>
    </div>

    <div class="project-actions">
        {#if sourceLink}
            <a href={sourceLink} target="_blank" rel="noreferrer">Source <span aria-hidden="true">↗</span></a>
        {:else}
            <span class="pending-link">Source link pending</span>
        {/if}

        {#if projectLink}
            <a href={projectLink} target="_blank" rel="noreferrer">Live project <span aria-hidden="true">↗</span></a>
        {:else}
            <span class="pending-link">Demo link pending</span>
        {/if}
    </div>
</article>

<style>
    .project-card {
        display: grid;
        min-height: 24rem;
        grid-template-columns: 5.2rem 1fr;
        overflow: hidden;
        transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
    }

    .project-card:hover {
        transform: translateY(-4px);
        border-color: var(--line-strong);
        box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.28), 0 0 2rem rgba(100, 217, 255, 0.055);
    }

    .project-index {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 1.5rem 0.8rem;
        border-right: 1px solid var(--line);
    }

    .project-index span {
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.44rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        writing-mode: vertical-rl;
    }

    .project-index strong {
        margin-top: auto;
        color: transparent;
        font-family: var(--display);
        font-size: 2.7rem;
        font-weight: 800;
        line-height: 1;
        -webkit-text-stroke: 1px var(--yellow);
    }

    .project-body {
        padding: clamp(1.5rem, 4vw, 2.3rem);
    }

    .project-status {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        color: var(--green);
        font-family: var(--display);
        font-size: 0.46rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
    }

    .project-status i {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
    }

    h3 {
        margin: 1.3rem 0 1rem;
        color: var(--text);
        font-family: var(--display);
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.15;
        text-transform: uppercase;
    }

    .project-body > p {
        color: var(--muted);
        font-size: 0.96rem;
        line-height: 1.65;
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-top: 1.5rem;
        list-style: none;
    }

    .project-tech li {
        padding: 0.38rem 0.6rem;
        border: 1px solid var(--line);
        color: var(--blue-bright);
        font-family: var(--display);
        font-size: 0.45rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .project-actions {
        display: flex;
        grid-column: 1 / -1;
        border-top: 1px solid var(--line);
    }

    .project-actions > * {
        flex: 1;
        padding: 0.9rem 1.2rem;
    }

    .project-actions > * + * {
        border-left: 1px solid var(--line);
    }

    .project-actions a,
    .pending-link {
        color: var(--blue-bright);
        font-family: var(--display);
        font-size: 0.48rem;
        font-weight: 700;
        letter-spacing: 0.13em;
        text-decoration: none;
        text-transform: uppercase;
    }

    .project-actions a {
        display: flex;
        justify-content: space-between;
        transition: color 180ms ease, background 180ms ease;
    }

    .project-actions a:hover {
        background: rgba(100, 217, 255, 0.07);
        color: var(--yellow);
    }

    .pending-link {
        color: rgba(142, 165, 175, 0.55);
    }

    @media (max-width: 500px) {
        .project-card {
            grid-template-columns: 3.6rem 1fr;
        }

        .project-actions {
            flex-direction: column;
        }

        .project-actions > * + * {
            border-top: 1px solid var(--line);
            border-left: 0;
        }
    }
</style>
