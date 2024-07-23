package db

import (
	"backend/src/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Init() {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	
	if err != nil {
		panic("Failed to connect to DB!")
	}

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.AuditLog{})
}