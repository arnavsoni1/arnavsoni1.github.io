<script>
    const year = new Date().getFullYear();
</script>

<footer>
    <div class="footer-shell">
        <a class="footer-mark" href="#home" aria-label="Back to top">AS</a>
        <p>Designed and engineered by Arnav Soni. No droids were harmed in the build.</p>
        <div class="footer-meta">
            <span>© {year}</span>
            <span class="status"><i></i> System online</span>
        </div>
    </div>
</footer>

<style>
    footer {
        border-top: 1px solid var(--line);
        background: rgba(3, 5, 10, 0.62);
    }

    .footer-shell {
        display: grid;
        width: min(1120px, calc(100% - 3rem));
        min-height: 7rem;
        grid-template-columns: auto 1fr auto;
        gap: 1.5rem;
        align-items: center;
        margin: 0 auto;
    }

    .footer-mark {
        display: grid;
        width: 2.6rem;
        height: 2.6rem;
        place-items: center;
        border: 1px solid var(--yellow);
        border-radius: 50%;
        color: var(--yellow);
        font-family: var(--display);
        font-size: 0.6rem;
        font-weight: 800;
        text-decoration: none;
    }

    p {
        color: var(--muted);
        font-size: 0.82rem;
    }

    .footer-meta {
        display: flex;
        gap: 1.2rem;
        color: var(--muted);
        font-family: var(--display);
        font-size: 0.45rem;
        font-weight: 700;
        letter-spacing: 0.13em;
        text-transform: uppercase;
    }

    .status {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        color: var(--green);
    }

    .status i {
        width: 0.34rem;
        height: 0.34rem;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 7px currentColor;
    }

    @media (max-width: 700px) {
        .footer-shell {
            width: calc(100% - 2rem);
            grid-template-columns: auto 1fr;
            padding: 1.5rem 0;
        }

        .footer-meta {
            grid-column: 1 / -1;
        }
    }
</style>
