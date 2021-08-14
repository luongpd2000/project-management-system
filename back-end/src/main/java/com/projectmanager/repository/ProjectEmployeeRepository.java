package com.projectmanager.repository;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, Integer>, JpaSpecificationExecutor<ProjectEmployee> {

    // tìm để xem quyền của 1 người
    Optional<ProjectEmployee> findByProjectIdAndUserIdAndDeleteIsFalse (Integer projectId, Integer userId);

    // lấy list nhân viên của 1 project
    Page<ProjectEmployee> findByProjectIdAndDeleteIsFalse(Integer projectId,Pageable pageable);
}