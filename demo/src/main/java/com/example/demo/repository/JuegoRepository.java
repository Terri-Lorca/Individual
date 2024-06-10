package com.example.demo.repository;

import com.example.demo.entity.Juego;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface JuegoRepository extends CrudRepository<Juego, String> {
    
}