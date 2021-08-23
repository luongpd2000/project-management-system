package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "task")
@Data
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @NotNull
    @Column(name = "task_type")
    private String taskType;

    @NotNull
    @Column(name = "priority")
    private String priority;

    @NotNull
    @Column(name = "status")
    private String status;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "project_id",referencedColumnName = "id")
//    @Nullable
//    private Project project_task;

    @NotNull
    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "des")
    private String des;


    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "create_user",referencedColumnName = "id")
//    @Nullable
//    private User createUser;

    @NotNull
    @Column(name = "create_user")
    private Integer createUser;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "task_manager_id",referencedColumnName = "id")
//    private User taskManager;

    @NotNull
    @Column(name = "task_manager_id")
    private Integer taskManagerId;

    @Column(name = "is_deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "taskId", fetch = FetchType.LAZY)
    private List<Todo> todoList;

    @OneToMany(mappedBy = "taskId", fetch = FetchType.LAZY)
    private List<TaskHistory> taskHistoryList;
}
