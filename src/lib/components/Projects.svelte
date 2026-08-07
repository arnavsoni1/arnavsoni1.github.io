<script>
    import droopy from '../../assets/characters/droopy-astronaut.webp';
    import scooby from '../../assets/characters/scooby-astronaut.webp';
    import spike from '../../assets/characters/spike-astronaut.webp';
</script>

<section class="projects page-section" id="projects">
    <div class="projects-heading section-heading" data-reveal>
        <p class="section-label">Projects</p>
        <h2>The gallery is <em>waiting.</em></h2>
        <p>
            These display cases stay intentionally empty until the work is ready to be shown properly.
        </p>
    </div>

    <div class="exhibit-gallery">
        <article class="exhibit-stage character-left" data-reveal>
            <div class="character-wrap" data-parallax="4">
                <img class="character-float" src={droopy} alt="Droopy in an astronaut suit holding a green lightsaber and looking at an empty exhibit" />
            </div>
            <div class="exhibit-case" aria-label="Empty project exhibit">
                <div class="exhibit-glass">
                    <span class="exhibit-orbit orbit-wide"></span>
                    <span class="exhibit-orbit orbit-small"></span>
                </div>
                <div class="exhibit-base"></div>
            </div>
        </article>

        <article class="exhibit-stage character-right" data-reveal>
            <div class="exhibit-case" aria-label="Empty project exhibit">
                <div class="exhibit-glass glass-coral">
                    <span class="exhibit-orbit orbit-wide"></span>
                    <span class="exhibit-orbit orbit-small"></span>
                </div>
                <div class="exhibit-base"></div>
            </div>
            <div class="character-wrap" data-parallax="5">
                <img class="character-float" src={scooby} alt="Scooby-Doo in an astronaut suit holding a green lightsaber and looking at an empty exhibit" />
            </div>
        </article>

        <article class="exhibit-stage character-left" data-reveal>
            <div class="character-wrap" data-parallax="4">
                <img class="character-float" src={spike} alt="Spike the bulldog from Tom and Jerry in an astronaut suit holding a green lightsaber and looking at an empty exhibit" />
            </div>
            <div class="exhibit-case" aria-label="Empty project exhibit">
                <div class="exhibit-glass glass-mint">
                    <span class="exhibit-orbit orbit-wide"></span>
                    <span class="exhibit-orbit orbit-small"></span>
                </div>
                <div class="exhibit-base"></div>
            </div>
        </article>
    </div>
</section>

<style>
    .projects {
        position: relative;
    }

    .projects-heading {
        max-width: 55rem;
        margin-bottom: 5rem;
    }

    .projects-heading > p:last-child {
        max-width: 36rem;
        margin-top: 1.4rem;
        color: var(--paper-muted);
        font-size: 1.08rem;
        line-height: 1.65;
    }

    .exhibit-gallery {
        display: grid;
        gap: clamp(4rem, 10vw, 9rem);
    }

    .exhibit-stage {
        display: grid;
        position: relative;
        min-height: 38rem;
        grid-template-columns: minmax(15rem, 0.48fr) minmax(24rem, 1fr);
        gap: clamp(1rem, 4vw, 4rem);
        align-items: end;
    }

    .character-right {
        grid-template-columns: minmax(24rem, 1fr) minmax(15rem, 0.48fr);
    }

    .character-wrap {
        position: relative;
        z-index: 3;
        height: 34rem;
        transform-origin: bottom center;
        filter: drop-shadow(0 1.5rem 1.5rem rgba(0, 0, 0, 0.36));
    }

    .character-wrap::after {
        position: absolute;
        z-index: -1;
        right: 13%;
        bottom: -0.4rem;
        left: 13%;
        height: 1.2rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        filter: blur(9px);
        content: '';
    }

    .character-wrap img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: bottom center;
    }

    .exhibit-case {
        position: relative;
        z-index: 2;
        padding: 1rem 1rem 0;
        border: 3px solid var(--ink);
        border-radius: 3rem 3rem 0.9rem 0.9rem;
        background: var(--gold);
        box-shadow: 15px 18px 0 var(--ink), 0 0 4rem rgba(216, 165, 47, 0.08);
    }

    .exhibit-glass {
        display: grid;
        position: relative;
        min-height: 30rem;
        place-items: center;
        overflow: hidden;
        border: 3px solid var(--ink);
        border-radius: 2.2rem 2.2rem 0.4rem 0.4rem;
        background:
            linear-gradient(120deg, rgba(255, 255, 255, 0.12), transparent 28%),
            radial-gradient(circle at 50% 65%, rgba(103, 202, 205, 0.18), transparent 33%),
            rgba(10, 17, 27, 0.82);
        box-shadow: inset 0 0 4rem rgba(103, 202, 205, 0.08);
        backdrop-filter: blur(12px);
    }

    .exhibit-glass::before {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(244, 231, 197, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 231, 197, 0.035) 1px, transparent 1px);
        background-size: 44px 44px;
        content: '';
        mask-image: radial-gradient(circle, #000, transparent 82%);
    }

    .glass-coral {
        background:
            linear-gradient(120deg, rgba(255, 255, 255, 0.12), transparent 28%),
            radial-gradient(circle at 50% 65%, rgba(215, 91, 66, 0.2), transparent 34%),
            rgba(10, 17, 27, 0.82);
    }

    .glass-mint {
        background:
            linear-gradient(120deg, rgba(255, 255, 255, 0.12), transparent 28%),
            radial-gradient(circle at 50% 65%, rgba(125, 245, 160, 0.18), transparent 34%),
            rgba(10, 17, 27, 0.82);
    }

    .exhibit-orbit {
        position: absolute;
        border: 1px solid rgba(244, 231, 197, 0.24);
        border-radius: 50%;
    }

    .orbit-wide {
        width: 54%;
        aspect-ratio: 1;
        border-style: dashed;
    }

    .orbit-small {
        width: 30%;
        aspect-ratio: 1;
        border-color: rgba(125, 245, 160, 0.4);
        border-style: dotted;
    }

    .exhibit-base {
        height: 3.5rem;
        margin: 0 5%;
        border-right: 3px solid var(--ink);
        border-left: 3px solid var(--ink);
        background:
            repeating-linear-gradient(90deg, transparent 0 2rem, rgba(11, 16, 24, 0.22) 2rem calc(2rem + 2px)),
            var(--coral);
    }

    @media (max-width: 900px) {
        .exhibit-stage,
        .character-right {
            min-height: 46rem;
            grid-template-columns: 1fr;
        }

        .character-right .exhibit-case { order: 2; }
        .character-right .character-wrap { order: 1; justify-self: end; }
        .character-wrap { position: absolute; z-index: 4; bottom: -1rem; left: -2rem; width: 15rem; height: 27rem; }
        .character-right .character-wrap { right: -2rem; left: auto; }
        .exhibit-case { align-self: center; margin: 0 1.5rem; }
    }

    @media (max-width: 560px) {
        .exhibit-stage, .character-right { min-height: 38rem; }
        .exhibit-glass { min-height: 25rem; }
        .character-wrap { bottom: -0.5rem; left: -3.5rem; width: 13rem; height: 23rem; }
        .character-right .character-wrap { right: -3.5rem; left: auto; }
        .exhibit-case { margin: 0; padding: 0.7rem 0.7rem 0; }
    }
</style>
