import {
  BulbOutlineIcon,
  DocumentIcon,
  EyeOpenIcon,
  HomeIcon,
  PackageIcon,
  SparklesIcon,
} from '@sanity/icons'
import {CiCircleMore} from 'react-icons/ci'
import type {StructureResolver} from 'sanity/structure'
import {BaseIcon} from '../components/icons/BaseIcon'
import {LipsIcon} from '../components/icons/LipsIcon'
import {SkincareIcon} from '../components/icons/SkincareIcon'

const contentCategories = [
  {id: 'makeup', title: 'Sminke', icon: SparklesIcon},
  {id: 'skincare', title: 'Hudpleie', icon: SkincareIcon},
  {id: 'other', title: 'Annet', icon: CiCircleMore},
]

const productCategories = [
  {id: 'eyes', title: 'Øyne', icon: EyeOpenIcon},
  {id: 'lips', title: 'Lepper', icon: LipsIcon},
  {id: 'base', title: 'Base', icon: BaseIcon},
  {id: 'skincare', title: 'Hudpleie', icon: SkincareIcon},
  {id: 'other', title: 'Annet', icon: CiCircleMore},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. HOMEPAGE (Singleton)
      S.listItem()
        .id('homePage')
        .title('Hjemmeside')
        .icon(HomeIcon)
        .schemaType('homePage')
        .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),

      S.divider(),

      // 2. ARTICLES with category filter
      S.listItem()
        .id('articles')
        .title('Artikler')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Artikler etter kategori')
            .items([
              // "Alle artikler" at top with same icon
              S.listItem()
                .id('articles-all')
                .title('Alle artikler')
                .icon(DocumentIcon)
                .child(S.documentTypeList('article').title('Alle artikler')),
              S.divider(),
              // Category filters
              ...contentCategories.map((category) =>
                S.listItem()
                  .id(`articles-${category.id}`)
                  .title(category.title)
                  .icon(category.icon)
                  .child(
                    S.documentList()
                      .title(`${category.title} artikler`)
                      .filter('_type == "article" && category == $category')
                      .params({category: category.id}),
                  ),
              ),
            ]),
        ),

      // 3. TUTORIALS with category filter
      S.listItem()
        .id('tutorials')
        .title('Tutorials')
        .icon(BulbOutlineIcon)
        .child(
          S.list()
            .title('Tutorials etter kategori')
            .items([
              // "Alle tutorials" at top with same icon
              S.listItem()
                .id('tutorials-all')
                .title('Alle tutorials')
                .icon(BulbOutlineIcon)
                .child(S.documentTypeList('tutorial').title('Alle tutorials')),
              S.divider(),
              // Category filters
              ...contentCategories.map((category) =>
                S.listItem()
                  .id(`tutorials-${category.id}`)
                  .title(category.title)
                  .icon(category.icon)
                  .child(
                    S.documentList()
                      .title(`${category.title} tutorials`)
                      .filter('_type == "tutorial" && category == $category')
                      .params({category: category.id}),
                  ),
              ),
            ]),
        ),

      S.divider(),

      // 4. PRODUCTS with category filter
      S.listItem()
        .id('products')
        .title('Produkter')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Produkter etter kategori')
            .items([
              // "Alle produkter" at top with same icon
              S.listItem()
                .id('products-all')
                .title('Alle produkter')
                .icon(PackageIcon)
                .child(S.documentTypeList('product').title('Alle produkter')),
              S.divider(),
              // Category filters
              ...productCategories.map((category) =>
                S.listItem()
                  .id(`products-${category.id}`)
                  .title(category.title)
                  .icon(category.icon)
                  .child(
                    S.documentList()
                      .title(`${category.title} - produkter`)
                      .filter('_type == "product" && category == $category')
                      .params({category: category.id}),
                  ),
              ),
            ]),
        ),
    ])
