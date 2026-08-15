package com.quickbite.order.client;

import com.quickbite.order.dto.ApiResponse;
import com.quickbite.order.dto.MenuItemDto;
import com.quickbite.order.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class RestaurantServiceClient {

    private final RestTemplate restTemplate;
    private final String restaurantServiceUrl;
    private final String restaurantApiKey = "qb-restaurant-api-key-x7k2p9m4n1";

    public RestaurantServiceClient(
            RestTemplate restTemplate,
            @Value("${restaurant.service.url}") String restaurantServiceUrl) {
        this.restTemplate = restTemplate;
        this.restaurantServiceUrl = restaurantServiceUrl;
    }

    public MenuItemDto getMenuItemById(Long menuItemId) {
        log.info("Calling restaurant service for menu item: {}", menuItemId);

        String url = restaurantServiceUrl + "/api/menu-items/" + menuItemId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-API-KEY", restaurantApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<ApiResponse<MenuItemDto>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<ApiResponse<MenuItemDto>>() {}
            );

            if (response.getStatusCode() == HttpStatus.OK
                    && response.getBody() != null
                    && response.getBody().getData() != null) {
                log.info("Menu item retrieved: {}", menuItemId);
                return response.getBody().getData();
            } else {
                throw new BadRequestException(
                    "Menu item not found with id: " + menuItemId);
            }

        } catch (Exception e) {
            log.error("Error calling restaurant service: {}", e.getMessage());
            throw new BadRequestException(
                "Could not retrieve menu item. " +
                "Restaurant service may be unavailable.");
        }
    }

}