package com.projectmanager.repository;

import com.projectmanager.dto.ProjectDto;
import com.projectmanager.entity.Project;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {
    // tìm list project của user
//    @Query("")
//    Page<Project> findProjectsByUser(Integer id, Pageable pageable)

//    Page<Project> findAllByIdAndAndDeletedIsFalse(Integer idCreateUser, Pageable pageable);

    Page<Project> getAllByDeletedIsFalse(Pageable pageable);

    List<Project> getAllByDeletedIsFalse(Sort sort);

    Optional<Project> getProjectByIdAndDeletedIsFalse(Integer pId);

    @Query( value = "SELECT p.* FROM project AS p, project_employee AS pe " +
            "WHERE p.id = pe.project_id AND pe.user_id = ?1 AND pe.is_delete = 0 ",nativeQuery = true)
    List<Project> findProjectByUserId(Integer userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE project_employee  SET is_deleted = 1 WHERE project_id = ?1",nativeQuery = true)
    Integer deleteProjectInPE(Integer pId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task  SET is_deleted = 1 WHERE project_id = ?1",nativeQuery = true)
    Integer deleteProjectInTask(Integer pId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE todo  SET is_deleted = 1 WHERE task_id = ?1",nativeQuery = true)
    Integer deleteTaskInTodo(Integer tId);



    @Transactional
    @Modifying
    @Query(value = "SELECT p.* FROM project p, project_employee pe WHERE pe.user_id = ?1 AND p.id= pe.project_id ORDER BY id DESC",nativeQuery = true)
    List<Project> getListProjectOfUser(Integer uId);

    @Query(value="SELECT p.* FROM project p where p.is_deleted = false AND UPPER(p.name) like CONCAT('%',UPPER(?1),'%') " +
            "AND (?2 = '' OR p.status = ?2)" +
            "AND (?3 = '' or p.start_date >= ?3)" +
            "AND (?4 = '' or p.end_date <= ?4)", nativeQuery = true)
    List<Project> searchProject(String name, String status, String startDate, String endDate);

    @Query(value="SELECT p.* FROM project p, project_employee pe  where p.id = pe.project_id  " +
            "AND p.is_deleted = false AND pe.is_deleted = false " +
            "AND pe.user_id = ?1 " +
            "AND UPPER(p.name) like CONCAT('%',UPPER(?2),'%')  " +
            "AND (?3 = '' OR p.status = ?3) " +
            "AND (?4 = '' or p.start_date >= ?4) " +
            "AND (?5 = '' or p.end_date <= ?5)", nativeQuery = true)
    List<Project> searchProjectWithUserId(Integer uId, String name, String status, String startDate, String endDate);


}