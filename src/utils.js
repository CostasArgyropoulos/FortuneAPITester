import { useEffect } from "react";

export const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export const convertObjectPropertiesToString = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null)
        newObj[key] = JSON.stringify(obj[key]);
      else newObj[key] = obj[key];
    }
  }
  return newObj;
};

const parseMetadata = (xmlString) => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "application/xml");
};

export const generateSampleData = (metadataXML) => {
  const xmlDoc = parseMetadata(metadataXML);

  // Get all EntityType elements (e.g., company, inspections, etc.)
  const entityTypes = xmlDoc.getElementsByTagName("EntityType");

  // Result object that will hold the sample data
  const sampleData = {};

  // Loop through each EntityType and generate sample data
  for (let entityType of entityTypes) {
    const entityName = entityType.getAttribute("Name");

    // Create an object for this entity type
    const entitySample = {};

    // Get all the properties for this entity type
    const properties = entityType.getElementsByTagName("Property");

    for (let property of properties) {
      const propertyName = property.getAttribute("Name");
      const propertyType = property.getAttribute("Type");

      // Generate default value based on the property type
      let defaultValue = null;
      switch (propertyType) {
        case "Edm.Guid":
          defaultValue = "00000000-0000-0000-0000-000000000000"; // Default GUID
          break;
        case "Edm.String":
          defaultValue = ""; // Empty string for string fields
          break;
        case "Edm.Int32":
          defaultValue = 0; // Default integer value
          break;
        case "Edm.DateTimeOffset":
          defaultValue = "2023-01-01T12:00:00Z"; // Default datetime (UTC)
          break;
        case "Edm.Boolean":
          defaultValue = false; // Default boolean value
          break;
        default:
          defaultValue = null; // For any unknown types
          break;
      }

      // Assign the default value to the property
      entitySample[propertyName] = defaultValue;
    }

    // Add the sample data for the entity to the result
    sampleData[entityName] = entitySample;
  }

  return sampleData;
};
