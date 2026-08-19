Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  QuickBite Full Data Seeder" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

$tokenResponse = Invoke-RestMethod `
    -Uri "http://localhost:8180/realms/quickbite-realm/protocol/openid-connect/token" `
    -Method Post `
    -ContentType "application/x-www-form-urlencoded" `
    -Body @{
        client_id  = "quickbite-frontend"
        username   = "customer1"
        password   = "customer123"
        grant_type = "password"
    }

$token = $tokenResponse.access_token
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type"  = "application/json"
}

Write-Host "Token obtained" -ForegroundColor Green

# ============================================
# 15 RESTAURANTS
# ============================================
$restaurants = @(
    @{
        name = "The Spice Garden"
        description = "Authentic Sri Lankan cuisine with modern twist. Family recipes passed down for generations."
        cuisineType = "Sri Lankan"
        address = "123 Galle Road, Colombo 03"
        phone = "+94771234567"
        email = "spice@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 35
        minimumOrderAmount = 500.0
        deliveryFee = 150.0
        isActive = $true
    },
    @{
        name = "Dragon Wok"
        description = "Best Chinese food in town. Fresh ingredients, authentic recipes from Beijing."
        cuisineType = "Chinese"
        address = "456 Union Place, Colombo 02"
        phone = "+94772345678"
        email = "dragon@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 30
        minimumOrderAmount = 800.0
        deliveryFee = 200.0
        isActive = $true
    },
    @{
        name = "Pizza Palace"
        description = "Wood-fired authentic Italian pizzas. Imported flour and San Marzano tomatoes."
        cuisineType = "Italian"
        address = "789 Marine Drive, Colombo 04"
        phone = "+94773456789"
        email = "pizza@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 40
        minimumOrderAmount = 1000.0
        deliveryFee = 250.0
        isActive = $true
    },
    @{
        name = "Burger Hub"
        description = "Juicy burgers, crispy fries, and shakes. American diner experience."
        cuisineType = "Fast Food"
        address = "321 Duplication Road, Colombo 05"
        phone = "+94774567890"
        email = "burger@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 25
        minimumOrderAmount = 600.0
        deliveryFee = 100.0
        isActive = $true
    },
    @{
        name = "Sushi Express"
        description = "Fresh sushi delivered fast. Traditional Japanese techniques."
        cuisineType = "Japanese"
        address = "555 Havelock Road, Colombo 06"
        phone = "+94775678901"
        email = "sushi@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 45
        minimumOrderAmount = 1500.0
        deliveryFee = 300.0
        isActive = $true
    },
    @{
        name = "Curry House"
        description = "Traditional Indian curries and biryani from master chefs of Mumbai."
        cuisineType = "Indian"
        address = "88 Bambalapitiya, Colombo 04"
        phone = "+94776789012"
        email = "curry@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 40
        minimumOrderAmount = 900.0
        deliveryFee = 200.0
        isActive = $true
    },
    @{
        name = "Thai Delight"
        description = "Authentic Thai flavors and street food from Bangkok"
        cuisineType = "Thai"
        address = "200 Kollupitiya, Colombo 03"
        phone = "+94777890123"
        email = "thai@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 35
        minimumOrderAmount = 1000.0
        deliveryFee = 220.0
        isActive = $true
    },
    @{
        name = "Sweet Corner"
        description = "Cakes, pastries and desserts. Made fresh every morning"
        cuisineType = "Desserts"
        address = "45 Colombo 07"
        phone = "+94778901234"
        email = "sweet@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 20
        minimumOrderAmount = 300.0
        deliveryFee = 100.0
        isActive = $true
    },
    @{
        name = "Ceylon Coffee House"
        description = "Premium Ceylon coffee, tea and light bites"
        cuisineType = "Cafe"
        address = "77 Dharmapala Mawatha, Colombo 07"
        phone = "+94779012345"
        email = "coffee@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 15
        minimumOrderAmount = 200.0
        deliveryFee = 80.0
        isActive = $true
    },
    @{
        name = "Healthy Bowl"
        description = "Salads, smoothies and healthy meals. Fresh and organic"
        cuisineType = "Healthy"
        address = "150 Rajagiriya"
        phone = "+94770123456"
        email = "healthy@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 30
        minimumOrderAmount = 500.0
        deliveryFee = 150.0
        isActive = $true
    },
    @{
        name = "Mexican Fiesta"
        description = "Authentic Mexican tacos, burritos and quesadillas"
        cuisineType = "Mexican"
        address = "88 Colombo 08"
        phone = "+94771122334"
        email = "mexican@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 35
        minimumOrderAmount = 800.0
        deliveryFee = 180.0
        isActive = $true
    },
    @{
        name = "BBQ Nation"
        description = "Grilled meats, ribs and BBQ specialties"
        cuisineType = "BBQ"
        address = "99 Wellawatta"
        phone = "+94772233445"
        email = "bbq@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 45
        minimumOrderAmount = 1200.0
        deliveryFee = 250.0
        isActive = $true
    },
    @{
        name = "Seafood Harbor"
        description = "Fresh seafood from the ocean to your table"
        cuisineType = "Seafood"
        address = "12 Mount Lavinia"
        phone = "+94773344556"
        email = "seafood@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 40
        minimumOrderAmount = 1500.0
        deliveryFee = 300.0
        isActive = $true
    },
    @{
        name = "Wraps and Rolls"
        description = "Delicious wraps, rolls and quick bites"
        cuisineType = "Fast Food"
        address = "44 Wellawatta"
        phone = "+94774455667"
        email = "wraps@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 20
        minimumOrderAmount = 400.0
        deliveryFee = 100.0
        isActive = $true
    },
    @{
        name = "Ice Cream World"
        description = "Premium ice creams, sundaes and milkshakes"
        cuisineType = "Desserts"
        address = "66 Colombo 06"
        phone = "+94775566778"
        email = "icecream@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=600&fit=crop"
        deliveryTimeMinutes = 20
        minimumOrderAmount = 300.0
        deliveryFee = 100.0
        isActive = $true
    }
)

