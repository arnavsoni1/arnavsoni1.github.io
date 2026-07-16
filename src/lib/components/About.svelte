<section class="section-shell about" id="about">
    <div class="section-header">
        <div>
            <p class="section-kicker">01 // Identity file</p>
            <h2 class="section-title">Mission <em>brief</em></h2>
        </div>
        <p class="section-intro">
            Curious about what happens beneath the abstraction layer, I use projects as a way to learn
            how software, hardware, and performance fit together.
        </p>
    </div>

    <div class="about-grid">
        <div class="identity-card panel">
            <div class="identity-topline">
                <span>Personnel record</span>
                <span class="clearance">Open file</span>
            </div>

            <div class="portrait" aria-label="Arnav Soni monogram">
                <span>AS</span>
                <i class="portrait-ring portrait-ring--one"></i>
                <i class="portrait-ring portrait-ring--two"></i>
            </div>

            <div class="identity-data">
                <div>
                    <small>Designation</small>
                    <strong>Student engineer</strong>
                </div>
                <div>
                    <small>Primary sector</small>
                    <strong>Systems / HPC</strong>
                </div>
            </div>
        </div>

        <div class="briefing">
            <p class="data-label">Personal log // 001</p>
            <h3>I like software that explains the machine.</h3>
            <p>
                Low-level computing is where abstract ideas meet real constraints: memory, concurrency,
                data movement, and hardware. That tension is what keeps me curious.
            </p>
            <p>
                I build to understand. Each project is a new system to take apart, measure, and put back
                together with a little more clarity than before.
            </p>

            <div class="principles">
                <div>
                    <span>01</span>
                    <strong>Stay curious</strong>
                    <p>Follow questions all the way down the stack.</p>
                </div>
                <div>
                    <span>02</span>
                    <strong>Build to learn</strong>
                    <p>Turn theory into something observable and real.</p>
                </div>
                <div>
                    <span>03</span>
                    <strong>Share the map</strong>
                    <p>Make complex systems easier for others to explore.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .about-grid {
        display: grid;
        grid-template-columns: minmax(18rem, 0.75fr) minmax(0, 1.25fr);
        gap: clamp(2rem, 7vw, 6rem);
        align-items: center;
    }

    .identity-card {
        padding: 1rem;
    }

    .identity-topline {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.9rem;
        border-bottom: 1px solid var(--line);
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.48rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
    }

    .clearance {
        color: var(--green);
    }

    .portrait {
        display: grid;
        position: relative;
        width: min(75%, 16rem);
        aspect-ratio: 1;
        place-items: center;
        margin: 2.5rem auto;
        border: 1px solid var(--line-strong);
        border-radius: 50%;
        background:
            linear-gradient(90deg, transparent 49.7%, rgba(100, 217, 255, 0.14) 50%, transparent 50.3%),
            linear-gradient(transparent 49.7%, rgba(100, 217, 255, 0.14) 50%, transparent 50.3%),
            radial-gradient(circle, rgba(100, 217, 255, 0.1), transparent 66%);
        box-shadow: 0 0 3rem rgba(100, 217, 255, 0.07);
    }

    .portrait > span {
        display: grid;
        width: 44%;
        height: 44%;
        place-items: center;
        border: 2px solid var(--yellow);
        border-radius: 50%;
        background: var(--space-raised);
        color: var(--yellow);
        font-family: var(--display);
        font-size: clamp(1.4rem, 5vw, 2.6rem);
        font-weight: 800;
        letter-spacing: -0.06em;
        box-shadow: 0 0 2rem rgba(255, 232, 31, 0.13), inset 0 0 1.4rem rgba(255, 232, 31, 0.05);
    }

    .portrait-ring {
        position: absolute;
        border: 1px dashed var(--line-strong);
        border-radius: 50%;
    }

    .portrait-ring--one {
        width: 75%;
        height: 75%;
        animation: rotate 20s linear infinite;
    }

    .portrait-ring--two {
        width: 91%;
        height: 91%;
        border-style: dotted;
        border-color: rgba(255, 232, 31, 0.35);
        animation: rotate 30s linear infinite reverse;
    }

    .identity-data {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid var(--line);
    }

    .identity-data > div {
        padding-top: 0.9rem;
    }

    .identity-data > div + div {
        padding-left: 1rem;
        border-left: 1px solid var(--line);
    }

    .identity-data small,
    .identity-data strong {
        display: block;
        font-family: var(--display);
        text-transform: uppercase;
    }

    .identity-data small {
        margin-bottom: 0.35rem;
        color: var(--muted);
        font-size: 0.42rem;
        letter-spacing: 0.14em;
    }

    .identity-data strong {
        color: var(--blue-bright);
        font-size: 0.55rem;
        letter-spacing: 0.08em;
    }

    .briefing h3 {
        max-width: 36rem;
        margin: 1.1rem 0 1.5rem;
        font-family: var(--display);
        font-size: clamp(1.75rem, 4vw, 3.2rem);
        font-weight: 700;
        letter-spacing: -0.045em;
        line-height: 1.08;
        text-transform: uppercase;
    }

    .briefing > p:not(.data-label) {
        max-width: 40rem;
        margin-top: 1rem;
        color: var(--muted);
        font-size: 1.03rem;
    }

    .principles {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 2.5rem;
        border-top: 1px solid var(--line);
    }

    .principles > div {
        padding: 1.25rem 1rem 0 0;
    }

    .principles > div + div {
        padding-left: 1rem;
        border-left: 1px solid var(--line);
    }

    .principles span,
    .principles strong {
        display: block;
        font-family: var(--display);
    }

    .principles span {
        margin-bottom: 0.7rem;
        color: var(--yellow);
        font-size: 0.52rem;
    }

    .principles strong {
        margin-bottom: 0.45rem;
        color: var(--text);
        font-size: 0.64rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .principles p {
        color: var(--muted);
        font-size: 0.82rem;
        line-height: 1.5;
    }

    @keyframes rotate {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 850px) {
        .about-grid {
            grid-template-columns: 1fr;
        }

        .identity-card {
            width: min(100%, 28rem);
            margin: 0 auto;
        }
    }

    @media (max-width: 560px) {
        .principles {
            grid-template-columns: 1fr;
        }

        .principles > div + div {
            padding-left: 0;
            border-left: 0;
        }
    }
</style>
