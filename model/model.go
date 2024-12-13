package model

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
