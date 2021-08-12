package com.projectmanager.repository;

import com.projectmanager.entity.ProjectEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, Integer>, JpaSpecificationExecutor<ProjectEmployee> {

}