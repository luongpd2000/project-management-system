package com.projectmanager.service.service_impl;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.repository.ProjectEmployeeRepository;
import com.projectmanager.service.ProjectEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectEmployeeServiceImpl implements ProjectEmployeeService {

    @Autowired
    ProjectEmployeeRepository projectEmployeeRepository;

    @Override
    public Page<ProjectEmployee> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<ProjectEmployee> findById(Integer id) {
        return projectEmployeeRepository.findById(id);
    }



    @Override
    public ProjectEmployee create(ProjectEmployee projectEmployee) {
        projectEmployee.setDelete(false);
        return projectEmployeeRepository.save(projectEmployee);
    }

    @Override
    public boolean update(ProjectEmployee projectEmployee) {
        Optional<ProjectEmployee> employee = projectEmployeeRepository.findByProjectIdAndUserIdAndDeleteIsFalse
                (projectEmployee.getProjectId(), projectEmployee.getUserId());
        if(!employee.isPresent()){
            return false;
        }else {
            employee.get().setRole(projectEmployee.getRole());
            employee.get().setDes(projectEmployee.getDes());
            projectEmployeeRepository.save(employee.get());
        }
        return true;
    }

    @Override
    public boolean delete(Integer id) {
        Optional<ProjectEmployee> employee = projectEmployeeRepository.findById(id);
        if (!employee.isPresent() || employee.get().getDelete()) {
            return false;
        }else {
            employee.get().setDelete(true);
        }
        return true;
    }

    @Override
    public Page<ProjectEmployee> findByProjectId(Integer id, Pageable pageable) {
        return projectEmployeeRepository.findByProjectIdAndDeleteIsFalse(id,pageable);
    }

    @Override
    public Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId) {
        return projectEmployeeRepository.findByProjectIdAndUserIdAndDeleteIsFalse(projectId, userId);
    }

    @Override
    public Page<ProjectEmployee> findByUserIdAndDeleteIsFalse(Integer userId, Pageable pageable) {
        return projectEmployeeRepository.findByUserIdAndDeleteIsFalse(userId,pageable);
    }
}