Write-Host "`n[1/3] Creating 15 restaurants..." -ForegroundColor Yellow

$restaurantIds = @()
foreach ($restaurant in $restaurants) {
    try {
        $body = $restaurant | ConvertTo-Json
        $response = Invoke-RestMethod `
            -Uri "http://localhost:8080/api/restaurants" `
            -Method Post `
            -Headers $headers `
            -Body $body
        $restaurantIds += $response.data.id
        Write-Host "  Created: $($restaurant.name)" -ForegroundColor Green
    } catch {
        Write-Host "  Skipped: $($restaurant.name)" -ForegroundColor Yellow
    }
}

Write-Host "`n[2/3] Creating categories and menu items..." -ForegroundColor Yellow

$menuData = @{}

# 1. Sri Lankan
if ($restaurantIds.Count -ge 1) {
    $menuData[$restaurantIds[0]] = @(
        @{
            categoryName = "Rice and Curry"
            items = @(
                @{name = "Chicken Rice and Curry"; price = 850; desc = "Steamed rice with chicken curry, dhal, coconut sambol"; spicy = $true; veg = $false; cal = 650},
                @{name = "Fish Rice and Curry"; price = 900; desc = "Rice with fish curry and 3 vegetable curries"; spicy = $true; veg = $false; cal = 700},
                @{name = "Vegetable Rice and Curry"; price = 650; desc = "Rice with 5 vegetable curries"; spicy = $false; veg = $true; cal = 550},
                @{name = "Mutton Rice and Curry"; price = 1200; desc = "Rice with tender mutton curry"; spicy = $true; veg = $false; cal = 800},
                @{name = "Prawn Rice and Curry"; price = 1400; desc = "Rice with spicy prawn curry"; spicy = $true; veg = $false; cal = 720}
            )
        },
        @{
            categoryName = "Kottu Roti"
            items = @(
                @{name = "Chicken Kottu"; price = 950; desc = "Chopped roti with chicken and vegetables"; spicy = $true; veg = $false; cal = 780},
                @{name = "Cheese Kottu"; price = 1100; desc = "Kottu with melted cheese"; spicy = $false; veg = $false; cal = 900},
                @{name = "Egg Kottu"; price = 750; desc = "Traditional egg kottu"; spicy = $true; veg = $false; cal = 650},
                @{name = "Seafood Kottu"; price = 1300; desc = "Kottu with prawns and squid"; spicy = $true; veg = $false; cal = 820}
            )
        },
        @{
            categoryName = "Short Eats"
            items = @(
                @{name = "Fish Bun"; price = 120; desc = "Freshly baked bun with fish"; spicy = $false; veg = $false; cal = 250},
                @{name = "Vegetable Roti"; price = 100; desc = "Crispy roti with vegetables"; spicy = $true; veg = $true; cal = 200},
                @{name = "Chicken Roll"; price = 150; desc = "Fried roll with chicken filling"; spicy = $true; veg = $false; cal = 280}
            )
        }
    )
}

