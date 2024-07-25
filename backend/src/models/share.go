package models

type Share struct {
	ID int `gorm:"primaryKey"`
	ShareName string `gorm:"size:255"`
	ShareDesc string `gorm:"size:255"`
}