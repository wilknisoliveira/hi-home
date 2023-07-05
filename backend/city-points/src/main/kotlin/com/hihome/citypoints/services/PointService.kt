package com.hihome.citypoints.services

import com.hihome.citypoints.model.Point
import com.hihome.citypoints.repository.PointRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.logging.Logger

@Service
class PointService {
    @Autowired
    private lateinit var pointRepository: PointRepository
    private val logger = Logger.getLogger(PointService::class.java.name)

    fun findAll(): List<Point>{
        logger.info("Getting All")
        return pointRepository.findAll()
    }
}