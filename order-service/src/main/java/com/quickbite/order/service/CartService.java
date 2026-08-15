package com.quickbite.order.service;

import com.quickbite.order.client.RestaurantServiceClient;
import com.quickbite.order.dto.*;
import com.quickbite.order.entity.*;
import com.quickbite.order.exception.BadRequestException;
import com.quickbite.order.exception.ResourceNotFoundException;
import com.quickbite.order.repository.CartItemRepository;
import com.quickbite.order.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final RestaurantServiceClient restaurantServiceClient;

    public CartResponse getCartByCustomerId(String customerId) {
        log.info("Getting cart for customer: {}", customerId);
        Cart cart = cartRepository
                .findByCustomerIdAndStatus(customerId, CartStatus.ACTIVE)
                .orElse(null);

        if (cart == null) {
            return CartResponse.builder()
                    .customerId(customerId)
                    .status(CartStatus.ACTIVE.name())
                    .totalAmount(0.0)
                    .totalItems(0)
                    .items(List.of())
                    .build();
        }

        return mapToCartResponse(cart);
    }

    public CartResponse addItemToCart(String customerId,
                                      CartItemRequest request) {
        log.info("Adding item {} to cart for customer: {}",
                  request.getMenuItemId(), customerId);

        MenuItemDto menuItem =
            restaurantServiceClient.getMenuItemById(request.getMenuItemId());

        if (!menuItem.getIsAvailable()) {
            throw new BadRequestException(
                "Menu item '" + menuItem.getName() + "' is not available");
        }

        Cart existingCart = cartRepository
                .findByCustomerIdAndStatus(customerId, CartStatus.ACTIVE)
                .orElse(null);

        final Cart savedCart;

        if (existingCart == null) {
            Cart newCart = Cart.builder()
                    .customerId(customerId)
                    .restaurantId(menuItem.getRestaurantId())
                    .status(CartStatus.ACTIVE)
                    .build();
            savedCart = cartRepository.save(newCart);
        } else {
            if (!existingCart.getRestaurantId().equals(menuItem.getRestaurantId())) {
                throw new BadRequestException(
                    "Cannot add items from different restaurants to the same cart. " +
                    "Please clear your cart first.");
            }
            savedCart = existingCart;
        }

        CartItem existingItem = cartItemRepository
                .findByCartIdAndMenuItemId(
                    savedCart.getId(), request.getMenuItemId())
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(
                existingItem.getQuantity() + request.getQuantity());
            existingItem.setSubtotal(
                existingItem.getUnitPrice() * existingItem.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(savedCart)
                    .menuItemId(request.getMenuItemId())
                    .menuItemName(menuItem.getName())
                    .unitPrice(menuItem.getPrice())
                    .quantity(request.getQuantity())
                    .subtotal(menuItem.getPrice() * request.getQuantity())
                    .build();
            cartItemRepository.save(newItem);
        }

        Cart updatedCart = cartRepository.findById(savedCart.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cart", savedCart.getId()));

        return mapToCartResponse(updatedCart);
    }

    public CartResponse updateCartItem(String customerId,
                                       Long itemId,
                                       CartItemRequest request) {
        log.info("Updating cart item {} for customer: {}", itemId, customerId);

        Cart cart = cartRepository
                .findByCustomerIdAndStatus(customerId, CartStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Active cart not found for customer: " + customerId));

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "CartItem", itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException(
                "Item does not belong to customer cart");
        }

        item.setQuantity(request.getQuantity());
        item.setSubtotal(item.getUnitPrice() * request.getQuantity());
        cartItemRepository.save(item);

        Cart updatedCart = cartRepository.findById(cart.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cart", cart.getId()));

        return mapToCartResponse(updatedCart);
    }

    public CartResponse removeItemFromCart(String customerId, Long itemId) {
        log.info("Removing item {} from cart for customer: {}",
                  itemId, customerId);

        Cart cart = cartRepository
                .findByCustomerIdAndStatus(customerId, CartStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Active cart not found for customer: " + customerId));

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "CartItem", itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException(
                "Item does not belong to customer cart");
        }

        cartItemRepository.delete(item);

        Cart updatedCart = cartRepository.findById(cart.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cart", cart.getId()));

        return mapToCartResponse(updatedCart);
    }

    public void clearCart(String customerId) {
        log.info("Clearing cart for customer: {}", customerId);

        Cart cart = cartRepository
                .findByCustomerIdAndStatus(customerId, CartStatus.ACTIVE)
                .orElse(null);

        if (cart != null) {
            cartItemRepository.deleteByCartId(cart.getId());
            cart.setStatus(CartStatus.ABANDONED);
            cartRepository.save(cart);
        }
    }

    private CartResponse mapToCartResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponse> itemResponses = items.stream()
                .map(item -> CartItemResponse.builder()
                        .id(item.getId())
                        .menuItemId(item.getMenuItemId())
                        .menuItemName(item.getMenuItemName())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .createdAt(item.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        double totalAmount = items.stream()
                .mapToDouble(CartItem::getSubtotal)
                .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .customerId(cart.getCustomerId())
                .restaurantId(cart.getRestaurantId())
                .status(cart.getStatus().name())
                .totalAmount(totalAmount)
                .totalItems(items.size())
                .items(itemResponses)
                .createdAt(cart.getCreatedAt())
                .updatedAt(cart.getUpdatedAt())
                .build();
    }

}