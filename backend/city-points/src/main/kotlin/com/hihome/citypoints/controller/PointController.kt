package com.hihome.citypoints.controller

import com.hihome.citypoints.model.Point
import com.hihome.citypoints.services.PointService

import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.logging.Logger

@RestController
@RequestMapping("/points")
class PointController {
    @Autowired
    private lateinit var pointService: PointService
    private val logger = Logger.getLogger(PointService::class.java.name)

    @PostMapping
    fun create(@RequestBody point: Point): Point{
        return pointService.save(point)
    }

    @GetMapping
    fun readAll(): List<Point>{
        val points = pointService.findAll()

        for(point in points){
            val id = point.id
            point.add(linkTo(methodOn(PointController::class.java).readById(id)).withSelfRel())
        }
        return points
    }

    @GetMapping(value = ["/{id}"])
    fun readById(@PathVariable(value = "id") id: Long): Point{
        val point = pointService.findById(id)
        point.add(linkTo(methodOn(PointController::class.java).readAll()).withRel("Points list"))
        point.add(linkTo(PointController::class.java).slash(id).withSelfRel())
        return point
    }

    @PutMapping
    fun update(@RequestBody point: Point): Point{
        return pointService.update(point)
    }

    @DeleteMapping(value = ["/{id}"])
    fun delete(@PathVariable(value = "id") id: Long): ResponseEntity<*>{
        pointService.delete(id)

        //I used noContent here to define the 204 status
        return ResponseEntity.noContent().build<Any>()
    }
}