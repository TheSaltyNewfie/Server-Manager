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
	result := db.Where("name = ? AND password = ?", userInfo.Name, userInfo.Password).First(&user)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		}
		return
	}

	token, err := utils.GenerateJWT(string(user.ID))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.Token = token
	
	db.Model(&user).Update("token", user.Token)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func CheckToken(w http.ResponseWriter, r *http.Request) {
	var token struct {
		Token string `json:"token"`
	}

	err := json.NewDecoder(r.Body).Decode(&token)
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
	result := db.Where("token = ?", token.Token).First(&user)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}