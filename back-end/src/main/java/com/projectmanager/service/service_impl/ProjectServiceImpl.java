package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Project;
import com.projectmanager.entity.User;
import com.projectmanager.repository.ProjectRepository;
import com.projectmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    // nhớ check delete nhé
    public List<Project> findAll(){
        return projectRepository.findAll();
    }

    @Override
    public Page<Project> getAll(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    @Override
    public Optional<Project> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Project create(Project project) {
        return null;
    }

    @Override
    public boolean update(Project project) {
        return false;
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }
}
