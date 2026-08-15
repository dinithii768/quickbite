package com.quickbite.restaurant.controller;

import com.quickbite.restaurant.dto.ApiResponse;
import com.quickbite.restaurant.dto.RestaurantRequest;
import com.quickbite.restaurant.dto.RestaurantResponse;
import com.quickbite.restaurant.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Restaurant Management",
     description = "APIs for managing restaurants in QuickBite")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    @Operation(summary = "Get all restaurants",
               description = "Retrieve a list of all restaurants")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getAllRestaurants() {
        List<RestaurantResponse> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(
            ApiResponse.success("Restaurants retrieved successfully", restaurants));
    }

    @GetMapping("/active")
    @Operation(summary = "Get active restaurants",
               description = "Retrieve all currently active restaurants")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getActiveRestaurants() {
        List<RestaurantResponse> restaurants = restaurantService.getActiveRestaurants();
        return ResponseEntity.ok(
            ApiResponse.success("Active restaurants retrieved successfully", restaurants));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get restaurant by ID",
               description = "Retrieve a specific restaurant by its ID")
    public ResponseEntity<ApiResponse<RestaurantResponse>> getRestaurantById(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long id) {
        RestaurantResponse restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(
            ApiResponse.success("Restaurant retrieved successfully", restaurant));
    }

    @GetMapping("/search")
    @Operation(summary = "Search restaurants",
               description = "Search restaurants by name, cuisine type, or address")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> searchRestaurants(
            @Parameter(description = "Search keyword", required = true)
            @RequestParam String keyword) {
        List<RestaurantResponse> restaurants = restaurantService.searchRestaurants(keyword);
        return ResponseEntity.ok(
            ApiResponse.success("Search completed successfully", restaurants));
    }

    @PostMapping
    @Operation(summary = "Create restaurant",
               description = "Create a new restaurant")
    public ResponseEntity<ApiResponse<RestaurantResponse>> createRestaurant(
            @Valid @RequestBody RestaurantRequest request) {
        RestaurantResponse restaurant = restaurantService.createRestaurant(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Restaurant created successfully", restaurant));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update restaurant",
               description = "Update an existing restaurant by ID")
    public ResponseEntity<ApiResponse<RestaurantResponse>> updateRestaurant(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody RestaurantRequest request) {
        RestaurantResponse restaurant = restaurantService.updateRestaurant(id, request);
        return ResponseEntity.ok(
            ApiResponse.success("Restaurant updated successfully", restaurant));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete restaurant",
               description = "Delete a restaurant by ID")
    public ResponseEntity<ApiResponse<Void>> deleteRestaurant(
            @Parameter(description = "Restaurant ID", required = true)
            @PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok(
            ApiResponse.success("Restaurant deleted successfully"));
    }

}