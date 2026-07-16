<script>
    export let icon;
    export let name;
    export let description;
    export let level;
    export let code = 'SYS';
</script>

<article class="skill-card panel">
    <div class="skill-topline">
        <span>{code}</span>
        <span class="status"><i></i> Active</span>
    </div>

    <div class="skill-icon">
        <img src={icon} alt="" />
    </div>

    <h3>{name}</h3>
    <p>{description}</p>

    <div class="meter" aria-label={`${name} familiarity: ${level} percent`}>
        <div class="meter-data">
            <span>Familiarity</span>
            <span>{level}%</span>
        </div>
        <div class="meter-track"><i style={`--level: ${level}%`}></i></div>
    </div>
</article>

<style>
    .skill-card {
        min-height: 22rem;
        padding: 1.2rem;
        transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
    }

    .skill-card:hover {
        transform: translateY(-5px);
        border-color: var(--line-strong);
        box-shadow: 0 1.8rem 5rem rgba(0, 0, 0, 0.28), 0 0 2.2rem rgba(100, 217, 255, 0.06);
    }

    .skill-topline {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid var(--line);
        color: var(--blue);
        font-family: var(--display);
        font-size: 0.46rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .status {
        display: inline-flex;
        gap: 0.36rem;
        align-items: center;
        color: var(--green);
    }

    .status i {
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
    }

    .skill-icon {
        display: grid;
        width: 5rem;
        height: 5rem;
        place-items: center;
        margin: 2rem 0 1.5rem;
        border: 1px solid var(--line);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(100, 217, 255, 0.12), transparent 68%);
    }

    .skill-icon img {
        width: 3.15rem;
        height: 3.15rem;
        object-fit: contain;
        filter: saturate(0.82) brightness(1.08);
    }

    h3 {
        margin-bottom: 0.65rem;
        color: var(--text);
        font-family: var(--display);
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    p {
        min-height: 3rem;
        color: var(--muted);
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .meter {
        margin-top: 1.6rem;
    }

    .meter-data {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.55rem;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.44rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .meter-data span:last-child {
        color: var(--yellow);
    }

    .meter-track {
        height: 3px;
        background: rgba(255, 255, 255, 0.08);
    }

    .meter-track i {
        display: block;
        width: var(--level);
        height: 100%;
        background: linear-gradient(90deg, var(--blue), var(--green));
        box-shadow: 0 0 8px var(--blue);
    }
</style>
