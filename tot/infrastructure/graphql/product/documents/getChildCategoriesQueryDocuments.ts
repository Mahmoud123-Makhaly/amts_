export function getChildCategoriesTreeString(level: number): string {
  return level > 0
    ? `
      childCategories {
        id
        imgSrc
        code
        name
        level
        priority
        outline
        slug
        path
        hasParent
        ${getChildCategoriesTreeString(level - 1)}
      }
    `
    : '';
}
