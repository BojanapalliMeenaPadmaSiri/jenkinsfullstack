package com.example.ems.controller;

import com.example.ems.entity.Employee;
import com.example.ems.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173") // allow Vite dev server
public class EmployeeController {

  private final EmployeeRepository repo;

  public EmployeeController(EmployeeRepository repo) {
    this.repo = repo;
  }

  // Create
  @PostMapping
  public Employee create(@RequestBody Employee e) {
    return repo.save(e);
  }

  // Read all
  @GetMapping
  public List<Employee> all() {
    return repo.findAll();
  }

  // Read one
  @GetMapping("/{id}")
  public Employee one(@PathVariable Long id) {
    return repo.findById(id).orElse(null);
  }

  // Update
  @PutMapping("/{id}")
  public Employee update(@PathVariable Long id, @RequestBody Employee e) {
    e.setId(id);
    return repo.save(e);
  }

  // Delete
  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repo.deleteById(id);
  }
}
