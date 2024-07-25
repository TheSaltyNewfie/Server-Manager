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
	mux.HandleFunc("POST /auth", controllers.AuthenticateUser)
	mux.HandleFunc("GET /system", controllers.GetSystemInfo)
	mux.HandleFunc("POST /shutdown", controllers.ShutdownSystem)
	mux.HandleFunc("POST /reboot", controllers.RebootSystem)
	mux.HandleFunc("POST /share/create", controllers.CreateShare)
	mux.HandleFunc("GET /share/list", controllers.GetShares)


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