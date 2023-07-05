package com.hihome.citypoints.repository

import com.hihome.citypoints.model.Point
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PointRepository: JpaRepository<Point, Long?>