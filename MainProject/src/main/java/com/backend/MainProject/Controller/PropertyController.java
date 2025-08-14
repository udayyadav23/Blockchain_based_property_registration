package com.backend.MainProject.Controller;

import com.backend.MainProject.Model.Property;
import com.backend.MainProject.Service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property")
@CrossOrigin
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // Register a new property
    @PostMapping("/register")
    public ResponseEntity<?> registerProperty(@RequestBody Property property) {
        try {
            Property saved = propertyService.saveProperty(property);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering property: " + e.getMessage());
        }
    }

    // Get all properties
    @GetMapping("/all")
    public ResponseEntity<?> getAllProperties() {
        try {
            List<Property> properties = propertyService.getAllProperties();
            if (properties.isEmpty()) {
                return ResponseEntity.status(404).body("No properties found");
            }
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching properties: " + e.getMessage());
        }
    }

    // Get properties by owner wallet address
    @GetMapping("/owner/{address}")
    public ResponseEntity<?> getByOwner(@PathVariable String address) {
        try {
            List<Property> properties = propertyService.getPropertiesByOwnerAddress(address);
            if (properties.isEmpty()) {
                return ResponseEntity.status(404).body("No properties found for this address");
            }
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching properties: " + e.getMessage());
        }
    }
}
