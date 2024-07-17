const FoodItems = [
  {
    id: 716,
    foodName: "Chicken Biriyani",
    category: "Biriyani",
    type: "Non-Veg",
    ingredients: ["Chicken", "Rice", "Veggies"],
    preparingSteps: "Marinate chicken, cook rice, layer and cook together.",
    CookingTime: "2.5hr",
    foodImage: "https://t3.ftcdn.net/jpg/01/14/51/60/360_F_114516029_Z2B6FO30AB6ZR3v9WHXjpXmJScaiLtzk.jpg"
  },
  {
    id: 243,
    foodName: "Paneer Butter Masala",
    category: "Curry",
    type: "Veg",
    ingredients: ["Paneer", "Tomato", "Cream", "Spices"],
    preparingSteps: "Cook tomatoes, blend, add paneer and spices.",
    CookingTime: "45min",
    foodImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Rrc5qvf3k5VBWEE-0ztGpTnpNf0ztMJ5DA&s"
  },
  {
    id: 917,
    foodName: "Fish Curry",
    category: "SeaFood",
    type: "Non-Veg",
    ingredients: ["Fish", "Coconut milk", "Spices"],
    preparingSteps: "Cook fish in spiced coconut milk.",
    CookingTime: "1hr",
    foodImage: "https://media.istockphoto.com/id/1295772368/photo/macher-jhol-in-black-bowl-on-dark-slate-table-top-indian-cuisine-bengali-fish-curry-asian.jpg?s=612x612&w=0&k=20&c=3asIIURIgisLwXAijZnmNY3p2EWEZEHzByjk7ke9xZk="
  },
  {
    id: 839,
    foodName: "Vegetable Pulao",
    category: "Appetizer",
    type: "Veg",
    ingredients: ["Rice", "Mixed Vegetables", "Spices"],
    preparingSteps: "Cook rice with vegetables and spices.",
    CookingTime: "30min",
    foodImage: "https://media.istockphoto.com/id/495184588/photo/indian-pulav-vegetable-rice-veg-biryani-basmati-rice.jpg?s=612x612&w=0&k=20&c=Qi-kkcqbihaWGdgKQGX184CxI_oeXlNvz8HIAmLFIVs="
  },
  {
    id: 253,
    foodName: "Cheese Pizza",
    category: "Pizza",
    type: "Non-Veg",
    ingredients: ["Mutton", "Yogurt", "Spices"],
    preparingSteps: "Cook mutton with yogurt and spices.",
    CookingTime: "2hr",
    foodImage: "https://images7.alphacoders.com/596/thumb-1920-596343.jpg"
  },
  {
    id: 315,
    foodName: "Chicken Shawarma",
    category: "Shawarma",
    type: "Veg",
    ingredients: ["Potatoes", "Cauliflower", "Spices"],
    preparingSteps: "Cook potatoes and cauliflower with spices.",
    CookingTime: "40min",
    foodImage: "https://t3.ftcdn.net/jpg/02/55/42/50/360_F_255425068_CyDrGsVcu1Bl2SdJ2yXx35Rlp8jyNCCQ.jpg"
  },
  {
    id: 417,
    foodName: "Vegitable Rice",
    category: "Rice",
    type: "Non-Veg",
    ingredients: ["Prawns", "Tomato", "Onion", "Spices"],
    preparingSteps: "Cook prawns with tomato, onion, and spices.",
    CookingTime: "35min",
    foodImage: "https://img.freepik.com/free-photo/appetizing-healthy-rice-with-vegetables-white-plate-wooden-table_2829-19773.jpg"
  },
  {
    id: 614,
    foodName: "Palak Paneer",
    category: "Appetizer",
    type: "Veg",
    ingredients: ["Spinach", "Paneer", "Spices"],
    preparingSteps: "Cook spinach, blend, add paneer and spices.",
    CookingTime: "1.5hr",
    foodImage: "palak_paneer.jpg"
  },
  {
    id: 135,
    foodName: "Egg Curry",
    category: "Biriyani",
    type: "Non-Veg",
    ingredients: ["Eggs", "Tomato", "Onion", "Spices"],
    preparingSteps: "Boil eggs, cook with tomato, onion, and spices.",
    CookingTime: "2.5hr",
    foodImage: "egg_curry.jpg"
  },
  {
    id: 871,
    foodName: "Chole",
    category: "Curry",
    type: "Veg",
    ingredients: ["Chickpeas", "Tomato", "Onion", "Spices"],
    preparingSteps: "Cook chickpeas with tomato, onion, and spices.",
    CookingTime: "45min",
    foodImage: "chole.jpg"
  },
  {
    id: 733,
    foodName: "Butter Chicken",
    category: "Rice",
    type: "Non-Veg",
    ingredients: ["Chicken", "Tomato", "Butter", "Cream", "Spices"],
    preparingSteps: "Cook chicken with tomato, butter, cream, and spices.",
    CookingTime: "1hr",
    foodImage: "butter_chicken.jpg"
  },
  {
    id: 531,
    foodName: "Veg Biryani",
    category: "Appetizer",
    type: "Veg",
    ingredients: ["Rice", "Mixed Vegetables", "Spices"],
    preparingSteps: "Cook rice with vegetables and spices.",
    CookingTime: "30min",
    foodImage: "veg_biryani.jpg"
  },
  {
    id: 550,
    foodName: "Chicken Kebab",
    category: "Biriyani",
    type: "Non-Veg",
    ingredients: ["Chicken", "Yogurt", "Spices"],
    preparingSteps: "Marinate chicken, skewer, and grill.",
    CookingTime: "2hr",
    foodImage: "chicken_kebab.jpg"
  },
  {
    id: 816,
    foodName: "Dal Tadka",
    category: "Curry",
    type: "Veg",
    ingredients: ["Lentils", "Tomato", "Onion", "Spices"],
    preparingSteps: "Cook lentils with tomato, onion, and spices.",
    CookingTime: "40min",
    foodImage: "dal_tadka.jpg"
  },
  {
    id: 823,
    foodName: "Lamb Vindaloo",
    category: "Rice",
    type: "Non-Veg",
    ingredients: ["Lamb", "Vinegar", "Spices"],
    preparingSteps: "Cook lamb with vinegar and spices.",
    CookingTime: "35min",
    foodImage: "lamb_vindaloo.jpg"
  }
];

export default FoodItems
