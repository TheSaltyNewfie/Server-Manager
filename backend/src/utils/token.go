package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecret = []byte("CHANGE-LATER-TO-ENV-VAR")

func GenerateJWT(userID string) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "userID": userID,
        "exp":    time.Now().Add(time.Hour * 72).Unix(),
    })

    tokenString, err := token.SignedString(jwtSecret)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}