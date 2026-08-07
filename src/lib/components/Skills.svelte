<script>
    import cIcon from '../../assets/C.png';
    import cppIcon from '../../assets/C++.png';
    import rustIcon from '../../assets/rust.png';
    import cudaIcon from '../../assets/cuda.png';
    import pythonIcon from '../../assets/python.png';

    const skills = [
        { name: 'C', note: 'Memory, pointers, and code close to the machine.', icon: cIcon, color: 'blue' },
        { name: 'C++', note: 'Performance-minded programs and modern systems tooling.', icon: cppIcon, color: 'gold' },
        { name: 'Rust', note: 'Strong guarantees for ambitious low-level software.', icon: rustIcon, color: 'coral' },
        { name: 'CUDA', note: 'Parallel workloads, kernels, and GPU experiments.', icon: cudaIcon, color: 'mint' },
        { name: 'Python', note: 'Fast prototypes, automation, and scientific workflows.', icon: pythonIcon, color: 'cream' }
    ];
</script>

<section class="skills page-section" id="skills">
    <div class="section-heading" data-reveal>
        <p class="section-label">What I work with</p>
        <h2>A toolkit for <em>going deeper.</em></h2>
    </div>

    <div class="skill-stack">
        {#each skills as skill, index}
            <article class={`skill-ticket skill-${skill.color}`} data-reveal data-reveal-tilt={index % 2 ? '1.5' : '-1.5'}>
                <span class="skill-index">0{index + 1}</span>
                <div class="skill-icon"><img src={skill.icon} alt="" /></div>
                <div class="skill-copy">
                    <h3>{skill.name}</h3>
                    <p>{skill.note}</p>
                </div>
                <span class="ticket-cut ticket-cut-top" aria-hidden="true"></span>
                <span class="ticket-cut ticket-cut-bottom" aria-hidden="true"></span>
            </article>
        {/each}
    </div>
</section>

<style>
    .skills {
        display: grid;
        grid-template-columns: minmax(18rem, 0.72fr) minmax(0, 1.28fr);
        gap: clamp(3rem, 9vw, 8rem);
        align-items: start;
    }

    .section-heading {
        position: sticky;
        top: 8rem;
    }

    .skill-stack {
        display: grid;
        gap: 1.1rem;
    }

    .skill-ticket {
        display: grid;
        position: relative;
        min-height: 10rem;
        grid-template-columns: auto auto 1fr;
        gap: 1.25rem;
        align-items: center;
        overflow: hidden;
        padding: 1.5rem 2rem;
        border: 3px solid var(--ink);
        border-radius: 1.25rem 2.4rem 1.2rem 2rem;
        box-shadow: 9px 10px 0 var(--ink);
        color: var(--ink);
        transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .skill-ticket:hover {
        transform: translate(-3px, -4px) rotate(-0.5deg);
        box-shadow: 13px 15px 0 var(--ink);
    }

    .skill-blue { background: var(--sky); }
    .skill-gold { background: var(--gold); }
    .skill-coral { background: var(--coral); }
    .skill-mint { background: var(--mint); }
    .skill-cream { background: var(--cream); }

    .skill-index {
        align-self: start;
        padding-top: 0.2rem;
        font-family: var(--display);
        font-size: 0.78rem;
        font-weight: 900;
    }

    .skill-icon {
        display: grid;
        width: 5.4rem;
        height: 5.4rem;
        flex: 0 0 auto;
        place-items: center;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: rgba(244, 231, 197, 0.72);
        box-shadow: inset 0 0 0 5px rgba(11, 16, 24, 0.08);
    }

    .skill-icon img {
        width: 3.3rem;
        height: 3.3rem;
        object-fit: contain;
        filter: saturate(0.85) contrast(1.1);
    }

    .skill-copy h3 {
        font-family: var(--display);
        font-size: clamp(1.55rem, 3vw, 2.4rem);
        font-weight: 900;
        line-height: 1;
    }

    .skill-copy p {
        max-width: 28rem;
        margin-top: 0.55rem;
        font-weight: 650;
        line-height: 1.45;
    }

    .ticket-cut {
        position: absolute;
        right: 2.7rem;
        width: 0.8rem;
        height: 0.8rem;
        border: 2px solid var(--ink);
        border-radius: 50%;
        background: var(--ink);
    }

    .ticket-cut-top { top: -0.45rem; }
    .ticket-cut-bottom { bottom: -0.45rem; }

    @media (max-width: 860px) {
        .skills { grid-template-columns: 1fr; }
        .section-heading { position: static; }
    }

    @media (max-width: 560px) {
        .skill-ticket { grid-template-columns: auto 1fr; padding: 1.25rem; }
        .skill-index { display: none; }
        .skill-icon { width: 4.5rem; height: 4.5rem; }
        .skill-icon img { width: 2.8rem; height: 2.8rem; }
    }
</style>
