package edu.infosys.farmVerseApplication.aiService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.infosys.farmVerseApplication.bean.FarmCrop;

@Service
public class YieldPredictService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    @Value("${huggingface.model.id}")
    private String modelId;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public FarmCrop predictYield(FarmCrop crop) {

        try {

            String prompt = String.format(
                    "You are an agricultural expert system. Based on historical data, calculate the expected yield per acre.\n\n"
                    +
                    "INPUT DATA:\n" +
                    "- Crop Name: %s\n" +
                    "- Farm Soil Type: %s\n" +
                    "- Dedicated Crop Area: %.2f acres\n" +
                    "- Sown Time: %s\n" +
                    "- Harvest Time: %s\n\n" +
                    "INSTRUCTION:\n" +
                    "Reply ONLY in this format:\n" +
                    "YIELD: 3.8\n" +
                    "COMMENT: Your justification",

                    crop.getCropName(),
                    crop.getSoil(),
                    crop.getCropArea(),
                    crop.getSownMonthYear(),
                    crop.getHarvestMonthYear()
            );


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);


            Map<String, Object> payload = new HashMap<>();
            payload.put("model", modelId);


            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            messages.add(message);


            payload.put("messages", messages);
            payload.put("max_tokens", 300);


            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(payload, headers);


            ResponseEntity<String> response =
                    restTemplate.postForEntity(apiUrl, entity, String.class);


            JsonNode root = objectMapper.readTree(response.getBody());


            String resultText = root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText()
                    .trim();


            if (resultText.contains("YIELD:") && resultText.contains("COMMENT:")) {

                String[] parts = resultText.split("COMMENT:");


                String yieldPart = parts[0]
                        .replace("YIELD:", "")
                        .replaceAll("[^0-9.]", "")
                        .trim();


                if (!yieldPart.isEmpty()) {
                    crop.setYield(Double.parseDouble(yieldPart));
                }


                crop.setComments(parts[1].trim());

            } else {

                crop.setComments("Raw AI Output: " + resultText);

            }


            return crop;


        } catch (Exception e) {

            crop.setComments("Error predicting yield: " + e.getMessage());

            return crop;
        }
    }
}