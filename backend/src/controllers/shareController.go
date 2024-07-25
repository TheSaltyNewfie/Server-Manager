package controllers

import (
	"backend/src/models"
	"backend/src/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jlaffaye/ftp"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func CreateShare(w http.ResponseWriter, r *http.Request) {
	var info struct {
		ShareName string `json:"shareName"`
		ShareDesc string `json:"shareDesc"`
	}

	err := json.NewDecoder(r.Body).Decode(&info)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	c, err := ftp.Dial("localhost:21")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer c.Logout()

	config, err := utils.LoadConfig("config.json")

	err = c.Login(config.FTPUsername, config.FTPPassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = c.MakeDir(info.ShareName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	share := models.Share{
		ShareName: info.ShareName,
		ShareDesc: info.ShareDesc,
	}

	db.Create(&share)


	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "FTP share '%s'", info.ShareName)
}

func GetShares(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var shares []models.Share

	db.Find(&shares)

	json.NewEncoder(w).Encode(shares)
}