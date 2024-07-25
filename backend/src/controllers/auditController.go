package controllers

import (
	"backend/src/models"
	"encoding/json"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetAudits(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var audits []models.AuditLog

	db.Find(&audits)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(audits)

}