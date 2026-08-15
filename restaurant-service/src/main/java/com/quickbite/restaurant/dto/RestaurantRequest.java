package com.quickbite.restaurant.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantRequest {

    @NotBlank(message = "Restaurant name is required")
    @Size(min = 2, max = 150, message = "Name must be between 2 and 150 characters")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Cuisine type is required")
    @Size(max = 100, message = "Cuisine type cannot exceed 100 characters")
    private String cuisineType;

    @NotBlank(message = "Address is required")
    @Size(max = 300, message = "Address cannot exceed 300 characters")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{7,15}$",
             message = "Phone number must be valid (7-15 digits)")
    private String phone;

    @Email(message = "Email must be valid")
    private String email;

    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;

    @Min(value = 0, message = "Delivery time cannot be negative")
    @Max(value = 180, message = "Delivery time cannot exceed 180 minutes")
    private Integer deliveryTimeMinutes;

    @Min(value = 0, message = "Minimum order amount cannot be negative")
    private Double minimumOrderAmount;

    @Min(value = 0, message = "Delivery fee cannot be negative")
    private Double deliveryFee;

    private Boolean isActive;

}