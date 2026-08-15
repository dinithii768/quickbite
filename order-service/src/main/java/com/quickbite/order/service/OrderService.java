package com.quickbite.order.service;

import com.quickbite.order.dto.*;
import com.quickbite.order.entity.*;
import com.quickbite.order.exception.BadRequestException;
import com.quickbite.order.exception.ResourceNotFoundException;
import com.quickbite.order.repository.CartItemRepository;
import com.quickbite.order.repository.CartRepository;
import com.quickbite.order.repository.OrderItemRepository;
import com.quickbite.order.repository.OrderRepository;
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
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public List<OrderResponse> getAllOrders() {
        log.info("Fetching all orders");
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(Long id) {
        log.info("Fetching order: {}", id);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
        return mapToResponse(order);
    }

    public List<OrderResponse> getOrdersByCustomer(String customerId) {
        log.info("Fetching orders for customer: {}", customerId);
        return orderRepository
                .findByCustomerIdOrderByCreatedAtDesc(customerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getOrdersByRestaurant(Long restaurantId) {
        log.info("Fetching orders for restaurant: {}", restaurantId);
        return orderRepository
                .findByRestaurantIdOrderByCreatedAtDesc(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getOrdersByStatus(String status) {
        log.info("Fetching orders with status: {}", status);
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            return orderRepository
                    .findByStatusOrderByCreatedAtDesc(orderStatus)
                    .stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid order status: " + status);
        }
    }

    public OrderResponse createOrder(OrderRequest request) {
        log.info("Creating order for customer: {}", request.getCustomerId());

        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cart", request.getCartId()));

        if (cart.getStatus() != CartStatus.ACTIVE) {
            throw new BadRequestException(
                "Cart is not active. Cannot create order.");
        }

        List<CartItem> cartItems =
            cartItemRepository.findByCartId(cart.getId());

        if (cartItems.isEmpty()) {
            throw new BadRequestException(
                "Cart is empty. Cannot create order.");
        }

        double totalAmount = cartItems.stream()
                .mapToDouble(CartItem::getSubtotal)
                .sum();

        Order order = Order.builder()
                .customerId(request.getCustomerId())
                .restaurantId(request.getRestaurantId())
                .cartId(cart.getId())
                .status(OrderStatus.PENDING)
                .totalAmount(totalAmount)
                .deliveryAddress(request.getDeliveryAddress())
                .notes(request.getNotes())
                .build();

        Order savedOrder = orderRepository.save(order);

        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .menuItemId(cartItem.getMenuItemId())
                    .menuItemName(cartItem.getMenuItemName())
                    .unitPrice(cartItem.getUnitPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(cartItem.getSubtotal())
                    .build();
            orderItemRepository.save(orderItem);
        }

        cart.setStatus(CartStatus.CHECKED_OUT);
        cartRepository.save(cart);

        log.info("Order created: {}", savedOrder.getId());
        return mapToResponse(savedOrder);
    }

    public OrderResponse checkoutOrder(Long orderId) {
        log.info("Checking out order: {}", orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException(
                "Only pending orders can be checked out");
        }

        order.setStatus(OrderStatus.CONFIRMED);
        Order updated = orderRepository.save(order);
        log.info("Order confirmed: {}", orderId);
        return mapToResponse(updated);
    }

    public OrderResponse updateOrderStatus(Long orderId,
                                           OrderStatusRequest request) {
        log.info("Updating order {} status to: {}",
                  orderId, request.getStatus());

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        try {
            OrderStatus newStatus =
                OrderStatus.valueOf(request.getStatus().toUpperCase());
            order.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                "Invalid status: " + request.getStatus() +
                ". Valid values: PENDING, CONFIRMED, PREPARING, " +
                "READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED");
        }

        Order updated = orderRepository.save(order);
        return mapToResponse(updated);
    }

    public void deleteOrder(Long id) {
        log.info("Deleting order: {}", id);
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order", id);
        }
        orderRepository.deleteById(id);
    }

    private OrderResponse mapToResponse(Order order) {
        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());

        List<OrderItemResponse> itemResponses = items.stream()
                .map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .menuItemId(item.getMenuItemId())
                        .menuItemName(item.getMenuItemName())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomerId())
                .restaurantId(order.getRestaurantId())
                .cartId(order.getCartId())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .deliveryAddress(order.getDeliveryAddress())
                .notes(order.getNotes())
                .orderItems(itemResponses)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

}