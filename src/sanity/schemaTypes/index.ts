import { type SchemaTypeDefinition } from 'sanity'
import { Blog } from '../blog'
import { author } from '../author'
import { comments } from '../comments'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Blog, author,comments],
}
