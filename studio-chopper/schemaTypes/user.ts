import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  type: 'document',
  description: 'User profile',
  fields: [
    defineField({
      name: 'clerkId',
      type: 'string',
      title: 'Clerk ID',
      description: 'The ID of the user from Clerk',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullname',
      type: 'string',
      title: 'Full Name',
      description: 'The full name of the user',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'The email of the user',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'The role of the user',
      options: {
        list: ['customer', 'restaurantOwner', 'admin'],
      },
      initialValue: 'customer',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
      description: 'The phone number of the user',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Address',
      description: 'The address of the user',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      description: 'The date and time the user was created',
    //   validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      description: 'The date and time the user was last updated',
    //   validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
