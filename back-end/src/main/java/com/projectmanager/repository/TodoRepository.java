package com.projectmanager.repository;

import com.projectmanager.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Integer>, JpaSpecificationExecutor<Todo> {

    Optional<Todo> findByIdAndDeletedIsFalse(Integer id);

    Optional<Todo> findByNameAndDeletedIsFalse(String name);

    Page<Todo> findAllByDeletedIsFalse(Pageable pageable);

    Page<Todo> findByAssignedUserAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Todo> findByAssignedUserAndDeletedIsFalse(Integer id);

    Page<Todo>findByTaskIdAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Todo>findByTaskIdAndDeletedIsFalse(Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET assigned_user = 1 WHERE user_id = ?1",nativeQuery = true)
    Integer moveToAdminTodoByUserId(Integer uId);
}