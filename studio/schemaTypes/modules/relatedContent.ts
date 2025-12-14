import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'relatedContent',
  title: 'Relatert innhold',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Artikler og tutorials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}, {type: 'tutorial'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items',
    },
    prepare({title, itemCount}) {
      const count = itemCount?.length || 0
      return {
        title: title || 'Relatert innhold',
        subtitle: `${count} element${count !== 1 ? 'er' : ''}`,
      }
    },
  },
})

