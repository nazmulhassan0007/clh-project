# Design

Direction: calm institutional confidence for senior decision-makers (40 to 60). One film hero, one purple "doors" strip, then composed editorial sections. Replaces the earlier showreel-style build (marquee, pinned scroll sections, stacking cards, orb button), which read as loud and gimmicky for this audience.

## Brand (from the guideline)
- Purple `#a75cff` dominant for actions and key surfaces; Deep Blue `#0d1b2a` for text, the platform band and contrast. Dark `#1c0e2f` only in the footer. Paper `#faf8ff`, wash `#f3eefc`.
- Text on purple is Deep Blue (4.6:1). Purple text on light uses `#7a46bf` or darker.
- Logo supplied SVG, unaltered. Dark version on dark, light on light, icon only below 480px.
- Titles: Zalando Sans SemiExpanded 600, Title Case (client choice). Body: Google Sans (client choice). Content width 1600px.

## Layout
Hero film (full-bleed) with headline left, subject right; doors strip (3 routes). Intro with facts. Three programme rows (zig-zag, who it is for, what you will learn). Journey timeline. Six-week table (sticky intro). Platform on Deep Blue. Benefits grid. FAQ. Support list. Purple enquiry band. Section backgrounds alternate paper, white, wash.

## Imagery
Programme photos are natural (no heavy tint) with a purple code tag (ALP, CTS, ARP). Brand overlays (purple 70%, blue 60%) are kept for hero shade only. Photos other than the hero film are placeholders from the brand PDF.

## Motion
Restrained. Hero text rises in once; film settles and drifts. Blocks fade up once (16px, 0.7s). Timeline line draws with scroll. Facts count up. Hover and press feedback only elsewhere. Ease: cubic-bezier(0.23, 1, 0.32, 1). All of it respects reduced motion. Libraries: Framer Motion (entrances, FAQ, bars), GSAP ScrollTrigger (hero drift, timeline, count-up, ring).
