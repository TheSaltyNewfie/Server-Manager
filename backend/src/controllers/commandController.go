package controllers

import (
	"encoding/json"
	"net/http"
	"os/exec"
)

func RunCommand(w http.ResponseWriter, r *http.Request) {
	var cmd struct {
		Cmd string `json:"cmd"`
		User int `json:"user"`
	}

	err := json.NewDecoder(r.Body).Decode(&cmd)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	command := cmd.Cmd

	execCmd := exec.Command("sh", "-c", command)

	output, err := execCmd.CombinedOutput()

	if err != nil {
		panic("Something failed here")
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}

func GetPodmanContainers(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("podman", "ps", "-a")

	output, err := cmd.CombinedOutput()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}