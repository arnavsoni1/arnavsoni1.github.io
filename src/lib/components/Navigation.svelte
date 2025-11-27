<script>
    const navLinks = [
        { href: '#home', label: 'HOME' },
        { href: '#about', label: 'ABOUT' },
        { href: '#skills', label: 'SKILLS' },
        { href: '#projects', label: 'PROJECTS' },
        { href: '#contact', label: 'CONTACT' }
    ];

    function smoothScroll(e, href) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
</script>

<nav>
    <div class="logo">ARNAV SONI</div>
    <ul class="nav-links">
        {#each navLinks as link}
            <li>
                <a href={link.href} on:click={(e) => smoothScroll(e, link.href)}>
                    {link.label}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(10, 10, 10, 0.9);
        border-bottom: 2px solid var(--star-wars-yellow);
        z-index: 1000;
        backdrop-filter: blur(10px);
    }

    .logo {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        font-weight: 900;
        color: var(--star-wars-yellow);
        text-shadow: 0 0 10px var(--star-wars-yellow);
        letter-spacing: 3px;
    }

    .nav-links {
        display: flex;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav-links a {
        color: var(--text-light);
        text-decoration: none;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.9rem;
        letter-spacing: 2px;
        transition: all 0.3s ease;
        position: relative;
    }

    .nav-links a::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--lightsaber-blue);
        box-shadow: 0 0 10px var(--lightsaber-blue);
        transition: width 0.3s ease;
    }

    .nav-links a:hover {
        color: var(--lightsaber-blue);
        text-shadow: 0 0 10px var(--lightsaber-blue);
    }

    .nav-links a:hover::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
</style>
