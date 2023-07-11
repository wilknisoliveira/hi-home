package com.hihome.citypoints.exceptions

import java.util.Date

class ExceptionResponse (
    //Define a standard response to errors
    val timesTamp: Date,
    val message: String?,
    val details: String
)