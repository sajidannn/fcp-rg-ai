package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/service"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AIHandler struct {
	fileService *service.FileService
	aiService   *service.AIService
}

func NewAIHandler(fileService *service.FileService, aiService *service.AIService) *AIHandler {
	return &AIHandler{
		fileService: fileService,
		aiService:   aiService,
	}
}

func (h *AIHandler) UploadFile() gin.HandlerFunc {
	return func(c *gin.Context) {
		file, _, err := c.Request.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve file"})
			return
		}
		defer file.Close()

		fileContent, err := io.ReadAll(file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to read file"})
			return
		}

		table, err := h.fileService.ProcessFile(string(fileContent))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to process file"})
			return
		}

		query := c.PostForm("query")
		if query == "" {
			query = "Explain about the data"
		}
		model := c.PostForm("model")

		response, err := h.aiService.AnalyzeData(table, query, model)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to analyze data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success", 
			"answer": response,
		})
	}
}

func (h *AIHandler) ChatWithAI() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request model.ChatRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		response, err := h.aiService.ChatWithAI(request.Query, request.Model)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to chat with AI"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"answer": response.Choices[0].Message.Content,
		})
	}
}

func (h *AIHandler) HandleLightDataDecision() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request = model.LightDataRequest{}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		query := fmt.Sprintf(
			"in room, the light intensity is %d and the human presence is %t. Do the lights need to be turned on?",
			request.LightIntensity,
			request.HumanPresence,
		)
		
		response, err := h.aiService.MakeDesicionAI(query, request.Model)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"answer":   response[0].Generated_text,
		})
	}
}

func (h *AIHandler) HandleTemperatureDecision() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request = model.TemperatureDataRequest{}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		query := fmt.Sprintf(
			"Room A has a temperature of %d°C and a humidity of %d, which should we turn on? The heater or the AC?",
			request.Temperature,
			request.Humidity,
		)
		
		response, err := h.aiService.MakeDesicionAI(query, request.Model)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"answer":   response[0].Generated_text,
		})
	}
}