# 2. Chinese
if ($restaurantIds.Count -ge 2) {
    $menuData[$restaurantIds[1]] = @(
        @{
            categoryName = "Fried Rice"
            items = @(
                @{name = "Chicken Fried Rice"; price = 950; desc = "Wok-fried rice with chicken"; spicy = $false; veg = $false; cal = 750},
                @{name = "Seafood Fried Rice"; price = 1200; desc = "Rice with prawns and squid"; spicy = $true; veg = $false; cal = 800},
                @{name = "Vegetable Fried Rice"; price = 700; desc = "Rice with mixed vegetables"; spicy = $false; veg = $true; cal = 600},
                @{name = "Egg Fried Rice"; price = 750; desc = "Simple egg fried rice"; spicy = $false; veg = $false; cal = 650},
                @{name = "Yang Chow Rice"; price = 1100; desc = "Special fried rice with everything"; spicy = $false; veg = $false; cal = 850}
            )
        },
        @{
            categoryName = "Noodles"
            items = @(
                @{name = "Hakka Noodles"; price = 850; desc = "Stir-fried noodles"; spicy = $true; veg = $true; cal = 650},
                @{name = "Chicken Chow Mein"; price = 950; desc = "Noodles with chicken"; spicy = $false; veg = $false; cal = 700},
                @{name = "Singapore Noodles"; price = 900; desc = "Curry flavored noodles"; spicy = $true; veg = $false; cal = 720}
            )
        },
        @{
            categoryName = "Main Course"
            items = @(
                @{name = "Sweet and Sour Chicken"; price = 1100; desc = "Chicken in tangy sauce"; spicy = $false; veg = $false; cal = 780},
                @{name = "Kung Pao Chicken"; price = 1200; desc = "Spicy Sichuan chicken"; spicy = $true; veg = $false; cal = 820},
                @{name = "Mongolian Beef"; price = 1400; desc = "Beef with green onions"; spicy = $false; veg = $false; cal = 850},
                @{name = "Honey Garlic Chicken"; price = 1250; desc = "Sweet honey garlic sauce"; spicy = $false; veg = $false; cal = 800}
            )
        }
    )
}

