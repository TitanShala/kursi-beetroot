var products = [
  {
    product: "Xhinse Skinny Fit",
    price: "72.00 €",
    sizes: ["27", "28", "29", "30"],
    gender: "Female",
  },
  {
    product: "Këmishë me mëngë të gjata",
    price: "40.00 €",
    sizes: ["S", "M", "L"],
    gender: "Female",
  },
  {
    product: "Xhaketë poliesteri",
    price: "200.00 €",
    sizes: ["L", "XL", "XXL"],
    gender: "Male",
  },
  {
    product: "T bluzë me logo Timberland",
    price: "20.00 €",
    sizes: ["S", "M", "L", "XXL"],
    gender: "Female",
  },
  {
    product: "T Bluzë me jakë polo",
    price: "20.00 €",
    sizes: ["S", "M", "L", "XL", "XXL"],
    gender: "Male",
  },
  {
    product: "T bluzë me logo Guess",
    price: "70.00 €",
    sizes: ["S", "M", "L"],
    gender: "Female",
  },
  {
    product: "Xhaketë Bomber",
    price: "120.00 €",
    sizes: ["M", "L", "XL", "XXL"],
    gender: "Male",
  },
  {
    product: "Streçe pambuku",
    price: "50.00 €",
    sizes: ["S", "M"],
    gender: "Female",
  },
  {
    product: "Xhaketë Jahrrod",
    price: "100.00 €",
    sizes: ["S", "M", "L", "XL"],
    gender: "Male",
  },
  {
    product: "Xhinse Slim Fit",
    price: "60.00 €",
    sizes: ["S", "M", "L"],
    gender: "Female",
  },

  {
    product: "Xhaketë rezistente ndaj ujit",
    price: "40.00 €",
    sizes: ["S", "L", "XXL"],
    gender: "Female",
  },
];

function filterProducts(products) {
  var maleProducts = [];
  var femaleProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].gender === "Male") {
      maleProducts.push(products[i]);
    } else {
      femaleProducts.push(products[i]);
    }
  }
  var filteredProducts = { maleProducts, femaleProducts };
  return filteredProducts;
}

var filteredProducts = filterProducts(products);
console.log("Produktet per femra: ", filteredProducts.femaleProducts);
console.log("Produktet per meshkuj: ", filteredProducts.maleProducts);
