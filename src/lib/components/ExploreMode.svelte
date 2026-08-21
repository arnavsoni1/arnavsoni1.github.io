<script>
    import { onMount } from 'svelte';
    import cIcon from '../../assets/C.png';
    import cppIcon from '../../assets/C++.png';
    import rustIcon from '../../assets/rust.png';
    import cudaIcon from '../../assets/cuda.png';
    import pythonIcon from '../../assets/python.png';
    import droopy from '../../assets/characters/droopy-astronaut.webp';

    export let active = true;
    export let ready = false;
    export let hyperdriveActive = false;
    export let onExit = () => {};
    export let onClosed = () => {};
    export let onProgress = () => {};
    export let onStartHyperdrive = () => {};

    const stops = [
        { label: 'About', kind: 'about' },
        { label: 'Experience', kind: 'experience' },
        { label: 'Skills', kind: 'skills' },
        { label: 'Projects', kind: 'projects' }
    ];

    const TRACK_CYCLES = 5;

    const skills = [
        { name: 'C', note: 'Intermediate', icon: cIcon },
        { name: 'C++', note: 'Advanced, comfortable with smart pointers and concurrency', icon: cppIcon },
        { name: 'Rust', note: 'Intermediate, familiar with ownership and lifetimes', icon: rustIcon },
        { name: 'CUDA', note: 'Beginner, can write kernels', icon: cudaIcon },
        { name: 'Python', note: 'Advanced, comfortable with machine learning frameworks', icon: pythonIcon }
    ];

    const contactLinks = [
        {
            label: 'LinkedIn',
            short: 'in',
            href: 'https://www.linkedin.com/in/arnav-soni-11812b325/'
        },
        { label: 'Twitter / X', short: 'X', href: 'https://x.com/ArnavSoni1701' },
        { label: 'GitHub', short: 'GH', href: 'https://github.com/arnavsoni1' },
        { label: 'Email', short: '@', href: 'mailto:arnavsoni2007@gmail.com' }
    ];

    let scrollViewport;
    let flightTrack;
    let stage;
    let exhibitDeck;
    let activeIndex = 0;
    let reducedMotion = false;
    let frameRequest;
    let resizeRequest;
    let segmentHeight = 1;
    let cycleHeight = 1;
    let cyclePosition = 0;
    let trackReady = false;

    const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
    const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

    function measureTrack(preservePosition = true) {
        if (!scrollViewport || !flightTrack) return;

        const preservedPosition = preservePosition && trackReady ? cyclePosition : 0;
        segmentHeight = Math.max(1, scrollViewport.clientHeight);
        cycleHeight = segmentHeight * stops.length;
        flightTrack.style.height = `${segmentHeight * (stops.length * TRACK_CYCLES + 1)}px`;
        scrollViewport.scrollTop = cycleHeight * 2 + preservedPosition * segmentHeight;
        trackReady = true;

        if (stage && exhibitDeck) {
            const availableWidth = Math.max(1, exhibitDeck.clientWidth - 40);
            const availableHeight = Math.max(1, exhibitDeck.clientHeight - 36);
            stage.querySelectorAll('[data-exhibit-panel]').forEach((panel) => {
                const panelWidth = Math.max(panel.offsetWidth, panel.scrollWidth);
                const panelHeight = Math.max(panel.offsetHeight, panel.scrollHeight);
                panel.dataset.fitScale = String(Math.min(1, availableWidth / panelWidth, availableHeight / panelHeight));
            });
        }

        updatePanels();
    }

    function requestTrackMeasure() {
        if (resizeRequest) return;
        resizeRequest = window.requestAnimationFrame(() => {
            resizeRequest = undefined;
            measureTrack();
        });
    }

    function updatePanels() {
        if (!scrollViewport || !stage || !trackReady) return;

        if (scrollViewport.scrollTop >= cycleHeight * (TRACK_CYCLES - 1)) {
            scrollViewport.scrollTop -= cycleHeight * 2;
        } else if (scrollViewport.scrollTop <= cycleHeight) {
            scrollViewport.scrollTop += cycleHeight * 2;
        }

        cyclePosition = modulo(scrollViewport.scrollTop / segmentHeight, stops.length);
        const nextIndex = Math.round(cyclePosition) % stops.length;
        if (nextIndex !== activeIndex) activeIndex = nextIndex;

        stage.querySelectorAll('[data-exhibit-panel]').forEach((panel, index) => {
            let distance = index - cyclePosition;
            if (distance > stops.length / 2) distance -= stops.length;
            if (distance < -stops.length / 2) distance += stops.length;

            const isCurrent = index === nextIndex;
            const fitScale = Number(panel.dataset.fitScale) || 1;
            const orbitAngle = distance * Math.PI * 0.5;
            const orbitCosine = Math.cos(orbitAngle);
            const frontness = reducedMotion ? (isCurrent ? 1 : 0) : clamp((orbitCosine + 0.12) / 1.12, 0, 1);
            const horizontalTravel = stage.clientWidth * 0.58 + panel.offsetWidth * 0.55;
            const translateX = reducedMotion ? 0 : Math.sin(orbitAngle) * horizontalTravel;
            const translateY = reducedMotion ? 0 : (1 - frontness) * 38;
            const rotation = reducedMotion ? 0 : Math.sin(orbitAngle) * -3.5;
            const scale = fitScale * (reducedMotion ? 1 : 0.7 + frontness * 0.3);
            const opacity = reducedMotion ? (isCurrent ? 1 : 0) : clamp((orbitCosine + 0.18) / 0.5, 0, 1);

            panel.style.zIndex = String(Math.round(frontness * 100));
            panel.style.opacity = String(opacity);
            panel.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
            panel.style.pointerEvents = index === nextIndex ? 'auto' : 'none';
            panel.style.transform = `translate3d(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px), 0) rotate(${rotation}deg) scale(${scale})`;
        });

        onProgress(cyclePosition / stops.length);
    }

    function requestPanelUpdate() {
        if (frameRequest) return;
        frameRequest = window.requestAnimationFrame(() => {
            frameRequest = undefined;
            updatePanels();
        });
    }

    function jumpToStop(index) {
        if (!scrollViewport || !trackReady) return;
        let distance = index - cyclePosition;
        if (distance > stops.length / 2) distance -= stops.length;
        if (distance < -stops.length / 2) distance += stops.length;
        scrollViewport.scrollTo({
            top: scrollViewport.scrollTop + distance * segmentHeight,
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }

    function handleModeTransition(event) {
        if (!active && event.currentTarget === event.target && event.propertyName === 'opacity') {
            onClosed();
        }
    }

    onMount(() => {
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionPreference = () => {
            reducedMotion = motionPreference.matches;
            requestPanelUpdate();
        };

        const handleKeydown = (event) => {
            if (active && !hyperdriveActive && event.key === 'Escape') onExit();
        };

        handleMotionPreference();
        window.addEventListener('resize', requestTrackMeasure);
        window.addEventListener('keydown', handleKeydown);
        motionPreference.addEventListener('change', handleMotionPreference);
        resizeRequest = window.requestAnimationFrame(() => {
            resizeRequest = undefined;
            measureTrack(false);
        });
        document.fonts?.ready.then(() => {
            if (scrollViewport?.isConnected) requestTrackMeasure();
        });

        return () => {
            window.removeEventListener('resize', requestTrackMeasure);
            window.removeEventListener('keydown', handleKeydown);
            motionPreference.removeEventListener('change', handleMotionPreference);
            if (frameRequest) window.cancelAnimationFrame(frameRequest);
            if (resizeRequest) window.cancelAnimationFrame(resizeRequest);
        };
    });
</script>

<section
    class:mode-closing={!active}
    class:mode-ready={ready || reducedMotion}
    class="explore-mode"
    aria-label="Explore portfolio from the Falcon cockpit"
    aria-hidden={hyperdriveActive}
    inert={hyperdriveActive}
    ontransitionend={handleModeTransition}
>
    <div
        bind:this={scrollViewport}
        class="flight-scroll"
        role="region"
        aria-label="Circular portfolio flight path"
        onscroll={requestPanelUpdate}
    >
        <div bind:this={flightTrack} class="flight-track">
            <div bind:this={stage} class="explore-stage">
                <div class="space-wash" aria-hidden="true"></div>

                <div class="section-readout" aria-live="polite">
                    <span>{stops[activeIndex].label}</span>
                </div>

                <div bind:this={exhibitDeck} class="exhibit-deck">
                    {#each stops as stop, index}
                        <article
                            class:panel-active={index === activeIndex}
                            class={`exhibit-panel panel-${stop.kind}`}
                            data-exhibit-panel
                            aria-hidden={index !== activeIndex}
                        >
                            <div class="exhibit-tag">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <p>{stop.label}</p>
                            </div>

                            {#if stop.kind === 'about'}
                                <p class="panel-kicker">About me</p>
                                <h2>Curious <em>student</em></h2>
                                <div class="panel-copy about-copy">
                                    <p>
                                        I am a Software Engineering student excited about compilers, kernels,
                                        drivers and learning about computer architecture, networking infrastructure
                                        and everything in between.
                                    </p>
                                    <p>In my free time, you might find me swimming.</p>
                                </div>
                                <blockquote>“When life gives you lemons… set them aside, make some coffee and get to work.”</blockquote>
                            {:else if stop.kind === 'experience'}
                                <p class="panel-kicker">Previous experience</p>
                                <h2>Flight software <em>engineer</em></h2>
                                <div class="mission-card">
                                    <div>
                                        <small>Organization</small>
                                        <strong>Team Sammard</strong>
                                    </div>
                                    <ul>
                                        <li>I worked on the flight software for CANSAT.</li>
                                        <li>I also worked on the initial design of the propulsion testing software for our newly developed SRAD motors.</li>
                                    </ul>
                                    <span>Embedded software development</span>
                                </div>
                            {:else if stop.kind === 'skills'}
                                <p class="panel-kicker">What I work with</p>
                                <h2>My <em>toolbox</em></h2>
                                <div class="skill-grid">
                                    {#each skills as skill}
                                        <div class="cockpit-skill">
                                            <img src={skill.icon} alt="" />
                                            <span><strong>{skill.name}</strong><small>{skill.note}</small></span>
                                        </div>
                                    {/each}
                                </div>
                            {:else if stop.kind === 'projects'}
                                <img class="project-character" src={droopy} alt="" aria-hidden="true" />
                                <p class="panel-kicker">Projects</p>
                                <h2>The gallery is <em>waiting</em></h2>
                                <p class="project-copy">
                                    These display cases stay intentionally empty until the work is ready to be shown properly.
                                </p>
                                <div class="empty-cases" aria-label="Three empty project exhibits">
                                    <span>Exhibit 01<small>Details coming soon</small></span>
                                    <span>Exhibit 02<small>Details coming soon</small></span>
                                    <span>Exhibit 03<small>Details coming soon</small></span>
                                </div>
                            {/if}
                        </article>
                    {/each}
                </div>

                <div class="cockpit-frame" aria-hidden="true">
                    <span class="frame-top"></span>
                    <span class="frame-left"></span>
                    <span class="frame-right"></span>
                    <span class="window-glint"></span>
                </div>

                <div class="cockpit-map" aria-label="Explore route">
                    <div class="route-stops">
                        {#each stops as stop, index}
                            <button
                                class:current-stop={index === activeIndex}
                                type="button"
                                aria-label={`Fly to ${stop.label}`}
                                aria-current={index === activeIndex ? 'step' : undefined}
                                onclick={() => jumpToStop(index)}
                            >
                                <i></i><span>{stop.label}</span>
                            </button>
                        {/each}
                    </div>
                </div>

                <aside class="cockpit-console" aria-label="Contact controls">
                    <div class="console-links">
                        {#each contactLinks as link}
                            <a
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel="noreferrer"
                                aria-label={`${link.label}${link.href.startsWith('http') ? ', opens in a new tab' : ''}`}
                            >
                                <b>{link.short}</b><span>{link.label}</span>
                            </a>
                        {/each}
                    </div>
                    <button
                        class="console-hyperdrive"
                        type="button"
                        aria-label="Engage hyperdrive"
                        title="Hyperdrive"
                        disabled={hyperdriveActive || !active}
                        onclick={onStartHyperdrive}
                    >H</button>
                </aside>

                <p class="flight-instruction"><span aria-hidden="true">↟</span> Scroll to fly forward</p>
            </div>
        </div>
    </div>

</section>

<style>
    .explore-mode {
        position: fixed;
        z-index: 70;
        inset: 0;
        overflow: hidden;
        background: transparent;
        opacity: 1;
        /* Keep this exit lifetime aligned with EXPLORE_EXIT_DURATION in FalconScene. */
        transition: opacity 1450ms cubic-bezier(0.45, 0, 0.55, 1);
    }

    .mode-closing {
        opacity: 0;
        pointer-events: none;
    }

    .flight-scroll {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: none;
    }

    .flight-scroll::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }

    .flight-track { height: 2100vh; }

    .explore-stage {
        position: sticky;
        top: 0;
        width: 100%;
        height: 100svh;
        overflow: hidden;
        isolation: isolate;
    }

    .space-wash {
        position: absolute;
        z-index: -1;
        inset: 0;
        background: radial-gradient(circle at 50% 48%, transparent 0 32%, rgba(4, 7, 12, 0.08) 68%, rgba(4, 7, 12, 0.58) 100%);
        pointer-events: none;
    }

    .space-wash::before {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(90deg, rgba(105, 196, 202, 0.035) 1px, transparent 1px),
            linear-gradient(rgba(105, 196, 202, 0.035) 1px, transparent 1px);
        background-size: 5rem 5rem;
        content: '';
        mask-image: radial-gradient(circle at 50% 44%, #000 0 28%, transparent 72%);
    }

    .section-readout {
        position: absolute;
        z-index: 7;
        top: 7.3rem;
        right: clamp(1rem, 4vw, 4rem);
        padding: 0.55rem 0.8rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--mint);
        box-shadow: 3px 4px 0 var(--ink);
        color: var(--ink);
        font-size: 0.65rem;
        font-weight: 900;
        letter-spacing: 0.1em;
        line-height: 1;
        text-transform: uppercase;
    }

    .exhibit-deck {
        position: absolute;
        z-index: 5;
        top: clamp(7.2rem, 13vh, 9rem);
        right: 0;
        bottom: clamp(13.5rem, 22vh, 16rem);
        left: 0;
    }

    .exhibit-panel {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        width: min(56rem, calc(100% - 8rem));
        overflow: visible;
        padding: clamp(1.4rem, 3.4vw, 2.8rem);
        border: 3px solid var(--ink);
        border-radius: 2.8rem 1rem 3rem 1.2rem;
        background:
            linear-gradient(125deg, rgba(255, 255, 255, 0.16), transparent 28%),
            rgba(244, 231, 197, 0.94);
        box-shadow:
            12px 14px 0 var(--coral),
            17px 19px 0 var(--ink),
            0 0 5rem rgba(105, 196, 202, 0.2);
        color: var(--ink);
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.86, 0.72);
        transform-origin: center;
        will-change: transform, opacity;
    }

    .exhibit-panel:first-child {
        visibility: visible;
        opacity: 1;
        transform: translate3d(-50%, -50%, 0) rotate(0) scale(1);
    }

    .exhibit-panel::before {
        position: absolute;
        inset: 0.65rem;
        border: 1px dashed rgba(9, 12, 18, 0.18);
        border-radius: 2.25rem 0.7rem 2.4rem 0.9rem;
        content: '';
        pointer-events: none;
    }

    .exhibit-tag {
        display: flex;
        position: absolute;
        top: -1.15rem;
        right: 2rem;
        gap: 0.55rem;
        align-items: center;
        padding: 0.55rem 0.8rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--mint);
        box-shadow: 3px 4px 0 var(--ink);
        font-size: 0.64rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .exhibit-tag span { font-family: var(--display); }

    .panel-kicker {
        color: #4b554d;
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.13em;
        text-transform: uppercase;
    }

    .exhibit-panel h2 {
        max-width: 44rem;
        margin: 0.55rem 0 1.1rem;
        font-family: var(--display);
        font-size: clamp(2.5rem, 5.8vw, 5.4rem);
        letter-spacing: -0.06em;
        line-height: 0.9;
        text-wrap: balance;
    }

    .exhibit-panel h2 em {
        color: var(--coral);
        font-style: normal;
        -webkit-text-stroke: 1px var(--ink);
        text-shadow: 3px 4px 0 var(--gold);
    }

    .panel-copy {
        display: grid;
        grid-template-columns: 1.35fr 0.65fr;
        gap: 1.3rem;
        font-size: clamp(0.9rem, 1.5vw, 1.08rem);
        font-weight: 650;
        line-height: 1.55;
    }

    blockquote {
        margin-top: 1.2rem;
        padding: 0.75rem 1rem;
        border-left: 5px solid var(--gold);
        font-family: var(--display);
        font-size: clamp(1rem, 2vw, 1.35rem);
        line-height: 1.2;
    }

    .mission-card {
        display: grid;
        grid-template-columns: 0.58fr 1.25fr;
        gap: 1.2rem 2rem;
        align-items: start;
        padding: 1.25rem;
        border: 2px solid var(--ink);
        border-radius: 1rem 2rem 0.9rem 1.6rem;
        background: var(--sky);
        box-shadow: 5px 6px 0 var(--ink);
    }

    .mission-card small,
    .mission-card strong { display: block; }
    .mission-card small { font-size: 0.63rem; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .mission-card strong { margin-top: 0.25rem; font-family: var(--display); font-size: 1.2rem; }
    .mission-card ul { display: grid; gap: 0.45rem; padding-left: 1.2rem; font-weight: 700; }
    .mission-card > span { grid-column: 1 / -1; width: fit-content; padding: 0.35rem 0.65rem; border: 2px solid var(--ink); border-radius: 999px; background: var(--gold); font-size: 0.65rem; font-weight: 900; text-transform: uppercase; }

    .skill-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.65rem;
    }

    .cockpit-skill {
        display: flex;
        gap: 0.8rem;
        align-items: center;
        min-width: 0;
        padding: 0.65rem 0.75rem;
        border: 2px solid var(--ink);
        border-radius: 0.8rem 1.3rem 0.7rem 1.1rem;
        background: var(--sky);
        box-shadow: 3px 4px 0 var(--ink);
    }

    .cockpit-skill:nth-child(2) { background: var(--gold); }
    .cockpit-skill:nth-child(3) { background: var(--coral); }
    .cockpit-skill:nth-child(4) { background: var(--mint); }
    .cockpit-skill:nth-child(5) { grid-column: 1 / -1; background: var(--cream); }
    .cockpit-skill img { width: 2.5rem; height: 2.5rem; object-fit: contain; }
    .cockpit-skill span, .cockpit-skill strong, .cockpit-skill small { display: block; min-width: 0; }
    .cockpit-skill strong { font-family: var(--display); }
    .cockpit-skill small { overflow: hidden; margin-top: 0.15rem; font-size: 0.68rem; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }

    .project-character {
        position: absolute;
        right: 1.3rem;
        bottom: 0;
        width: clamp(6rem, 12vw, 9rem);
        max-height: 72%;
        object-fit: contain;
        object-position: bottom;
        filter: drop-shadow(4px 5px 0 var(--ink));
        pointer-events: none;
    }

    .project-copy { max-width: 34rem; font-weight: 650; }

    .empty-cases {
        display: grid;
        max-width: 38rem;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.65rem;
        margin-top: 1.2rem;
    }

    .empty-cases > span {
        display: grid;
        min-height: 4.5rem;
        place-content: center;
        border: 2px solid var(--ink);
        border-radius: 1rem 1.4rem 0.8rem;
        background: rgba(105, 196, 202, 0.2);
        font-size: 0.67rem;
        font-weight: 900;
        letter-spacing: 0.07em;
        text-align: center;
        text-transform: uppercase;
    }

    .empty-cases small { display: block; margin-top: 0.25rem; opacity: 0.58; font-size: 0.56rem; }

    .cockpit-frame {
        position: absolute;
        z-index: 8;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .cockpit-frame span { position: absolute; display: block; }

    .frame-top {
        top: -7rem;
        left: 50%;
        width: min(72rem, 96vw);
        height: 12rem;
        border: 1.5rem solid #242c31;
        border-radius: 50%;
        background: rgba(8, 12, 17, 0.92);
        box-shadow: inset 0 -0.35rem #66706c, 0 0.5rem 0 var(--ink);
        transform: translateX(-50%);
    }

    .frame-left,
    .frame-right {
        top: 1.5rem;
        bottom: 7rem;
        width: clamp(2.4rem, 7vw, 6.8rem);
        background: linear-gradient(90deg, #151b20, #56605e 48%, #20282d 54%, #0c1116);
        border: 0.25rem solid var(--ink);
        box-shadow: inset 0 0 0 0.25rem rgba(244, 231, 197, 0.12);
    }

    .frame-left { left: -2rem; transform: skewX(7deg); }
    .frame-right { right: -2rem; transform: skewX(-7deg); }

    .window-glint {
        top: 8rem;
        left: 18%;
        width: 18rem;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(125, 245, 160, 0.7), transparent);
        box-shadow: 0 0 1.1rem var(--mint);
        transform: rotate(-24deg);
    }

    .cockpit-map {
        position: absolute;
        z-index: 10;
        right: clamp(1rem, 3vw, 2.5rem);
        bottom: clamp(8.6rem, 17vh, 11.5rem);
        width: min(31rem, calc(100% - 2rem));
        padding: 0.8rem 1rem;
        border: 2px solid var(--ink);
        border-radius: 1rem 1.5rem 0.8rem 1.3rem;
        background: rgba(18, 26, 31, 0.9);
        box-shadow: 5px 6px 0 var(--ink);
        backdrop-filter: blur(12px);
    }

    .route-stops { display: flex; justify-content: space-between; }

    .route-stops button {
        display: grid;
        justify-items: center;
        border: 0;
        background: transparent;
        color: var(--paper-muted);
        cursor: pointer;
        font-size: 0.55rem;
        font-weight: 900;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .route-stops i {
        display: block;
        width: 0.65rem;
        height: 0.65rem;
        margin-bottom: 0.35rem;
        border: 2px solid var(--paper-muted);
        border-radius: 50%;
        background: #172027;
        transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
    }

    .route-stops button:hover i,
    .route-stops .current-stop i { border-color: var(--ink); background: var(--gold); transform: scale(1.35); }
    .route-stops .current-stop { color: var(--cream); }

    .cockpit-console {
        display: grid;
        position: absolute;
        z-index: 11;
        right: 0;
        bottom: 0;
        left: 0;
        min-height: 7.4rem;
        grid-template-columns: minmax(22rem, 56rem) auto;
        gap: clamp(1rem, 4vw, 3rem);
        align-items: center;
        justify-content: center;
        padding: 1rem clamp(1rem, 4vw, 3rem);
        border-top: 0.35rem solid var(--ink);
        background:
            repeating-linear-gradient(90deg, transparent 0 5rem, rgba(244, 231, 197, 0.035) 5rem calc(5rem + 2px)),
            linear-gradient(#343c3f, #1a2228 58%, #0d1318);
        box-shadow: inset 0 0.45rem 0 #69716c, 0 -1.5rem 4rem rgba(0, 0, 0, 0.32);
    }

    .console-links {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.55rem;
    }

    .console-links a {
        display: flex;
        gap: 0.55rem;
        align-items: center;
        min-height: 3.35rem;
        padding: 0.55rem 0.7rem;
        border: 2px solid var(--ink);
        border-radius: 0.75rem 1rem 0.65rem 0.9rem;
        background: var(--sky);
        box-shadow: 3px 4px 0 var(--ink);
        color: var(--ink);
        font-size: 0.68rem;
        font-weight: 900;
        text-decoration: none;
        text-transform: uppercase;
        transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
    }

    .console-links a:nth-child(2) { background: var(--gold); }
    .console-links a:nth-child(3) { background: var(--mint); }
    .console-links a:nth-child(4) { background: var(--coral); color: var(--cream); }
    .console-links a:hover { transform: translate(-2px, -2px); box-shadow: 5px 6px 0 var(--ink); }
    .console-links b { display: grid; width: 1.7rem; height: 1.7rem; place-items: center; border: 2px solid currentColor; border-radius: 50%; font-family: var(--display); font-size: 0.55rem; }

    .console-hyperdrive {
        display: grid;
        width: 2.5rem;
        height: 2.5rem;
        place-items: center;
        padding: 0;
        border: 1px solid #737c7c;
        border-radius: 0.3rem;
        background: #4b5559;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.35);
        color: rgba(244, 231, 197, 0.76);
        cursor: pointer;
        font-family: var(--display);
        font-size: 0.78rem;
        font-weight: 900;
        line-height: 1;
        transition: background 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease;
    }

    .console-hyperdrive:hover,
    .console-hyperdrive:focus-visible {
        border-color: #899291;
        background: #566064;
        color: var(--cream);
    }

    .console-hyperdrive:active {
        background: #3e484c;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.38);
    }

    .console-hyperdrive:disabled { cursor: wait; opacity: 0.42; }

    .flight-instruction {
        position: absolute;
        z-index: 12;
        bottom: 8.65rem;
        left: clamp(1rem, 3vw, 2.5rem);
        color: var(--paper-muted);
        font-size: 0.62rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .flight-instruction span { color: var(--mint); font-size: 1rem; }

    .explore-stage > * { opacity: 0; }
    .mode-ready .explore-stage > * { opacity: 1; transition: opacity 220ms ease; }
    .mode-closing .explore-stage > * { opacity: 0; transition: opacity 140ms ease; }

    @media (max-width: 900px) {
        .exhibit-panel { width: min(44rem, calc(100% - 5rem)); }
        .cockpit-console { grid-template-columns: minmax(0, 1fr) auto; gap: 0.65rem; min-height: 9.7rem; padding: 0.75rem 1rem; }
        .cockpit-map { bottom: 10.7rem; }
        .flight-instruction { bottom: 11rem; }
        .exhibit-deck { bottom: clamp(14rem, 25vh, 16rem); }
    }

    @media (max-width: 620px) {
        .section-readout { top: 6.3rem; right: 1rem; }
        .exhibit-deck { top: 8.2rem; bottom: 14.2rem; }
        .exhibit-panel { width: calc(100% - 4rem); padding: 1.2rem 1rem; border-radius: 1.7rem 0.8rem 1.9rem 0.9rem; box-shadow: 7px 8px 0 var(--coral), 10px 11px 0 var(--ink); }
        .exhibit-panel::before { inset: 0.4rem; border-radius: 1.3rem 0.55rem 1.45rem 0.65rem; }
        .exhibit-tag { top: -0.8rem; right: 1rem; padding: 0.4rem 0.55rem; }
        .exhibit-tag p { display: none; }
        .exhibit-panel h2 { margin-top: 0.45rem; font-size: clamp(2rem, 12vw, 3.5rem); }
        .panel-copy { grid-template-columns: 1fr; gap: 0.6rem; font-size: 0.85rem; }
        blockquote { display: none; }
        .mission-card { grid-template-columns: 1fr; gap: 0.7rem; padding: 0.85rem; font-size: 0.78rem; }
        .mission-card > span { grid-column: auto; }
        .skill-grid { gap: 0.45rem; }
        .cockpit-skill { padding: 0.45rem; }
        .cockpit-skill img { width: 1.8rem; height: 1.8rem; }
        .cockpit-skill small { display: none; }
        .project-character { width: 5rem; opacity: 0.8; }
        .project-copy { max-width: calc(100% - 4rem); font-size: 0.82rem; }
        .empty-cases { max-width: calc(100% - 4rem); gap: 0.35rem; }
        .empty-cases > span { min-height: 2.3rem; }
        .empty-cases small { display: none; }
        .cockpit-map { right: 0.7rem; bottom: 10.3rem; width: calc(100% - 1.4rem); padding: 0.6rem; }
        .route-stops button { font-size: 0; }
        .route-stops i { margin-bottom: 0; }
        .cockpit-console { min-height: 9.35rem; }
        .console-links { grid-template-columns: repeat(2, 1fr); }
        .console-links a { min-height: 3rem; }
        .console-hyperdrive { align-self: end; margin-bottom: 0.2rem; }
        .flight-instruction { display: none; }
        .frame-left, .frame-right { width: 3.5rem; opacity: 0.78; }
    }

    @media (max-width: 620px) and (max-height: 650px) {
        .cockpit-map { display: none; }
        .exhibit-deck { top: 7.2rem; bottom: 10.4rem; }
        .exhibit-panel h2 { font-size: clamp(1.85rem, 10vw, 2.7rem); }
        .flight-instruction { display: none; }
    }

    @media (max-height: 700px) and (min-width: 621px) {
        .exhibit-deck { top: 7rem; bottom: 11.5rem; }
        .exhibit-panel { padding: 1rem 1.5rem; }
        .exhibit-panel h2 { margin-bottom: 0.75rem; font-size: clamp(2.1rem, 4.6vw, 3.5rem); }
        .cockpit-skill { padding-block: 0.45rem; }
        .cockpit-skill img { width: 2rem; height: 2rem; }
        .mission-card { padding: 0.9rem; }
        .cockpit-map { bottom: 7.9rem; }
        .flight-instruction { display: none; }
        .cockpit-console { min-height: 6.7rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .explore-stage > * { opacity: 1; }
        .exhibit-panel { transition: opacity 80ms linear; will-change: auto; }
        .route-stops i { transition: none; }
        .console-hyperdrive { transition: none; }
    }
</style>
