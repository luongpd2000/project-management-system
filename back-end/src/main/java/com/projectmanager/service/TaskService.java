package com.projectmanager.service;

import com.projectmanager.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskService extends GeneralService<Task>{

    List<Task> findByUser(Integer id);

    Page<Task> findByUserPageable(Integer id,Pageable pageable);

    Page<Task> findByProjectPageable(Integer id, Pageable pageable);

    List<Task> findByProject(Integer id);

    Page<Task> searchTask(String name, String status, String priority, String type,
                          Integer leaderId, String startDate, String endDate,Integer projectId, Pageable pageable);


}
