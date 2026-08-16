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

$dragonWok = @{
    name = "Dragon Wok"
    description = "Best Chinese food in town"
    cuisineType = "Chinese"
    address = "456 Union Place, Colombo 02"
    phone = "+94772345678"
    email = "dragon@quickbite.com"
    imageUrl = "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800"
    deliveryTimeMinutes = 30
    minimumOrderAmount = 800.0
    deliveryFee = 200.0
    isActive = $true
}

$body = $dragonWok | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:8080/api/restaurants/2" `
    -Method Put `
    -Headers $headers `
    -Body $body | Out-Null

Write-Host "Dragon Wok updated with new image!" -ForegroundColor Green