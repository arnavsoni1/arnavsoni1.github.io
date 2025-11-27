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

<Starfield />
<Navigation />

<main>
    <Hero />
    <LightsaberDivider color="green" />
    <About />
    <LightsaberDivider color="blue" />
    <Skills />
    <LightsaberDivider color="green" />
    <Projects />
    <LightsaberDivider color="blue" />
    <Contact />
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }
</style>
