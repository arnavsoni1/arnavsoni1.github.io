<script>
    import ProjectCard from './ProjectCard.svelte';

    const projects = [
        {
            number: 1,
            title: '(to be added)',
            description: '(to be added)',
            tech: ['React', '(to be added)', '(to be added)'],
            projectLink: '(to be added)',
            sourceLink: '(to be added)'
        },
        
    ];
</script>

<section id="projects">
    <h2 class="section-title">PROJECTS</h2>
    <div class="projects-grid">
        {#each projects as project}
            <ProjectCard 
                number={project.number}
                title={project.title}
                description={project.description}
                tech={project.tech}
                projectLink={project.projectLink}
                sourceLink={project.sourceLink}
            />
        {/each}
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

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
