// lib/queries.ts
export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 20) {
    shop {
      name
    }
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 8) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const NAME_QUERY = `
  query {
    shop {
      name
    }
  }
`;
