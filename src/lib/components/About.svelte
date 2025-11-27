<section id="about">
    <h2 class="section-title">ABOUT ME</h2>
    <div class="about-content">
        <div class="about-image">
            <div class="profile-frame">
                <div class="profile-inner">AS</div>
            </div>
        </div>
        <div class="about-text">
            <p>
                From the beginning of my programming journey, I have been fascinated by 
                Low Level Computing. And through my projects, I not only intend to learn, 
                but also to showcase to others that Systems programming is a fascinating domain. 
            </p>
            <p>
                Feel free to browse through my projects, and reach out if you have any questions. 
                Have a great day!
            </p>
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

    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .profile-frame {
        width: 300px;
        height: 300px;
        border: 3px solid var(--lightsaber-blue);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        position: relative;
        box-shadow: 0 0 30px var(--lightsaber-blue), inset 0 0 30px rgba(0, 212, 255, 0.1);
        animation: rotate-border 10s linear infinite;
    }

    @keyframes rotate-border {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .profile-inner {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--empire-gray), var(--dark-space));
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Orbitron', sans-serif;
        font-size: 4rem;
        color: var(--star-wars-yellow);
        animation: rotate-border 10s linear infinite reverse;
    }

    .about-text p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .about-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }
</style>
