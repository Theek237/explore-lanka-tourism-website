export function validateTravelPlan(values) {
  const errors = {};
  const days = Number.parseInt(values?.days, 10);
  const travelers = Number.parseInt(values?.travelers, 10);

  if (!Number.isFinite(days) || days <= 0) {
    errors.days = "Please enter a trip length of at least 1 day";
  }

  if (!Number.isFinite(travelers) || travelers <= 0) {
    errors.travelers = "Please enter at least 1 traveler";
  }

  if (values?.travelStyle && !["relaxed", "moderate", "packed"].includes(String(values.travelStyle))) {
    errors.travelStyle = "Choose relaxed, moderate, or packed";
  }

  return { errors };
}
