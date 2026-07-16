<script>
    import Starfield from './lib/components/Starfield.svelte';
    import Navigation from './lib/components/Navigation.svelte';
    import Hero from './lib/components/Hero.svelte';
    import LightsaberDivider from './lib/components/LightsaberDivider.svelte';
    import About from './lib/components/About.svelte';
    import Skills from './lib/components/Skills.svelte';
    import Projects from './lib/components/Projects.svelte';
    import Contact from './lib/components/Contact.svelte';
    import Footer from './lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Arnav Soni — Systems & HPC</title>
    <meta
        name="description"
        content="Arnav Soni is a student engineer exploring systems programming, high-performance computing, and low-level software."
    />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to mission log</a>
<Starfield />

<div class="app-shell">
    <Navigation />

    <main id="main-content">
        <Hero />
        <LightsaberDivider color="yellow" label="Transmission 01" />
        <About />
        <LightsaberDivider color="blue" label="Transmission 02" />
        <Skills />
        <LightsaberDivider color="green" label="Transmission 03" />
        <Projects />
        <LightsaberDivider color="yellow" label="Open channel" />
        <Contact />
    </main>

    <Footer />
</div>
