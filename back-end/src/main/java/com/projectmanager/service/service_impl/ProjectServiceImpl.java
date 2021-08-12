package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Project;
import com.projectmanager.repository.ProjectRepository;
import com.projectmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public List<Project> findAll(){
        return projectRepository.findAll();
    }

}
