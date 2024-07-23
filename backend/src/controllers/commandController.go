package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os/exec"
)

func RunCommand(w http.ResponseWriter, r *http.Request) {
	
	body, err := io.ReadAll(r.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	commands := string(body)

	cmd := exec.Command("sh", "-c", commands)

	fmt.Printf("Running command: %s\n", commands)

	output, err := cmd.CombinedOutput()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}