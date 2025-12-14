import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author',
      title: 'Forfatter',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'modules',
      title: 'Moduler',
      type: 'array',
      of: [
        defineArrayMember({type: 'textModule'}),
        defineArrayMember({type: 'tipBox'}),
        defineArrayMember({type: 'productList'}),
        defineArrayMember({type: 'relatedContent'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})
