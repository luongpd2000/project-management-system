package com.projectmanager.service.service_impl;

import com.projectmanager.entity.TaskHistory;
import com.projectmanager.repository.TaskHistoryRepository;
import com.projectmanager.service.TaskHistoryService;
import com.projectmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class TaskHistoryServiceImpl implements TaskHistoryService {

    @Autowired
    TaskHistoryRepository taskHistoryRepository;

    @Override
    public Page<TaskHistory> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<TaskHistory> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public TaskHistory create(TaskHistory taskHistory) {
        taskHistory.setUpdateDate(Date.valueOf(LocalDate.now()));
        return taskHistoryRepository.save(taskHistory);
    }

    @Override
    public boolean update(TaskHistory taskHistory) {
        return false;
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }
}
