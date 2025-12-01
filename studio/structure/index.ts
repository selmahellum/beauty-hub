// ./structure/index.ts
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Pages')
    .items([
      S.listItem().id('homePage').schemaType('homePage').title('Home Page').child(
        S.editor().id('homePage').schemaType('homePage').documentId('homePage'), // Singleton ID
      ),
    ])
