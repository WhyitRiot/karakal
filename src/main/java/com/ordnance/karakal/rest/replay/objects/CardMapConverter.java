package com.ordnance.karakal.game;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


import java.util.List;
import java.util.Map;
import java.util.UUID;

@Converter
public class CardMapConverter implements AttributeConverter<Map<UUID, List<Card>>, String> {
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<UUID, List<Card>> item) {
        try{
            return mapper.writeValueAsString(item);
        } catch (Exception e){
            throw new RuntimeException("Failed to serialize player hand!", e);
        }
    }

    @Override
    public Map<UUID, List<Card>> convertToEntityAttribute(String dbData) {
        try{
            return mapper.readValue(dbData, new TypeReference<Map<UUID, List<Card>>>() {});
        } catch (Exception e){
            throw new RuntimeException("Failed to deserialize player hand!", e);
        }
    }
}
