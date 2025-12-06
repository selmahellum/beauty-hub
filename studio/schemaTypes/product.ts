import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Makeup', 'Skincare', 'Haircare', 'Tools', 'Other'],
      },
    }),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'brand', title: 'Brand', type: 'reference', to: [{type: 'brand'}]}),
    defineField({name: 'price', title: 'Price (NOK)', type: 'number'}),
    defineField({name: 'image', title: 'Product Image', type: 'image'}),
    defineField({name: 'ingredients', title: 'Ingredients', type: 'text'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'link', title: 'Link', type: 'url'}),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled product',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
