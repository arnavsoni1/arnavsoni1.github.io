<script>
    import SkillCard from './SkillCard.svelte';
    import cIcon from '../../assets/C.png';
    import cppIcon from '../../assets/C++.png';
    import rustIcon from '../../assets/rust.png';
    import cudaIcon from '../../assets/cuda.png';
    import pythonIcon from '../../assets/python.png';

    // Edit this array to update the technologies shown on the portfolio.
    const skills = [
        { icon: cIcon, name: 'C', description: 'Memory, pointers, and software close to the machine.', level: 65, code: 'SYS-01' },
        { icon: cppIcon, name: 'C++', description: 'Performance-oriented programs and modern systems tooling.', level: 75, code: 'SYS-02' },
        { icon: rustIcon, name: 'Rust', description: 'Systems programming with strong safety guarantees.', level: 50, code: 'SYS-03' },
        { icon: cudaIcon, name: 'CUDA', description: 'Parallel workloads and GPU computing fundamentals.', level: 60, code: 'HPC-01' },
        { icon: pythonIcon, name: 'Python', description: 'Prototyping, automation, and scientific workflows.', level: 80, code: 'OPS-01' }
    ];
</script>

<section class="section-shell" id="skills">
    <div class="section-header">
        <div>
            <p class="section-kicker">02 // Systems online</p>
            <h2 class="section-title">Core <em>systems</em></h2>
        </div>
        <p class="section-intro">
            A growing toolkit for working across the stack—from low-level languages to parallel computing
            and fast experimentation.
        </p>
    </div>

    <div class="skills-grid">
        {#each skills as skill}
            <SkillCard {...skill} />
        {/each}
    </div>
</section>

<style>
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
    }

    .skills-grid :global(article) {
        grid-column: span 2;
    }

    .skills-grid :global(article:nth-child(4)) {
        grid-column: 2 / span 2;
    }

    @media (max-width: 900px) {
        .skills-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .skills-grid :global(article),
        .skills-grid :global(article:nth-child(4)) {
            grid-column: auto;
        }
    }

    @media (max-width: 560px) {
        .skills-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
