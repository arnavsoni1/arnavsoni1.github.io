<script>
    const contactLinks = [
        { href: 'mailto:arnavsoni2007@gmail.com', label: 'EMAIL', icon: '📧' },
        { href: 'https://github.com/arnavsoni1', label: 'GITHUB', icon: '🌟' },
        { href: 'https://www.linkedin.com/in/arnav-soni-11812b325/', label: 'LINKEDIN', icon: '🔗' }
    ];
</script>

<section id="contact">
    <h2 class="section-title">TRANSMIT A MESSAGE</h2>
    <div class="contact-content">
        <p class="contact-text">
            Ready to embark on a new mission together? Whether you want to 
            collaborate on a project or just say hello, my communication 
            channels are always open.
        </p>
        <div class="contact-links">
            {#each contactLinks as link}
                <a href={link.href} class="contact-link" target="_blank" rel="noreferrer">
                    {link.icon} {link.label}
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    section {
        padding: 5rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.5rem;
        color: var(--star-wars-yellow);
        text-align: center;
        margin-bottom: 3rem;
        letter-spacing: 3px;
        text-shadow: 0 0 20px var(--star-wars-yellow);
    }

    .contact-content {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }

    .contact-text {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: var(--text-light);
    }

    .contact-links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .contact-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border: 2px solid var(--star-wars-yellow);
        color: var(--star-wars-yellow);
        text-decoration: none;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.9rem;
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }

    .contact-link:hover {
        background: var(--star-wars-yellow);
        color: var(--dark-space);
        box-shadow: 0 0 30px var(--star-wars-yellow);
    }
</style>
