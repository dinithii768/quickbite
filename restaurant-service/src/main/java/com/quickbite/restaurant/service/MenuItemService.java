package com.quickbite.restaurant.service;

import com.quickbite.restaurant.dto.MenuItemRequest;
import com.quickbite.restaurant.dto.MenuItemResponse;
import com.quickbite.restaurant.entity.MenuCategory;
import com.quickbite.restaurant.entity.MenuItem;
import com.quickbite.restaurant.entity.Restaurant;
import com.quickbite.restaurant.exception.ResourceNotFoundException;
import com.quickbite.restaurant.repository.MenuCategoryRepository;
import com.quickbite.restaurant.repository.MenuItemRepository;
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
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final RestaurantRepository restaurantRepository;

    public List<MenuItemResponse> getAllMenuItems() {
        log.info("Fetching all menu items");
        return menuItemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MenuItemResponse getMenuItemById(Long id) {
        log.info("Fetching menu item with id: {}", id);
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem", id));
        return mapToResponse(item);
    }

    public List<MenuItemResponse> getMenuItemsByRestaurant(Long restaurantId) {
        log.info("Fetching menu items for restaurant: {}", restaurantId);
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant", restaurantId);
        }
        return menuItemRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MenuItemResponse> getMenuItemsByCategory(Long categoryId) {
        log.info("Fetching menu items for category: {}", categoryId);
        if (!menuCategoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("MenuCategory", categoryId);
        }
        return menuItemRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MenuItemResponse> searchMenuItems(String keyword) {
        log.info("Searching menu items with keyword: {}", keyword);
        return menuItemRepository.searchAllItems(keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        log.info("Creating menu item: {}", request.getName());

        Restaurant restaurant = restaurantRepository
                .findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Restaurant", request.getRestaurantId()));

        MenuCategory category = menuCategoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "MenuCategory", request.getCategoryId()));

        MenuItem item = MenuItem.builder()
                .restaurant(restaurant)
                .category(category)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .isAvailable(request.getIsAvailable() != null
                    ? request.getIsAvailable() : true)
                .preparationTimeMinutes(request.getPreparationTimeMinutes() != null
                    ? request.getPreparationTimeMinutes() : 15)
                .calories(request.getCalories())
                .isVegetarian(request.getIsVegetarian() != null
                    ? request.getIsVegetarian() : false)
                .isSpicy(request.getIsSpicy() != null
                    ? request.getIsSpicy() : false)
                .build();

        MenuItem saved = menuItemRepository.save(item);
        log.info("Menu item created with id: {}", saved.getId());
        return mapToResponse(saved);
    }

    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        log.info("Updating menu item with id: {}", id);

        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem", id));

        if (request.getCategoryId() != null &&
            !request.getCategoryId().equals(item.getCategory().getId())) {
            MenuCategory newCategory = menuCategoryRepository
                    .findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                        "MenuCategory", request.getCategoryId()));
            item.setCategory(newCategory);
        }

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setImageUrl(request.getImageUrl());
        if (request.getIsAvailable() != null) {
            item.setIsAvailable(request.getIsAvailable());
        }
        if (request.getPreparationTimeMinutes() != null) {
            item.setPreparationTimeMinutes(request.getPreparationTimeMinutes());
        }
        if (request.getCalories() != null) {
            item.setCalories(request.getCalories());
        }
        if (request.getIsVegetarian() != null) {
            item.setIsVegetarian(request.getIsVegetarian());
        }
        if (request.getIsSpicy() != null) {
            item.setIsSpicy(request.getIsSpicy());
        }

        MenuItem updated = menuItemRepository.save(item);
        log.info("Menu item updated with id: {}", updated.getId());
        return mapToResponse(updated);
    }

    public void deleteMenuItem(Long id) {
        log.info("Deleting menu item with id: {}", id);
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("MenuItem", id);
        }
        menuItemRepository.deleteById(id);
        log.info("Menu item deleted with id: {}", id);
    }

    private MenuItemResponse mapToResponse(MenuItem item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .categoryId(item.getCategory().getId())
                .categoryName(item.getCategory().getName())
                .restaurantId(item.getRestaurant().getId())
                .restaurantName(item.getRestaurant().getName())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .isAvailable(item.getIsAvailable())
                .preparationTimeMinutes(item.getPreparationTimeMinutes())
                .calories(item.getCalories())
                .isVegetarian(item.getIsVegetarian())
                .isSpicy(item.getIsSpicy())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }

}