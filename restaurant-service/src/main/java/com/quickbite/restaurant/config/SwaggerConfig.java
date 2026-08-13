package com.quickbite.restaurant.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("QuickBite Restaurant Service API")
                        .description(
                            "REST API for Restaurant and Menu Management. " +
                            "All endpoints require X-API-KEY header for authentication.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Sharadha Pathirana")
                                .email("dinithisharadha2002@gmail.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8081")
                                .description("Local Development Server")))
                .addSecurityItem(new SecurityRequirement()
                        .addList("X-API-KEY"))
                .components(new Components()
                        .addSecuritySchemes("X-API-KEY",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.APIKEY)
                                        .in(SecurityScheme.In.HEADER)
                                        .name("X-API-KEY")
                                        .description(
                                            "API Key required for all endpoints. " +
                                            "Contact admin to get your API Key.")));
    }

}