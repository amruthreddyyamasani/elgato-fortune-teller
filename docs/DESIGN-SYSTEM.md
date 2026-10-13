# Design system

## Color and surfaces

The opening uses a warm paper background (`#fbf6ee`) with a subtle dotted texture, a near-white story card, warm cocoa text, and restrained peach, sage, lavender, and pink accents. Surfaces use fine warm borders and soft shadows rather than glass effects or large gradients. The three door drawings are CSS geometry, each with its own pastel fill and keyhole details.

## Typography

The project uses a rounded system-font stack (`ui-rounded`, Trebuchet MS, Segoe UI) with no external font download. Scene headings use a compact, bold scale; dialogue receives the strongest typographic emphasis; supporting copy uses a muted warm brown.

## Layout

Dialogue scenes fit a centered card up to 920px wide. Desktop door selection uses three equal columns; viewports at or below 700px stack the buttons as wide rows. The page permits vertical scrolling on narrow screens and prevents horizontal overflow. Buttons keep comfortable touch targets and a visible keyboard focus outline.

## Motion and accessibility

The greeter/Elgato frame has a small slow float. Scene changes use a short entrance transition, and door hover raises the card slightly. `prefers-reduced-motion: reduce` disables the float and minimizes transitions throughout. The scare itself deliberately cuts to the full-screen media stage rather than adding decorative motion.

## Reference review

[React Bits](https://reactbits.dev/get-started/introduction) was reviewed as a source for small, modular motion patterns; [MotionSites](https://motionsites.ai/) was reviewed for broad visual inspiration. The implementation uses local CSS and no copied component assets or external animation packages.
