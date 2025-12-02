import type {StructureResolver} from 'sanity/structure'
import {
  HomeIcon,
  DocumentIcon,
  BulbOutlineIcon,
  PackageIcon,
  TagIcon,
  UserIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. HOMEPAGE (Singleton)
      S.listItem().id('homePage').title('Homepage').icon(HomeIcon).schemaType('homePage').child(
        S.editor().id('homePage').schemaType('homePage').documentId('homePage'), // singleton
      ),

      S.divider(),

      // 2. MAIN CONTENT
      S.listItem()
        .id('articles')
        .title('Articles')
        .icon(DocumentIcon)
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),

      S.listItem()
        .id('tutorials')
        .title('Tutorials')
        .icon(BulbOutlineIcon)
        .schemaType('tutorial')
        .child(S.documentTypeList('tutorial').title('Tutorials')),

      S.divider(),

      // 3. REFERENCE DATA
      S.listItem()
        .id('products')
        .title('Products')
        .icon(PackageIcon)
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),

      S.listItem()
        .id('brands')
        .title('Brands')
        .icon(TagIcon)
        .schemaType('brand')
        .child(S.documentTypeList('brand').title('Brands')),

      S.listItem()
        .id('people')
        .title('People')
        .icon(UserIcon)
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
    ])