# 3. Italian
if ($restaurantIds.Count -ge 3) {
    $menuData[$restaurantIds[2]] = @(
        @{
            categoryName = "Pizzas"
            items = @(
                @{name = "Margherita"; price = 1500; desc = "Classic pizza with tomato and mozzarella"; spicy = $false; veg = $true; cal = 850},
                @{name = "Pepperoni Pizza"; price = 1800; desc = "Loaded with pepperoni"; spicy = $true; veg = $false; cal = 950},
                @{name = "Chicken BBQ Pizza"; price = 1900; desc = "BBQ chicken with onions"; spicy = $false; veg = $false; cal = 900},
                @{name = "Vegetarian Supreme"; price = 1700; desc = "Loaded with vegetables"; spicy = $false; veg = $true; cal = 800},
                @{name = "Meat Lovers Pizza"; price = 2100; desc = "Beef, chicken, sausage, ham"; spicy = $false; veg = $false; cal = 1100},
                @{name = "Hawaiian Pizza"; price = 1750; desc = "Ham and pineapple"; spicy = $false; veg = $false; cal = 880}
            )
        },
        @{
            categoryName = "Pasta"
            items = @(
                @{name = "Spaghetti Carbonara"; price = 1400; desc = "Creamy pasta with bacon"; spicy = $false; veg = $false; cal = 780},
                @{name = "Penne Arrabbiata"; price = 1200; desc = "Spicy tomato pasta"; spicy = $true; veg = $true; cal = 650},
                @{name = "Fettuccine Alfredo"; price = 1350; desc = "Creamy white sauce pasta"; spicy = $false; veg = $true; cal = 820},
                @{name = "Lasagna"; price = 1600; desc = "Baked pasta with meat"; spicy = $false; veg = $false; cal = 950}
            )
        },
        @{
            categoryName = "Sides"
            items = @(
                @{name = "Garlic Bread"; price = 500; desc = "Toasted bread with garlic butter"; spicy = $false; veg = $true; cal = 350},
                @{name = "Caesar Salad"; price = 750; desc = "Fresh Caesar salad"; spicy = $false; veg = $true; cal = 400},
                @{name = "Bruschetta"; price = 650; desc = "Italian appetizer bread"; spicy = $false; veg = $true; cal = 380}
            )
        }
    )
}

# 4. Fast Food
if ($restaurantIds.Count -ge 4) {
    $menuData[$restaurantIds[3]] = @(
        @{
            categoryName = "Burgers"
            items = @(
                @{name = "Classic Cheeseburger"; price = 750; desc = "Beef patty with cheese and salad"; spicy = $false; veg = $false; cal = 650},
                @{name = "Chicken Burger"; price = 680; desc = "Grilled chicken with mayo"; spicy = $false; veg = $false; cal = 600},
                @{name = "Veggie Burger"; price = 550; desc = "Plant-based patty burger"; spicy = $false; veg = $true; cal = 450},
                @{name = "Double Beef Burger"; price = 1100; desc = "Two beef patties"; spicy = $false; veg = $false; cal = 950},
                @{name = "Spicy Chicken Burger"; price = 750; desc = "Extra spicy chicken"; spicy = $true; veg = $false; cal = 680}
            )
        },
        @{
            categoryName = "Sides"
            items = @(
                @{name = "French Fries"; price = 300; desc = "Crispy golden fries"; spicy = $false; veg = $true; cal = 350},
                @{name = "Chicken Wings"; price = 850; desc = "Spicy buffalo wings"; spicy = $true; veg = $false; cal = 550},
                @{name = "Onion Rings"; price = 400; desc = "Crispy onion rings"; spicy = $false; veg = $true; cal = 400},
                @{name = "Chicken Nuggets"; price = 550; desc = "8 pieces of nuggets"; spicy = $false; veg = $false; cal = 480}
            )
        },
        @{
            categoryName = "Beverages"
            items = @(
                @{name = "Coca Cola"; price = 200; desc = "Chilled coke 330ml"; spicy = $false; veg = $true; cal = 140},
                @{name = "Milkshake"; price = 450; desc = "Chocolate milkshake"; spicy = $false; veg = $true; cal = 550},
                @{name = "Iced Coffee"; price = 350; desc = "Cold brew coffee"; spicy = $false; veg = $true; cal = 180}
            )
        }
    )
}

