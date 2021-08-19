package com.projectmanager.service;

import com.projectmanager.entity.ProjectEmployee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Optional;

public interface ProjectEmployeeService extends GeneralService<ProjectEmployee>{

    Page<ProjectEmployee> findByProjectId(Integer id, Pageable pageable);

    Optional<ProjectEmployee> findByProjectIdAndUserId(Integer projectId, Integer userId);

    Page<ProjectEmployee> findByUserIdAndDeleteIsFalse(Integer userId,Pageable pageable);

    Boolean addPartner(ArrayList<ProjectEmployee> list);

}
