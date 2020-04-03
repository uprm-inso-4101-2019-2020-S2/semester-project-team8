package models.SharedModels

case class ApiMessage[T] (
    data: T,
    message: String
)
