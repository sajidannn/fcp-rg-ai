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

var baseUrl = "https://api-inference.huggingface.co/models/"

func (s *AIService) AnalyzeData(table map[string][]string, query, AImodel string) (string, error) {
	if len(table) == 0 {
		return "", errors.New("table is empty")
	}

	client := resty.New()
	input := model.TapasRequest{
		Table: table,
		Query: query,
	}

	modelURL := baseUrl+AImodel

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

	if len(response.Cells) == 0 {
    return "", errors.New("AI response is empty")
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

	modelURL := baseUrl+AImodel

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

func (s *AIService) MakeDesicionAI(query, AImodel string) ([]model.DesicionResponse, error) {
	client := resty.New()
	input := model.DesicionRequest{
		Inputs: query,
	}

	modelURL := baseUrl+AImodel

	var responses []model.DesicionResponse
	resp, err := client.R().
		SetHeader("Authorization", "Bearer "+s.APIkey).
		SetHeader("Content-Type", "application/json").
		SetBody(input).
		SetResult(&responses).
		Post(modelURL)

	if err != nil {
		return nil, err
	}

	if resp.StatusCode() != http.StatusOK {
		return nil, fmt.Errorf("API returned error: %s", resp.Status())
	}

	if len(responses) == 0 {
		return nil, fmt.Errorf("no response received from the API")
	}

	return responses, nil
}