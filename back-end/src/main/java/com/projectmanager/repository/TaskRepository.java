package com.projectmanager.repository;

import com.projectmanager.entity.Task;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    Optional<Task> findByIdAndDeletedIsFalse(Integer id);

    Optional<Task> findByNameAndDeletedIsFalse(String name);

    Page<Task> findAllByDeletedIsFalse(Pageable pageable);

    Optional<Task> findByCreateUserAndDeletedIsFalse(Integer id);

    Page<Task>  getByProjectIdAndDeletedIsFalse(Integer id, Pageable pageable);

//    Page <Task> search()


}