// Date configuration for testing
// Set this to override the current date for testing purposes

export const TEST_DATE = new Date('2025-09-07T00:00:00.000Z'); // September 7th, 2025

// Function to get current date (can be overridden for testing)
export function getCurrentDate(): Date {
  // For testing, return the test date
  // In production, this would return new Date()
  return TEST_DATE;
  
  // Uncomment the line below for production:
  // return new Date();
}

// Function to get date range for festivals (next 30 days from current date)
export function getFestivalDateRange(): { start: Date; end: Date } {
  const currentDate = getCurrentDate();
  return {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30)
  };
}
