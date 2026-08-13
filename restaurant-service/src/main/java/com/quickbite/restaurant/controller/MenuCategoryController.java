package com.quickbite.restaurant.controller;

import com.quickbite.restaurant.dto.ApiResponse;
import com.quickbite.restaurant.dto.MenuCategoryRequest;
import com.quickbite.restaurant.dto.MenuCategoryResponse;
import com.quickbite.restaurant.service.MenuCategoryService;
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
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Menu Category Management",
     description = "APIs for managing menu categories")
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;

    @GetMapping
    @Operation(summary = "Get all categories",
               description = "Retrieve all menu categories")
    public ResponseEntity<ApiResponse<List<MenuCategoryResponse>>> getAllCategories() {
        List<MenuCategoryResponse> categories = menuCategoryService.getAllCategories();
        return ResponseEntity.ok(
            ApiResponse.success("Categories retrieved successfully", categories));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID")
    public ResponseEntity<ApiResponse<MenuCategoryResponse>> getCategoryById(
            @PathVariable Long id) {
        MenuCategoryResponse category = menuCategoryService.getCategoryById(id);
        return ResponseEntity.ok(
            ApiResponse.success("Category retrieved successfully", category));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @Operation(summary = "Get categories by restaurant",
               description = "Retrieve all menu categories for a specific restaurant")
    public ResponseEntity<ApiResponse<List<MenuCategoryResponse>>> getCategoriesByRestaurant(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long restaurantId) {
        List<MenuCategoryResponse> categories =
            menuCategoryService.getCategoriesByRestaurant(restaurantId);
        return ResponseEntity.ok(
            ApiResponse.success("Categories retrieved successfully", categories));
    }

    @PostMapping
    @Operation(summary = "Create category",
               description = "Create a new menu category for a restaurant")
    public ResponseEntity<ApiResponse<MenuCategoryResponse>> createCategory(
            @Valid @RequestBody MenuCategoryRequest request) {
        MenuCategoryResponse category = menuCategoryService.createCategory(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Category created successfully", category));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update category")
    public ResponseEntity<ApiResponse<MenuCategoryResponse>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody MenuCategoryRequest request) {
        MenuCategoryResponse category = menuCategoryService.updateCategory(id, request);
        return ResponseEntity.ok(
            ApiResponse.success("Category updated successfully", category));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete category")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @PathVariable Long id) {
        menuCategoryService.deleteCategory(id);
        return ResponseEntity.ok(
            ApiResponse.success("Category deleted successfully"));
    }

}