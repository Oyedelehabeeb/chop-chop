import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'food',
  type: 'document',
  description: 'Food item',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Food name',
      description: 'The name of the food item',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      description: 'The price of the food item',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'The description of the food item',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Food Image',
      description: 'The image of the food item',
      options: {hotspot: true},
    }),
    defineField({
      name: 'restaurant',
      type: 'reference',
      to: [{type: 'restaurant'}],
      title: 'Restaurant',
      description: 'The restaurant that the food item belongs to',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'The category of the food item',
      options: {
        list: ['breakfast', 'lunch', 'dinner', 'dessert', 'drink'],
      },
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time the food item was created',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
