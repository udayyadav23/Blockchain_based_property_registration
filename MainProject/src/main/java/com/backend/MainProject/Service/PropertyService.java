package com.backend.MainProject.Service;

import com.backend.MainProject.Model.Property;
import com.backend.MainProject.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByOwnerAddress(String ownerWallet) {
        return propertyRepository.findByOwnerWallet(ownerWallet);
    }
}
