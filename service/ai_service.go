package service

import (
	"a21hc3NpZ25tZW50/model"
	"errors"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
)

type AIService struct {
	APIkey string
}

func NewAIService(apiKey string) *AIService {
	return &AIService{
		APIkey: apiKey,
	}
}

func (s *AIService) AnalyzeData(table map[string][]string, query, AImodel string) (string, error) {
	if len(table) == 0 {
		return "", errors.New("table is empty")
	}

	client := resty.New()
	input := model.TapasRequest{
		Table: table,
		Query: query,
	}

	modelURL := "https://api-inference.huggingface.co/models/"+AImodel

	var response model.TapasResponse
	resp, err := client.R().
		SetHeader("Authorization", "Bearer "+s.APIkey).
		SetHeader("Content-Type", "application/json").
		SetBody(input).
		SetResult(&response).
		Post(modelURL)

	if err != nil {
		return "", err
	}

	if resp.StatusCode() != http.StatusOK {
		return "", fmt.Errorf("API returned error: %s", resp.Status())
	}

	return response.Cells[0], nil
}

func (s *AIService) ChatWithAI(query, AImodel string) (model.ChatResponse, error) {
	client := resty.New()
	input := model.ChatRequestAI{
		Messages: []model.Message{
			{Role: "user", Content: query},
		},
		MaxTokens: 500,
		Stream:    false,
	}

	modelURL := "https://api-inference.huggingface.co/models/"+AImodel

	var responses model.ChatResponse
	resp, err := client.R().
		SetHeader("Authorization", "Bearer "+s.APIkey).
		SetHeader("Content-Type", "application/json").
		SetBody(input).
		SetResult(&responses).
		Post(modelURL)

	if err != nil {
		return model.ChatResponse{}, err
	}

	if resp.StatusCode() != http.StatusOK {
		return model.ChatResponse{}, fmt.Errorf("API returned error: %s", resp.Status())
	}

	return responses, nil
}