# 5. Japanese
if ($restaurantIds.Count -ge 5) {
    $menuData[$restaurantIds[4]] = @(
        @{
            categoryName = "Sushi Rolls"
            items = @(
                @{name = "California Roll"; price = 1200; desc = "Crab, avocado and cucumber"; spicy = $false; veg = $false; cal = 300},
                @{name = "Spicy Tuna Roll"; price = 1400; desc = "Fresh tuna with spicy mayo"; spicy = $true; veg = $false; cal = 320},
                @{name = "Vegetable Roll"; price = 900; desc = "Assorted vegetables"; spicy = $false; veg = $true; cal = 250},
                @{name = "Salmon Roll"; price = 1500; desc = "Fresh salmon roll"; spicy = $false; veg = $false; cal = 350},
                @{name = "Dragon Roll"; price = 1800; desc = "Eel and avocado roll"; spicy = $false; veg = $false; cal = 400}
            )
        },
        @{
            categoryName = "Ramen"
            items = @(
                @{name = "Chicken Ramen"; price = 1500; desc = "Hot noodle soup with chicken"; spicy = $true; veg = $false; cal = 700},
                @{name = "Beef Ramen"; price = 1700; desc = "Rich beef broth ramen"; spicy = $true; veg = $false; cal = 780},
                @{name = "Vegetable Ramen"; price = 1200; desc = "Miso vegetable ramen"; spicy = $false; veg = $true; cal = 600}
            )
        },
        @{
            categoryName = "Bento Box"
            items = @(
                @{name = "Chicken Teriyaki Bento"; price = 1800; desc = "Rice, chicken teriyaki, salad"; spicy = $false; veg = $false; cal = 850},
                @{name = "Salmon Bento"; price = 2000; desc = "Grilled salmon bento box"; spicy = $false; veg = $false; cal = 780}
            )
        }
    )
}

# 6. Indian
if ($restaurantIds.Count -ge 6) {
    $menuData[$restaurantIds[5]] = @(
        @{
            categoryName = "Biryani"
            items = @(
                @{name = "Chicken Biryani"; price = 1200; desc = "Aromatic rice with chicken"; spicy = $true; veg = $false; cal = 850},
                @{name = "Mutton Biryani"; price = 1500; desc = "Spiced mutton biryani"; spicy = $true; veg = $false; cal = 900},
                @{name = "Vegetable Biryani"; price = 900; desc = "Vegetarian biryani"; spicy = $true; veg = $true; cal = 700},
                @{name = "Prawn Biryani"; price = 1600; desc = "Biryani with prawns"; spicy = $true; veg = $false; cal = 820}
            )
        },
        @{
            categoryName = "Curries"
            items = @(
                @{name = "Butter Chicken"; price = 1100; desc = "Creamy tomato chicken"; spicy = $false; veg = $false; cal = 750},
                @{name = "Paneer Tikka Masala"; price = 950; desc = "Cottage cheese in gravy"; spicy = $true; veg = $true; cal = 650},
                @{name = "Chicken Tikka"; price = 1200; desc = "Grilled marinated chicken"; spicy = $true; veg = $false; cal = 550},
                @{name = "Dal Makhani"; price = 750; desc = "Creamy black lentils"; spicy = $false; veg = $true; cal = 500},
                @{name = "Palak Paneer"; price = 900; desc = "Spinach with cottage cheese"; spicy = $false; veg = $true; cal = 480}
            )
        },
        @{
            categoryName = "Breads"
            items = @(
                @{name = "Butter Naan"; price = 200; desc = "Soft naan bread"; spicy = $false; veg = $true; cal = 250},
                @{name = "Garlic Naan"; price = 250; desc = "Naan with garlic"; spicy = $false; veg = $true; cal = 280},
                @{name = "Roti"; price = 100; desc = "Whole wheat flatbread"; spicy = $false; veg = $true; cal = 150},
                @{name = "Kulcha"; price = 220; desc = "Stuffed Indian bread"; spicy = $false; veg = $true; cal = 300}
            )
        }
    )
}

# 7. Thai
if ($restaurantIds.Count -ge 7) {
    $menuData[$restaurantIds[6]] = @(
        @{
            categoryName = "Thai Curry"
            items = @(
                @{name = "Green Curry Chicken"; price = 1100; desc = "Spicy Thai green curry"; spicy = $true; veg = $false; cal = 650},
                @{name = "Red Curry Beef"; price = 1300; desc = "Traditional red curry"; spicy = $true; veg = $false; cal = 720},
                @{name = "Massaman Curry"; price = 1200; desc = "Mild Thai curry"; spicy = $false; veg = $false; cal = 680},
                @{name = "Panang Curry"; price = 1250; desc = "Rich Panang curry"; spicy = $true; veg = $false; cal = 700}
            )
        },
        @{
            categoryName = "Noodles"
            items = @(
                @{name = "Pad Thai"; price = 950; desc = "Traditional stir-fried noodles"; spicy = $true; veg = $false; cal = 680},
                @{name = "Pad See Ew"; price = 900; desc = "Wide noodles with soy sauce"; spicy = $false; veg = $false; cal = 700},
                @{name = "Drunken Noodles"; price = 1000; desc = "Spicy wide noodles"; spicy = $true; veg = $false; cal = 720}
            )
        },
        @{
            categoryName = "Soups"
            items = @(
                @{name = "Tom Yum Soup"; price = 750; desc = "Spicy and sour soup"; spicy = $true; veg = $false; cal = 350},
                @{name = "Tom Kha Gai"; price = 800; desc = "Coconut chicken soup"; spicy = $false; veg = $false; cal = 400}
            )
        }
    )
}

