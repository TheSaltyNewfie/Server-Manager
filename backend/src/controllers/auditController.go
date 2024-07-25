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

func CreateAudit(w http.ResponseWriter, r *http.Request) {
	var info struct {
		Action string `json:"action"`
		Token string `json:"token"`
	}

	var user models.User

	err := json.NewDecoder(r.Body).Decode(&info)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.Find(&user, "token = ?", info.Token)

	var audit models.AuditLog

	audit.Action = info.Action
	audit.UserID = user.ID

	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.Create(&audit)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(audit)
}