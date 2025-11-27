# Arnav Soni - Portfolio ⚔️

A Star Wars themed portfolio website built with Svelte and Vite.

## ✨ Features

- 🌌 **Animated Starfield Background** - Interactive parallax star effect
- ⚔️ **Lightsaber Dividers** - Glowing section separators in various colors
- 💛 **Star Wars Color Theme** - Iconic yellow, lightsaber blue/green/red
- 🔤 **Orbitron Typography** - Futuristic Star Wars-inspired fonts
- 📱 **Fully Responsive** - Works on all device sizes
- 🎨 **Smooth Animations** - Hover effects, floating elements, skill bar animations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.svelte              # Main app component
├── app.css                 # Global styles & CSS variables
├── main.js                 # App entry point
└── lib/
    └── components/
        ├── About.svelte           # About section
        ├── Contact.svelte         # Contact section
        ├── Footer.svelte          # Footer with Yoda quote
        ├── Hero.svelte            # Hero/landing section
        ├── LightsaberDivider.svelte  # Lightsaber section dividers
        ├── Navigation.svelte      # Fixed navigation bar
        ├── ProjectCard.svelte     # Individual project card
        ├── Projects.svelte        # Projects section
        ├── SkillCard.svelte       # Individual skill card
        ├── Skills.svelte          # Skills section
        ├── Starfield.svelte       # Animated star background
        └── index.js               # Component exports
```

## 🎨 Customization

### Colors
Edit the CSS variables in `src/app.css`:
```css
:root {
    --star-wars-yellow: #FFE81F;
    --lightsaber-blue: #00D4FF;
    --lightsaber-green: #00FF41;
    --lightsaber-red: #FF0000;
    --dark-space: #0a0a0a;
    --empire-gray: #1a1a2e;
    --text-light: #e0e0e0;
}
```

### Content
- **Skills**: Edit the `skills` array in `src/lib/components/Skills.svelte`
- **Projects**: Edit the `projects` array in `src/lib/components/Projects.svelte`
- **Contact**: Update links in `src/lib/components/Contact.svelte`
- **About**: Modify text in `src/lib/components/About.svelte`

## 📜 License

May the Code be with you! ✨
