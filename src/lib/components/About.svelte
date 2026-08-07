<section class="about page-section" id="about">
    <div class="section-heading" data-reveal>
        <p class="section-label">About me</p>
        <h2>Curious by <em>default.</em></h2>
    </div>

    <div class="about-layout">
        <div class="about-card" data-reveal data-reveal-tilt="-2">
            <span class="about-number">01</span>
            <p>
                I’m a student engineer drawn to the part of computing where abstractions stop being
                magic and start becoming memory, threads, instructions, and data movement.
            </p>
            <p>
                I learn by making things, measuring them, breaking them, and understanding why the
                machine behaved the way it did.
            </p>
            <span class="tape" aria-hidden="true"></span>
        </div>

        <div class="about-quote" data-reveal>
            <span class="quote-mark">“</span>
            <blockquote>I like software that makes the machine feel less mysterious.</blockquote>
            <div class="scribble" aria-hidden="true"></div>
        </div>
    </div>

    <div class="principles">
        <article data-reveal>
            <span>✦</span>
            <h3>Follow the question</h3>
            <p>Keep digging until the answer is concrete enough to test.</p>
        </article>
        <article data-reveal>
            <span>⌁</span>
            <h3>Build the proof</h3>
            <p>Turn theory into something observable, measurable, and real.</p>
        </article>
        <article data-reveal>
            <span>◎</span>
            <h3>Share the clarity</h3>
            <p>Explain complicated systems without hiding behind complicated language.</p>
        </article>
    </div>
</section>

<style>
    .about {
        position: relative;
    }

    .about-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.8fr);
        gap: clamp(2rem, 7vw, 6rem);
        align-items: center;
        margin-top: 4rem;
    }

    .about-card {
        position: relative;
        padding: clamp(2rem, 5vw, 4.4rem);
        border: 3px solid var(--ink);
        border-radius: 2.8rem 1rem 3.6rem 1.4rem;
        background: var(--cream);
        box-shadow: 14px 16px 0 var(--coral), 18px 20px 0 var(--ink);
        color: var(--ink);
    }

    .about-number {
        display: inline-grid;
        width: 3.3rem;
        height: 3.3rem;
        place-items: center;
        margin-bottom: 1.8rem;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: var(--gold);
        font-family: var(--display);
        font-weight: 900;
    }

    .about-card p {
        font-size: clamp(1.05rem, 2vw, 1.28rem);
        line-height: 1.68;
    }

    .about-card p + p { margin-top: 1.2rem; }

    .tape {
        position: absolute;
        top: -1.4rem;
        right: 14%;
        width: 7rem;
        height: 2.3rem;
        background: rgba(126, 222, 209, 0.74);
        clip-path: polygon(3% 8%, 97% 0, 94% 94%, 0 100%);
        transform: rotate(4deg);
    }

    .about-quote {
        position: relative;
        padding: 2rem 0 3rem;
    }

    .quote-mark {
        display: block;
        height: 5rem;
        color: var(--gold);
        font-family: Georgia, serif;
        font-size: 8rem;
        line-height: 0.85;
        text-shadow: 5px 5px 0 var(--ink);
    }

    blockquote {
        color: var(--cream);
        font-family: var(--display);
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 800;
        letter-spacing: -0.045em;
        line-height: 1.05;
        text-wrap: balance;
    }

    .scribble {
        width: 80%;
        height: 1.4rem;
        margin-top: 1.8rem;
        border-top: 4px solid var(--mint);
        border-radius: 50%;
        transform: rotate(-2deg);
    }

    .principles {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
        margin-top: 6rem;
    }

    .principles article {
        min-height: 17rem;
        padding: 2rem;
        border: 2px solid rgba(244, 231, 197, 0.24);
        border-radius: 2.2rem 0.8rem 2.2rem 0.8rem;
        background: rgba(17, 25, 38, 0.78);
        box-shadow: inset 0 1px rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
    }

    .principles article:nth-child(2) { transform: translateY(1.8rem) rotate(1deg); }
    .principles article:nth-child(3) { transform: rotate(-1deg); }

    .principles span {
        color: var(--mint);
        font-size: 2.2rem;
    }

    .principles h3 {
        margin: 2rem 0 0.8rem;
        color: var(--cream);
        font-family: var(--display);
        font-size: 1.4rem;
        line-height: 1.1;
    }

    .principles p { color: var(--paper-muted); line-height: 1.6; }

    @media (max-width: 800px) {
        .about-layout { grid-template-columns: 1fr; }
        .principles { grid-template-columns: 1fr; }
        .principles article { min-height: auto; }
        .principles article:nth-child(2), .principles article:nth-child(3) { transform: none; }
    }
</style>
