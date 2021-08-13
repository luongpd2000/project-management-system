package com.projectmanager.repository;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsernameAndDeleteIsFalse(String username);

    Page<User> findByCreateUserAndDeleteIsFalse(Long idCreateUser, Pageable pageable);

    Page<User> findAllByDeleteIsFalse(Pageable pageable);

    Optional<User> findByIdAndDeleteIsFalse(Long id);
}