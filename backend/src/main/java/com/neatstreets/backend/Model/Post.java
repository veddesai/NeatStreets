package com.neatstreets.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.neatstreets.backend.enums.PostStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EnableTransactionManagement
@Transactional
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;

    private String imageUrl;

    private String location;

    private Date reportedAt;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @ManyToOne
    @JoinColumn(name = "reported_by_id")
    @JsonBackReference
    private User reportedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    @JsonBackReference// Specifies the foreign key in Post table
    private User assignedTo;

    private Date completionTime;
}
//add a row for button which in clicking can do inserting photos,files,