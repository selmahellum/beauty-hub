import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tutorialStep',
  title: 'Step',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
