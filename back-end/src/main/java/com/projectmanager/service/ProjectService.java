package com.projectmanager.service;

import com.projectmanager.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService extends GeneralService<Project> {
    List<Project> findProjectByUserId(Integer userId);
    List<Project> getListProjectOfUser(Integer uId);
    List<Project> findAll();
    List<Project> searchProject(String name, String status, String startDate, String endDate);
    List<Project> searchProjectWithUserId(Integer uId, String name, String status, String startDate, String endDate);
}
