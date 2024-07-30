package types

// Response is used for returning a message to the user
type Response struct {
	Message string `json:"message"`
}

type Container struct {
	Id string `json:"Id"`
	Image string `json:"Image"`
	Status string `json:"Status"`
	Names []string `json:"Names"`
}