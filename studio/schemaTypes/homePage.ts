import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
    }),
    defineField({
      name: 'featuredContent',
      title: 'Fremhevet innhold',
      description: 'Velg artikler og/eller tutorials som skal vises på forsiden',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}, {type: 'tutorial'}]}],
    }),
  ],
})
