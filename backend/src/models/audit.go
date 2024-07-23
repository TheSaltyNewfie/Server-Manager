package models

import "gorm.io/gorm"

type AuditLog struct {
	gorm.Model
	ID int `gorm:"primaryKey"`
	UserID int
	User User
	Action string
}