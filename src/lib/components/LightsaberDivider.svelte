<script>
    export let color = 'green';

    const colors = {
        green: '#00FF41',
        blue: '#00D4FF',
        red: '#FF0000'
    };
</script>

<div class="lightsaber-divider" style="--saber-color: {colors[color]}"></div>

<style>
    .lightsaber-divider {
        width: 80%;
        max-width: 400px;
        height: 4px;
        background: linear-gradient(90deg, transparent, var(--saber-color), transparent);
        margin: 4rem auto;
        box-shadow: 0 0 20px var(--saber-color);
        position: relative;
    }

    .lightsaber-divider::before,
    .lightsaber-divider::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: #444;
        border-radius: 3px;
        top: -8px;
    }

    .lightsaber-divider::before { left: -25px; }
    .lightsaber-divider::after { right: -25px; }
</style>
