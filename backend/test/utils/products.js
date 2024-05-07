import { faker } from "@faker-js/faker";

export function generateRandomProduct() {
  return {
    product: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
      quantity: faker.commerce.price({ min: 0, max: 200, dec: 0 }),
      state: Math.random() > 0.5 ? 'nuevo' : 'usado',
      isFavorite: false,
      url_image: "https://i.blogs.es/38366d/img_2257/500_333.jpeg",
      id_user: 1,
      id_categories: 1,
      id_brand: 1,
    },
  };
}

export function generateInvalidProduct() {
  const invalidProductName =
    "celular,noteebok,televisor,computador,consola,etcccccc";
  return {
    product: {
      name: invalidProductName,
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
      quantity: faker.commerce.price({ min: 0, max: 200, dec: 0 }),
      state: Math.random() > 0.5 ? 'nuevo' : 'usado',
      isFavorite: false,
      url_image: "https://i.blogs.es/38366d/img_2257/500_333.jpeg",
      id_user: 1,
      id_categories: 1,
      id_brand: 1,
    },
  };
}

