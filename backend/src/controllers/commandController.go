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

	var response struct {
		Result string `json:"result"`
	}

	err := json.NewDecoder(r.Body).Decode(&cmd)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	command := cmd.Cmd

	execCmd := exec.Command("sh", "-c", command)

	output, err := execCmd.CombinedOutput()

	response.Result = string(output)

	if err != nil {
		panic("Something failed here")
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
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