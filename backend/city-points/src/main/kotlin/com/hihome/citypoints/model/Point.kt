package com.hihome.citypoints.model

import jakarta.persistence.*
import org.springframework.hateoas.RepresentationModel

@Entity
@Table(name="point")
open class Point (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(nullable = false, length = 80)
    var name: String = "",

    @Column(nullable = false, length = 20)
    var lat: String = "",

    @Column(nullable = false, length = 20)
    var lng: String = "",
): RepresentationModel<Point>()