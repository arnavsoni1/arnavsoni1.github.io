<script>
    const links = [
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' }
    ];

    let menuOpen = false;
    const closeMenu = () => (menuOpen = false);
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && closeMenu()} />

<header class="site-header">
    <nav aria-label="Primary navigation">
        <a class="brand" href="#home" aria-label="Arnav Soni, back to top" onclick={closeMenu}>
            <span class="brand-star" aria-hidden="true">✦</span>
            <span><strong>Arnav Soni</strong><small>Systems &amp; software</small></span>
        </a>

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

        <div class:links-open={menuOpen} class="nav-links">
            {#each links as link}
                <a href={link.href} onclick={closeMenu}>{link.label}</a>
            {/each}
            <a class="github" href="https://github.com/arnavsoni1" target="_blank" rel="noreferrer">GitHub ↗</a>
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
        gap: 0.8rem;
        align-items: center;
        color: var(--cream);
        text-decoration: none;
    }

    .brand-star {
        display: grid;
        width: 2.55rem;
        aspect-ratio: 1;
        place-items: center;
        border-radius: 50%;
        background: var(--gold);
        box-shadow: inset 0 0 0 2px var(--ink), 0 0.4rem 1.2rem rgba(216, 165, 47, 0.25);
        color: var(--ink);
        font-size: 1.25rem;
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

    .nav-links a {
        padding: 0.72rem 0.9rem;
        border-radius: 999px;
        color: var(--paper-muted);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
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
        nav { border-radius: 1.5rem; }
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
    }

    @media (max-width: 430px) {
        .brand small { display: none; }
    }
</style>
