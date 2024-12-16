package model

import "gorm.io/gorm"

type TapasRequest struct {
	Table map[string][]string `json:"table"`
	Query string              `json:"query"`
}

type TapasResponse struct {
	Answer      string   `json:"answer"`
	Coordinates [][]int  `json:"coordinates"`
	Cells       []string `json:"cells"`
	Aggregator  string   `json:"aggregator"`
}

type ChatRequest struct {
	Query string `json:"query"`
	Model string `json:"model"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequestAI struct {
	Messages []Message `json:"messages"`
	MaxTokens int      `json:"max_tokens"`
	Stream   bool     `json:"stream"`
}

type Choice struct {
	Index   int      `json:"index"`
	Message Message  `json:"message"`
}

type ChatResponse struct {
	Model   string   `json:"model"`
	Choices []Choice `json:"choices"`
}

type LightDataRequest struct {
	LightIntensity int    `json:"light_intensity"`
	HumanPresence  bool   `json:"human_presence"`
	Model          string `json:"model"`
}

type TemperatureDataRequest struct {
	Temperature 		int    `json:"temperature"`
	Humidity				int    `json:"humidity"`
	HumanPresence  	bool   `json:"human_presence"`
	Appliance				string `json:"appliance"`
	Model       		string `json:"model"`
}

type DesicionRequest struct {
	Inputs  string `json:"inputs"`
}

type DesicionResponse struct {
	Generated_text string `json:"generated_text"`
}

type CredentialDB struct {
	Host         string
	Username     string
	Password     string
	DatabaseName string
	Port         int
	Schema       string
}

type Appliance struct {
	gorm.Model
	Date             	string  `json:"date" gorm:"type:date;not null"`
	Time             	string  `json:"time" gorm:"type:time;not null"`
	Appliance        	string  `json:"appliance" gorm:"type:varchar(100);not null"`
	EnergyConsumption float64 `json:"energy_consumption" gorm:"type:float;not null"`
	Room             	string  `json:"room" gorm:"type:varchar(100);not null"`
	Status           	string  `json:"status" gorm:"type:varchar(50);not null"`
}

type ApplianceAnalyze struct {
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
	Query     string `json:"query"`
	Model     string `json:"model"`
}

type SensorData struct {
	ID          uint    `gorm:"primaryKey"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Motion      bool    `json:"motion"`
	CreatedAt   int64   `json:"created_at" gorm:"autoCreateTime"`
}