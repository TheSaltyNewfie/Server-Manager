package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID int `gorm:"primaryKey"`
	Name string `gorm:"size:255"`
	Password string `gorm:"size:255"`
	Role int // Admin role will always be 0!
	Token string 
}