package com.quickbite.order.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDto {

    private Long id;
    private String name;
    private Double price;
    private Boolean isAvailable;
    private Long restaurantId;
    private String restaurantName;
    private String description;
    private String imageUrl;

}