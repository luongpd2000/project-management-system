package com.projectmanager.repository;

import com.projectmanager.entity.Task;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    Optional<Task> findByIdAndDeletedIsFalse(Integer id);

    Optional<Task> findByNameAndDeletedIsFalse(String name);

    Page<Task> findAllByDeletedIsFalse(Pageable pageable);

    List<Task> findByCreateUserAndDeletedIsFalse(Integer id);

    Page<Task> findByCreateUserAndDeletedIsFalse(Integer id,Pageable pageable);

    List<Task> findByTaskManagerIdAndDeletedIsFalse(Integer id);

    Page<Task> findByTaskManagerIdAndDeletedIsFalse(Integer id,Pageable pageable);

    Page<Task>  getByProjectIdAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Task>  getByProjectIdAndDeletedIsFalse(Integer id);


//    Page <Task> search()


}