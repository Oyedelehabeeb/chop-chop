import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'story',
  type: 'document',
  description: 'Story item',
  fields: [
    defineField({
      name: 'media',
      type: 'file',
      title: 'Media',
      description: 'The media of the story',
      options: {
        accept: 'image/*,video/*',
      },
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'The caption of the story',
    }),
    defineField({
      name: 'restaurant',
      type: 'reference',
      to: [{type: 'restaurant'}],
      title: 'Restaurant',
      description: 'The restaurant that the story belongs to',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time the story was created',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
