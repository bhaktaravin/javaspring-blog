package com.blog.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.blog.models.ERole;
import com.blog.models.Role;
import java.util.Optional;


public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
