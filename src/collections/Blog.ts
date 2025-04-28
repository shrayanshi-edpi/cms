import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subTitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
  //   upload: true,
}
