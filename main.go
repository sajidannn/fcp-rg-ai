package main

import (
	"a21hc3NpZ25tZW50/db"
	"a21hc3NpZ25tZW50/handler"
	"a21hc3NpZ25tZW50/model"
	repository "a21hc3NpZ25tZW50/repository"
	"a21hc3NpZ25tZW50/service"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db := db.NewDB()
	dbCredential := model.CredentialDB{
		Host:         os.Getenv("DB_HOST"),
		Username:     os.Getenv("DB_USERNAME"),
		Password:     os.Getenv("DB_PASSWORD"),
		DatabaseName: os.Getenv("DB_NAME"),
		Port:         5432,
		Schema:       "public",
	}

	conn, err := db.Connect(&dbCredential)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

if err := conn.AutoMigrate(&model.Appliance{}, &model.SensorData{}); err != nil {
	log.Fatalf("Failed to migrate database: %v", err)
}

	token := os.Getenv("HUGGINGFACE_TOKEN")
	if token == "" {
		log.Fatal("HUGGINGFACE_TOKEN is not set in the .env file")
	}

	applianceRepo := repository.NewApplianceRepo(conn)
	sensorRepo := repository.NewSensorRepository(conn)

	applianceService := service.NewApplianceService(applianceRepo)
	sensorService := service.NewSensorService(sensorRepo)
	fileService := service.NewFileService(repository.NewFileRepository())
	aiService := service.NewAIService(token)

	aiHandler := handler.NewAIHandler(fileService, aiService)
	applianceHandler := handler.NewApplianceHandler(applianceService, *aiService)
	sensorHandler := handler.NewSensorHandler(sensorService)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.POST("/upload", aiHandler.UploadFile())
	router.POST("/chat", aiHandler.ChatWithAI())

	router.POST("/decision/light", aiHandler.HandleLightDataDecision())
	router.POST("/decision/temperature", aiHandler.HandleTemperatureDecision())

	router.POST("/appliance", applianceHandler.CreateAppliance())
	router.GET("/appliance", applianceHandler.GetAllAppliances())
	router.GET("/appliance/:name", applianceHandler.GetApplianceByName())
	router.POST("/appliance/analyze", applianceHandler.AnalyzeAppliances())

	router.POST("/sensor", sensorHandler.SaveSensorData())
	router.GET("/sensor", sensorHandler.GetLatestSensorData())
	
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s\n", port)
	router.Run(":" + port)
}
