package com.projectmanager.service.service_impl;

import com.projectmanager.entity.Project;
import com.projectmanager.entity.Task;
import com.projectmanager.entity.User;
import com.projectmanager.repository.ProjectRepository;
import com.projectmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    // nhớ check delete nhé
    public List<Project> findAll(){
        return projectRepository.findAll();
    }
    @Override
    public Page<Project> FindAllNotDelete(Integer userId, Pageable pageable){return projectRepository.findAllByIdAndAndDeletedIsFalse(userId,pageable);}

    @Override
    public List<Project> findProjectByUserId(Integer userId) {
        return projectRepository.findProjectByUserId(userId);
    }

    @Override
    public Page<Project> getAll(Pageable pageable) {
        return projectRepository.getAllByDeletedIsFalse(pageable);
    }

    @Override
    public Optional<Project> findById(Integer id) {
        return projectRepository.getProjectByIdAndDeletedIsFalse(id);
    }

    @Override
    public Project create(Project project) {
        if(null!=project){
            project.setStatus("draft");
            project.setCreateDate(Date.valueOf(LocalDate.now()));
            project.setDeleted(false);
            project.setCreateUser(1);
            return projectRepository.save(project);
        }
        return null;
    }

    @Override
    public boolean update(Project project) {
        Optional<Project> p = projectRepository.findById(project.getId());
        if(p.isPresent()){
            //chỗ này phải map thế nào?
            p.get().setName(project.getName());
            p.get().setDes(project.getDes());
            p.get().setStartDate(project.getStartDate());
            p.get().setEndDate(project.getEndDate());
            projectRepository.save(project);
            return true;
        }else return false;

    }
    @Override
    public boolean delete(Integer id) {
        Optional<Project> p = projectRepository.findById(id);
        if(p.isPresent()){
            p.get().setDeleted(true);
            projectRepository.save(p.get());
            projectRepository.deleteProjectInPE(id);
            projectRepository.deleteProjectInTask(id);
            System.out.println("List task of this project:");
            for (Task t : p.get().getTaskList() ) {
                projectRepository.deleteTaskInTodo(t.getId());
                System.out.println(t.getName());
            }
            return true;
        }else return false;
    }
}
