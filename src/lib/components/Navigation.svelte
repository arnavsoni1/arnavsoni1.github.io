<script>
    const navLinks = [
        { href: '#about', label: 'Profile', code: '01' },
        { href: '#skills', label: 'Systems', code: '02' },
        { href: '#projects', label: 'Missions', code: '03' },
        { href: '#contact', label: 'Contact', code: '04' }
    ];

    let menuOpen = false;

    function closeMenu() {
        menuOpen = false;
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') closeMenu();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="site-header">
    <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="#home" aria-label="Arnav Soni, back to top" onclick={closeMenu}>
            <span class="brand-mark" aria-hidden="true">AS</span>
            <span class="brand-copy">
                <strong>Arnav Soni</strong>
                <small>Systems // HPC</small>
            </span>
        </a>

        <button
            class:menu-button--open={menuOpen}
            class="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onclick={() => (menuOpen = !menuOpen)}
        >
            <span></span>
            <span></span>
        </button>

        <div class:nav-links--open={menuOpen} class="nav-links" id="nav-links">
            {#each navLinks as link}
                <a href={link.href} onclick={closeMenu}>
                    <span>{link.code}</span>
                    {link.label}
                </a>
            {/each}
            <a class="github-link" href="https://github.com/arnavsoni1" target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
            </a>
        </div>
    </nav>
</header>

<style>
    .site-header {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        border-bottom: 1px solid var(--line);
        background: rgba(3, 5, 10, 0.78);
        backdrop-filter: blur(18px) saturate(130%);
    }

    .site-header::after {
        position: absolute;
        right: 0;
        bottom: -1px;
        left: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--blue), transparent);
        content: '';
        opacity: 0.35;
    }

    .nav-shell {
        display: flex;
        width: min(1180px, calc(100% - 3rem));
        min-height: 5rem;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }

    .brand {
        display: inline-flex;
        gap: 0.85rem;
        align-items: center;
        text-decoration: none;
    }

    .brand-mark {
        display: grid;
        width: 2.35rem;
        height: 2.35rem;
        place-items: center;
        border: 1px solid var(--yellow);
        border-radius: 50%;
        color: var(--yellow);
        font-family: var(--display);
        font-size: 0.58rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        box-shadow: inset 0 0 0 4px var(--space), inset 0 0 0 5px rgba(255, 232, 31, 0.25);
    }

    .brand-copy {
        display: grid;
        line-height: 1.2;
    }

    .brand-copy strong {
        color: var(--text);
        font-family: var(--display);
        font-size: 0.72rem;
        letter-spacing: 0.13em;
        text-transform: uppercase;
    }

    .brand-copy small {
        margin-top: 0.24rem;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.48rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .nav-links {
        display: flex;
        gap: clamp(1rem, 2.6vw, 2.25rem);
        align-items: center;
    }

    .nav-links a {
        display: inline-flex;
        gap: 0.4rem;
        align-items: center;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-decoration: none;
        text-transform: uppercase;
        transition: color 180ms ease;
    }

    .nav-links a > span {
        color: rgba(100, 217, 255, 0.58);
        font-size: 0.48rem;
    }

    .nav-links a:hover {
        color: var(--yellow);
    }

    .nav-links .github-link {
        padding: 0.64rem 0.9rem;
        border: 1px solid var(--line-strong);
        color: var(--text);
    }

    .menu-button {
        display: none;
        width: 2.8rem;
        height: 2.8rem;
        border: 1px solid var(--line-strong);
        background: transparent;
        cursor: pointer;
    }

    .menu-button span {
        display: block;
        width: 1rem;
        height: 1px;
        margin: 0.32rem auto;
        background: var(--text);
        transition: transform 180ms ease;
    }

    .menu-button--open span:first-child {
        transform: translateY(3px) rotate(45deg);
    }

    .menu-button--open span:last-child {
        transform: translateY(-3px) rotate(-45deg);
    }

    @media (max-width: 820px) {
        .nav-shell {
            width: calc(100% - 2rem);
        }

        .menu-button {
            display: block;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: calc(100% + 1px);
            right: 0;
            left: 0;
            align-items: stretch;
            padding: 1rem;
            border-bottom: 1px solid var(--line);
            background: rgba(3, 5, 10, 0.97);
        }

        .nav-links--open {
            display: grid;
        }

        .nav-links a {
            justify-content: space-between;
            padding: 0.9rem 0.5rem;
            border-bottom: 1px solid rgba(157, 211, 232, 0.1);
        }

        .nav-links .github-link {
            margin-top: 0.5rem;
        }
    }
</style>
