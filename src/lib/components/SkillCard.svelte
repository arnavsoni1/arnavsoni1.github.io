<script>
    import { onMount } from 'svelte';

    export let icon;
    export let name;
    export let description;
    export let level;

    let visible = false;
    let cardElement;
    let animatedWidth = '0%';

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible = true;
                    setTimeout(() => {
                        animatedWidth = `${level}%`;
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        if (cardElement) {
            observer.observe(cardElement);
        }

        return () => {
            if (cardElement) {
                observer.unobserve(cardElement);
            }
        };
    });
</script>

<div class="skill-card" bind:this={cardElement}>
    <div class="skill-icon"><img src={icon} alt={name} /></div>
    <h3 class="skill-name">{name}</h3>
    <p>{description}</p>
    <div class="skill-level">
        <div class="skill-level-fill" style="width: {animatedWidth}"></div>
    </div>
</div>

<style>
    .skill-card {
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(10, 10, 10, 0.9));
        border: 1px solid var(--lightsaber-blue);
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .skill-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent);
        transform: rotate(45deg);
        transition: all 0.5s ease;
    }

    .skill-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);
        border-color: var(--star-wars-yellow);
    }

    .skill-card:hover::before {
        left: 100%;
    }

    .skill-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .skill-icon img {
        width: 64px;
        height: 64px;
        object-fit: contain;
    }

    .skill-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.2rem;
        color: var(--star-wars-yellow);
        margin-bottom: 0.5rem;
    }

    .skill-level {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-top: 1rem;
    }

    .skill-level-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--lightsaber-blue), var(--lightsaber-green));
        box-shadow: 0 0 10px var(--lightsaber-blue);
        border-radius: 4px;
        transition: width 1s ease;
    }
</style>
