import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textModule',
  title: 'Brødtekst',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      const firstBlock = content?.[0]
      const text = firstBlock?.children?.[0]?.text || 'Ingen tekst'
      return {
        title: 'Brødtekst',
        subtitle: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      }
    },
  },
})

