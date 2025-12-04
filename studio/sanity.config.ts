import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {buildLegacyTheme} from 'sanity'
import {createElement} from 'react'

const Logo = () =>
  createElement('img', {
    src: '/static/MONOGRAM.png',
    alt: 'Beauty Hub',
    style: {height: '1.5rem', width: '1.5rem'},
  })

const props = {
  '--my-white': '#fff',
  '--my-black': '#1a1a1a',
  '--my-brand': '#8b1538',
  '--my-pink': '#ff9ec5',
  '--my-pink-light': '#fff5f8',
  '--my-pink-medium': '#ffd6e8',
  '--my-maroon': '#8b1538',
  '--my-maroon-light': '#a01a42',
  '--my-red': '#db4437',
  '--my-yellow': '#f4b400',
  '--my-green': '#0f9d58',
}

const beautyTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--my-pink-light'],
  '--component-text-color': props['--my-black'],

  /* Brand */
  '--brand-primary': props['--my-maroon'],

  /* Default button */
  '--default-button-color': props['--my-maroon'],
  '--default-button-primary-color': props['--my-maroon'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  /* State */
  '--state-info-color': props['--my-pink'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-maroon'],
  '--main-navigation-color--inverted': props['--my-white'],

  /* Focus */
  '--focus-color': props['--my-pink'],
})

export default defineConfig({
  name: 'default',
  title: 'Beauty Hub Studio 💋',
  icon: Logo,
  projectId: 'kyj4zlry',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  theme: beautyTheme,
})
