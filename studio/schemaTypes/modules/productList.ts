import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'productList',
  title: 'Produktliste',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Produkter',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      productCount: 'products',
    },
    prepare({title, productCount}) {
      const count = productCount?.length || 0
      return {
        title: title || 'Produktliste',
        subtitle: `${count} produkt${count !== 1 ? 'er' : ''}`,
      }
    },
  },
})

