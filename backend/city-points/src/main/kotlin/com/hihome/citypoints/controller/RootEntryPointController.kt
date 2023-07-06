package com.hihome.citypoints.controller

import com.hihome.citypoints.model.RootEntryPointModel
import org.springframework.web.bind.annotation.RestController

import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn
import org.springframework.web.bind.annotation.GetMapping

@RestController
class RootEntryPointController {
    @GetMapping
    fun root(): RootEntryPointModel{
        val rt = RootEntryPointModel()
        rt.add(linkTo(methodOn(PointController::class.java).readAll()).withRel("points"))
        return rt
    }
}