Write-Host "Updating restaurant images..." -ForegroundColor Cyan

# Get JWT Token
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

# Update data for restaurants 1-5 with images
$updates = @(
    @{
        id = 1
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
        id = 2
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
        id = 3
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
        id = 4
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
        id = 5
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
    }
)

foreach ($restaurant in $updates) {
    try {
        $id = $restaurant.id
        $restaurant.Remove("id")
        $body = $restaurant | ConvertTo-Json

        Invoke-RestMethod `
            -Uri "http://localhost:8080/api/restaurants/$id" `
            -Method Put `
            -Headers $headers `
            -Body $body | Out-Null

        Write-Host "  Updated: $($restaurant.name) - ID $id" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($restaurant.name) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nDone! Refresh browser to see updated images." -ForegroundColor Magenta