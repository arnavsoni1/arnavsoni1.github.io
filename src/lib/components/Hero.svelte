<section class="hero" id="home">
    <div class="hero-copy">
        <div class="hero-kicker">
            <span class="signal-dot"></span>
            Transmission received // Portfolio 2026
        </div>

        <h1 class="hero-title" aria-label="Arnav Soni">
            <span>Arnav</span>
            <span>Soni</span>
        </h1>

        <div class="hero-role">
            <span>Student engineer</span>
            <i aria-hidden="true"></i>
            <span>Systems explorer</span>
        </div>

        <p class="hero-description">
            I explore low-level systems and high-performance computing—building closer to the metal,
            learning how machines really work, and turning that curiosity into software.
        </p>

        <div class="hero-actions">
            <a class="button button--primary" href="#projects">Explore missions</a>
            <a class="button" href="https://github.com/arnavsoni1" target="_blank" rel="noreferrer">View GitHub</a>
        </div>

        <div class="hero-readout" aria-label="Current focus areas">
            <div>
                <span>01</span>
                <p>Low-level<br />systems</p>
            </div>
            <div>
                <span>02</span>
                <p>Parallel<br />computing</p>
            </div>
            <div>
                <span>03</span>
                <p>Always<br />learning</p>
            </div>
        </div>
    </div>

    <div class="system-map" aria-label="Decorative orbital system status display">
        <div class="map-header">
            <span>Orbital system map</span>
            <span class="online"><i></i> Online</span>
        </div>

        <div class="radar" aria-hidden="true">
            <span class="axis axis--x"></span>
            <span class="axis axis--y"></span>
            <span class="orbit orbit--outer"></span>
            <span class="orbit orbit--middle"></span>
            <span class="orbit orbit--inner"></span>
            <span class="sweep"></span>
            <span class="core"><i></i></span>
            <span class="satellite satellite--one"></span>
            <span class="satellite satellite--two"></span>
            <span class="satellite satellite--three"></span>
            <span class="coordinate coordinate--one">X: 07.16</span>
            <span class="coordinate coordinate--two">Y: 20.07</span>
        </div>

        <div class="map-footer">
            <div><small>Signal</small><strong>100%</strong></div>
            <div><small>Sector</small><strong>IND // 07</strong></div>
            <div><small>Status</small><strong>CURIOUS</strong></div>
        </div>
    </div>

    <a class="scroll-cue" href="#about">
        <span>Scroll to enter</span>
        <i aria-hidden="true"></i>
    </a>
</section>

