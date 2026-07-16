<script>
    const stars = Array.from({ length: 92 }, (_, index) => ({
        id: index,
        x: (index * 47 + 11) % 100,
        y: (index * 83 + 7) % 100,
        size: index % 13 === 0 ? 2.4 : index % 5 === 0 ? 1.6 : 1,
        delay: -((index * 0.17) % 4),
        duration: 2.8 + (index % 6) * 0.55
    }));
</script>

<div class="starfield" aria-hidden="true">
    <div class="nebula nebula--one"></div>
    <div class="nebula nebula--two"></div>
    {#each stars as star (star.id)}
        <span
            class:star--bright={star.size > 2}
            class="star"
            style={`--x: ${star.x}%; --y: ${star.y}%; --size: ${star.size}px; --delay: ${star.delay}s; --duration: ${star.duration}s;`}
        ></span>
    {/each}
</div>

<style>
    .starfield {
        position: fixed;
        z-index: 0;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .starfield::before {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(100, 217, 255, 0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 217, 255, 0.018) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: linear-gradient(to bottom, #000, transparent 82%);
        content: '';
    }

    .star {
        position: absolute;
        top: var(--y);
        left: var(--x);
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        background: #eefdff;
        animation: twinkle var(--duration) ease-in-out var(--delay) infinite;
        opacity: 0.42;
    }

    .star--bright {
        background: var(--blue-bright);
        box-shadow: 0 0 8px var(--blue);
    }

    .nebula {
        position: absolute;
        width: 40rem;
        height: 40rem;
        border-radius: 50%;
        filter: blur(4rem);
        opacity: 0.08;
    }

    .nebula--one {
        top: -20rem;
        right: -9rem;
        background: var(--blue);
    }

    .nebula--two {
        bottom: 4%;
        left: -24rem;
        background: var(--yellow);
        opacity: 0.035;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.22; transform: scale(0.8); }
        50% { opacity: 0.9; transform: scale(1.15); }
    }
</style>
