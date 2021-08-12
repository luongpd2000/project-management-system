package com.projectmanager.repository;

import com.projectmanager.entity.TodoHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TodoHistoryRepository extends JpaRepository<TodoHistory, Integer>, JpaSpecificationExecutor<TodoHistory> {

}