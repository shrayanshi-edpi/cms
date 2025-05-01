import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Everyone can read published blogs
    create: ({ req }: any) => !!req.user, // Only logged-in users can create
    update: ({ req }: any) => !!req.user, // Only logged-in users can update
    delete: ({ req }: any) => !!req.user, // Only logged-in users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      label: 'Blog Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The author of this blog.',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'The date this blog was published.',
        condition: (data: any) => data?.status === 'published',
      },
      defaultValue: () => new Date(), //Set current date as default publish date.
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, originalDoc, operation, data }: any) => {
            if (
              operation === 'create' ||
              (operation === 'update' && data?.title !== originalDoc?.title)
            ) {
              if (data?.title) {
                return data.title
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '')
              }
            }
            return value
          },
        ],
      },
    },
    // Add other blog related fields here
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: false,
    },
  ],
  versions: {
    drafts: true,
  },
}
