package com.projectmanager.service.service_impl;

import com.projectmanager.entity.TodoHistory;
import com.projectmanager.repository.TodoHistoryRepository;
import com.projectmanager.service.TodoHistoryService;
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
public class TodoHistoryServiceImpl implements TodoHistoryService {


    @Autowired
    TodoHistoryRepository todoHistoryRepository;

    @Override
    public Page<TodoHistory> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<TodoHistory> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public TodoHistory create(TodoHistory todoHistory) {
        todoHistory.setUpdateDate(Date.valueOf(LocalDate.now()));
        return todoHistoryRepository.save(todoHistory);
    }

    @Override
    public boolean update(TodoHistory todoHistory) {
        return false;
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }
}
