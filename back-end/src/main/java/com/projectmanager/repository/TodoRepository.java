package com.projectmanager.repository;

import com.projectmanager.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TodoRepository extends JpaRepository<Todo, Integer>, JpaSpecificationExecutor<Todo> {

}