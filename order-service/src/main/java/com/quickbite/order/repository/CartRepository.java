package com.quickbite.order.repository;

import com.quickbite.order.entity.Cart;
import com.quickbite.order.entity.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByCustomerIdAndStatus(String customerId, CartStatus status);

    boolean existsByCustomerIdAndStatus(String customerId, CartStatus status);

}