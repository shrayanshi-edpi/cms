import { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Everyone can read published blogs
    // create: ({ req }: any) => !!req.user, // Only logged-in users can create
    // update: ({ req }: any) => !!req.user, // Only logged-in users can update
    // delete: ({ req }: any) => !!req.user, // Only logged-in users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'experience',
      type: 'text',
      required: true,
    },
    {
      name: 'jobType',
      type: 'text',
      required: true,
    },
    {
      name: 'compensation',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
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
  ],
  versions: {
    drafts: true,
  },
}
