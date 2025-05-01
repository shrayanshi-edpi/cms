import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
          ({ value, originalDoc, operation, data }) => {
            if (
              operation === 'create' ||
              (operation === 'update' && data?.name !== originalDoc?.name)
            ) {
              if (data?.name) {
                return data.name
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
  ],
}
