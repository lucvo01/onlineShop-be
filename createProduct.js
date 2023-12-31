const { faker } = require("@faker-js/faker");
const { parse } = require("dotenv");
const fs = require("fs");

const createProduct = (numberOfProducts) => {
  if (!numberOfProducts) {
    console.log("please input number");
    return;
  }
  numberOfProducts = parseInt(numberOfProducts);
  console.log("Creating Products");

  const categories = ["shoes", "shirt", "pants"];
  let products = [];

  for (let i = 0; i < numberOfProducts; i++) {
     const category = categories[Math.floor(Math.random() * 3)];
    const product = {
      category: category,
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph({ min: 1, max: 3 }),
      price: faker.number.float({ min: 100, max: 200, precision: 0.01 }),
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      gender: faker.person.sex(),
      isDeleted: false
    };
    products.push(product);
  }
  fs.writeFileSync("data.json", JSON.stringify(products));
};

const input = process.argv.slice(2)[0];
createProduct(input);
