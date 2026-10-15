'use client';

import { useState, useRef, memo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Scene, { type CategoryKey } from '@/components/Scene';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Deals', href: '#deals' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const categories: {
  key: CategoryKey;
  title: string;
  subtitle: string;
  items: { name: string; price: string; desc: string; group?: string }[];
}[] = [
  {
    key: 'fastfood',
    title: 'Fast Food',
    subtitle: 'Burgers, wraps, rolls and more',
    items: [
      { name: 'Double Maza Burger', price: 'Single Rs 499 · Deal Rs 699', desc: 'Beef burger with black pepper sauce.', group: 'Burgers' },
      { name: 'Mighty Zinger', price: 'Single Rs 649 · Deal Rs 799', desc: 'Crispy chicken zinger burger.', group: 'Burgers' },
      { name: 'Zinger Burger', price: 'Single Rs 399 · Deal Rs 599', desc: 'Classic crispy chicken burger.', group: 'Burgers' },
      { name: 'Chapli Burger', price: 'Single Rs 299 · Deal Rs 499', desc: 'Chapli-style burger with a spicy desi flavour.', group: 'Burgers' },
      { name: 'FC Special Burger', price: 'Single Rs 599 · Deal Rs 799', desc: 'The house special burger.', group: 'Burgers' },
      { name: 'Dragon Burger', price: 'Single Rs 499 · Deal Rs 699', desc: 'A spicy burger with the restaurant’s signature sauce.', group: 'Burgers' },
      { name: 'Cheese Blast Burger', price: 'Single Rs 599 · Deal Rs 799', desc: 'Burger with melted cheese.', group: 'Burgers' },
      { name: 'Fish Burger', price: 'Single Rs 499 · Deal Rs 699', desc: 'Crispy fish burger.', group: 'Burgers' },
      { name: 'Pizza Burger', price: 'Rs 599 · Deal Rs 699', desc: 'A pizza-inspired burger.', group: 'Burgers' },
      { name: 'Karzima Burger', price: 'Rs 479 · Deal Rs 699', desc: 'House-style burger with black pepper sauce.', group: 'Burgers' },
      { name: 'Reggy Burger', price: 'Rs 299 · Deal Rs 499', desc: 'Classic value burger.', group: 'Burgers' },
      { name: 'Jalapino Burger', price: 'Rs 499 · Deal Rs 699', desc: 'Burger with a jalapeño kick.', group: 'Burgers' },
      { name: 'Beef Grill Burger', price: 'Rs 699 · Deal Rs 899', desc: 'Grilled beef burger with BBQ sauce.', group: 'Burgers' },
      { name: 'Chicken Grill Burger', price: 'Rs 499 · Deal Rs 699', desc: 'Grilled chicken burger.', group: 'Burgers' },
      { name: 'Jalapeno Fries', price: 'Rs 599', desc: 'Fries topped with jalapeño flavour.', group: 'Loaded Fries' },
      { name: 'Pizza Fries', price: 'Rs 699', desc: 'Loaded fries with pizza-style toppings.', group: 'Loaded Fries' },
      { name: 'BBQ Fries', price: 'Rs 599', desc: 'Fries with BBQ flavour.', group: 'Loaded Fries' },
      { name: 'Matka Fries', price: 'Ask in store', desc: 'Fries served matka-style.', group: 'Loaded Fries' },
      { name: 'Loaded Fries', price: 'Rs 799', desc: 'A fully loaded serving of fries.', group: 'Loaded Fries' },
      { name: 'Chicken Shawarma', price: 'Rs 199', desc: 'Chicken shawarma wrap.', group: 'Shawarma' },
      { name: 'Kabab Shawarma', price: 'Rs 220', desc: 'Kabab shawarma wrap.', group: 'Shawarma' },
      { name: 'Achari Shawarma', price: 'Rs 180', desc: 'Shawarma with tangy achari flavour.', group: 'Shawarma' },
      { name: 'Zinger Shawarma', price: 'Rs 249', desc: 'Crispy zinger-style shawarma.', group: 'Shawarma' },
      { name: 'Chic-Cheese Shawarma', price: 'Rs 249', desc: 'Chicken and cheese shawarma.', group: 'Shawarma' },
      { name: 'FC Special Shawarma', price: 'Rs 299', desc: 'House special shawarma.', group: 'Shawarma' },
      { name: 'Malai Shawarma', price: 'Rs 299', desc: 'Creamy malai chicken shawarma.', group: 'Shawarma' },
      { name: 'Platter Shawarma', price: 'Rs 500', desc: 'Shawarma served as a platter.', group: 'Shawarma' },
      { name: 'Chicken P-Roll', price: 'Rs 249', desc: 'Chicken paratha roll.', group: 'Paratha Rolls' },
      { name: 'Achari P-Roll', price: 'Rs 249', desc: 'Tangy achari paratha roll.', group: 'Paratha Rolls' },
      { name: 'Kabab P-Roll', price: 'Rs 250', desc: 'Kabab paratha roll.', group: 'Paratha Rolls' },
      { name: 'FC Special P-Roll', price: 'Rs 299', desc: 'House special paratha roll.', group: 'Paratha Rolls' },
      { name: 'Malai P-Roll', price: 'Rs 299', desc: 'Creamy malai paratha roll.', group: 'Paratha Rolls' },
      { name: 'Arabic P-Roll', price: 'Rs 299', desc: 'Arabic-style paratha roll.', group: 'Paratha Rolls' },
      { name: 'Zinger P-Roll', price: 'Rs 299', desc: 'Crispy zinger paratha roll.', group: 'Paratha Rolls' },
      { name: 'Chic Cheese P-Roll', price: 'Rs 299', desc: 'Chicken and cheese paratha roll.', group: 'Paratha Rolls' },
      { name: 'Pizza Paratha', price: 'Rs 499', desc: 'Paratha with pizza-style toppings.', group: 'Paratha Rolls' },
      { name: 'Twister Wrap', price: 'Rs 499', desc: 'Chicken twister wrap.', group: 'Wraps' },
      { name: 'Malai Wrap', price: 'Rs 450', desc: 'Creamy malai chicken wrap.', group: 'Wraps' },
      { name: 'Mexican Wrap', price: 'Rs 499', desc: 'Wrap with Mexican-style seasoning.', group: 'Wraps' },
      { name: 'FC Special Wrap', price: 'Rs 499', desc: 'House special wrap.', group: 'Wraps' },
      { name: 'Chicken Grill Wrap', price: 'Rs 499', desc: 'Grilled chicken wrap.', group: 'Wraps' },
      { name: 'Quarter Broast', price: 'Rs 699', desc: '1 leg, 1 thigh, fries, garlic sauce and dinner roll.', group: 'Broast' },
      { name: 'Half Broast', price: 'Rs 1,199', desc: '2 legs, 2 thighs, fries, garlic sauce and 2 dinner rolls.', group: 'Broast' },
      { name: 'Full Broast', price: 'Rs 2,499', desc: '4 legs, 4 thighs, fries, garlic sauce and 4 dinner rolls.', group: 'Broast' },
      { name: 'Family Broast', price: 'Rs 4,500', desc: '8 legs, 8 thighs, fries, garlic sauce and 8 dinner rolls.', group: 'Broast' },
      { name: 'Hot Wings · 5 pcs', price: 'Rs 399', desc: 'Crispy hot wings.', group: 'Sides & Drinks' },
      { name: 'Hot Wings · 10 pcs', price: 'Rs 699', desc: 'Crispy hot wings.', group: 'Sides & Drinks' },
      { name: 'Oven Baked Wings · 10 pcs', price: 'Rs 749', desc: 'Oven-baked chicken wings.', group: 'Sides & Drinks' },
      { name: 'Honey Wings · 10 pcs', price: 'Rs 749', desc: 'Wings coated with honey flavour.', group: 'Sides & Drinks' },
      { name: 'Nuggets · 5 pcs', price: 'Rs 349', desc: 'Crispy chicken nuggets.', group: 'Sides & Drinks' },
      { name: 'Nuggets · 10 pcs', price: 'Rs 549', desc: 'Crispy chicken nuggets.', group: 'Sides & Drinks' },
      { name: 'Fries · Small', price: 'Rs 249', desc: 'A small serving of fries.', group: 'Sides & Drinks' },
      { name: 'Fries · Family', price: 'Rs 449', desc: 'A family serving of fries.', group: 'Sides & Drinks' },
      { name: 'Chicken Strips · 10 pcs', price: 'Rs 499', desc: 'Crispy chicken strips.', group: 'Sides & Drinks' },
      { name: 'Cheese Slice', price: 'Rs 90', desc: 'Add a cheese slice to your meal.', group: 'Sides & Drinks' },
      { name: 'Dinner Roll', price: 'Rs 90', desc: 'Fresh dinner roll.', group: 'Sides & Drinks' },
      { name: 'Chicken Piece · Leg', price: 'Rs 220', desc: 'Single chicken leg piece.', group: 'Sides & Drinks' },
      { name: 'Chicken Pieces · 3-piece mix', price: 'Rs 630', desc: 'Three mixed chicken pieces.', group: 'Sides & Drinks' },
      { name: 'Chicken Pieces · On demand', price: 'Ask in store', desc: 'Chicken pieces available on demand.', group: 'Sides & Drinks' },
      { name: 'Water · Small', price: 'Rs 70', desc: 'Bottled water.', group: 'Sides & Drinks' },
      { name: 'Water · Large', price: 'Rs 120', desc: 'Bottled water.', group: 'Sides & Drinks' },
      { name: 'Drink · 250 ml', price: 'Rs 100', desc: 'Cold drink.', group: 'Sides & Drinks' },
      { name: 'Drink · 350 ml', price: 'Rs 140', desc: 'Cold drink.', group: 'Sides & Drinks' },
      { name: 'Drink · 1 litre', price: 'Rs 200', desc: 'Cold drink.', group: 'Sides & Drinks' },
      { name: 'Drink · 1.5 litre', price: 'Rs 250', desc: 'Cold drink.', group: 'Sides & Drinks' },
      { name: 'Kulfa Shake', price: 'Rs 499', desc: 'Kulfa ice cream shake.', group: 'Shakes & Beverages' },
      { name: 'Mango Shake', price: 'Rs 499', desc: 'Mango shake.', group: 'Shakes & Beverages' },
      { name: 'Vanilla Shake', price: 'Rs 499', desc: 'Vanilla ice cream shake.', group: 'Shakes & Beverages' },
      { name: 'Strawberry Shake', price: 'Rs 499', desc: 'Strawberry ice cream shake.', group: 'Shakes & Beverages' },
      { name: 'Chocolate Shake', price: 'Rs 499', desc: 'Chocolate ice cream shake.', group: 'Shakes & Beverages' },
      { name: 'Oreo Shake', price: 'Rs 499', desc: 'Oreo cookie shake.', group: 'Shakes & Beverages' },
      { name: 'Mint Margarita', price: 'Rs 249', desc: 'Refreshing mint margarita.', group: 'Shakes & Beverages' },
      { name: 'Fresh Lime', price: 'Rs 150', desc: 'Fresh lime drink.', group: 'Shakes & Beverages' },
      { name: 'Ice Cream · Single scoop', price: 'Rs 150', desc: 'Single scoop of ice cream.', group: 'Shakes & Beverages' },
      { name: 'Ice Cream · Double scoop', price: 'Rs 300', desc: 'Double scoop of ice cream.', group: 'Shakes & Beverages' },
    ],
  },
  {
    key: 'pizza',
    title: 'Pizza & Pasta',
    subtitle: 'Pizzas, pasta and Italian favourites',
    items: [
      { name: 'Chicken Tikka Pizza', price: 'Small Rs 589 · Medium Rs 1,099 · Large Rs 1,449 · XL Rs 1,999', desc: 'Chicken tikka pizza.', group: 'Pizza' },
      { name: 'Chicken Fajita Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Chicken fajita pizza.', group: 'Pizza' },
      { name: 'Pickle Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Pickle-style pizza.', group: 'Pizza' },
      { name: 'Veggie Lover Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Vegetable-topped pizza.', group: 'Pizza' },
      { name: 'Jalapeno Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Pizza with jalapeños.', group: 'Pizza' },
      { name: 'Chicken Chapli Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Chicken chapli-style pizza.', group: 'Pizza' },
      { name: 'Supreme Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Supreme-style pizza.', group: 'Pizza' },
      { name: 'BBQ Pizza', price: 'Multiple sizes · from Rs 589', desc: 'BBQ chicken pizza.', group: 'Pizza' },
      { name: 'Crown Crust', price: 'Medium Rs 1,099 · Large Rs 1,449 · XL Rs 1,999', desc: 'Stuffed crown crust pizza.', group: 'Pizza' },
      { name: 'Kabab Crust', price: 'Multiple sizes · from Rs 649', desc: 'Kabab crust pizza.', group: 'Pizza' },
      { name: 'Cheese Stuff Pizza', price: 'Multiple sizes · from Rs 589', desc: 'Pizza with a cheese-stuffed crust.', group: 'Pizza' },
      { name: 'FC Calzone', price: 'Rs 499', desc: 'Folded, stuffed pizza.', group: 'Pizza' },
      { name: 'Lasagna Pizza · Large', price: 'Ask in store', desc: 'Lasagna-style pizza.', group: 'Pizza' },
      { name: 'FC Creamy Pasta', price: 'Rs 799', desc: 'House special creamy pasta.', group: 'Pasta' },
      { name: 'Chicken Pasta', price: 'Rs 599', desc: 'Chicken pasta.', group: 'Pasta' },
      { name: 'Macaroni Pasta', price: 'Rs 499', desc: 'Macaroni pasta.', group: 'Pasta' },
    ],
  },
  {
    key: 'bbq',
    title: 'BBQ & Grill',
    subtitle: 'Fresh from the grill',
    items: [
      { name: 'Chicken Malai Boti', price: 'Half Rs 899 · Full Rs 1,799', desc: 'Creamy grilled chicken malai boti.', group: 'BBQ' },
      { name: 'Chicken Tikka Boti', price: 'Half Rs 799 · Full Rs 1,599', desc: 'Chicken tikka boti from the grill.', group: 'BBQ' },
      { name: 'Beef Kabab', price: 'Half Rs 899 · Full Rs 1,799', desc: 'Grilled beef kabab.', group: 'BBQ' },
      { name: 'Reshmi Kabab', price: 'Half Rs 999 · Full Rs 1,999', desc: 'Tender reshmi kabab.', group: 'BBQ' },
      { name: 'Chicken Kabab', price: 'Half Rs 799 · Full Rs 1,599', desc: 'Grilled chicken kabab.', group: 'BBQ' },
      { name: 'Chicken Achari Tikka', price: 'Half Rs 999 · Full Rs 1,999', desc: 'Chicken tikka with achari spices.', group: 'BBQ' },
      { name: 'Chicken Cheese Kastori', price: 'Half Rs 999 · Full Rs 1,999', desc: 'Chicken cheese kastori from the grill.', group: 'BBQ' },
      { name: 'Chicken Seekh Kabab', price: 'Rs 180 per seekh', desc: 'Grilled chicken seekh kabab.', group: 'BBQ' },
      { name: 'Chicken Seekh Tikka', price: 'Rs 180 per seekh', desc: 'Grilled chicken tikka seekh.', group: 'BBQ' },
      { name: 'Beef Seekh Kabab', price: 'Rs 199 per seekh', desc: 'Grilled beef seekh kabab.', group: 'BBQ' },
      { name: 'Chicken Leg Malai', price: 'Rs 549', desc: 'Malai-marinated chicken leg.', group: 'BBQ' },
      { name: 'Chicken Chest Malai', price: 'Rs 549', desc: 'Malai-marinated chicken breast.', group: 'BBQ' },
      { name: 'Chicken Chest Tikka', price: 'Rs 449', desc: 'Chicken breast tikka.', group: 'BBQ' },
      { name: 'Chicken Leg Tikka', price: 'Rs 399', desc: 'Chicken leg tikka.', group: 'BBQ' },
      { name: 'Mixed BBQ', price: 'Half Rs 1,699 · Full Rs 3,299', desc: 'Mixed grill with beef kabab, chicken kabab, malai boti, tikka and chicken pieces.', group: 'BBQ Platters' },
      { name: 'BBQ Sera', price: 'Half Rs 1,399 · Full Rs 2,699', desc: 'Mixed BBQ platter with beef kabab, chicken kabab, tikka and chicken pieces.', group: 'BBQ Platters' },
      { name: 'Behari Kabab', price: 'Medium Rs 1,299 · Large Rs 1,799 · XL Rs 2,199', desc: 'Behari-style grilled kabab.', group: 'BBQ Platters' },
      { name: 'Malai Boti', price: 'Multiple sizes · from Rs 649', desc: 'Creamy, tender grilled chicken boti.', group: 'BBQ Platters' },
    ],
  },
  {
    key: 'desi',
    title: 'Desi & Rice',
    subtitle: 'Karahi, handi, biryani and more',
    items: [
      { name: 'FC Special Chicken Karahi', price: 'Half Rs 1,199 · Full Rs 2,199', desc: 'House special chicken karahi.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Karahi', price: 'Half Rs 999 · Full Rs 1,799', desc: 'Traditional chicken karahi.', group: 'Chicken Karahi & Handi' },
      { name: 'Achari Chicken Karahi', price: 'Half Rs 1,199 · Full Rs 2,199', desc: 'Chicken karahi with achari spices.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Shinwari Karahi', price: 'Half Rs 1,199 · Full Rs 2,199', desc: 'Shinwari-style chicken karahi.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Sulemani Karahi', price: 'Half Rs 1,149 · Full Rs 2,099', desc: 'Sulemani-style chicken karahi.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken White Karahi', price: 'Half Rs 1,199 · Full Rs 2,199', desc: 'Creamy white chicken karahi.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Madras Handi', price: 'Rs 1,449', desc: 'Chicken handi with Madras spices.', group: 'Chicken Karahi & Handi' },
      { name: 'FC Special Chicken Handi', price: 'Half Rs 1,299 · Full Rs 2,399', desc: 'House special chicken handi.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Achari Handi', price: 'Half Rs 1,249 · Full Rs 2,299', desc: 'Chicken handi with achari spices.', group: 'Chicken Karahi & Handi' },
      { name: 'Chicken Boneless Handi', price: 'Half Rs 1,199 · Full Rs 2,199', desc: 'Boneless chicken handi.', group: 'Chicken Karahi & Handi' },
      { name: 'Mutton Shinwari Karahi', price: 'Half Rs 2,149 · Full Rs 3,999', desc: 'Mutton Shinwari karahi.', group: 'Mutton & Beef' },
      { name: 'Mutton White Karahi', price: 'Half Rs 2,099 · Full Rs 4,199', desc: 'Creamy mutton white karahi.', group: 'Mutton & Beef' },
      { name: 'Mutton Achari Karahi', price: 'Half Rs 2,149 · Full Rs 3,999', desc: 'Mutton karahi with achari spices.', group: 'Mutton & Beef' },
      { name: 'Mutton Sulemani Karahi', price: 'Half Rs 2,099 · Full Rs 3,999', desc: 'Mutton Sulemani karahi.', group: 'Mutton & Beef' },
      { name: 'FC Special Mutton Karahi', price: 'Half Rs 2,199 · Full Rs 4,199', desc: 'House special mutton karahi.', group: 'Mutton & Beef' },
      { name: 'Beef Sulemani Karahi', price: 'Half Rs 1,499 · Full Rs 2,699', desc: 'Beef Sulemani karahi.', group: 'Mutton & Beef' },
      { name: 'Beef Zaitooni Karahi', price: 'Half Rs 1,599 · Full Rs 2,699', desc: 'Beef karahi with zaitooni flavour.', group: 'Mutton & Beef' },
      { name: 'Beef Boneless Karahi', price: 'Half Rs 1,499 · Full Rs 2,799', desc: 'Boneless beef karahi.', group: 'Mutton & Beef' },
      { name: 'FC Special Beef White Karahi', price: 'Half Rs 1,699 · Full Rs 2,999', desc: 'House special boneless beef white karahi.', group: 'Mutton & Beef' },
      { name: 'Chicken Biryani', price: 'Rs 300', desc: 'Chicken biryani.', group: 'Rice & Biryani' },
      { name: 'Beef Pulao', price: 'Rs 700', desc: 'Beef pulao.', group: 'Rice & Biryani' },
      { name: 'Chicken Pulao', price: 'Rs 500', desc: 'Chicken pulao.', group: 'Rice & Biryani' },
      { name: 'Mutton Pulao', price: 'Rs 1,000', desc: 'Mutton pulao.', group: 'Rice & Biryani' },
      { name: 'Beef Afghani Pulao', price: 'Rs 1,099', desc: 'Beef Afghani pulao.', group: 'Rice & Biryani' },
      { name: 'Mutton Afghani Pulao', price: 'Rs 1,499', desc: 'Mutton Afghani pulao.', group: 'Rice & Biryani' },
      { name: 'Mutton Matka Biryani', price: 'Rs 1,000', desc: 'Mutton matka biryani.', group: 'Rice & Biryani' },
      { name: 'Beef Matka Biryani', price: 'Rs 700', desc: 'Beef matka biryani.', group: 'Rice & Biryani' },
      { name: 'Chicken Matka Biryani', price: 'Rs 600', desc: 'Chicken matka biryani.', group: 'Rice & Biryani' },
      { name: 'Plain Matka Biryani', price: 'Rs 180', desc: 'Plain matka biryani.', group: 'Rice & Biryani' },
      { name: 'Zarda', price: 'Rs 300', desc: 'Sweet zarda rice.', group: 'Rice & Biryani' },
      { name: 'Shahi Daal', price: 'Rs 550', desc: 'House-style shahi daal.', group: 'Sides & Extras' },
      { name: 'Daal Mash', price: 'Rs 350', desc: 'Daal mash.', group: 'Sides & Extras' },
      { name: 'Roti', price: 'Rs 15', desc: 'Fresh roti.', group: 'Sides & Extras' },
      { name: 'Khamiri Roti', price: 'Rs 30', desc: 'Khamiri roti.', group: 'Sides & Extras' },
      { name: 'Roghni Naan', price: 'Rs 60', desc: 'Roghni naan.', group: 'Sides & Extras' },
      { name: 'Fresh Salad', price: 'Rs 120', desc: 'Freshly prepared salad.', group: 'Sides & Extras' },
    ],
  },
  {
    key: 'dessert',
    title: 'Desserts & More',
    subtitle: 'Desserts, soups, Chinese and tea',
    items: [
      { name: 'Gajar Halwa', price: 'Rs 999 per kg', desc: 'Traditional carrot halwa.', group: 'Desserts' },
      { name: 'FC Special Shahi Halwa', price: 'Rs 1,599 per kg', desc: 'House special shahi halwa.', group: 'Desserts' },
      { name: 'Egg Halwa', price: 'Rs 1,399 per kg', desc: 'Traditional egg halwa.', group: 'Desserts' },
      { name: 'FC Special Kheer', price: 'Rs 1,499', desc: 'House special kheer.', group: 'Desserts' },
      { name: 'Fruit Trifle', price: 'Rs 999', desc: 'Fruit trifle.', group: 'Desserts' },
      { name: 'Hot & Sour Chicken Soup', price: 'Rs 999', desc: 'Chicken hot and sour soup.', group: 'Soups & Salads' },
      { name: 'FC Special Soup', price: 'Rs 1,299', desc: 'House special soup.', group: 'Soups & Salads' },
      { name: 'Chicken Corn Soup', price: 'Rs 999', desc: 'Chicken corn soup.', group: 'Soups & Salads' },
      { name: 'Chicken Thai Soup', price: 'Rs 799', desc: 'Chicken Thai soup.', group: 'Soups & Salads' },
      { name: 'FC Special Russian Salad', price: 'Rs 1,200', desc: 'House special Russian salad.', group: 'Soups & Salads' },
      { name: 'Russian Salad', price: 'Rs 600–1,000', desc: 'Russian salad; price varies by serving.', group: 'Soups & Salads' },
      { name: 'Kachumar Salad', price: 'Rs 199', desc: 'Fresh kachumar salad.', group: 'Soups & Salads' },
      { name: 'Chicken Fried Rice', price: 'Rs 600', desc: 'Chicken fried rice.', group: 'Chinese' },
      { name: 'Egg Fried Rice', price: 'Rs 550', desc: 'Egg fried rice.', group: 'Chinese' },
      { name: 'Chicken Masala Rice', price: 'Rs 650', desc: 'Chicken masala rice.', group: 'Chinese' },
      { name: 'Vegetable Rice', price: 'Rs 450', desc: 'Vegetable fried rice.', group: 'Chinese' },
      { name: 'FC Special Rice', price: 'Rs 700', desc: 'House special rice.', group: 'Chinese' },
      { name: 'Chicken Manchurian', price: 'Rs 700', desc: 'Chicken Manchurian.', group: 'Chinese' },
      { name: 'Chicken Chili Dry', price: 'Rs 800', desc: 'Chicken chili dry.', group: 'Chinese' },
      { name: 'FC Special Chicken Manchow', price: 'Rs 900', desc: 'House special chicken Manchow.', group: 'Chinese' },
      { name: 'Chicken Shashlik Rice', price: 'Rs 1,100', desc: 'Chicken shashlik with rice.', group: 'Chinese' },
      { name: 'Chicken Black Pepper Rice', price: 'Rs 1,100', desc: 'Chicken black pepper with rice.', group: 'Chinese' },
      { name: 'Chicken Manchurian Rice', price: 'Rs 1,150', desc: 'Chicken Manchurian served with rice.', group: 'Chinese' },
      { name: 'Tea', price: 'Rs 80', desc: 'Freshly brewed tea.', group: 'Tea & Coffee' },
      { name: 'FC Special Tea', price: 'Rs 100', desc: 'House special tea.', group: 'Tea & Coffee' },
      { name: 'Kashmiri Tea', price: 'Rs 150', desc: 'Kashmiri-style tea.', group: 'Tea & Coffee' },
      { name: 'FC Special Qahwa', price: 'Rs 80', desc: 'House special qahwa.', group: 'Tea & Coffee' },
    ],
  },
];

