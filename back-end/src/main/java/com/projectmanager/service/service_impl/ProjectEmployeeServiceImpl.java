package com.projectmanager.service.service_impl;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.service.ProjectEmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public class ProjectEmployeeServiceImpl implements ProjectEmployeeService {
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
}
