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
	dbCredential := model.Credential{
		Host:         "localhost",
		Username:     "postgres",
		Password:     "Sajidancool",
		DatabaseName: "kampusmerdeka",
		Port:         5432,
		Schema:       "public",
	}

	conn, err := db.Connect(&dbCredential)
	if err != nil {
		panic(err)
	}

	conn.AutoMigrate(&model.Appliance{})

	token := os.Getenv("HUGGINGFACE_TOKEN")
	if token == "" {
		log.Fatal("HUGGINGFACE_TOKEN is not set in the .env file")
	}

	applianceRepo := repository.NewApplianceRepo(conn)

	applianceService := service.NewApplianceService(applianceRepo)
	fileService := service.NewFileService(repository.NewFileRepository())
	aiService := service.NewAIService(token)
	aiHandler := handler.NewAIHandler(fileService, aiService)
	applianceHandler := handler.NewApplianceHandler(applianceService)

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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s\n", port)
	router.Run(":" + port)
}
