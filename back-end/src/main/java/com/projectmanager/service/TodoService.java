package com.projectmanager.service;

import com.projectmanager.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TodoService extends GeneralService<Todo> {

    Optional<Todo> findByName(String name);

}
