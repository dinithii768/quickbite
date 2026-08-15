package com.quickbite.restaurant.service;

import com.quickbite.restaurant.dto.MenuCategoryRequest;
import com.quickbite.restaurant.dto.MenuCategoryResponse;
import com.quickbite.restaurant.entity.MenuCategory;
import com.quickbite.restaurant.entity.Restaurant;
import com.quickbite.restaurant.exception.BadRequestException;
import com.quickbite.restaurant.exception.ResourceNotFoundException;
import com.quickbite.restaurant.repository.MenuCategoryRepository;
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
public class MenuCategoryService {

    private final MenuCategoryRepository menuCategoryRepository;
    private final RestaurantRepository restaurantRepository;

    public List<MenuCategoryResponse> getAllCategories() {
        log.info("Fetching all menu categories");
        return menuCategoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MenuCategoryResponse getCategoryById(Long id) {
        log.info("Fetching category with id: {}", id);
        MenuCategory category = menuCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory", id));
        return mapToResponse(category);
    }

    public List<MenuCategoryResponse> getCategoriesByRestaurant(Long restaurantId) {
        log.info("Fetching categories for restaurant: {}", restaurantId);
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant", restaurantId);
        }
        return menuCategoryRepository
                .findByRestaurantIdOrderByDisplayOrderAsc(restaurantId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MenuCategoryResponse createCategory(MenuCategoryRequest request) {
        log.info("Creating category: {} for restaurant: {}",
                  request.getName(), request.getRestaurantId());

        Restaurant restaurant = restaurantRepository
                .findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Restaurant", request.getRestaurantId()));

        if (menuCategoryRepository.existsByNameAndRestaurantId(
                request.getName(), request.getRestaurantId())) {
            throw new BadRequestException(
                "Category '" + request.getName() +
                "' already exists for this restaurant");
        }

        MenuCategory category = MenuCategory.builder()
                .restaurant(restaurant)
                .name(request.getName())
                .description(request.getDescription())
                .displayOrder(request.getDisplayOrder() != null
                    ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null
                    ? request.getIsActive() : true)
                .build();

        MenuCategory saved = menuCategoryRepository.save(category);
        log.info("Category created with id: {}", saved.getId());
        return mapToResponse(saved);
    }

    public MenuCategoryResponse updateCategory(Long id, MenuCategoryRequest request) {
        log.info("Updating category with id: {}", id);

        MenuCategory category = menuCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory", id));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        if (request.getDisplayOrder() != null) {
            category.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }

        MenuCategory updated = menuCategoryRepository.save(category);
        return mapToResponse(updated);
    }

    public void deleteCategory(Long id) {
        log.info("Deleting category with id: {}", id);
        if (!menuCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("MenuCategory", id);
        }
        menuCategoryRepository.deleteById(id);
        log.info("Category deleted with id: {}", id);
    }

    private MenuCategoryResponse mapToResponse(MenuCategory category) {
        return MenuCategoryResponse.builder()
                .id(category.getId())
                .restaurantId(category.getRestaurant().getId())
                .restaurantName(category.getRestaurant().getName())
                .name(category.getName())
                .description(category.getDescription())
                .displayOrder(category.getDisplayOrder())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }

}