import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  type: 'document',
  description: 'Order item',
  fields: [
    defineField({
      name: 'user',
      type: 'reference',
      to: [{type: 'user'}],
      title: 'User',
      description: 'The user that the order belongs to',
    }),
    defineField({
      name: 'restaurant',
      type: 'reference',
      to: [{type: 'restaurant'}],
      title: 'Restaurant',
      description: 'The restaurant that the order belongs to',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'food', type: 'reference', to: [{type: 'food'}]},
            {name: 'quantity', type: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'totalAmount',
      type: 'number',
      title: 'Total Amount',
      description: 'The total amount of the order',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: ['pending', 'confirmed', 'completed', 'cancelled'],
      },
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time the order was created',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      description: 'The date and time the order was last updated',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
