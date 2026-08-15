package com.quickbite.order.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {

    private Long id;
    private Long menuItemId;
    private String menuItemName;
    private Double unitPrice;
    private Integer quantity;
    private Double subtotal;
    private LocalDateTime createdAt;

}