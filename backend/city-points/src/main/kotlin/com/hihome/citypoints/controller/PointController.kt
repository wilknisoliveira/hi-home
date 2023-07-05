package com.hihome.citypoints.controller

import com.hihome.citypoints.model.Point
import com.hihome.citypoints.services.PointService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/points")
class PointController {
    @Autowired
    private lateinit var pointService: PointService

    @GetMapping
    fun findAll(): List<Point>{
        return pointService.findAll()
    }
}