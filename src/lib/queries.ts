// lib/queries.ts
export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 20) {
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

export const prodHandlesQuery = /* GraphQL */ `
  query getAllProductHandles {
    products(first: 250) {
      nodes {
        handle
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      productType
      description
      descriptionHtml
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
      # Required by hydrogen-react ProductProvider/useProductOptions
      options(first: 50) {
        id
        name
        values
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
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            # Required for getOptions / useProductOptions
            selectedOptions {
              name
              value
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
