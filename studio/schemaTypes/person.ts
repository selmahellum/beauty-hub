import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'profileImage', title: 'Profile Image', type: 'image'}),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
    },
  },
})
