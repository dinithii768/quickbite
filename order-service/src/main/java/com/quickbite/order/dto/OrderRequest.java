package com.quickbite.order.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {

    @NotBlank(message = "Customer ID is required")
    private String customerId;

    @NotNull(message = "Restaurant ID is required")
    private Long restaurantId;

    @NotNull(message = "Cart ID is required")
    private Long cartId;

    @Size(max = 300, message = "Delivery address cannot exceed 300 characters")
    private String deliveryAddress;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;

}