package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Response struct {
	Message string `json:"message"`
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler).Methods("GET")

	fmt.Printf("Hosting at localhost")
	http.ListenAndServe(":8000", r)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	response := Response {
		Message: "Welcome to the server management backend",
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(response)
}