<script>
    import { onMount } from 'svelte';
    import Lenis from 'lenis';
    import { animate } from 'animejs';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import FalconScene from './lib/components/FalconScene.svelte';
    import Navigation from './lib/components/Navigation.svelte';
    import Hero from './lib/components/Hero.svelte';
    import About from './lib/components/About.svelte';
    import Skills from './lib/components/Skills.svelte';
    import Projects from './lib/components/Projects.svelte';
    import Footer from './lib/components/Footer.svelte';

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lenis = new Lenis({
            duration: reduceMotion ? 0 : 1.15,
            smoothWheel: !reduceMotion,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.1
        });

        const lenisTick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTick);
        gsap.ticker.lagSmoothing(0);
        lenis.on('scroll', ScrollTrigger.update);

        const anchorCleanups = [];
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            const handleAnchor = (event) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;
                event.preventDefault();
                lenis.scrollTo(target, { offset: -72, duration: reduceMotion ? 0 : 1.1 });
            };
            anchor.addEventListener('click', handleAnchor);
            anchorCleanups.push(() => anchor.removeEventListener('click', handleAnchor));
        });

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
            anchorCleanups.forEach((cleanup) => cleanup());
            ambientAnimations.forEach((animation) => animation.cancel?.());
            gsapContext.revert();
            gsap.ticker.remove(lenisTick);
            lenis.destroy();
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

<a class="skip-link" href="#main-content">Skip to content</a>
<FalconScene />
<Navigation />

<div class="site-shell">
    <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
    </main>
    <Footer />
</div>
