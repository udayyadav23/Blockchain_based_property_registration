package com.backend.MainProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.MainProject.Model.Property;

import java.util.List;

public interface PropertyRepository extends MongoRepository<Property, String> {

    List<Property> findByOwnerWallet(String ownerWallet); // ✅ Correct method name
}
