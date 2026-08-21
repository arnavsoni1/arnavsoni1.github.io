<script>
    import { onMount } from 'svelte';
    import Lenis from 'lenis';
    import { animate } from 'animejs';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import FalconScene from './lib/components/FalconScene.svelte';
    import Navigation from './lib/components/Navigation.svelte';
    import ExploreMode from './lib/components/ExploreMode.svelte';
    import HyperdriveExperience from './lib/components/HyperdriveExperience.svelte';
    import Hero from './lib/components/Hero.svelte';
    import About from './lib/components/About.svelte';
    import Experience from './lib/components/Experience.svelte';
    import Skills from './lib/components/Skills.svelte';
    import Projects from './lib/components/Projects.svelte';
    import Footer from './lib/components/Footer.svelte';

    let falconScene;
    let lenis;
    let exploreMounted = false;
    let exploreActive = false;
    let exploreReady = false;
    let hyperdriveMounted = false;
    let hyperdriveActive = false;
    let hyperdriveTrigger;

    function handleExploreViewChange(insideFalcon) {
        exploreReady = insideFalcon;
    }

    function enterExplore() {
        if (exploreMounted || hyperdriveMounted) return;
        exploreMounted = true;
        exploreActive = true;
        exploreReady = false;
        document.body.classList.add('explore-active');
        lenis?.stop();
        falconScene?.setExploreProgress(0);
        falconScene?.setExploreMode(true);
    }

    function exitExplore() {
        if (!exploreMounted || !exploreActive) return;
        exploreActive = false;
        falconScene?.setExploreMode(false);
    }

    function finishExploreExit() {
        if (exploreActive) return;
        exploreMounted = false;
        exploreReady = false;
        document.body.classList.remove('explore-active');
        lenis?.start();
        ScrollTrigger.refresh();
    }

    function toggleExplore() {
        if (exploreMounted) {
            exitExplore();
        } else {
            enterExplore();
        }
    }

    function startHyperdrive() {
        if (hyperdriveMounted || !exploreMounted || !exploreActive) return;
        hyperdriveTrigger = document.activeElement;
        hyperdriveMounted = true;
        hyperdriveActive = true;
        document.body.classList.add('hyperdrive-active');
        lenis?.stop();
        falconScene?.setSuspended(true);
    }

    function exitHyperdrive() {
        if (!hyperdriveMounted || !hyperdriveActive) return;
        hyperdriveActive = false;
    }

    function finishHyperdriveExit() {
        if (hyperdriveActive) return;
        hyperdriveMounted = false;
        document.body.classList.remove('hyperdrive-active');
        falconScene?.setSuspended(false);
        if (!exploreMounted) {
            lenis?.start();
            ScrollTrigger.refresh();
        }
        window.requestAnimationFrame(() => hyperdriveTrigger?.focus?.());
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        lenis = new Lenis({
            duration: reduceMotion ? 0 : 1.15,
            smoothWheel: !reduceMotion,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.1
        });

        const lenisTick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTick);
        gsap.ticker.lagSmoothing(0);
        lenis.on('scroll', ScrollTrigger.update);

        const handleAnchor = (event) => {
            const anchor = event.target.closest?.('a[href^="#"]');
            if (!anchor || exploreMounted || hyperdriveMounted) return;
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: reduceMotion ? 0 : 1.1 });
        };
        document.addEventListener('click', handleAnchor);

        const gsapContext = gsap.context(() => {
            if (reduceMotion) return;

            gsap.utils.toArray('[data-reveal]').forEach((element) => {
                gsap.fromTo(
                    element,
                    { y: 64, opacity: 0, rotate: element.dataset.revealTilt || 0 },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 1.05,
                        ease: 'power3.out',
                        clearProps: 'transform,opacity',
                        scrollTrigger: { trigger: element, start: 'top 86%', once: true }
                    }
                );
            });

            gsap.utils.toArray('[data-parallax]').forEach((element) => {
                const distance = Number(element.dataset.parallax || 8) * -8;
                gsap.fromTo(
                    element,
                    { yPercent: -distance * 0.2 },
                    {
                        yPercent: distance,
                        ease: 'none',
                        scrollTrigger: { trigger: element.closest('section') || element, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
                    }
                );
            });
        });

        const ambientAnimations = [];
        if (!reduceMotion) {
            document.querySelectorAll('.character-float').forEach((character, index) => {
                ambientAnimations.push(
                    animate(character, {
                        translateY: -(8 + index * 2),
                        rotate: index % 2 === 0 ? '1.2deg' : '-1.2deg',
                        duration: 2400 + index * 330,
                        alternate: true,
                        loop: true,
                        ease: 'inOutSine'
                    })
                );
            });

            document.querySelectorAll('.exhibit-orbit').forEach((orbit, index) => {
                ambientAnimations.push(
                    animate(orbit, {
                        rotate: index % 2 === 0 ? '1turn' : '-1turn',
                        duration: 11000 + index * 1500,
                        loop: true,
                        ease: 'linear'
                    })
                );
            });

        }

        ScrollTrigger.refresh();

        return () => {
            document.removeEventListener('click', handleAnchor);
            ambientAnimations.forEach((animation) => animation.cancel?.());
            gsapContext.revert();
            gsap.ticker.remove(lenisTick);
            lenis.destroy();
            lenis = undefined;
            document.body.classList.remove('explore-active');
            document.body.classList.remove('hyperdrive-active');
        };
    });
</script>

<svelte:head>
    <title>Arnav Soni - Portfolio</title>
    <meta
        name="description"
        content="Arnav Soni is a systems programmer exploring low-level software, GPU computing, and ambitious technical ideas."
    />
    <meta name="theme-color" content="#0b1018" />
</svelte:head>

<a
    class:skip-hidden={exploreMounted || hyperdriveMounted}
    class="skip-link"
    href="#main-content"
    aria-hidden={exploreMounted || hyperdriveMounted}
    tabindex={exploreMounted || hyperdriveMounted ? -1 : undefined}
>Skip to content</a>
<FalconScene bind:this={falconScene} onExploreViewChange={handleExploreViewChange} />
<Navigation
    exploreMode={exploreMounted}
    exploreClosing={exploreMounted && !exploreActive}
    onToggleExplore={toggleExplore}
/>

<div
    class:explore-returning={exploreMounted && !exploreActive}
    class="site-shell"
    aria-hidden={exploreMounted || hyperdriveMounted}
    inert={exploreMounted || hyperdriveMounted}
>
    <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
    </main>
    <Footer />
</div>

{#if exploreMounted}
    <ExploreMode
        active={exploreActive}
        ready={exploreReady}
        hyperdriveActive={hyperdriveMounted}
        onExit={exitExplore}
        onClosed={finishExploreExit}
        onProgress={(value) => falconScene?.setExploreProgress(value)}
        onStartHyperdrive={startHyperdrive}
    />
{/if}

{#if hyperdriveMounted}
    <HyperdriveExperience
        active={hyperdriveActive}
        onExit={exitHyperdrive}
        onClosed={finishHyperdriveExit}
    />
{/if}
