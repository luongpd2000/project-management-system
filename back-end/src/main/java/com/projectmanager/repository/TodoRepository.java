package com.projectmanager.repository;

import com.projectmanager.entity.Task;
import com.projectmanager.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Integer>, JpaSpecificationExecutor<Todo> {

    Optional<Todo> findByIdAndDeletedIsFalse(Integer id);

    Optional<Todo> findByNameAndDeletedIsFalse(String name);

    Page<Todo> findAllByDeletedIsFalse(Pageable pageable);

    Page<Todo> findByAssignedUserAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Todo> findByAssignedUserAndDeletedIsFalse(Integer id);

    Page<Todo>findByTaskIdAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Todo>findByTaskIdAndDeletedIsFalse(Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET assigned_user = 1 WHERE user_id = ?1",nativeQuery = true)
    Integer moveToAdminTodoByUserId(Integer uId);

    @Query(value="SELECT * FROM todo t where t.is_deleted = false  AND t.task_id = ?8 AND t.name like %?1% " +
            "AND (?2 = '' OR t.status = ?2)"  +
            "AND (?3 = '' OR t.priority = ?3) " +
            "AND (?4 = '' OR t.todo_type = ?4) " +
            "AND (?5 = 0 OR t.assigned_user = ?5) " +
            "AND (?6 = '' or t.start_date >= ?6) " +
            "AND (?7 = '' or t.end_date <= ?7) "
            , nativeQuery = true)
    Page<Todo> searchTodo(String name, String status, String priority, String type,
                          Integer assignedFor, String startDate, String endDate, Integer taskId, Pageable pageable);
}