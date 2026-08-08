<script>
    export let exploreMode = false;
    export let exploreClosing = false;
    export let onToggleExplore = () => {};

    const links = [
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' }
    ];

    let menuOpen = false;
    const closeMenu = () => (menuOpen = false);

    function handleExplore() {
        closeMenu();
        onToggleExplore();
    }

    function handleBrand(event) {
        closeMenu();
        if (!exploreMode) return;
        event.preventDefault();
        onToggleExplore();
    }
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && closeMenu()} />

<header class="site-header">
    <nav aria-label="Primary navigation">
        <a class="brand" href="#home" aria-label="Arnav Soni, back to top" onclick={handleBrand}>
            <span><strong>Arnav Soni</strong><small>Systems &amp; software</small></span>
        </a>

        <div class="nav-actions">
            <div class:links-open={menuOpen} class:links-exploring={exploreMode} class="nav-links" inert={exploreMode}>
                {#each links as link}
                    <a href={link.href} onclick={closeMenu}>{link.label}</a>
                {/each}
                <a class="github" href="https://github.com/arnavsoni1" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>

            <button
                class:explore-active={exploreMode}
                class="explore-button"
                type="button"
                aria-pressed={exploreMode}
                aria-label={exploreMode ? 'Exit Explore mode' : 'Enter Explore mode'}
                disabled={exploreClosing}
                onclick={handleExplore}
            >
                <svg class="explore-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                    <g transform="rotate(90 32 32)" fill="currentColor">
                        <circle cx="31" cy="36" r="24" />
                        <path d="m15 27 3-25h11l3 30Zm17 5L35 2h11l3 25Z" />
                        <path d="m48 30 14-5 2 10-13 6Z" />
                        <path class="falcon-cutout" d="M28 0h7l3 27-6.5 8-6.5-8Z" />
                    </g>
                </svg>
                {exploreMode ? 'Exit Explore' : 'Explore'}
            </button>

            {#if !exploreMode}
                <button
                    class:menu-open={menuOpen}
                    class="menu-button"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onclick={() => (menuOpen = !menuOpen)}
                >
                    <span></span><span></span>
                </button>
            {/if}
        </div>
    </nav>
</header>

<style>
    .site-header {
        position: fixed;
        z-index: 100;
        top: 1.1rem;
        right: 0;
        left: 0;
        pointer-events: none;
    }

    nav {
        display: flex;
        width: min(1180px, calc(100% - 2rem));
        min-height: 4.5rem;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 0.55rem 0.65rem 0.55rem 1rem;
        border: 2px solid rgba(244, 231, 197, 0.3);
        border-radius: 999px;
        background: rgba(12, 17, 25, 0.74);
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2), inset 0 1px rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(18px) saturate(125%);
        pointer-events: auto;
    }

    .brand {
        display: inline-flex;
        align-items: center;
        color: var(--cream);
        text-decoration: none;
    }

    .brand > span:last-child {
        display: grid;
        line-height: 1.05;
    }

    .brand strong {
        font-family: var(--display);
        font-size: 0.88rem;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }

    .brand small {
        margin-top: 0.3rem;
        color: var(--paper-muted);
        font-size: 0.67rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .nav-links {
        display: flex;
        gap: 0.15rem;
        align-items: center;
    }

    .nav-actions {
        display: flex;
        gap: 0.45rem;
        align-items: center;
    }

    .nav-links a {
        padding: 0.72rem 0.9rem;
        border-radius: 999px;
        color: var(--paper-muted);
        font-family: var(--display);
        font-size: 0.82rem;
        font-weight: 400;
        letter-spacing: 0.035em;
        line-height: 1;
        text-decoration: none;
        text-transform: uppercase;
        transition: background 180ms ease, color 180ms ease, transform 180ms ease;
    }

    .nav-links a:hover {
        transform: translateY(-2px);
        background: rgba(244, 231, 197, 0.1);
        color: var(--cream);
    }

    .nav-links .github {
        margin-left: 0.25rem;
        background: var(--coral);
        color: var(--cream);
    }

    .explore-button {
        display: inline-flex;
        min-height: 2.75rem;
        gap: 0.45rem;
        align-items: center;
        padding: 0.68rem 0.95rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--explore-button-bg);
        box-shadow: 3px 4px 0 var(--ink);
        color: var(--ink);
        cursor: pointer;
        font-family: var(--display);
        font-size: 0.75rem;
        letter-spacing: 0.035em;
        line-height: 1;
        text-transform: uppercase;
        transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        --explore-button-bg: var(--mint);
    }

    .explore-button:hover {
        transform: translate(-1px, -2px) rotate(-0.5deg);
        box-shadow: 5px 6px 0 var(--ink);
    }

    .explore-icon {
        width: 1.45rem;
        height: 1.45rem;
        flex: 0 0 auto;
    }

    .falcon-cutout { fill: var(--explore-button-bg); }

    .explore-button:disabled { cursor: wait; opacity: 0.72; }

    .explore-active {
        --explore-button-bg: var(--gold);
        box-shadow: 0 0 0 2px rgba(221, 169, 59, 0.18), 3px 4px 0 var(--ink);
    }

    .links-exploring { display: none; }

    .menu-button {
        display: none;
        width: 2.8rem;
        height: 2.8rem;
        border: 0;
        border-radius: 50%;
        background: var(--gold);
        cursor: pointer;
    }

    .menu-button span {
        display: block;
        width: 1rem;
        height: 2px;
        margin: 0.28rem auto;
        border-radius: 2px;
        background: var(--ink);
        transition: transform 180ms ease;
    }

    .menu-open span:first-child { transform: translateY(3px) rotate(45deg); }
    .menu-open span:last-child { transform: translateY(-3px) rotate(-45deg); }

    @media (max-width: 760px) {
        .site-header { top: 0.7rem; }
        nav { min-height: 4rem; border-radius: 1.5rem; }
        .menu-button { display: block; }

        .nav-links {
            display: none;
            position: absolute;
            top: calc(100% + 0.55rem);
            right: 1rem;
            left: 1rem;
            padding: 0.8rem;
            border: 2px solid rgba(244, 231, 197, 0.24);
            border-radius: 1.35rem;
            background: rgba(12, 17, 25, 0.96);
            box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.35);
        }

        .links-open { display: grid; }
        .nav-links a { padding: 0.9rem 1rem; }
        .nav-links .github { margin: 0.35rem 0 0; text-align: center; }
        .explore-button { min-height: 2.6rem; padding: 0.62rem 0.8rem; font-size: 0.68rem; }
    }

    @media (max-width: 430px) {
        .brand small { display: none; }
        .brand strong { font-size: 0.75rem; }
        .explore-button { padding-inline: 0.68rem; }
        .explore-icon { width: 1.3rem; height: 1.3rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .explore-button,
        .nav-links a { transition: none; }
    }
</style>
