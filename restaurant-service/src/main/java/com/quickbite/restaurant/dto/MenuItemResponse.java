package com.quickbite.restaurant.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemResponse {

    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long restaurantId;
    private String restaurantName;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Boolean isAvailable;
    private Integer preparationTimeMinutes;
    private Integer calories;
    private Boolean isVegetarian;
    private Boolean isSpicy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}