package controllers

import (
	"backend/src/models"
	"backend/src/utils"
	"encoding/json"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	var userInfo struct {
		Name string `json:"name"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&userInfo)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var user models.User

	db.Find(&user, "name = ? AND password = ?", userInfo.Name, userInfo.Password)

	token, err := utils.GenerateJWT(string(user.ID))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.Token = token

	db.Save(&user)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}