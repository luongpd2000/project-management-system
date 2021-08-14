package com.projectmanager.service.service_impl;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.repository.ProjectEmployeeRepository;
import com.projectmanager.service.ProjectEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public class ProjectEmployeeServiceImpl implements ProjectEmployeeService {

    @Autowired
    ProjectEmployeeRepository projectEmployeeRepository;

    @Override
    public Page<ProjectEmployee> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<ProjectEmployee> findById(Integer id) {
        return Optional.empty();
    }



    @Override
    public ProjectEmployee create(ProjectEmployee projectEmployee) {
        return null;
    }

    @Override
    public boolean update(ProjectEmployee projectEmployee) {
        return false;
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }

    public Page<ProjectEmployee> findByProjectId(Integer id,Pageable pageable) {
        return projectEmployeeRepository.findByProjectIdAndDeleteIsFalse(id,pageable);
    }
}
