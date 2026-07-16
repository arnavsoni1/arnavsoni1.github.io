<script>
    import ProjectCard from './ProjectCard.svelte';

    // Replace these placeholder objects with your own projects when ready.
    const projects = [
        {
            number: 1,
            title: 'Flagship project',
            description: 'Add a concise description of the problem, your approach, and the result of your most important project.',
            tech: ['Language', 'Framework', 'Tooling'],
            status: 'Awaiting mission data'
        },
        {
            number: 2,
            title: 'Systems project',
            description: 'Use this slot for a low-level, performance, hardware, or high-performance computing project.',
            tech: ['Systems', 'Performance', 'Research'],
            status: 'Awaiting mission data'
        },
        {
            number: 3,
            title: 'Experimental build',
            description: 'Show something curious here: a prototype, research exploration, write-up, or work in progress.',
            tech: ['Prototype', 'Learning', 'Open source'],
            status: 'Awaiting mission data'
        }
    ];
</script>

<section class="section-shell" id="projects">
    <div class="section-header">
        <div>
            <p class="section-kicker">03 // Mission archive</p>
            <h2 class="section-title">Selected <em>work</em></h2>
        </div>
        <p class="section-intro">
            Project cards are ready for your real mission data. Update the small array at the top of
            <code>Projects.svelte</code> whenever you are ready.
        </p>
    </div>

    <div class="projects-grid">
        {#each projects as project}
            <ProjectCard {...project} />
        {/each}
    </div>
</section>

<style>
    code {
        color: var(--blue-bright);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.9em;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    .projects-grid :global(article:first-child) {
        grid-column: 1 / -1;
    }

    @media (max-width: 760px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }

        .projects-grid :global(article:first-child) {
            grid-column: auto;
        }
    }
</style>
