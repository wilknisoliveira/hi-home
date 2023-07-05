package com.hihome.citypoints.controller

import com.hihome.citypoints.model.Point
import com.hihome.citypoints.services.PointService
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

@RestController
@RequestMapping("/points")
class PointController {
    @Autowired
    private lateinit var pointService: PointService

    @PostMapping
    fun create(@RequestBody point: Point): Point{
        return pointService.save(point)
    }

    @GetMapping
    fun readAll(): List<Point>{
        return pointService.findAll()
    }

    @GetMapping(value = ["/{id}"])
    fun readById(@PathVariable(value = "id") id: Long): Point{
        return pointService.findById(id)
    }

    @PutMapping
    fun update(@RequestBody point: Point): Point{
        return pointService.update(point)
    }

    @DeleteMapping(value = ["/{id}"])
    fun update(@PathVariable(value = "id") id: Long): ResponseEntity<*>{
        pointService.delete(id)

        //I used noContent here to define the 204 status
        return ResponseEntity.noContent().build<Any>()
    }
}