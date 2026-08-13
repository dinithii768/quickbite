package com.quickbite.restaurant.service;

import com.quickbite.restaurant.dto.RestaurantRequest;
import com.quickbite.restaurant.dto.RestaurantResponse;
import com.quickbite.restaurant.entity.Restaurant;
import com.quickbite.restaurant.exception.BadRequestException;
import com.quickbite.restaurant.exception.ResourceNotFoundException;
import com.quickbite.restaurant.repository.RestaurantRepository;
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
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<RestaurantResponse> getAllRestaurants() {
        log.info("Fetching all restaurants");
        return restaurantRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<RestaurantResponse> getActiveRestaurants() {
        log.info("Fetching active restaurants");
        return restaurantRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RestaurantResponse getRestaurantById(Long id) {
        log.info("Fetching restaurant with id: {}", id);
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));
        return mapToResponse(restaurant);
    }

    public List<RestaurantResponse> searchRestaurants(String keyword) {
        log.info("Searching restaurants with keyword: {}", keyword);
        return restaurantRepository.searchRestaurants(keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        log.info("Creating restaurant: {}", request.getName());

        if (request.getEmail() != null &&
            restaurantRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(
                "Restaurant with email " + request.getEmail() + " already exists");
        }

        Restaurant restaurant = Restaurant.builder()
                .name(request.getName())
                .description(request.getDescription())
                .cuisineType(request.getCuisineType())
                .address(request.getAddress())
                .phone(request.getPhone())
                .email(request.getEmail())
                .imageUrl(request.getImageUrl())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .rating(0.0)
                .deliveryTimeMinutes(
                    request.getDeliveryTimeMinutes() != null
                    ? request.getDeliveryTimeMinutes() : 30)
                .minimumOrderAmount(
                    request.getMinimumOrderAmount() != null
                    ? request.getMinimumOrderAmount() : 0.0)
                .deliveryFee(
                    request.getDeliveryFee() != null
                    ? request.getDeliveryFee() : 0.0)
                .build();

        Restaurant saved = restaurantRepository.save(restaurant);
        log.info("Restaurant created with id: {}", saved.getId());
        return mapToResponse(saved);
    }

    public RestaurantResponse updateRestaurant(Long id, RestaurantRequest request) {
        log.info("Updating restaurant with id: {}", id);

        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setCuisineType(request.getCuisineType());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhone(request.getPhone());
        restaurant.setEmail(request.getEmail());
        restaurant.setImageUrl(request.getImageUrl());
        restaurant.setDeliveryTimeMinutes(
            request.getDeliveryTimeMinutes() != null
            ? request.getDeliveryTimeMinutes() : restaurant.getDeliveryTimeMinutes());
        restaurant.setMinimumOrderAmount(
            request.getMinimumOrderAmount() != null
            ? request.getMinimumOrderAmount() : restaurant.getMinimumOrderAmount());
        restaurant.setDeliveryFee(
            request.getDeliveryFee() != null
            ? request.getDeliveryFee() : restaurant.getDeliveryFee());

        if (request.getIsActive() != null) {
            restaurant.setIsActive(request.getIsActive());
        }

        Restaurant updated = restaurantRepository.save(restaurant);
        log.info("Restaurant updated with id: {}", updated.getId());
        return mapToResponse(updated);
    }

    public void deleteRestaurant(Long id) {
        log.info("Deleting restaurant with id: {}", id);
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant", id);
        }
        restaurantRepository.deleteById(id);
        log.info("Restaurant deleted with id: {}", id);
    }

    private RestaurantResponse mapToResponse(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .description(restaurant.getDescription())
                .cuisineType(restaurant.getCuisineType())
                .address(restaurant.getAddress())
                .phone(restaurant.getPhone())
                .email(restaurant.getEmail())
                .imageUrl(restaurant.getImageUrl())
                .isActive(restaurant.getIsActive())
                .rating(restaurant.getRating())
                .deliveryTimeMinutes(restaurant.getDeliveryTimeMinutes())
                .minimumOrderAmount(restaurant.getMinimumOrderAmount())
                .deliveryFee(restaurant.getDeliveryFee())
                .createdAt(restaurant.getCreatedAt())
                .updatedAt(restaurant.getUpdatedAt())
                .build();
    }

}