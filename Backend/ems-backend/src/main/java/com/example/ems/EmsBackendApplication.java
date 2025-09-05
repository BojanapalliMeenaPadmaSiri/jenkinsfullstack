package com.example.ems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;  // <-- add this

@SpringBootApplication
public class EmsBackendApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(EmsBackendApplication.class, args);
    }
}
