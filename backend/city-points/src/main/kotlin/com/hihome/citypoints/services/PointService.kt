package com.hihome.citypoints.services

import com.hihome.citypoints.exceptions.ResourceNotFoundException
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

    fun save(point: Point): Point{
        logger.info("Creating a new point with the following id: ${point.id}")
        return pointRepository.save(point)
    }

    fun findAll(): List<Point>{
        logger.info("Getting All")
        return pointRepository.findAll()
    }

    fun findById(id: Long): Point{
        logger.info("Getting ${id} register")
        return pointRepository.findById(id)
            .orElseThrow{ResourceNotFoundException("This point doesn't exist")}
    }

    fun update(point: Point): Point{
        logger.info("Updating the following point: ${point.id}")
        val searchedPoint = pointRepository.findById(point.id)
            .orElseThrow{ResourceNotFoundException("This point doesn't exist")}

        return pointRepository.save(point)
    }

    fun delete(id: Long) {
        logger.info("Deleting a point with the following id: ${id}")

        val searchedPoint = pointRepository.findById(id)
            .orElseThrow{ResourceNotFoundException("This point doesn't exist")}

        return pointRepository.delete(searchedPoint)
    }


}