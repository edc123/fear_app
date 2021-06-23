# Fēar App

_Nobody is safe in South Australia._

## 🔌 Important note about CORS

It's not enabled on the data.sa.gov endpoint so [you'll need to install a CORS plugin to see data coming through.](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)

## Quick start
- `yarn install && yarn start`

## Other commands
- `yarn test`

Launches the test runner in the interactive watch mode.

- `yarn build`

Builds the app for production to the `build` folder.

## Summary of work

- Time spent was about < 2 days all up, I started Monday morning and worked on this every opportunity I got.
- There were issues pulling in the API - I wasn't sure if I should do more to make this work without a plugin
- Alongside other work, it was hard to turn back on some decisions. Here are things I wished I did:
  - I would have brought Filter component into OffenceAccordion instead. This would have allowed for `groupBy` and `selectedPanel` to not be at the App.tsx level and made it somewhat easier to test
  - AccordionPanel closing and opening could have been different. This may have allowed me to add an animation with ease, too
  - I would have moved types off somewhere else outside component files, and I would have maybe rejigged the folder structure a bit to be friendlier to "global" things
  - With a real project, I may have used something like `styled-components` but depends
  - Colour contrast isn't the best on the 'dimming' effect
  - Constants / hardcoded strings could be pulled out somewhere
