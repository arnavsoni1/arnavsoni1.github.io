<script>
    function smoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector('#projects');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
</script>

<section class="hero" id="home">
    <h1 class="hero-title">ARNAV SONI</h1>
    <p class="hero-subtitle">Student • Engineer</p>
    <p class="hero-description">
        A curious student interested in Low Level Systems programming and High Performance Computing. 
    </p>
    <a href="#projects" class="cta-button" on:click={smoothScroll}>EXPLORE MY WORK</a>
</section>

<style>
    .hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        position: relative;
    }

    .hero-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        color: var(--star-wars-yellow);
        text-shadow: 0 0 30px var(--star-wars-yellow);
        margin-bottom: 1rem;
        animation: glow 2s ease-in-out infinite alternate, hologram-float 3s ease-in-out infinite;
        letter-spacing: 5px;
    }

    @keyframes glow {
        from { text-shadow: 0 0 20px var(--star-wars-yellow); }
        to { text-shadow: 0 0 40px var(--star-wars-yellow), 0 0 60px var(--star-wars-yellow); }
    }

    @keyframes hologram-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .hero-subtitle {
        font-size: 1.5rem;
        color: var(--lightsaber-blue);
        margin-bottom: 2rem;
        letter-spacing: 3px;
    }

    .hero-description {
        max-width: 600px;
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 3rem;
        color: var(--text-light);
    }

    .cta-button {
        padding: 1rem 3rem;
        font-family: 'Orbitron', sans-serif;
        font-size: 1rem;
        letter-spacing: 2px;
        background: transparent;
        border: 2px solid var(--lightsaber-blue);
        color: var(--lightsaber-blue);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .cta-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--lightsaber-blue), transparent);
        transition: left 0.5s ease;
    }

    .cta-button:hover {
        background: var(--lightsaber-blue);
        color: var(--dark-space);
        box-shadow: 0 0 30px var(--lightsaber-blue);
    }

    .cta-button:hover::before {
        left: 100%;
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }
    }
</style>