type DealCategory = 'pizza' | 'fc' | 'family' | 'broast';

const dealCategories: { key: 'all' | DealCategory; title: string }[] = [
  { key: 'all', title: 'All Deals' },
  { key: 'pizza', title: 'Pizza Deals' },
  { key: 'fc', title: 'FC Deals' },
  { key: 'family', title: 'Family & Party' },
  { key: 'broast', title: 'Broast' },
];

const deals: { category: DealCategory; title: string; tag: string; price: string; items: string[] }[] = [
  {
    category: 'pizza',
    title: 'Pizza Deal D-1',
    tag: 'Pizza Deal',
    price: 'Rs 1,399',
    items: ['1 Small Pizza', '2 Zinger Burgers'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-2',
    tag: 'Pizza Deal',
    price: 'Rs 1,790',
    items: ['1 Small Tikka Pizza', '2 Reggy Burgers'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-3',
    tag: 'Pizza Deal',
    price: 'Rs 2,999',
    items: ['1 Large Tikka Pizza', '1 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-4',
    tag: 'Pizza Deal',
    price: 'Rs 2,999',
    items: ['1 Large Fajita Pizza', '4 Zinger Burgers', '1.5 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-5',
    tag: 'Family Feast',
    price: 'Rs 4,999',
    items: ['1 Extra Large Pizza', '5 Zinger Burgers'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-6',
    tag: 'Pizza Deal',
    price: 'Rs 1,299',
    items: ['5 Hot Wings', '1 Small Pizza', '1 Regular Fries', '1 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Pizza Deal D-7',
    tag: 'Family Feast',
    price: 'Rs 4,499',
    items: ['2 Medium Tikka & Fajita Pizzas', '4 Chicken Shawarmas', '2 Kabab Bites', 'Regular Fries', '1.5 Litre Drink'],
  },
  {
    category: 'family',
    title: 'Family Deal',
    tag: 'Family Feast',
    price: 'Rs 6,399',
    items: ['1 Extra Large Pizza', '10 Hot Wings', 'Family Fries', '1.5 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Late Night Deal 1',
    tag: 'After 10 PM · Until Closing',
    price: 'Rs 2,199',
    items: ['2 Regular 10-inch Pizzas', '1.5 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Late Night Deal 2',
    tag: 'After 10 PM · Until Closing',
    price: 'Rs 2,999',
    items: ['2 Regular 13-inch Pizzas', '1.5 Litre Drink'],
  },
  {
    category: 'pizza',
    title: 'Late Night Deal 3',
    tag: 'After 10 PM · Until Closing',
    price: 'Rs 3,999',
    items: ['2 Regular 16-inch Pizzas', '1.5 Litre Drink'],
  },
  {
    category: 'fc',
    title: 'FC Deal 1',
    tag: 'FC Special Deal',
    price: 'Rs 1,399',
    items: ['2 Beef Grill Burgers', '500 ml Drink'],
  },
  {
    category: 'fc',
    title: 'FC Deal 2',
    tag: 'FC Special Deal',
    price: 'Rs 1,149',
    items: ['1 Reggy Burger', '1 Chapli Burger', '1 Small Pizza', '1 Litre Drink'],
  },
  {
    category: 'fc',
    title: 'FC Deal 3',
    tag: 'FC Special Deal',
    price: 'Rs 1,799',
    items: ['1 Large Fries', '1.5 Litre Drink'],
  },
  {
    category: 'fc',
    title: 'FC Deal 4',
    tag: 'FC Special Deal',
    price: 'Rs 2,599',
    items: ['1 Medium Tikka Pizza', '1 Half Rice Platter'],
  },
  {
    category: 'fc',
    title: 'FC Deal 5',
    tag: 'FC Special Deal',
    price: 'Rs 3,499',
    items: ['4 Zinger Burgers'],
  },
  {
    category: 'fc',
    title: 'FC Deal 6',
    tag: 'FC Special Deal',
    price: 'Rs 3,599',
    items: ['1 Medium Pizza', '1 Arabian Broast', '1 Macaroni Pasta', '1 kg Dhaka Chicken', '1 Large Fries', '1.5 Litre Drink'],
  },
  {
    category: 'family',
    title: 'FC Special Birthday Deal',
    tag: 'Party Package · 6–8 People',
    price: 'Rs 10,999',
    items: ['2 Extra Large Pizzas', '20 Nuggets', '3 Family Fries', '1 kg FC Special Handi', '1 kg Chicken Kabab', '3 Full Chicken Biryani', '4 Mint Ritas', '2 Fresh Salads', '1.5 Litre Drink', '1.5 Litre Water', '20 Rotis', '1 Pound Birthday Cake'],
  },
  {
    category: 'broast',
    title: 'Quarter Arabian Broast',
    tag: 'Arabian Broast',
    price: 'Rs 699',
    items: ['1 Leg & 1 Thigh', 'Garlic Sauce', 'Fries', 'Dinner Roll'],
  },
  {
    category: 'broast',
    title: 'Half Arabian Broast',
    tag: 'Arabian Broast',
    price: 'Rs 1,199',
    items: ['2 Legs & 2 Thighs', 'Garlic Sauce', 'Fries', '2 Dinner Rolls'],
  },
  {
    category: 'broast',
    title: 'Full Arabian Broast',
    tag: 'Arabian Broast',
    price: 'Rs 2,499',
    items: ['4 Legs & 4 Thighs', 'Garlic Sauce', 'Fries', '4 Dinner Rolls'],
  },
  {
    category: 'broast',
    title: 'Family Arabian Broast',
    tag: 'Arabian Broast',
    price: 'Rs 4,500',
    items: ['8 Legs & 8 Thighs', '4 Garlic Sauces', 'Fries', '8 Dinner Rolls'],
  },
];

const gallery = [
  { src: '/images/hero-burger.png', alt: 'Mighty Zinger Burger' },
  { src: '/images/crown-pizza.jpg', alt: 'Crown Crust Pizza' },
  { src: '/images/traditional-platter.jpg', alt: 'Traditional Platter' },
  { src: '/images/dessert-halwa.jpg', alt: 'Special FC Shahi Halwa' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('fastfood');
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0a07]">
      <Navbar />

      {/* 3D background scene */}
      <Scene scrollProgress={scrollYProgress} activeCategory={activeCategory} />

      {/* Hero Section */}
      <Hero reducedMotion={reducedMotion} scrollProgress={scrollYProgress} />

      {/* Story / About Section */}
      <Story reducedMotion={reducedMotion} />

      {/* Menu Section */}
      <Menu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        reducedMotion={reducedMotion}
      />

      {/* Deals Section */}
      <Deals reducedMotion={reducedMotion} />

      {/* Gallery Section */}
      <Gallery reducedMotion={reducedMotion} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
// Hero
/* ------------------------------------------------------------------ */

function Hero({ reducedMotion, scrollProgress }: { reducedMotion: boolean | null; scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const heroOpacity = useTransform(scrollProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollProgress, [0, 0.18], [0, -80]);
  const style = reducedMotion ? {} : { opacity: heroOpacity, y: heroY };

  return (
    <section className="relative z-10 flex min-h-screen items-center px-6 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div style={style as React.CSSProperties} className="max-w-2xl will-change-transform">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-block font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]"
          >
            Established 2020
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white"
          >
            Fried-Chicks
            <span className="mt-2 block text-[clamp(1.5rem,4vw,3rem)] font-normal italic text-[#fab026]">
              Secret Recipe 2020
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70 md:text-xl"
          >
            The ultimate fusion of premium fast food and authentic traditional cuisine, crafted for families who crave both comfort and celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="tel:0325-7866767"
              className="inline-flex items-center gap-2 rounded-full bg-[#fab026] px-8 py-4 text-base font-bold text-[#1a1200] shadow-[0_0_40px_rgba(250,176,38,0.45)] transition-transform hover:scale-105"
            >
              Free Home Delivery
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#fab026]/50 hover:bg-white/10"
            >
              Explore Menu
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-[#fab026]"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Story
/* ------------------------------------------------------------------ */

const StoryImage = memo(function StoryImage() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
      <Image
        src="/images/restaurant-interior.jpg"
        alt="Fried-Chicks restaurant interior"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a07]/60 to-transparent" />
    </div>
  );
});

function Story({ reducedMotion }: { reducedMotion: boolean | null }) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } };
  const anim2 = reducedMotion ? {} : { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } };

  return (
    <section className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          {...anim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="will-change-transform"
        >
          <StoryImage />
        </motion.div>

        <motion.div
          {...anim2}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Our Story</span>
          <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] text-white">
            Where Fast Food Meets Family Tradition
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Since 2020, Fried-Chicks has been serving the twin joys of crunchy, premium fast food and soul-warming desi flavors under one roof. Every recipe carries a secret — a blend of heritage spices and modern technique — made to bring people together.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            From our signature Mighty Zinger to the slow-simmered FC Special Chicken Karahi, each dish is prepared fresh, served hot, and delivered with love.
          </p>
          <div className="mt-10 flex gap-10">
            <div>
              <p className="font-serif text-4xl font-semibold text-[#fab026]">5+</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/50">Years of Taste</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-semibold text-[#fab026]">50k+</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/50">Happy Customers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Menu
/* ------------------------------------------------------------------ */

const MenuItems = memo(function MenuItems({
  activeCategory,
}: {
  activeCategory: CategoryKey;
}) {
  const items = categories.find((c) => c.key === activeCategory)?.items ?? [];

  return (
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-5 sm:grid-cols-2"
    >
      {items.map((item, i) => (
        <div key={item.name} className="contents">
          {item.group !== items[i - 1]?.group && (
            <h3 className="col-span-full mt-5 border-b border-white/10 pb-3 font-serif text-2xl font-semibold text-[#fab026] first:mt-0">
              {item.group}
            </h3>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-[#fab026]/40 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-serif text-xl font-semibold text-white transition-colors group-hover:text-[#fab026]">
                {item.name}
              </h4>
              <span className="text-right font-bold text-[#fab026]">{item.price}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
});

function Menu({
  activeCategory,
  setActiveCategory,
  reducedMotion,
}: {
  activeCategory: CategoryKey;
  setActiveCategory: (k: CategoryKey) => void;
  reducedMotion: boolean | null;
}) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="menu" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Discover</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">Our Menu</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Browse our food and drinks, or explore family deals made for sharing.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-wrap gap-3 lg:flex-col">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                onMouseEnter={() => setActiveCategory(cat.key)}
                className={`group relative flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                  activeCategory === cat.key
                    ? 'border-[#fab026]/60 bg-[#fab026]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div>
                  <p className={`font-semibold ${activeCategory === cat.key ? 'text-white' : 'text-white/80'}`}>
                    {cat.title}
                  </p>
                  <p className="text-xs text-white/40">{cat.items.length} items</p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    activeCategory === cat.key ? 'bg-[#fab026]' : 'bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <MenuItems activeCategory={activeCategory} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Deals
/* ------------------------------------------------------------------ */

function Deals({ reducedMotion }: { reducedMotion: boolean | null }) {
  const [activeDealCategory, setActiveDealCategory] = useState<'all' | DealCategory>('all');
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };
  const visibleDeals =
    activeDealCategory === 'all'
      ? deals
      : deals.filter((deal) => deal.category === activeDealCategory);

  return (
    <section id="deals" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Limited Time</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">Special Deals</h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filter special deals">
          {dealCategories.map((category) => {
            const isActive = activeDealCategory === category.key;
            const itemCount =
              category.key === 'all'
                ? deals.length
                : deals.filter((deal) => deal.category === category.key).length;

            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveDealCategory(category.key)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-[#fab026]/60 bg-[#fab026]/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {category.title}
                <span className="ml-2 text-xs text-[#fab026]">{itemCount}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {visibleDeals.map((deal, i) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={reducedMotion ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl transition-colors hover:border-[#fab026]/40"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fab026]/15 blur-3xl transition-colors group-hover:bg-[#fab026]/25" />
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-[#fab026]/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#fab026]">
                  {deal.tag}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white md:text-4xl">{deal.title}</h3>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#fab026]">{deal.price}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {deal.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fab026]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 rounded-xl bg-[#fab026] px-8 py-3 font-bold text-[#1a1200] shadow-lg transition-transform hover:scale-105">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Gallery
/* ------------------------------------------------------------------ */

const GalleryImage = memo(function GalleryImage({
  img,
  large,
  index,
}: {
  img: { src: string; alt: string };
  large: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl will-change-transform"
    >
      <div className={`relative w-full ${large ? 'aspect-square lg:aspect-auto lg:h-full' : 'aspect-square'}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a07]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-4 left-4 translate-y-4 font-serif text-lg font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {img.alt}
        </p>
      </div>
    </motion.div>
  );
});

function Gallery({ reducedMotion }: { reducedMotion: boolean | null }) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="gallery" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Visual Feast</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">From Our Kitchen</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <div key={img.alt} className={i === 0 || i === 3 ? 'lg:col-span-2 lg:row-span-2' : ''}>
              <GalleryImage img={img} large={i === 0 || i === 3} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Footer
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-[#0c0a07] px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Image
                src="/images/fried-chicks-logo.png"
                alt="Fried-Chicks logo"
                width={88}
                height={88}
                className="h-20 w-20 object-contain"
              />
              <h2 className="font-serif text-4xl font-semibold text-[#fab026]">Fried-Chicks</h2>
            </div>
            <p className="mt-4 max-w-md text-white/60">
              Premium fast food and authentic traditional cuisine, served fresh since 2020. Free home delivery across Kotmomin.
            </p>
            <div className="mt-6 flex gap-4">
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <p className="font-serif text-lg font-semibold text-white">Contact</p>
            <div className="mt-5 flex flex-col gap-3 text-white/70">
              <a href="tel:0325-7866767" className="transition-colors hover:text-[#fab026]">0325-7866767</a>
              <a href="tel:0325-0786767" className="transition-colors hover:text-[#fab026]">0325-0786767</a>
              <p className="flex items-start gap-2">
                <span className="mt-1 text-[#fab026]">📍</span>
                Midh Road City Center Kotmomin
              </p>
            </div>
          </div>

          <div>
            <p className="font-serif text-lg font-semibold text-white">Hours</p>
            <div className="mt-5 flex flex-col gap-3 text-white/70">
              <p>Mon – Thu: 12pm – 11pm</p>
              <p>Fri – Sun: 12pm – 1am</p>
            </div>
            <div className="mt-6">
              <DeliveryRider />
            </div>
          </div>
        </div>

        <p className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Fried-Chicks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
// Navbar
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0c0a07]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <a href="#" aria-label="Fried-Chicks home" className="flex items-center gap-2">
          <Image
            src="/images/fried-chicks-logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <span className="font-serif text-xl font-semibold text-[#fab026]">Fried-Chicks</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-[#fab026]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0325-7866767"
            className="rounded-full bg-[#fab026] px-5 py-2.5 text-sm font-bold text-[#1a1200] transition-transform hover:scale-105"
          >
            Order Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white md:hidden" aria-label="Toggle menu">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0c0a07]/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-[#fab026]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:0325-7866767"
              className="mt-2 rounded-full bg-[#fab026] px-5 py-3 text-center text-sm font-bold text-[#1a1200]"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-[#fab026]/50 hover:text-[#fab026]"
    >
      {children}
    </a>
  );
}

function DeliveryRider() {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#fab026]"
      >
        <path d="M20 65h55a10 10 0 0 0 0-20H55L45 35H30l5 10H20a8 8 0 0 0 0 16Z" fill="currentColor" />
        <rect x="32" y="18" width="28" height="22" rx="3" fill="#fff" />
        <path d="M38 24h16M38 30h12" stroke="#1a1200" strokeWidth="3" strokeLinecap="round" />
        <circle cx="68" cy="38" r="8" fill="#fff" />
        <path d="M68 30a8 8 0 0 1 8 8v4h-16v-4a8 8 0 0 1 8-8Z" fill="currentColor" />
        <circle cx="28" cy="73" r="10" stroke="#fff" strokeWidth="4" />
        <circle cx="75" cy="73" r="10" stroke="#fff" strokeWidth="4" />
      </svg>
      <div className="text-sm">
        <p className="font-bold text-[#fab026]">Fast Delivery</p>
        <p className="text-white/50">30-45 mins</p>
      </div>
    </div>
  );
}
