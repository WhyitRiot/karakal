package com.ordnance.karakal.game;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter
public class CardListConverter implements AttributeConverter<List<Card>, String> {
    private final ObjectMapper mapper = new ObjectMapper();


    @Override
    public String convertToDatabaseColumn(List<Card> input) {
        try{
            return mapper.writeValueAsString(input);
        } catch (Exception e){
            throw new RuntimeException("Failed to serialize deck!", e);
        }
    }

    @Override
    public List<Card> convertToEntityAttribute(String dbData) {
        try{
            return mapper.readValue(dbData, new TypeReference<List<Card>>() {});
        } catch (Exception e){
            throw new RuntimeException("Failed to deserialize deck!", e);
        }
    }
}
