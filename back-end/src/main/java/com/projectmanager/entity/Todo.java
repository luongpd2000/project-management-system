package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "todo")
@Data
public class Todo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "des")
    private String des;

    @NotNull
    @Column(name = "project_id")
    private Integer projectId;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "is_deleted")
    private Boolean deleted;

    @NotNull
    @Column(name = "todo_type")
    private String todoType;

    @NotNull
    @Column(name = "status")
    private String status;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "task_id",referencedColumnName = "id")
//    @Nullable
//    private Task task;
    @NotNull
    @Column(name = "task_id")
    private Integer taskId;

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
//    @JoinColumn(name = "assigned_user",referencedColumnName = "id")
//    private User assignedUser;
    @NotNull
    @Column(name = "assigned_user")
    private Integer assignedUser;

    @OneToMany(mappedBy = "todoId", fetch = FetchType.LAZY)
    private List<TodoHistory> todoHistoryList;

}
