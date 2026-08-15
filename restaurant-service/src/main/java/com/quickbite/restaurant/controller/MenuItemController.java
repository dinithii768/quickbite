package com.quickbite.restaurant.controller;

import com.quickbite.restaurant.dto.ApiResponse;
import com.quickbite.restaurant.dto.MenuItemRequest;
import com.quickbite.restaurant.dto.MenuItemResponse;
import com.quickbite.restaurant.service.MenuItemService;
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
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Menu Item Management",
     description = "APIs for managing menu items")
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    @Operation(summary = "Get all menu items",
               description = "Retrieve all menu items across all restaurants")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getAllMenuItems() {
        List<MenuItemResponse> items = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(
            ApiResponse.success("Menu items retrieved successfully", items));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get menu item by ID")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItemById(
            @PathVariable Long id) {
        MenuItemResponse item = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(
            ApiResponse.success("Menu item retrieved successfully", item));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @Operation(summary = "Get menu items by restaurant",
               description = "Retrieve all menu items for a specific restaurant")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getMenuItemsByRestaurant(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long restaurantId) {
        List<MenuItemResponse> items =
            menuItemService.getMenuItemsByRestaurant(restaurantId);
        return ResponseEntity.ok(
            ApiResponse.success("Menu items retrieved successfully", items));
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get menu items by category",
               description = "Retrieve all menu items in a specific category")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getMenuItemsByCategory(
            @Parameter(description = "Category ID", required = true)
            @PathVariable Long categoryId) {
        List<MenuItemResponse> items =
            menuItemService.getMenuItemsByCategory(categoryId);
        return ResponseEntity.ok(
            ApiResponse.success("Menu items retrieved successfully", items));
    }

    @GetMapping("/search")
    @Operation(summary = "Search menu items",
               description = "Search menu items by name")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> searchMenuItems(
            @Parameter(description = "Search keyword", required = true)
            @RequestParam String keyword) {
        List<MenuItemResponse> items = menuItemService.searchMenuItems(keyword);
        return ResponseEntity.ok(
            ApiResponse.success("Search completed successfully", items));
    }

    @PostMapping
    @Operation(summary = "Create menu item",
               description = "Create a new menu item")
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(
            @Valid @RequestBody MenuItemRequest request) {
        MenuItemResponse item = menuItemService.createMenuItem(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Menu item created successfully", item));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update menu item")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuItemRequest request) {
        MenuItemResponse item = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(
            ApiResponse.success("Menu item updated successfully", item));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete menu item")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(
            @PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(
            ApiResponse.success("Menu item deleted successfully"));
    }

}