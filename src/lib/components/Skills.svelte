<script>
    import SkillCard from './SkillCard.svelte';
    
    // Import skill icons
    import cIcon from '../../assets/C.png';
    import cppIcon from '../../assets/C++.png';
    import rustIcon from '../../assets/rust.png';
    import cudaIcon from '../../assets/cuda.png';
    import pythonIcon from '../../assets/python.png';

    const skills = [
        { 
            icon: cIcon, 
            name: 'C', 
            description: 'Not much to say', 
            level: 65 
        },
        { 
            icon: cppIcon, 
            name: 'C++', 
            description: 'C, but better', 
            level: 75 
        },
        { 
            icon: rustIcon, 
            name: 'Rust', 
            description: 'Memory Safety', 
            level: 50 
        },
        { 
            icon: cudaIcon, 
            name: 'CUDA', 
            description: 'GPU Computing', 
            level: 60 
        },
        { 
            icon: pythonIcon, 
            name: 'Python', 
            description: 'Non-negotiable in the modern world', 
            level: 80 
        },
    ];
</script>

<section id="skills">
    <h2 class="section-title">SKILLS</h2>
    <div class="skills-grid">
        {#each skills as skill}
            <SkillCard 
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
                level={skill.level}
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

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
</style>
