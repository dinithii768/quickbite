package com.quickbite.order.controller;

import com.quickbite.order.dto.ApiResponse;
import com.quickbite.order.dto.CartItemRequest;
import com.quickbite.order.dto.CartResponse;
import com.quickbite.order.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Cart Management",
     description = "APIs for managing customer shopping cart")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{customerId}")
    @Operation(summary = "Get customer cart",
               description = "Get the active cart for a customer")
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId) {
        CartResponse cart = cartService.getCartByCustomerId(customerId);
        return ResponseEntity.ok(
            ApiResponse.success("Cart retrieved successfully", cart));
    }

    @PostMapping("/{customerId}/items")
    @Operation(summary = "Add item to cart",
               description = "Add a menu item to customer cart")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId,
            @Valid @RequestBody CartItemRequest request) {
        CartResponse cart = cartService.addItemToCart(customerId, request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Item added to cart successfully", cart));
    }

    @PutMapping("/{customerId}/items/{itemId}")
    @Operation(summary = "Update cart item",
               description = "Update quantity of a cart item")
    public ResponseEntity<ApiResponse<CartResponse>> updateItem(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId,
            @Parameter(description = "Cart Item ID", required = true)
            @PathVariable Long itemId,
            @Valid @RequestBody CartItemRequest request) {
        CartResponse cart = cartService.updateCartItem(customerId, itemId, request);
        return ResponseEntity.ok(
            ApiResponse.success("Cart item updated successfully", cart));
    }

    @DeleteMapping("/{customerId}/items/{itemId}")
    @Operation(summary = "Remove cart item",
               description = "Remove a specific item from cart")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId,
            @Parameter(description = "Cart Item ID", required = true)
            @PathVariable Long itemId) {
        CartResponse cart = cartService.removeItemFromCart(customerId, itemId);
        return ResponseEntity.ok(
            ApiResponse.success("Item removed from cart successfully", cart));
    }

    @DeleteMapping("/{customerId}")
    @Operation(summary = "Clear cart",
               description = "Remove all items from customer cart")
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId) {
        cartService.clearCart(customerId);
        return ResponseEntity.ok(
            ApiResponse.success("Cart cleared successfully"));
    }

}