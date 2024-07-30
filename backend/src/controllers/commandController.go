package controllers

import (
	"backend/src/models"
	"backend/src/types"
	"encoding/json"
	"log"
	"net/http"
	"os/exec"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func RunCommand(w http.ResponseWriter, r *http.Request) {
	var cmd struct {
		Cmd string `json:"cmd"`
		Token string `json:"token"`
	}

	var response struct {
		Result string `json:"result"`
	}

	err := json.NewDecoder(r.Body).Decode(&cmd)

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

	db.Find(&user, "token = ?", cmd.Token)

	if user.ID == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	if user.Role != 0 {
		http.Error(w, "User is not an admin", http.StatusUnauthorized)
		return
	}

	command := cmd.Cmd

	execCmd := exec.Command("sh", "-c", command)

	output, err := execCmd.CombinedOutput()

	if string(output) == "" {
		response.Result = "No output"
	} else {
		response.Result = string(output)
	}

	if err != nil {
		panic("Something failed here")
	}

	var auditLog models.AuditLog

	auditLog.Action = command
	auditLog.UserID = int(user.ID)
	db.Save(&auditLog)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func RebootSystem(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("reboot")

	_, err := cmd.CombinedOutput()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func ShutdownSystem(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("shutdown")

	_, err := cmd.CombinedOutput()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func GetPodmanContainers(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("podman", "ps", "-a", "--format", "json")
    output, err := cmd.Output()
    if err != nil {
        log.Fatal(err)
    }

    var containers []types.Container
    err = json.Unmarshal(output, &containers)
    if err != nil {
        log.Fatal(err)
    }

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(containers)
}