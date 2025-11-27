<script>
    import { onMount } from 'svelte';

    let stars = [];
    const starCount = 200;

    onMount(() => {
        for (let i = 0; i < starCount; i++) {
            stars.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 3,
                delay: Math.random() * 2,
                duration: Math.random() * 2 + 1
            });
        }
        stars = stars;
    });

    function handleMouseMove(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.star').forEach((star, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const xOffset = (x - 0.5) * speed * 20;
            const yOffset = (y - 0.5) * speed * 20;
            star.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="starfield">
    {#each stars as star (star.id)}
        <div 
            class="star"
            style="
                left: {star.left}%;
                top: {star.top}%;
                width: {star.size}px;
                height: {star.size}px;
                animation-delay: {star.delay}s;
                animation-duration: {star.duration}s;
            "
        ></div>
    {/each}
</div>

<style>
    .starfield {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
    }

    .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: twinkle 2s infinite ease-in-out;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
</style>
