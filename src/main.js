import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const target = document.getElementById('app')

// Remove the static GitHub Pages fallback once the compiled Svelte app is ready.
target.replaceChildren()

const app = mount(App, {
  target,
})

export default app
