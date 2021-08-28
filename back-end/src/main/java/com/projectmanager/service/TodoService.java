package com.projectmanager.service;

import com.projectmanager.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TodoService extends GeneralService<Todo> {


    Page<Todo> findByAssignedUser(Integer id, Pageable pageable);

    List<Todo> findByAssignedUser(Integer id);

    Page<Todo>findByTaskIdAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Todo>findByTaskIdAndDeletedIsFalse(Integer id);

    Page<Todo> searchTodo(String name, String status, String priority, String type,
                          Integer assignedFor, String startDate, String endDate, Integer taskId, Integer projectId, Pageable pageable);
}
