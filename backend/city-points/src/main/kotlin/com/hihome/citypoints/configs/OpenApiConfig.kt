package com.hihome.citypoints.configs

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.servers.Server

@OpenAPIDefinition(
    info = Info(
        contact = Contact(
            name = "Wilknis Deyvis",
            email = "wilknisoliveira@gmail.com"
        ),
        description = "OpenApi documentation for City Points project",
        title = "OpenApi - City Points",
        version = "1.0"
    ),
    servers = [
        Server(
            description = "Local ENV",
            url = "http://localhost:8080"
        )
    ]
)
class OpenApiConfig {
}