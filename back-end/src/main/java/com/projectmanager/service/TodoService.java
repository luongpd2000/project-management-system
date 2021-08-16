package com.projectmanager.service;

import com.projectmanager.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TodoService extends GeneralService<Todo> {

//    @Override
//    Page<Todo> getAll(Pageable pageable);
//
//    @Override
//    Optional<Todo> findById(Integer id);
//
//    @Override
//    boolean delete(Integer id);
//
//    @Override
//    Todo create(Todo todo);
//
//    @Override
//    boolean update(Todo todo);

    Optional<Todo> findByName(String name);
}
