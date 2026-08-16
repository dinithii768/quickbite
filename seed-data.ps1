Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  QuickBite Complete Data Seeder" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# ============================================
# Get JWT Token
# ============================================
Write-Host "`n[1/3] Getting JWT token..." -ForegroundColor Yellow

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

Write-Host "Token obtained successfully" -ForegroundColor Green

# ============================================
# 10 Restaurants
# ============================================
$restaurants = @(
    @{
        name = "The Spice Garden"
        description = "Authentic Sri Lankan cuisine with modern twist"
        cuisineType = "Sri Lankan"
        address = "123 Galle Road, Colombo 03"
        phone = "+94771234567"
        email = "spice@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"
        deliveryTimeMinutes = 35
        minimumOrderAmount = 500.0
        deliveryFee = 150.0
        isActive = $true
    },
    @{
        name = "Dragon Wok"
        description = "Best Chinese food in town"
        cuisineType = "Chinese"
        address = "456 Union Place, Colombo 02"
        phone = "+94772345678"
        email = "dragon@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1541833172-3f0e2d6968b1?w=800"
        deliveryTimeMinutes = 30
        minimumOrderAmount = 800.0
        deliveryFee = 200.0
        isActive = $true
    },
    @{
        name = "Pizza Palace"
        description = "Wood-fired authentic Italian pizzas"
        cuisineType = "Italian"
        address = "789 Marine Drive, Colombo 04"
        phone = "+94773456789"
        email = "pizza@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
        deliveryTimeMinutes = 40
        minimumOrderAmount = 1000.0
        deliveryFee = 250.0
        isActive = $true
    },
    @{
        name = "Burger Hub"
        description = "Juicy burgers and crispy fries"
        cuisineType = "Fast Food"
        address = "321 Duplication Road, Colombo 05"
        phone = "+94774567890"
        email = "burger@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
        deliveryTimeMinutes = 25
        minimumOrderAmount = 600.0
        deliveryFee = 100.0
        isActive = $true
    },
    @{
        name = "Sushi Express"
        description = "Fresh sushi delivered fast"
        cuisineType = "Japanese"
        address = "555 Havelock Road, Colombo 06"
        phone = "+94775678901"
        email = "sushi@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800"
        deliveryTimeMinutes = 45
        minimumOrderAmount = 1500.0
        deliveryFee = 300.0
        isActive = $true
    },
    @{
        name = "Curry House"
        description = "Traditional Indian curries and biryani"
        cuisineType = "Indian"
        address = "88 Bambalapitiya, Colombo 04"
        phone = "+94776789012"
        email = "curry@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"
        deliveryTimeMinutes = 40
        minimumOrderAmount = 900.0
        deliveryFee = 200.0
        isActive = $true
    },
    @{
        name = "Thai Delight"
        description = "Authentic Thai flavors and street food"
        cuisineType = "Thai"
        address = "200 Kollupitiya, Colombo 03"
        phone = "+94777890123"
        email = "thai@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800"
        deliveryTimeMinutes = 35
        minimumOrderAmount = 1000.0
        deliveryFee = 220.0
        isActive = $true
    },
    @{
        name = "Sweet Corner"
        description = "Cakes, pastries and desserts"
        cuisineType = "Desserts"
        address = "45 Colombo 07"
        phone = "+94778901234"
        email = "sweet@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800"
        deliveryTimeMinutes = 20
        minimumOrderAmount = 300.0
        deliveryFee = 100.0
        isActive = $true
    },
    @{
        name = "Ceylon Coffee House"
        description = "Coffee, tea and light bites"
        cuisineType = "Cafe"
        address = "77 Dharmapala Mawatha, Colombo 07"
        phone = "+94779012345"
        email = "coffee@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"
        deliveryTimeMinutes = 15
        minimumOrderAmount = 200.0
        deliveryFee = 80.0
        isActive = $true
    },
    @{
        name = "Healthy Bowl"
        description = "Salads, smoothies and healthy meals"
        cuisineType = "Healthy"
        address = "150 Rajagiriya"
        phone = "+94770123456"
        email = "healthy@quickbite.com"
        imageUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
        deliveryTimeMinutes = 30
        minimumOrderAmount = 500.0
        deliveryFee = 150.0
        isActive = $true
    }
)

# ============================================
# Create Restaurants
# ============================================
Write-Host "`n[2/3] Creating restaurants..." -ForegroundColor Yellow

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
        Write-Host "  Created: $($restaurant.name) - ID $($response.data.id)" -ForegroundColor Green
    } catch {
        Write-Host "  Skipped: $($restaurant.name)" -ForegroundColor Yellow
    }
}

# ============================================
# Menu Data (10 restaurants, multiple categories, many items)
# ============================================
Write-Host "`n[3/3] Creating categories and menu items..." -ForegroundColor Yellow