# 8. Desserts
if ($restaurantIds.Count -ge 8) {
    $menuData[$restaurantIds[7]] = @(
        @{
            categoryName = "Cakes"
            items = @(
                @{name = "Chocolate Cake Slice"; price = 350; desc = "Rich chocolate cake"; spicy = $false; veg = $true; cal = 480},
                @{name = "Cheesecake Slice"; price = 400; desc = "Creamy New York cheesecake"; spicy = $false; veg = $true; cal = 520},
                @{name = "Red Velvet Cake"; price = 380; desc = "Classic red velvet"; spicy = $false; veg = $true; cal = 500},
                @{name = "Tiramisu"; price = 500; desc = "Italian coffee dessert"; spicy = $false; veg = $true; cal = 450},
                @{name = "Black Forest Cake"; price = 420; desc = "Chocolate cake with cherries"; spicy = $false; veg = $true; cal = 490}
            )
        },
        @{
            categoryName = "Pastries"
            items = @(
                @{name = "Chocolate Donut"; price = 200; desc = "Glazed chocolate donut"; spicy = $false; veg = $true; cal = 350},
                @{name = "Croissant"; price = 250; desc = "Buttery French pastry"; spicy = $false; veg = $true; cal = 280},
                @{name = "Cinnamon Roll"; price = 280; desc = "Sweet cinnamon roll"; spicy = $false; veg = $true; cal = 400}
            )
        }
    )
}

# 9. Cafe
if ($restaurantIds.Count -ge 9) {
    $menuData[$restaurantIds[8]] = @(
        @{
            categoryName = "Coffee"
            items = @(
                @{name = "Espresso"; price = 250; desc = "Strong coffee shot"; spicy = $false; veg = $true; cal = 5},
                @{name = "Cappuccino"; price = 350; desc = "Espresso with foam"; spicy = $false; veg = $true; cal = 120},
                @{name = "Latte"; price = 400; desc = "Espresso with milk"; spicy = $false; veg = $true; cal = 190},
                @{name = "Mocha"; price = 450; desc = "Coffee with chocolate"; spicy = $false; veg = $true; cal = 290},
                @{name = "Americano"; price = 300; desc = "Espresso with water"; spicy = $false; veg = $true; cal = 10}
            )
        },
        @{
            categoryName = "Tea"
            items = @(
                @{name = "Ceylon Black Tea"; price = 200; desc = "Premium black tea"; spicy = $false; veg = $true; cal = 5},
                @{name = "Green Tea"; price = 250; desc = "Refreshing green tea"; spicy = $false; veg = $true; cal = 5},
                @{name = "Iced Tea"; price = 300; desc = "Cold refreshing tea"; spicy = $false; veg = $true; cal = 90},
                @{name = "Chai Latte"; price = 350; desc = "Spiced chai with milk"; spicy = $false; veg = $true; cal = 200}
            )
        },
        @{
            categoryName = "Sandwiches"
            items = @(
                @{name = "Club Sandwich"; price = 750; desc = "Triple decker sandwich"; spicy = $false; veg = $false; cal = 650},
                @{name = "Grilled Cheese"; price = 500; desc = "Melted cheese sandwich"; spicy = $false; veg = $true; cal = 480},
                @{name = "Chicken Panini"; price = 700; desc = "Grilled chicken panini"; spicy = $false; veg = $false; cal = 590}
            )
        }
    )
}

