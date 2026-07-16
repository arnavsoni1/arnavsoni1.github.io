<script>
    export let color = 'blue';
    export let label = 'Transmission';

    const colors = {
        yellow: '#ffe81f',
        blue: '#64d9ff',
        green: '#6dffb2',
        red: '#ff6b6b'
    };
</script>

<div class="divider" style={`--saber: ${colors[color] ?? colors.blue}`} aria-hidden="true">
    <span class="divider-label">{label}</span>
    <span class="hilt"><i></i><i></i><i></i></span>
    <span class="blade"></span>
</div>

<style>
    .divider {
        display: flex;
        width: min(1120px, calc(100% - 3rem));
        gap: 0.75rem;
        align-items: center;
        margin: 0 auto;
        color: var(--saber);
    }

    .divider-label {
        width: 8.5rem;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.46rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .hilt {
        display: flex;
        width: 4.8rem;
        height: 0.8rem;
        align-items: center;
        border: 1px solid #687681;
        border-radius: 2px;
        background: linear-gradient(#9eabb2 0 18%, #26313a 18% 82%, #9eabb2 82%);
        box-shadow: 0 2px 6px #000;
    }

    .hilt::before,
    .hilt::after,
    .hilt i {
        height: 100%;
        border-right: 1px solid #05070b;
        content: '';
    }

    .hilt::before { width: 0.45rem; background: #171e24; }
    .hilt::after { order: 5; width: 0.28rem; background: currentColor; box-shadow: 0 0 6px currentColor; }
    .hilt i { width: 0.7rem; }

    .blade {
        flex: 1;
        height: 3px;
        border-radius: 99px;
        background: #fff;
        box-shadow: 0 0 4px #fff, 0 0 9px var(--saber), 0 0 20px var(--saber);
        opacity: 0.82;
    }

    @media (max-width: 560px) {
        .divider {
            width: calc(100% - 2rem);
        }

        .divider-label {
            display: none;
        }

        .hilt {
            width: 3.8rem;
        }
    }
</style>
