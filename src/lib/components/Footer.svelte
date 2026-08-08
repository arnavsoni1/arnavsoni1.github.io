<script>
    import rubiksCube from '../../assets/rubiks-cube.webp';

    const year = new Date().getFullYear();
    const links = [
        {
            label: 'LinkedIn',
            detail: 'Connect with me',
            href: 'https://www.linkedin.com/in/arnav-soni-11812b325/'
        },
        {
            label: 'Twitter / X',
            detail: '@ArnavSoni1701',
            href: 'https://x.com/ArnavSoni1701'
        },
        {
            label: 'Email',
            detail: 'arnavsoni2007@gmail.com',
            href: 'mailto:arnavsoni2007@gmail.com'
        }
    ];
</script>

<footer id="contact">
    <div class="contact-card" data-reveal>
        <img
            class="contact-cube"
            src={rubiksCube}
            alt=""
            width="321"
            height="360"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
        />

        <div class="contact-copy">
            <p class="section-label">Contact me</p>
            <h2>Let’s make something <em>interesting.</em></h2>
            <p>I’m always happy to talk systems, performance, open source, or an idea that sounds slightly impossible.</p>
        </div>

        <div class="contact-links">
            {#each links as link}
                <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span>
                        <small>{link.label}</small>
                        <strong>{link.detail}</strong>
                    </span>
                    <i aria-hidden="true">↗</i>
                </a>
            {/each}
        </div>

    </div>

    <div class="footer-line">
        <a href="#home" class="footer-brand">Arnav Soni</a>
        <p>Developer portfolio</p>
    </div>
</footer>

<style>
    footer {
        position: relative;
        z-index: 2;
        width: min(1220px, calc(100% - 3rem));
        margin: 0 auto;
        padding: 6rem 0 2rem;
    }

    .contact-card {
        display: grid;
        position: relative;
        grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
        gap: clamp(2rem, 6vw, 6rem);
        overflow: hidden;
        padding: clamp(2rem, 6vw, 5rem);
        border: 3px solid var(--ink);
        border-radius: 3.5rem 1.2rem 3.5rem 1.2rem;
        background: var(--cream);
        box-shadow: 15px 17px 0 var(--gold), 19px 21px 0 var(--ink);
        color: var(--ink);
    }

    .contact-copy {
        position: relative;
        z-index: 2;
    }

    .contact-cube {
        position: absolute;
        z-index: 3;
        top: clamp(0.8rem, 2vw, 1.4rem);
        right: clamp(0.8rem, 2vw, 1.4rem);
        width: clamp(4.5rem, 7vw, 6.25rem);
        height: auto;
        transform: rotate(8deg);
        filter: drop-shadow(3px 4px 0 var(--ink));
        pointer-events: none;
        user-select: none;
    }

    .contact-copy .section-label {
        color: #26302d;
    }

    .contact-copy h2 {
        margin: 1rem 0 1.25rem;
        font-family: var(--display);
        font-size: clamp(2.7rem, 6vw, 5.6rem);
        font-weight: 900;
        letter-spacing: -0.06em;
        line-height: 0.96;
    }

    .contact-copy h2 em {
        color: var(--coral);
        font-style: normal;
        -webkit-text-stroke: 1px var(--ink);
    }

    .contact-copy > p:last-child {
        max-width: 37rem;
        font-size: 1.08rem;
        line-height: 1.6;
    }

    .contact-links {
        display: grid;
        position: relative;
        z-index: 2;
        gap: 0.8rem;
        align-content: center;
        padding-top: 2.75rem;
    }

    .contact-links a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem 1.25rem;
        border: 2px solid var(--ink);
        border-radius: 1.1rem 1.8rem 1rem 1.6rem;
        background: var(--sky);
        box-shadow: 5px 6px 0 var(--ink);
        color: var(--ink);
        text-decoration: none;
        transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
    }

    .contact-links a:nth-child(2) { background: var(--mint); }
    .contact-links a:nth-child(3) { background: var(--gold); }

    .contact-links a:hover {
        transform: translate(-2px, -3px) rotate(-0.5deg);
        box-shadow: 8px 9px 0 var(--ink);
    }

    .contact-links small,
    .contact-links strong {
        display: block;
    }

    .contact-links small {
        margin-bottom: 0.3rem;
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .contact-links strong {
        overflow-wrap: anywhere;
        font-size: 0.95rem;
    }

    .contact-links i {
        font-family: var(--display);
        font-size: 1.4rem;
        font-style: normal;
    }

    .footer-line {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 2rem;
        align-items: center;
        padding: 4.5rem 0 1rem;
        color: var(--paper-muted);
        font-size: 0.77rem;
    }

    .footer-brand {
        color: var(--cream);
        font-family: var(--display);
        font-size: 1rem;
        text-decoration: none;
        text-transform: uppercase;
    }

    .footer-line p { text-align: center; }

    @media (max-width: 780px) {
        footer { width: calc(100% - 2rem); }
        .contact-card { grid-template-columns: 1fr; }
        .contact-copy { padding-top: 3.25rem; }
        .contact-links { padding-top: 0; }
        .contact-cube { width: 4.25rem; }
        .footer-line { grid-template-columns: 1fr; gap: 0.6rem; text-align: center; }
    }
</style>
