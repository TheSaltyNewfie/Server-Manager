package utils

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type Config struct {
    FTPUsername string `json:"ftp_username"`
    FTPPassword string `json:"ftp_password"`
}

func LoadConfig(filename string) (Config, error) {
    var config Config

    file, err := os.Open(filename)
    if err != nil {
        return config, err
    }
    defer file.Close()

    bytes, err := ioutil.ReadAll(file)
    if err != nil {
        return config, err
    }

    err = json.Unmarshal(bytes, &config)
    if err != nil {
        return config, err
    }

    return config, nil
}