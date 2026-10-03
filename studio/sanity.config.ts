import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('comment')
        .title('Comments')
        .child(
          S.list()
            .title('Comments')
            .items([
              S.listItem()
                .title('Pending moderation')
                .id('comments-pending')
                .child(
                  S.documentList()
                    .title('Pending moderation')
                    .filter('_type == "comment" && approved != true')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Approved')
                .id('comments-approved')
                .child(
                  S.documentList()
                    .title('Approved comments')
                    .filter('_type == "comment" && approved == true')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('All comments')
                .id('comments-all')
                .child(
                  S.documentList()
                    .title('All comments')
                    .filter('_type == "comment"')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
    ])

export default defineConfig({
  name: 'default',
  title: 'kolekta',
  projectId: '998ifqep',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
