package com.quickbite.restaurant.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantResponse {

    private Long id;
    private String name;
    private String description;
    private String cuisineType;
    private String address;
    private String phone;
    private String email;
    private String imageUrl;
    private Boolean isActive;
    private Double rating;
    private Integer deliveryTimeMinutes;
    private Double minimumOrderAmount;
    private Double deliveryFee;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}