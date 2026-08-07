<section class="hero" id="home">
    <div class="hero-copy">
        <p class="eyebrow" data-reveal>Portfolio · 2026</p>
        <h1 data-reveal data-reveal-tilt="-2">
            <span>Arnav</span>
            <span>Soni</span>
        </h1>
        <p class="hero-intro" data-reveal>
            I build close to the machine—systems software, GPU experiments, and fast things that turn
            difficult ideas into working code.
        </p>
        <div class="hero-actions" data-reveal>
            <a class="button button-primary" href="#projects">See the gallery</a>
            <a class="button button-quiet" href="https://github.com/arnavsoni1" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
    </div>

    <div class="hero-art" data-parallax="6" aria-hidden="true">
        <div class="planet">
            <span class="planet-line planet-line-one"></span>
            <span class="planet-line planet-line-two"></span>
        </div>
        <div class="hero-sticker">
            <strong>C · C++ · RUST</strong>
            <span>GPU · SYSTEMS · CURIOSITY</span>
        </div>
    </div>

    <a class="scroll-note" href="#about" aria-label="Scroll to about section">
        <span>Scroll</span>
        <i>↓</i>
    </a>
</section>

<style>
    .hero {
        display: grid;
        position: relative;
        width: min(1220px, calc(100% - 3rem));
        min-height: 100svh;
        grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.9fr);
        gap: clamp(2rem, 7vw, 7rem);
        align-items: center;
        margin: 0 auto;
        padding: 9rem 0 6rem;
    }

    .hero-copy {
        position: relative;
        z-index: 3;
    }

    .eyebrow {
        display: inline-flex;
        align-items: center;
        margin-bottom: 1.25rem;
        padding: 0.48rem 0.8rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--mint);
        box-shadow: 4px 4px 0 var(--ink);
        color: var(--ink);
        font-size: 0.73rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    h1 {
        color: var(--cream);
        font-family: var(--display);
        font-size: clamp(5.2rem, 13.5vw, 11.4rem);
        font-weight: 900;
        letter-spacing: -0.085em;
        line-height: 0.7;
        text-transform: uppercase;
    }

    h1 span {
        display: block;
        width: fit-content;
        filter: drop-shadow(0.08em 0.07em 0 var(--ink));
    }

    h1 span:first-child {
        color: var(--gold);
        -webkit-text-stroke: 2px var(--ink);
        transform: rotate(-2deg);
    }

    h1 span:last-child {
        margin-left: 0.12em;
        color: var(--cream);
        -webkit-text-stroke: 2px var(--ink);
        transform: rotate(1deg);
    }

    .hero-intro {
        max-width: 39rem;
        margin: 2.3rem 0 2rem;
        color: var(--paper);
        font-size: clamp(1.08rem, 1.9vw, 1.3rem);
        line-height: 1.6;
        text-wrap: balance;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
    }

    .hero-art {
        position: relative;
        min-height: 34rem;
        opacity: 0.82;
    }

    .planet {
        position: absolute;
        border-radius: 50%;
    }

    .planet {
        top: 20%;
        left: 15%;
        width: min(27vw, 21rem);
        aspect-ratio: 1;
        overflow: hidden;
        isolation: isolate;
        border: 3px solid var(--ink);
        background:
            radial-gradient(circle at 24% 22%, rgba(255, 239, 192, 0.38), transparent 18%),
            radial-gradient(ellipse at 68% 72%, rgba(20, 22, 31, 0.34), transparent 28%),
            repeating-linear-gradient(7deg, rgba(85, 34, 30, 0.18) 0 4px, rgba(227, 120, 75, 0.07) 4px 12px),
            linear-gradient(145deg, #dd7950 0%, #9d463a 48%, #502c39 100%);
        box-shadow:
            12px 16px 0 rgba(6, 8, 12, 0.48),
            inset 1.3rem 1.1rem 2.3rem rgba(255, 218, 154, 0.13),
            inset -2.8rem -2.5rem 2.8rem rgba(31, 17, 25, 0.38);
    }

    .planet::before {
        content: '';
        position: absolute;
        z-index: 0;
        inset: -8%;
        border-radius: inherit;
        background:
            radial-gradient(ellipse at 18% 44%, rgba(54, 27, 31, 0.54) 0 4%, transparent 4.8%),
            radial-gradient(ellipse at 72% 28%, rgba(255, 177, 105, 0.25) 0 6%, transparent 7%),
            radial-gradient(ellipse at 58% 72%, rgba(54, 27, 31, 0.46) 0 8%, transparent 9%),
            radial-gradient(ellipse at 37% 63%, rgba(236, 139, 75, 0.24) 0 3%, transparent 4%),
            repeating-radial-gradient(ellipse at 48% 52%, transparent 0 8%, rgba(47, 24, 30, 0.16) 9% 10%, transparent 11% 16%);
        opacity: 0.86;
        transform: rotate(-11deg) scale(1.08);
    }

    .planet::after {
        content: '';
        position: absolute;
        z-index: 3;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(105deg, rgba(255, 255, 255, 0.14), transparent 34%, rgba(13, 18, 27, 0.28) 78%);
        box-shadow: inset 0 0 0 1px rgba(255, 226, 170, 0.12);
        pointer-events: none;
    }

    .planet-line {
        position: absolute;
        z-index: 2;
        right: -10%;
        left: -10%;
        height: 13%;
        border: 2px solid rgba(26, 24, 20, 0.4);
        border-radius: 50%;
        transform: rotate(-8deg);
    }

    .planet-line-one { top: 34%; }
    .planet-line-two { top: 57%; transform: rotate(7deg); }

    .hero-sticker {
        display: grid;
        position: absolute;
        right: 0;
        bottom: 8%;
        padding: 1rem 1.2rem;
        border: 2px solid var(--ink);
        border-radius: 0.8rem 1.4rem 0.8rem 1.5rem;
        background: var(--cream);
        box-shadow: 6px 7px 0 var(--ink);
        color: var(--ink);
        transform: rotate(4deg);
    }

    .hero-sticker strong { font-family: var(--display); font-size: 0.9rem; }
    .hero-sticker span { margin-top: 0.3rem; font-size: 0.58rem; font-weight: 900; letter-spacing: 0.11em; }

    .scroll-note {
        display: flex;
        position: absolute;
        bottom: 2rem;
        left: 0;
        gap: 0.65rem;
        align-items: center;
        color: var(--paper-muted);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-decoration: none;
        text-transform: uppercase;
    }

    .scroll-note i {
        display: grid;
        width: 2.2rem;
        height: 2.2rem;
        place-items: center;
        border: 1px solid rgba(244, 231, 197, 0.3);
        border-radius: 50%;
        color: var(--gold);
        font-style: normal;
    }

    @media (max-width: 880px) {
        .hero { grid-template-columns: 1fr; padding-top: 10rem; }
        .hero-art { position: absolute; z-index: -1; right: 0; bottom: 6rem; width: 50%; min-height: 25rem; opacity: 0.38; }
        .planet { width: 15rem; }
        .hero-sticker { display: none; }
    }

    @media (max-width: 560px) {
        .hero { width: calc(100% - 2rem); min-height: 52rem; padding-top: 9rem; }
        h1 { font-size: clamp(4.6rem, 24vw, 7rem); }
        .hero-intro { margin-top: 2rem; }
        .hero-actions .button { width: 100%; }
        .hero-art { width: 70%; }
    }
</style>
