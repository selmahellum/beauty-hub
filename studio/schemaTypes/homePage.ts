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
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
    }),
    defineField({
      name: 'tutorials',
      title: 'Tutorials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tutorial'}]}],
    }),
  ],
})
