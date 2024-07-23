package utils

import (
	"encoding/json"
	"net/http"
)

func sendRes(w http.ResponseWriter, data *json.Encoder, code int ) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(code)

	json.NewEncoder(w).Encode(data)
}