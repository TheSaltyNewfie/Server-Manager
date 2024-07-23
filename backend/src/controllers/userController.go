package controllers

import (
	"backend/src/models"
	"encoding/json"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func GetUsers(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	
	var users []models.User

	result := db.Find(&users)

	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result := db.Create(&user)

	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}