# 10. Healthy
if ($restaurantIds.Count -ge 10) {
    $menuData[$restaurantIds[9]] = @(
        @{
            categoryName = "Salads"
            items = @(
                @{name = "Caesar Salad"; price = 750; desc = "Classic Caesar with chicken"; spicy = $false; veg = $false; cal = 400},
                @{name = "Greek Salad"; price = 700; desc = "Fresh Mediterranean salad"; spicy = $false; veg = $true; cal = 350},
                @{name = "Quinoa Bowl"; price = 900; desc = "Healthy quinoa with vegetables"; spicy = $false; veg = $true; cal = 500},
                @{name = "Chicken Avocado Salad"; price = 950; desc = "Grilled chicken with avocado"; spicy = $false; veg = $false; cal = 550}
            )
        },
        @{
            categoryName = "Smoothies"
            items = @(
                @{name = "Green Smoothie"; price = 500; desc = "Spinach, apple, banana"; spicy = $false; veg = $true; cal = 220},
                @{name = "Berry Smoothie"; price = 550; desc = "Mixed berries smoothie"; spicy = $false; veg = $true; cal = 280},
                @{name = "Mango Smoothie"; price = 500; desc = "Fresh mango smoothie"; spicy = $false; veg = $true; cal = 250},
                @{name = "Protein Shake"; price = 650; desc = "Chocolate protein shake"; spicy = $false; veg = $true; cal = 320}
            )
        },
        @{
            categoryName = "Bowls"
            items = @(
                @{name = "Buddha Bowl"; price = 1100; desc = "Nutritious vegetable bowl"; spicy = $false; veg = $true; cal = 600},
                @{name = "Poke Bowl"; price = 1400; desc = "Fresh salmon poke bowl"; spicy = $false; veg = $false; cal = 550},
                @{name = "Acai Bowl"; price = 900; desc = "Acai with granola and fruits"; spicy = $false; veg = $true; cal = 450}
            )
        }
    )
}

# 11. Mexican
if ($restaurantIds.Count -ge 11) {
    $menuData[$restaurantIds[10]] = @(
        @{
            categoryName = "Tacos"
            items = @(
                @{name = "Chicken Tacos"; price = 950; desc = "3 tacos with grilled chicken"; spicy = $true; veg = $false; cal = 700},
                @{name = "Beef Tacos"; price = 1050; desc = "3 tacos with seasoned beef"; spicy = $true; veg = $false; cal = 750},
                @{name = "Fish Tacos"; price = 1150; desc = "3 tacos with grilled fish"; spicy = $false; veg = $false; cal = 680}
            )
        },
        @{
            categoryName = "Burritos"
            items = @(
                @{name = "Chicken Burrito"; price = 1200; desc = "Large chicken burrito"; spicy = $true; veg = $false; cal = 850},
                @{name = "Beef Burrito"; price = 1300; desc = "Large beef burrito"; spicy = $true; veg = $false; cal = 900},
                @{name = "Vegetarian Burrito"; price = 950; desc = "Vegetable burrito"; spicy = $false; veg = $true; cal = 700}
            )
        }
    )
}

# 12. BBQ
if ($restaurantIds.Count -ge 12) {
    $menuData[$restaurantIds[11]] = @(
        @{
            categoryName = "Grilled Meats"
            items = @(
                @{name = "BBQ Ribs"; price = 1800; desc = "Slow-cooked pork ribs"; spicy = $false; veg = $false; cal = 950},
                @{name = "BBQ Chicken"; price = 1400; desc = "Grilled BBQ chicken"; spicy = $false; veg = $false; cal = 750},
                @{name = "Grilled Steak"; price = 2500; desc = "Premium beef steak"; spicy = $false; veg = $false; cal = 850}
            )
        }
    )
}

