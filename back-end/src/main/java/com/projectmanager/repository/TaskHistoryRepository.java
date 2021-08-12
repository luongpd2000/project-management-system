package com.projectmanager.repository;

import com.projectmanager.entity.TaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TaskHistoryRepository extends JpaRepository<TaskHistory, Integer>, JpaSpecificationExecutor<TaskHistory> {

}