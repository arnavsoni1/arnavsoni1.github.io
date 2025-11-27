<script>
    export let number;
    export let title;
    export let description;
    export let tech = [];
    export let projectLink = '#';
    export let sourceLink = '#';
</script>

<div class="project-card">
    <span class="project-number">{number.toString().padStart(2, '0')}</span>
    <h3 class="project-title">{title}</h3>
    <p class="project-description">{description}</p>
    <div class="project-tech">
        {#each tech as t}
            <span class="tech-tag">{t}</span>
        {/each}
    </div>
    <div class="project-links">
        <a href={projectLink} class="project-link" target="_blank" rel="noreferrer">VIEW PROJECT</a>
        <a href={sourceLink} class="project-link" target="_blank" rel="noreferrer">SOURCE CODE</a>
    </div>
</div>

<style>
    .project-card {
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(10, 10, 10, 0.95));
        border: 1px solid transparent;
        border-image: linear-gradient(135deg, var(--lightsaber-blue), var(--lightsaber-green)) 1;
        padding: 2rem;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .project-card:hover {
        transform: scale(1.02);
        box-shadow: 0 0 40px rgba(0, 212, 255, 0.2);
    }

    .project-number {
        font-family: 'Orbitron', sans-serif;
        font-size: 4rem;
        color: rgba(255, 232, 31, 0.1);
        position: absolute;
        top: 10px;
        right: 20px;
    }

    .project-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        color: var(--star-wars-yellow);
        margin-bottom: 1rem;
    }

    .project-description {
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .tech-tag {
        padding: 0.3rem 0.8rem;
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid var(--lightsaber-blue);
        border-radius: 20px;
        font-size: 0.8rem;
        color: var(--lightsaber-blue);
    }

    .project-links {
        display: flex;
        gap: 1rem;
    }

    .project-link {
        padding: 0.5rem 1.5rem;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.8rem;
        text-decoration: none;
        border: 1px solid var(--lightsaber-green);
        color: var(--lightsaber-green);
        transition: all 0.3s ease;
    }

    .project-link:hover {
        background: var(--lightsaber-green);
        color: var(--dark-space);
        box-shadow: 0 0 20px var(--lightsaber-green);
    }
</style>
