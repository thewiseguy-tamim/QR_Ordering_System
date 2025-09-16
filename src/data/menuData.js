import img1 from '../assets/img1.jpg'; // Appetizers
import img2 from '../assets/img2.jpg'; // Main Course
import img3 from '../assets/img3.jpg'; // Beverages
import img4 from '../assets/img4.jpg'; // Desserts

export const categories = [
  { id: 1, name: 'Appetizers', icon: '🥗', order: 1 },
  { id: 2, name: 'Main Course', icon: '🍽️', order: 2 },
  { id: 3, name: 'Beverages', icon: '🥤', order: 3 },
  { id: 4, name: 'Desserts', icon: '🍰', order: 4 }
];

const categoryImageById = {
  1: img1,
  2: img2,
  3: img3,
  4: img4
};

// Base items without per-item images; we'll apply category images below
const baseMenuItems = [
  // Appetizers (1)
  {
    id: 1,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 350,
    category: 1,
    available: true,
    tags: ['vegetarian', 'popular'],
    prepTime: '10-15 min',
    options: [
      { type: 'size', required: true, choices: [{ name: 'Regular', price: 0 }, { name: 'Large', price: 80 }] },
      { type: 'additions', required: false, choices: [{ name: 'Grilled Chicken', price: 120 }, { name: 'Avocado', price: 70 }] }
    ]
  },
  {
    id: 2,
    name: 'Bruschetta',
    description: 'Toasted baguette with tomatoes, basil, garlic, olive oil',
    price: 280,
    category: 1,
    available: true,
    tags: ['vegetarian'],
    prepTime: '8-12 min',
    options: []
  },
  {
    id: 3,
    name: 'Soup of the Day',
    description: "Ask your server for today's selection",
    price: 220,
    category: 1,
    available: true,
    tags: [],
    prepTime: '5-10 min',
    options: [
      { type: 'size', required: true, choices: [{ name: 'Cup', price: 0 }, { name: 'Bowl', price: 50 }] }
    ]
  },
  {
    id: 4,
    name: 'Garlic Parmesan Wings',
    description: 'Crispy wings tossed in garlic parmesan sauce',
    price: 380,
    category: 1,
    available: true,
    tags: ['popular'],
    prepTime: '15-20 min',
    options: [
      { type: 'size', required: true, choices: [{ name: '6 pcs', price: 0 }, { name: '12 pcs', price: 150 }] }
    ]
  },
  {
    id: 5,
    name: 'Fried Calamari',
    description: 'Lightly breaded calamari with marinara',
    price: 340,
    category: 1,
    available: false,
    tags: [],
    prepTime: '10-15 min',
    options: []
  },
  {
    id: 6,
    name: 'Caprese Skewers',
    description: 'Tomato, mozzarella, basil, balsamic glaze',
    price: 250,
    category: 1,
    available: true,
    tags: ['vegetarian', 'gluten-free'],
    prepTime: '5-8 min',
    options: []
  },
  {
    id: 7,
    name: 'Hummus Plate',
    description: 'Creamy hummus, pita, veggie sticks',
    price: 280,
    category: 1,
    available: true,
    tags: ['vegan'],
    prepTime: '6-10 min',
    options: []
  },

  // Main Course (2)
  {
    id: 8,
    name: 'Margherita Pizza',
    description: 'San Marzano tomatoes, mozzarella, basil',
    price: 420,
    category: 2,
    available: true,
    tags: ['vegetarian', 'popular'],
    prepTime: '15-25 min',
    options: [
      { type: 'size', required: true, choices: [{ name: '12"', price: 0 }, { name: '16"', price: 100 }] },
      { type: 'additions', required: false, choices: [{ name: 'Extra Cheese', price: 50 }, { name: 'Pepperoni', price: 60 }] }
    ]
  },
  {
    id: 9,
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni, mozzarella',
    price: 450,
    category: 2,
    available: true,
    tags: [],
    prepTime: '15-25 min',
    options: [
      { type: 'size', required: true, choices: [{ name: '12"', price: 0 }, { name: '16"', price: 100 }] },
      { type: 'additions', required: false, choices: [{ name: 'Extra Cheese', price: 50 }] }
    ]
  },
  {
    id: 10,
    name: 'Grilled Salmon',
    description: 'Lemon herb butter, seasonal veggies',
    price: 650,
    category: 2,
    available: true,
    tags: ['gluten-free'],
    prepTime: '18-25 min',
    options: []
  },
  {
    id: 11,
    name: 'Ribeye Steak',
    description: '12oz ribeye, garlic mash, seasonal greens',
    price: 850,
    category: 2,
    available: true,
    tags: ['popular'],
    prepTime: '20-30 min',
    options: [
      { type: 'size', required: true, choices: [{ name: '12oz', price: 0 }, { name: '16oz', price: 150 }] },
      { type: 'additions', required: false, choices: [{ name: 'Garlic Butter', price: 40 }, { name: 'Mushrooms', price: 40 }] }
    ]
  },
  {
    id: 12,
    name: 'Chicken Alfredo',
    description: 'Creamy parmesan sauce, fettuccine',
    price: 520,
    category: 2,
    available: true,
    tags: [],
    prepTime: '15-20 min',
    options: []
  },
  {
    id: 13,
    name: 'Veggie Burger',
    description: 'Plant-based patty, lettuce, tomato, vegan aioli',
    price: 390,
    category: 2,
    available: true,
    tags: ['vegan'],
    prepTime: '12-18 min',
    options: [
      { type: 'additions', required: false, choices: [{ name: 'Avocado', price: 50 }, { name: 'Vegan Cheese', price: 40 }] }
    ]
  },
  {
    id: 14,
    name: 'Classic Beef Burger',
    description: 'Cheddar, lettuce, tomato, house sauce',
    price: 410,
    category: 2,
    available: true,
    tags: [],
    prepTime: '12-18 min',
    options: [
      { type: 'additions', required: false, choices: [{ name: 'Bacon', price: 60 }, { name: 'Extra Patty', price: 100 }] }
    ]
  },
  {
    id: 15,
    name: 'Tacos Al Pastor',
    description: 'Marinated pork, pineapple, onion, cilantro',
    price: 380,
    category: 2,
    available: true,
    tags: ['spicy'],
    prepTime: '10-15 min',
    options: [
      { type: 'size', required: true, choices: [{ name: '2 tacos', price: 0 }, { name: '3 tacos', price: 80 }] }
    ]
  },
  {
    id: 16,
    name: 'Pad Thai',
    description: 'Rice noodles, tamarind sauce, peanuts, egg',
    price: 450,
    category: 2,
    available: true,
    tags: ['spicy'],
    prepTime: '12-18 min',
    options: [
      { type: 'additions', required: false, choices: [{ name: 'Chicken', price: 80 }, { name: 'Shrimp', price: 100 }, { name: 'Tofu', price: 50 }] }
    ]
  },
  {
    id: 17,
    name: 'Butter Chicken',
    description: 'Creamy tomato sauce, basmati rice',
    price: 540,
    category: 2,
    available: true,
    tags: ['spicy'],
    prepTime: '15-25 min',
    options: []
  },
  {
    id: 18,
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, roasted veggies, chickpeas, tahini',
    price: 420,
    category: 2,
    available: true,
    tags: ['vegan', 'gluten-free'],
    prepTime: '10-15 min',
    options: []
  },

  // Beverages (3)
  {
    id: 19,
    name: 'Coke',
    description: 'Chilled classic',
    price: 80,
    category: 3,
    available: true,
    tags: [],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '20 oz', price: 25 }] }]
  },
  {
    id: 20,
    name: 'Iced Tea',
    description: 'Fresh brewed',
    price: 90,
    category: 3,
    available: true,
    tags: [],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '20 oz', price: 25 }] }]
  },
  {
    id: 21,
    name: 'Fresh Lemonade',
    description: 'House-made lemonade',
    price: 110,
    category: 3,
    available: true,
    tags: ['popular'],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '20 oz', price: 25 }] }]
  },
  {
    id: 22,
    name: 'Orange Juice',
    description: 'Fresh squeezed',
    price: 125,
    category: 3,
    available: true,
    tags: [],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '20 oz', price: 25 }] }]
  },
  {
    id: 23,
    name: 'Latte',
    description: 'Espresso + milk',
    price: 140,
    category: 3,
    available: true,
    tags: [],
    prepTime: '3-5 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '16 oz', price: 20 }] }]
  },
  {
    id: 24,
    name: 'Cappuccino',
    description: 'Espresso + foam',
    price: 135,
    category: 3,
    available: true,
    tags: [],
    prepTime: '3-5 min',
    options: [{ type: 'size', required: true, choices: [{ name: '12 oz', price: 0 }, { name: '16 oz', price: 20 }] }]
  },
  {
    id: 25,
    name: 'Espresso',
    description: 'Double shot',
    price: 90,
    category: 3,
    available: true,
    tags: [],
    prepTime: '2-3 min',
    options: []
  },
  {
    id: 26,
    name: 'Craft IPA',
    description: 'Local brewery',
    price: 170,
    category: 3,
    available: true,
    tags: ['21+'],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: 'Pint', price: 0 }] }]
  },
  {
    id: 27,
    name: 'House Red Wine',
    description: 'Cabernet Sauvignon',
    price: 220,
    category: 3,
    available: true,
    tags: ['21+'],
    prepTime: '1-2 min',
    options: [{ type: 'size', required: true, choices: [{ name: 'Glass', price: 0 }] }]
  },

  // Desserts (4)
  {
    id: 28,
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake',
    price: 220,
    category: 4,
    available: true,
    tags: ['popular'],
    prepTime: '5-8 min',
    options: []
  },
  {
    id: 29,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 240,
    category: 4,
    available: true,
    tags: [],
    prepTime: '8-10 min',
    options: []
  },
  {
    id: 30,
    name: 'Tiramisu',
    description: 'Espresso-soaked ladyfingers, mascarpone',
    price: 210,
    category: 4,
    available: true,
    tags: [],
    prepTime: '5-8 min',
    options: []
  },
  {
    id: 31,
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream, chocolate sauce, nuts',
    price: 180,
    category: 4,
    available: true,
    tags: [],
    prepTime: '5-8 min',
    options: [
      { type: 'additions', required: false, choices: [{ name: 'Sprinkles', price: 15 }, { name: 'Cherries', price: 15 }] }
    ]
  },
  {
    id: 32,
    name: 'Apple Pie',
    description: 'Flaky crust, cinnamon apples',
    price: 195,
    category: 4,
    available: true,
    tags: [],
    prepTime: '6-10 min',
    options: []
  },
  {
    id: 33,
    name: 'Crème Brûlée',
    description: 'Vanilla custard, caramelized sugar top',
    price: 220,
    category: 4,
    available: true,
    tags: [],
    prepTime: '6-10 min',
    options: []
  }
];

// Apply category image to each item
export const menuItems = baseMenuItems.map(item => ({
  ...item,
  image: categoryImageById[item.category]
}));