$menuData = @{}

# 1. Sri Lankan
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
        categoryName = "Kottu"
        items = @(
            @{name = "Chicken Kottu"; price = 950; desc = "Chopped roti with chicken and vegetables"; spicy = $true; veg = $false; cal = 780},
            @{name = "Cheese Kottu"; price = 1100; desc = "Kottu with melted cheese"; spicy = $false; veg = $false; cal = 900},
            @{name = "Egg Kottu"; price = 750; desc = "Traditional egg kottu"; spicy = $true; veg = $false; cal = 650}
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

# 2. Chinese
$menuData[$restaurantIds[1]] = @(
    @{
        categoryName = "Fried Rice"
        items = @(
            @{name = "Chicken Fried Rice"; price = 950; desc = "Wok-fried rice with chicken"; spicy = $false; veg = $false; cal = 750},
            @{name = "Seafood Fried Rice"; price = 1200; desc = "Rice with prawns and squid"; spicy = $true; veg = $false; cal = 800},
            @{name = "Vegetable Fried Rice"; price = 700; desc = "Rice with mixed vegetables"; spicy = $false; veg = $true; cal = 600},
            @{name = "Egg Fried Rice"; price = 750; desc = "Simple egg fried rice"; spicy = $false; veg = $false; cal = 650}
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
            @{name = "Mongolian Beef"; price = 1400; desc = "Beef with green onions"; spicy = $false; veg = $false; cal = 850}
        )
    }
)

# 3. Italian
$menuData[$restaurantIds[2]] = @(
    @{
        categoryName = "Pizzas"
        items = @(
            @{name = "Margherita"; price = 1500; desc = "Tomato and mozzarella"; spicy = $false; veg = $true; cal = 850},
            @{name = "Pepperoni Pizza"; price = 1800; desc = "Loaded with pepperoni"; spicy = $true; veg = $false; cal = 950},
            @{name = "Chicken BBQ Pizza"; price = 1900; desc = "BBQ chicken with onions"; spicy = $false; veg = $false; cal = 900},
            @{name = "Vegetarian Supreme"; price = 1700; desc = "Loaded with vegetables"; spicy = $false; veg = $true; cal = 800},
            @{name = "Meat Lovers Pizza"; price = 2100; desc = "Beef, chicken, sausage, ham"; spicy = $false; veg = $false; cal = 1100}
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
            @{name = "Caesar Salad"; price = 750; desc = "Fresh Caesar salad"; spicy = $false; veg = $true; cal = 400}
        )
    }
)

# 4. Fast Food
$menuData[$restaurantIds[3]] = @(
    @{
        categoryName = "Burgers"
        items = @(
            @{name = "Classic Cheeseburger"; price = 750; desc = "Beef with cheese"; spicy = $false; veg = $false; cal = 650},
            @{name = "Chicken Burger"; price = 680; desc = "Grilled chicken burger"; spicy = $false; veg = $false; cal = 600},
            @{name = "Veggie Burger"; price = 550; desc = "Plant-based patty"; spicy = $false; veg = $true; cal = 450},
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
            @{name = "Milkshake"; price = 450; desc = "Chocolate milkshake"; spicy = $false; veg = $true; cal = 550}
        )
    }
)

# 5. Japanese
$menuData[$restaurantIds[4]] = @(
    @{
        categoryName = "Sushi Rolls"
        items = @(
            @{name = "California Roll"; price = 1200; desc = "Crab and avocado"; spicy = $false; veg = $false; cal = 300},
            @{name = "Spicy Tuna Roll"; price = 1400; desc = "Fresh tuna with mayo"; spicy = $true; veg = $false; cal = 320},
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

# 6. Indian
$menuData[$restaurantIds[5]] = @(
    @{
        categoryName = "Biryani"
        items = @(
            @{name = "Chicken Biryani"; price = 1200; desc = "Aromatic rice with chicken"; spicy = $true; veg = $false; cal = 850},
            @{name = "Mutton Biryani"; price = 1500; desc = "Spiced mutton biryani"; spicy = $true; veg = $false; cal = 900},
            @{name = "Vegetable Biryani"; price = 900; desc = "Vegetarian biryani"; spicy = $true; veg = $true; cal = 700}
        )
    },
    @{
        categoryName = "Curries"
        items = @(
            @{name = "Butter Chicken"; price = 1100; desc = "Creamy tomato chicken"; spicy = $false; veg = $false; cal = 750},
            @{name = "Paneer Tikka Masala"; price = 950; desc = "Cottage cheese in tomato gravy"; spicy = $true; veg = $true; cal = 650},
            @{name = "Chicken Tikka"; price = 1200; desc = "Grilled marinated chicken"; spicy = $true; veg = $false; cal = 550},
            @{name = "Dal Makhani"; price = 750; desc = "Creamy black lentils"; spicy = $false; veg = $true; cal = 500}
        )
    },
    @{
        categoryName = "Breads"
        items = @(
            @{name = "Butter Naan"; price = 200; desc = "Soft naan bread"; spicy = $false; veg = $true; cal = 250},
            @{name = "Garlic Naan"; price = 250; desc = "Naan with garlic"; spicy = $false; veg = $true; cal = 280},
            @{name = "Roti"; price = 100; desc = "Whole wheat flatbread"; spicy = $false; veg = $true; cal = 150}
        )
    }
)

# 7. Thai
$menuData[$restaurantIds[6]] = @(
    @{
        categoryName = "Thai Curry"
        items = @(
            @{name = "Green Curry Chicken"; price = 1100; desc = "Spicy Thai green curry"; spicy = $true; veg = $false; cal = 650},
            @{name = "Red Curry Beef"; price = 1300; desc = "Traditional red curry"; spicy = $true; veg = $false; cal = 720},
            @{name = "Massaman Curry"; price = 1200; desc = "Mild Thai curry"; spicy = $false; veg = $false; cal = 680}
        )
    },
    @{
        categoryName = "Noodles"
        items = @(
            @{name = "Pad Thai"; price = 950; desc = "Traditional stir-fried noodles"; spicy = $true; veg = $false; cal = 680},
            @{name = "Pad See Ew"; price = 900; desc = "Wide noodles with soy sauce"; spicy = $false; veg = $false; cal = 700}
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

# 8. Desserts
$menuData[$restaurantIds[7]] = @(
    @{
        categoryName = "Cakes"
        items = @(
            @{name = "Chocolate Cake Slice"; price = 350; desc = "Rich chocolate cake"; spicy = $false; veg = $true; cal = 480},
            @{name = "Cheesecake Slice"; price = 400; desc = "Creamy New York cheesecake"; spicy = $false; veg = $true; cal = 520},
            @{name = "Red Velvet Cake"; price = 380; desc = "Classic red velvet"; spicy = $false; veg = $true; cal = 500},
            @{name = "Tiramisu"; price = 500; desc = "Italian coffee dessert"; spicy = $false; veg = $true; cal = 450}
        )
    },
    @{
        categoryName = "Ice Cream"
        items = @(
            @{name = "Vanilla Ice Cream"; price = 250; desc = "Classic vanilla"; spicy = $false; veg = $true; cal = 300},
            @{name = "Chocolate Sundae"; price = 450; desc = "Chocolate with toppings"; spicy = $false; veg = $true; cal = 480},
            @{name = "Strawberry Sundae"; price = 450; desc = "Fresh strawberry sundae"; spicy = $false; veg = $true; cal = 420}
        )
    },
    @{
        categoryName = "Pastries"
        items = @(
            @{name = "Chocolate Donut"; price = 200; desc = "Glazed chocolate donut"; spicy = $false; veg = $true; cal = 350},
            @{name = "Croissant"; price = 250; desc = "Buttery French pastry"; spicy = $false; veg = $true; cal = 280}
        )
    }
)

# 9. Cafe
$menuData[$restaurantIds[8]] = @(
    @{
        categoryName = "Coffee"
        items = @(
            @{name = "Espresso"; price = 250; desc = "Strong coffee shot"; spicy = $false; veg = $true; cal = 5},
            @{name = "Cappuccino"; price = 350; desc = "Espresso with foam"; spicy = $false; veg = $true; cal = 120},
            @{name = "Latte"; price = 400; desc = "Espresso with milk"; spicy = $false; veg = $true; cal = 190},
            @{name = "Mocha"; price = 450; desc = "Coffee with chocolate"; spicy = $false; veg = $true; cal = 290}
        )
    },
    @{
        categoryName = "Tea"
        items = @(
            @{name = "Ceylon Black Tea"; price = 200; desc = "Premium black tea"; spicy = $false; veg = $true; cal = 5},
            @{name = "Green Tea"; price = 250; desc = "Refreshing green tea"; spicy = $false; veg = $true; cal = 5},
            @{name = "Iced Tea"; price = 300; desc = "Cold refreshing tea"; spicy = $false; veg = $true; cal = 90}
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

# 10. Healthy
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

# ============================================
# Create Categories and Menu Items
# ============================================
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
            Write-Host "  Category: $($category.categoryName) [Rest ID: $restId]" -ForegroundColor Cyan

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

# ============================================
# Summary
# ============================================
Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "  Seeding Complete!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Restaurants created: $($restaurantIds.Count)" -ForegroundColor Green
Write-Host "Menu items created: $totalItems" -ForegroundColor Green
Write-Host "`nOpen http://localhost:5173 to see QuickBite!" -ForegroundColor Magenta
Write-Host "=======================================`n" -ForegroundColor Cyan