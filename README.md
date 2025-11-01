# Neo-Terminal Security Portfolio

A dark, cyberpunk-inspired portfolio website for security researchers, featuring terminal aesthetics, biometric waveforms, and interactive project showcases.

## Features

### 🎨 **Visual Design**
- **Dark Neo-Terminal Theme**: Midnight background with glassmorphic surfaces
- **Neon Accents**: Cyan and moss-green color scheme with glowing effects
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes

### ⚡ **Interactive Elements**
- **Terminal Widget**: Animated command simulation in hero section
- **Biometric Waveform**: Scroll-reactive visualization header
- **3D Flip Cards**: Projects with front/back showcasing TL;DR, PoC commands, and badges
- **Collapsible Sections**: Deep-dive writeups with expandable content

### 🔐 **Security Showcase**
- **Badge System**: CVE, CTF, and PoC indicators
- **Copyable Commands**: One-click copy for PoC commands
- **Timeline Views**: Discovery-to-resolution timelines
- **Responsible Disclosure Notes**: Redacted attack vectors and ethical considerations

### ⌨️ **Accessibility**
- **Keyboard Navigation**: Full keyboard support with Tab and arrow keys
- **Focus Indicators**: Clear visual feedback for interactive elements
- **Screen Reader Friendly**: Semantic HTML and ARIA labels

### 📊 **Content Sections**
1. **Hero**: Terminal introduction with simulated commands
2. **About**: Skills and background
3. **Exploits**: Flip cards for security projects
4. **Writeups**: Deep dives with code blocks and timelines
5. **Contact**: PGP key, CTF stats, social links, downloadable resume

## Tech Stack
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- No dependencies or build process required

## Performance
- Lightweight: ~50KB total
- Optimized animations with requestAnimationFrame
- Debounced scroll events
- Lazy intersection observers

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Customization
Edit the CSS variables in `:root` to adjust colors:

```css
--neon-cyan: #00ffff;        /* Primary accent */
--moss-green: #50c878;       /* Secondary accent */
--midnight-bg: #0a0e27;      /* Background */
```

## License
This is a personal portfolio template. Feel free to fork and customize for your own use.

## Author
**Utkarsh Walchale**  
Cyber Security Researcher | Bug Hunter | CTF Player

---

*Built with care... and coffee.* ☕

