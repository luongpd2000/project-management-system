package com.projectmanager.repository;

import com.projectmanager.entity.Project;
import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, Integer>, JpaSpecificationExecutor<ProjectEmployee> {

    // tìm để xem quyền của 1 người
    Optional<ProjectEmployee> findByProjectIdAndUserIdAndDeleteIsFalse (Integer projectId, Integer userId);

    Optional<ProjectEmployee> findByProjectIdAndUser(Integer projectId, User user);


    @Query( value = "SELECT pe.* FROM project_employee AS pe " +
            "WHERE pe.project_id = ?1 AND pe.user_id = ?2 ",nativeQuery = true)
    Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId);

    // lấy list nhân viên của 1 project
    List<ProjectEmployee> findByProjectId(Integer projectId, Sort sort);

    List<ProjectEmployee> findByProjectIdAndDeleteIsFalse(Integer projectId,Sort sort);

    List<ProjectEmployee> findByProjectIdAndDeleteIsTrue(Integer projectId,Sort sort);

    // lấy list project của 1 user
    Page<ProjectEmployee> findByUserIdAndDeleteIsFalse(Integer userId,Pageable pageable);

}