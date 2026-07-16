<script>
    const links = [
        { href: 'mailto:arnavsoni2007@gmail.com', label: 'Email', detail: 'arnavsoni2007@gmail.com' },
        { href: 'https://github.com/arnavsoni1', label: 'GitHub', detail: '@arnavsoni1' },
        { href: 'https://www.linkedin.com/in/arnav-soni-11812b325/', label: 'LinkedIn', detail: 'Connect professionally' }
    ];
</script>

<section class="section-shell contact" id="contact">
    <div class="contact-panel panel">
        <div class="signal-column" aria-hidden="true">
            <span class="signal-ring signal-ring--one"></span>
            <span class="signal-ring signal-ring--two"></span>
            <span class="signal-core"></span>
            <span class="signal-line signal-line--one"></span>
            <span class="signal-line signal-line--two"></span>
        </div>

        <div class="contact-copy">
            <p class="section-kicker">04 // Open channel</p>
            <h2>Start a new <em>transmission.</em></h2>
            <p>
                Want to compare notes, collaborate on a build, or talk systems? My communication channel
                is open.
            </p>
            <a class="button button--primary" href="mailto:arnavsoni2007@gmail.com">Send a message</a>
        </div>

        <div class="contact-links">
            {#each links as link, index}
                <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span class="link-number">0{index + 1}</span>
                    <span class="link-copy">
                        <small>{link.label}</small>
                        <strong>{link.detail}</strong>
                    </span>
                    <span class="link-arrow" aria-hidden="true">↗</span>
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    .contact {
        padding-bottom: 8rem;
    }

    .contact-panel {
        display: grid;
        grid-template-columns: 0.7fr 1.15fr 1fr;
        overflow: hidden;
    }

    .signal-column {
        display: grid;
        position: relative;
        min-height: 31rem;
        place-items: center;
        overflow: hidden;
        border-right: 1px solid var(--line);
        background:
            linear-gradient(rgba(100, 217, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 217, 255, 0.035) 1px, transparent 1px);
        background-size: 28px 28px;
    }

    .signal-ring,
    .signal-core,
    .signal-line {
        position: absolute;
    }

    .signal-ring {
        border: 1px solid var(--line-strong);
        border-radius: 50%;
    }

    .signal-ring--one {
        width: 10rem;
        height: 10rem;
        border-style: dashed;
        animation: spin 18s linear infinite;
    }

    .signal-ring--two {
        width: 16rem;
        height: 16rem;
        border-color: rgba(255, 232, 31, 0.17);
        border-style: dotted;
        animation: spin 30s linear infinite reverse;
    }

    .signal-core {
        width: 3.8rem;
        height: 3.8rem;
        border: 2px solid var(--yellow);
        border-radius: 50%;
        background: radial-gradient(circle, var(--yellow) 0 8%, transparent 10%);
        box-shadow: 0 0 2rem rgba(255, 232, 31, 0.18);
    }

    .signal-line {
        width: 28rem;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--blue), transparent);
        opacity: 0.32;
    }

    .signal-line--one { transform: rotate(28deg); }
    .signal-line--two { transform: rotate(-36deg); }

    .contact-copy {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: clamp(2rem, 5vw, 4rem);
    }

    .contact-copy h2 {
        margin: 1rem 0 1.3rem;
        font-family: var(--display);
        font-size: clamp(2rem, 4.6vw, 3.8rem);
        font-weight: 800;
        letter-spacing: -0.055em;
        line-height: 1.02;
        text-transform: uppercase;
    }

    .contact-copy h2 em {
        color: var(--yellow);
        font-style: normal;
    }

    .contact-copy > p:not(.section-kicker) {
        margin-bottom: 1.8rem;
        color: var(--muted);
    }

    .contact-links {
        display: flex;
        border-left: 1px solid var(--line);
        flex-direction: column;
    }

    .contact-links a {
        display: grid;
        flex: 1;
        grid-template-columns: auto 1fr auto;
        gap: 0.9rem;
        align-items: center;
        padding: 1.5rem;
        color: var(--text);
        text-decoration: none;
        transition: background 180ms ease;
    }

    .contact-links a + a {
        border-top: 1px solid var(--line);
    }

    .contact-links a:hover {
        background: rgba(100, 217, 255, 0.055);
    }

    .link-number {
        color: var(--yellow);
        font-family: var(--display);
        font-size: 0.5rem;
    }

    .link-copy small,
    .link-copy strong {
        display: block;
        font-family: var(--display);
    }

    .link-copy small {
        margin-bottom: 0.35rem;
        color: var(--muted);
        font-size: 0.45rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .link-copy strong {
        overflow-wrap: anywhere;
        color: var(--blue-bright);
        font-size: 0.55rem;
        letter-spacing: 0.04em;
    }

    .link-arrow {
        color: var(--muted);
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 900px) {
        .contact-panel {
            grid-template-columns: 0.55fr 1fr;
        }

        .contact-links {
            grid-column: 1 / -1;
            border-top: 1px solid var(--line);
            border-left: 0;
        }
    }

    @media (max-width: 620px) {
        .contact-panel {
            grid-template-columns: 1fr;
        }

        .signal-column {
            min-height: 15rem;
            border-right: 0;
            border-bottom: 1px solid var(--line);
        }

        .contact-copy {
            padding: 2rem 1.4rem;
        }

        .contact-copy .button {
            width: 100%;
        }

        .contact-links {
            grid-column: auto;
        }
    }
</style>
