import React, { useState } from "react";

interface FormSectionProps {
  section: any;
  onNext: (data: any) => void;
  onPrev: () => void;
  onSubmit: (data: any) => void;
  isFirst: boolean;

    }, {})
  );
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};

    section.fields.forEach((field: any) => {
      const value = fields[field.fieldId];
     
      
        newErrors[
          field.fieldId
        ] = `${field.label} must be at least ${field.minLength} characters`;
      }
      if (
        field.maxLength &&
        typeof value === "string" &&
        value.length > field.maxLength
      ) {
        newErrors[
          field.fieldId
        ] = `${field.label} must be at most ${field.maxLength} characters`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (fieldId: string, value: any) => {
    setFields({ ...fields, [fieldId]: value });
  };

  const handleCheckboxChange = (
    fieldId: string,
    optionValue: string,
    checked: boolean
  ) => {
    const currentValues = fields[fieldId] || [];
    if (checked) {
      handleChange(fieldId, [...currentValues, optionValue]);
    } else {
      handleChange(
        fieldId,
        currentValues.filter((v: any) => v !== optionValue)
      );
    }
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext(fields);
    }
  };

  const handleSubmitClick = () => {
    if (validate()) {
      onSubmit(fields);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>{section.title}</h3>
      <p>{section.description}</p>

      {section.fields.map((field: any) => (
        <div key={field.fieldId} style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          <br />

          {/* Render fields based on type */}
          {field.type === "text" ||
          field.type === "email" ||
          field.type === "tel" ||
          field.type === "date" ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={fields[field.fieldId]}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              style={{ width: "300px", padding: "5px" }}
            />
          ) : field.type === "textarea" ? (
            <textarea
              placeholder={field.placeholder}
              value={fields[field.fieldId]}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              style={{ width: "300px", height: "100px", padding: "5px" }}
            />
          ) : field.type === "dropdown" ? (
            <select
              value={fields[field.fieldId]}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              style={{ width: "310px", padding: "5px" }}
            >
              <option value="">Select</option>
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            field.options.map((option: any) => (
              <label key={option.value} style={{ marginRight: 10 }}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={fields[field.fieldId] === option.value}
                  onChange={() => handleChange(field.fieldId, option.value)}
                />
                {option.label}
              </label>
            ))
          ) : field.type === "checkbox" ? (
            field.options.map((option: any) => (
              <label key={option.value} style={{ marginRight: 10 }}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={fields[field.fieldId]?.includes(option.value)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      field.fieldId,
                      option.value,
                      e.target.checked
                    )
                  }
                />
                {option.label}
              </label>
            ))
          ) : null}

          {/* Show error message */}
          {errors[field.fieldId] && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors[field.fieldId]}
            </p>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <div style={{ marginTop: 20 }}>
        {!isFirst && (
          <button onClick={onPrev} style={{ marginRight: 10 }}>
            Prev
          </button>
        )}
        {isLast ? (
          <button onClick={handleSubmitClick}>Submit</button>
        ) : (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  );
}

export default FormSection;