<style>
    .hero {
        display: grid;
        position: relative;
        width: min(1180px, calc(100% - 3rem));
        min-height: 100svh;
        grid-template-columns: minmax(0, 1.2fr) minmax(21rem, 0.78fr);
        gap: clamp(3rem, 8vw, 7rem);
        align-items: center;
        margin: 0 auto;
        padding: 9rem 0 7rem;
    }

    .hero-copy {
        position: relative;
        z-index: 2;
    }

    .hero-kicker {
        display: flex;
        gap: 0.7rem;
        align-items: center;
        margin-bottom: 1.5rem;
        color: var(--blue);
        font-family: var(--display);
        font-size: 0.61rem;
        font-weight: 700;
        letter-spacing: 0.19em;
        text-transform: uppercase;
    }

    .signal-dot {
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 50%;
        background: var(--green);
        box-shadow: 0 0 12px var(--green);
        animation: signal 1.8s ease-in-out infinite;
    }

    .hero-title {
        font-family: var(--display);
        font-size: clamp(4.5rem, 11vw, 9.4rem);
        font-weight: 900;
        letter-spacing: -0.085em;
        line-height: 0.76;
        text-transform: uppercase;
    }

    .hero-title span {
        display: block;
    }

    .hero-title span:first-child {
        position: relative;
        left: -0.03em;
        color: transparent;
        -webkit-text-stroke: clamp(1px, 0.15vw, 2px) var(--yellow);
        filter: drop-shadow(0 0 15px rgba(255, 232, 31, 0.1));
    }

    .hero-title span:last-child {
        color: var(--text);
        text-shadow: 0 0 60px rgba(255, 255, 255, 0.07);
    }

    .hero-role {
        display: flex;
        gap: 0.85rem;
        align-items: center;
        margin-top: 1.8rem;
        color: var(--blue-bright);
        font-family: var(--display);
        font-size: clamp(0.65rem, 1.5vw, 0.78rem);
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .hero-role i {
        width: 1.8rem;
        height: 1px;
        background: var(--line-strong);
    }

    .hero-description {
        max-width: 40rem;
        margin: 1.55rem 0 2rem;
        color: var(--muted);
        font-size: clamp(1rem, 1.8vw, 1.17rem);
        line-height: 1.72;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .hero-readout {
        display: flex;
        max-width: 36rem;
        margin-top: 3.5rem;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
    }

    .hero-readout > div {
        display: flex;
        flex: 1;
        gap: 0.7rem;
        align-items: center;
        padding: 1rem 0;
    }

    .hero-readout > div + div {
        padding-left: 1rem;
        border-left: 1px solid var(--line);
    }

    .hero-readout span {
        color: var(--yellow);
        font-family: var(--display);
        font-size: 0.63rem;
    }

    .hero-readout p {
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.52rem;
        letter-spacing: 0.1em;
        line-height: 1.5;
        text-transform: uppercase;
    }

    .system-map {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--line-strong);
        background: rgba(5, 11, 20, 0.72);
        box-shadow: inset 0 0 4rem rgba(100, 217, 255, 0.04), 0 3rem 8rem rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        clip-path: polygon(0 0, calc(100% - 1.2rem) 0, 100% 1.2rem, 100% 100%, 1.2rem 100%, 0 calc(100% - 1.2rem));
    }

    .system-map::after {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(transparent 49%, rgba(100, 217, 255, 0.08) 50%, transparent 51%);
        background-size: 100% 8px;
        content: '';
        opacity: 0.45;
    }

    .map-header,
    .map-footer {
        display: flex;
        position: relative;
        z-index: 2;
        justify-content: space-between;
        padding: 0.9rem 1rem;
        border-bottom: 1px solid var(--line);
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.5rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .online {
        display: inline-flex;
        gap: 0.4rem;
        align-items: center;
        color: var(--green);
    }

    .online i {
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 8px currentColor;
    }

    .radar {
        position: relative;
        aspect-ratio: 1;
        margin: 1.4rem;
        border: 1px solid var(--line);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(100, 217, 255, 0.075), transparent 64%);
    }

    .axis,
    .orbit,
    .sweep,
    .core,
    .satellite,
    .coordinate {
        position: absolute;
    }

    .axis--x {
        top: 50%;
        right: 0;
        left: 0;
        height: 1px;
        background: var(--line);
    }

    .axis--y {
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        background: var(--line);
    }

    .orbit {
        top: 50%;
        left: 50%;
        border: 1px solid var(--line);
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .orbit--outer { width: 79%; height: 79%; }
    .orbit--middle { width: 53%; height: 53%; }
    .orbit--inner { width: 28%; height: 28%; }

    .sweep {
        top: 50%;
        left: 50%;
        width: 43%;
        height: 1px;
        transform-origin: left;
        background: linear-gradient(90deg, var(--blue), transparent);
        box-shadow: -1rem 0 2rem rgba(100, 217, 255, 0.28);
        animation: sweep 7s linear infinite;
    }

    .core {
        display: grid;
        top: 50%;
        left: 50%;
        width: 19%;
        height: 19%;
        place-items: center;
        transform: translate(-50%, -50%);
        border: 2px solid var(--yellow);
        border-radius: 50%;
        background: var(--panel-solid);
        box-shadow: 0 0 2rem rgba(255, 232, 31, 0.17), inset 0 0 1rem rgba(255, 232, 31, 0.08);
    }

    .core i {
        width: 38%;
        height: 38%;
        border: 1px solid var(--yellow);
        border-radius: 50%;
    }

    .satellite {
        width: 0.55rem;
        height: 0.55rem;
        border: 2px solid var(--blue-bright);
        border-radius: 50%;
        background: var(--space);
        box-shadow: 0 0 10px var(--blue);
    }

    .satellite--one { top: 13%; left: 52%; }
    .satellite--two { right: 18%; bottom: 22%; border-color: var(--green); box-shadow: 0 0 10px var(--green); }
    .satellite--three { bottom: 17%; left: 23%; width: 0.38rem; height: 0.38rem; border-color: var(--yellow); box-shadow: 0 0 8px var(--yellow); }

    .coordinate {
        padding: 0.25rem 0.35rem;
        background: rgba(3, 5, 10, 0.78);
        color: var(--blue);
        font-family: var(--display);
        font-size: 0.42rem;
        letter-spacing: 0.1em;
    }

    .coordinate--one { top: 22%; right: 7%; }
    .coordinate--two { bottom: 28%; left: 5%; }

    .map-footer {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 0;
        border-top: 1px solid var(--line);
        border-bottom: 0;
    }

    .map-footer div {
        padding: 0.8rem;
    }

    .map-footer div + div {
        border-left: 1px solid var(--line);
    }

    .map-footer small,
    .map-footer strong {
        display: block;
    }

    .map-footer small {
        margin-bottom: 0.32rem;
        color: var(--muted);
        font-size: 0.43rem;
    }

    .map-footer strong {
        color: var(--blue-bright);
        font-size: 0.49rem;
    }

    .scroll-cue {
        display: flex;
        position: absolute;
        bottom: 2rem;
        left: 0;
        gap: 0.8rem;
        align-items: center;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.49rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-decoration: none;
        text-transform: uppercase;
    }

    .scroll-cue i {
        position: relative;
        width: 2.8rem;
        height: 1px;
        overflow: hidden;
        background: var(--line);
    }

    .scroll-cue i::after {
        position: absolute;
        width: 50%;
        height: 1px;
        background: var(--yellow);
        animation: travel 2.2s ease-in-out infinite;
        content: '';
    }

    @keyframes signal {
        50% { opacity: 0.45; }
    }

    @keyframes sweep {
        to { transform: rotate(360deg); }
    }

    @keyframes travel {
        from { transform: translateX(-110%); }
        to { transform: translateX(220%); }
    }

    @media (max-width: 900px) {
        .hero {
            width: min(100% - 2rem, 44rem);
            grid-template-columns: 1fr;
            padding-top: 10rem;
        }

        .system-map {
            width: min(28rem, 88%);
            margin: 0 auto;
        }

        .scroll-cue {
            display: none;
        }
    }

    @media (max-width: 560px) {
        .hero-title {
            font-size: clamp(4.1rem, 22vw, 6.5rem);
        }

        .hero-role {
            align-items: flex-start;
            flex-direction: column;
        }

        .hero-role i {
            display: none;
        }

        .hero-actions .button {
            width: 100%;
        }

        .hero-readout {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }

        .hero-readout > div {
            align-items: flex-start;
            flex-direction: column;
        }

        .hero-readout > div + div {
            padding-left: 0.75rem;
        }

        .system-map {
            width: 100%;
        }
    }
</style>
