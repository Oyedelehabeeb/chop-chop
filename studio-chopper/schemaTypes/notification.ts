import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'notification',
  type: 'document',
  description: 'Notification item',
  fields: [
    defineField({
      name: 'user',
      type: 'reference',
      to: [{type: 'user'}],
      title: 'User',
      description: 'The user that the notification belongs to',
    }),
    defineField({
      name: 'message',
      type: 'string',
      title: 'Message',
      description: 'The message of the notification',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'The type of the notification',
      options: {
        list: ['order', 'message', 'promotion', 'other'],
      },
    }),
    defineField({
      name: 'read',
      type: 'boolean',
      title: 'Read',
      description: 'The read status of the notification',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time the notification was created',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
