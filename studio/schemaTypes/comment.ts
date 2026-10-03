import {defineType, defineField} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'email',
      title: 'Email (private, never published)',
      type: 'string',
      validation: (rule) =>
        rule.required().email().warning('Used only for moderation and abuse prevention'),
    }),
    defineField({
      name: 'body',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(2).max(2000),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (rule) => rule.required(),
      options: {disableNew: true},
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Only approved comments are shown publicly on the blog',
      initialValue: false,
    }),
  ],
  initialValue: {
    approved: false,
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      body: 'body',
      approved: 'approved',
      postTitle: 'post.title',
      media: 'post.coverImage',
    },
    prepare: ({name, body, approved, postTitle}) => ({
      title: body ? (body.length > 60 ? `${body.slice(0, 60)}…` : body) : 'No text',
      subtitle: `${name}${postTitle ? ` on “${postTitle}”` : ''} — ${
        approved ? 'approved' : 'pending'
      }`,
      media: undefined,
    }),
  },
})