# 13. Seafood
if ($restaurantIds.Count -ge 13) {
    $menuData[$restaurantIds[12]] = @(
        @{
            categoryName = "Fish Dishes"
            items = @(
                @{name = "Grilled Salmon"; price = 2200; desc = "Fresh Atlantic salmon"; spicy = $false; veg = $false; cal = 500},
                @{name = "Fish and Chips"; price = 1500; desc = "Beer battered fish"; spicy = $false; veg = $false; cal = 850},
                @{name = "Prawn Cocktail"; price = 1200; desc = "Chilled prawn cocktail"; spicy = $false; veg = $false; cal = 350}
            )
        }
    )
}

# 14. Wraps
if ($restaurantIds.Count -ge 14) {
    $menuData[$restaurantIds[13]] = @(
        @{
            categoryName = "Wraps"
            items = @(
                @{name = "Chicken Wrap"; price = 650; desc = "Grilled chicken wrap"; spicy = $false; veg = $false; cal = 520},
                @{name = "Falafel Wrap"; price = 550; desc = "Middle Eastern falafel"; spicy = $false; veg = $true; cal = 480},
                @{name = "Shawarma Wrap"; price = 750; desc = "Chicken shawarma"; spicy = $true; veg = $false; cal = 620}
            )
        }
    )
}

# 15. Ice Cream
if ($restaurantIds.Count -ge 15) {
    $menuData[$restaurantIds[14]] = @(
        @{
            categoryName = "Ice Cream"
            items = @(
                @{name = "Vanilla Scoop"; price = 250; desc = "Classic vanilla"; spicy = $false; veg = $true; cal = 200},
                @{name = "Chocolate Sundae"; price = 500; desc = "Chocolate with toppings"; spicy = $false; veg = $true; cal = 480},
                @{name = "Strawberry Sundae"; price = 500; desc = "Fresh strawberry sundae"; spicy = $false; veg = $true; cal = 420},
                @{name = "Banana Split"; price = 650; desc = "Classic banana split"; spicy = $false; veg = $true; cal = 550}
            )
        },
        @{
            categoryName = "Milkshakes"
            items = @(
                @{name = "Chocolate Shake"; price = 450; desc = "Thick chocolate shake"; spicy = $false; veg = $true; cal = 550},
                @{name = "Oreo Shake"; price = 500; desc = "Cookies and cream"; spicy = $false; veg = $true; cal = 620}
            )
        }
    )
}

$totalItems = 0
foreach ($restId in $restaurantIds) {
    if (-not $menuData.ContainsKey($restId)) { continue }
    $categories = $menuData[$restId]

    foreach ($category in $categories) {
        try {
            $catBody = @{
                restaurantId = $restId
                name = $category.categoryName
                description = "$($category.categoryName) menu items"
                displayOrder = 1
                isActive = $true
            } | ConvertTo-Json

            $catResponse = Invoke-RestMethod `
                -Uri "http://localhost:8080/api/categories" `
                -Method Post `
                -Headers $headers `
                -Body $catBody

            $categoryId = $catResponse.data.id
            Write-Host "  Category: $($category.categoryName) [Rest $restId]" -ForegroundColor Cyan

            foreach ($item in $category.items) {
                try {
                    $itemBody = @{
                        restaurantId = $restId
                        categoryId = $categoryId
                        name = $item.name
                        description = $item.desc
                        price = $item.price
                        isAvailable = $true
                        preparationTimeMinutes = 20
                        calories = $item.cal
                        isVegetarian = $item.veg
                        isSpicy = $item.spicy
                    } | ConvertTo-Json

                    Invoke-RestMethod `
                        -Uri "http://localhost:8080/api/menu-items" `
                        -Method Post `
                        -Headers $headers `
                        -Body $itemBody | Out-Null

                    Write-Host "    $($item.name) - Rs. $($item.price)" -ForegroundColor Green
                    $totalItems++
                } catch {
                    Write-Host "    Failed: $($item.name)" -ForegroundColor Red
                }
            }
        } catch {
            Write-Host "  Failed category: $($category.categoryName)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "  SEEDING COMPLETE!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  Restaurants created: $($restaurantIds.Count)" -ForegroundColor Green
Write-Host "  Menu items created: $totalItems" -ForegroundColor Green
Write-Host "  Open http://localhost:5173" -ForegroundColor Magenta
Write-Host "=======================================`n" -ForegroundColor Cyan