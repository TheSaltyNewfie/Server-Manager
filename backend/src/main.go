package main

import (
	"backend/src/controllers"
	"backend/src/db"
	"backend/src/types"
	"encoding/json"
	"net/http"
)

func main() {
	db.Init()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /", HomeHandler)
	mux.HandleFunc("GET /users", controllers.GetUsers)
	mux.HandleFunc("POST /users", controllers.CreateUser)
	mux.HandleFunc("POST /command", controllers.RunCommand)
	mux.HandleFunc("GET /containers", controllers.GetPodmanContainers)


	handler := corsMiddleware(mux)

	http.ListenAndServe("0.0.0.0:8000", handler)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	response := types.Response {
		Message: "Welcome to the server management backend",
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(response)
}