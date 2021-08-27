package com.projectmanager.repository;

import com.projectmanager.entity.Task;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    Optional<Task> findByIdAndDeletedIsFalse(Integer id);

    Optional<Task> findByNameAndDeletedIsFalse(String name);

    Page<Task> findAllByDeletedIsFalse(Pageable pageable);

    List<Task> findByCreateUserAndDeletedIsFalse(Integer id);

    Page<Task> findByCreateUserAndDeletedIsFalse(Integer id,Pageable pageable);

    List<Task> findByTaskManagerIdAndDeletedIsFalse(Integer id);

    Page<Task> findByTaskManagerIdAndDeletedIsFalse(Integer id,Pageable pageable);

    Page<Task>  getByProjectIdAndDeletedIsFalse(Integer id, Pageable pageable);

    List<Task>  getByProjectIdAndDeletedIsFalse(Integer id);

    @Query(value="SELECT * FROM task t where t.is_deleted = false AND UPPER(t.name) LIKE CONCAT('%',UPPER(?1),'%')" +
            "AND (?2 = '' OR t.status = ?2)"  +
            "AND (?3 = '' OR t.priority = ?3) " +
            "AND (?4 = '' OR t.task_type = ?4) " +
            "AND (?5 = 0 OR t.task_manager_id = ?5) " +
            "AND (?6 = '' or t.start_date >= ?6) " +
            "AND (?7 = '' or t.end_date <= ?7) " +
            "AND (?8 = 0 OR t.project_id = ?8) " +
            "ORDER BY t.id  ", nativeQuery = true)
    Page<Task> searchTask(String name, String status, String priority, String type,
                          Integer leaderId, String startDate, String endDate, Integer projectId, Pageable pageable);




//    Page <Task> search()


}