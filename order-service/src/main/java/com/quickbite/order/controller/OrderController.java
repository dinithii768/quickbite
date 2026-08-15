package com.quickbite.order.controller;

import com.quickbite.order.dto.ApiResponse;
import com.quickbite.order.dto.OrderRequest;
import com.quickbite.order.dto.OrderResponse;
import com.quickbite.order.dto.OrderStatusRequest;
import com.quickbite.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Order Management",
     description = "APIs for managing customer orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @Operation(summary = "Get all orders",
               description = "Retrieve all orders")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(
            ApiResponse.success("Orders retrieved successfully", orders));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(
            @PathVariable Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return ResponseEntity.ok(
            ApiResponse.success("Order retrieved successfully", order));
    }

    @GetMapping("/customer/{customerId}")
    @Operation(summary = "Get orders by customer",
               description = "Retrieve all orders for a specific customer")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByCustomer(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable String customerId) {
        List<OrderResponse> orders = orderService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(
            ApiResponse.success("Customer orders retrieved successfully", orders));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @Operation(summary = "Get orders by restaurant",
               description = "Retrieve all orders for a specific restaurant")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByRestaurant(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long restaurantId) {
        List<OrderResponse> orders = orderService.getOrdersByRestaurant(restaurantId);
        return ResponseEntity.ok(
            ApiResponse.success("Restaurant orders retrieved successfully", orders));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get orders by status",
               description = "Retrieve all orders with specific status")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByStatus(
            @Parameter(description = "Order Status", required = true)
            @PathVariable String status) {
        List<OrderResponse> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(
            ApiResponse.success("Orders retrieved successfully", orders));
    }

    @PostMapping
    @Operation(summary = "Create order",
               description = "Create a new order from cart")
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody OrderRequest request) {
        OrderResponse order = orderService.createOrder(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Order created successfully", order));
    }

    @PostMapping("/{id}/checkout")
    @Operation(summary = "Checkout order",
               description = "Confirm and checkout an order")
    public ResponseEntity<ApiResponse<OrderResponse>> checkoutOrder(
            @PathVariable Long id) {
        OrderResponse order = orderService.checkoutOrder(id);
        return ResponseEntity.ok(
            ApiResponse.success("Order checked out successfully", order));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update order status",
               description = "Update the status of an order")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusRequest request) {
        OrderResponse order = orderService.updateOrderStatus(id, request);
        return ResponseEntity.ok(
            ApiResponse.success("Order status updated successfully", order));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete order")
    public ResponseEntity<ApiResponse<Void>> deleteOrder(
            @PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(
            ApiResponse.success("Order deleted successfully"));
    }

}