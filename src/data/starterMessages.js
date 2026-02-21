/**
 * Starter customer messages per business type.
 * Used to pre-seed the chat when a business type is selected.
 */
export const starterMessages = {
  restaurant: 'Hi, do you have tables available for 4 people tonight at 8pm?',
  salon: 'Hello, I wanted to book a haircut for tomorrow. What slots are available?',
  retail: 'Hi, do you have blue running shoes in size 9?',
  ca: 'I need help filing my GST returns this month. Can you guide me?',
  coaching: 'I want to enroll my child for Math classes. What are the fees?',
  clinic: 'I need to book an appointment with the doctor for tomorrow morning.',
  other: 'Hi! I had a quick question about your services.',
}

/**
 * Default service options per business type.
 */
export const defaultServices = {
  restaurant: ['Dine-in', 'Takeaway', 'Home Delivery'],
  salon: ['Haircut', 'Facial', 'Manicure & Pedicure'],
  retail: ['Electronics', 'Mobile Accessories', 'Repair Services'],
  ca: ['GST Filing', 'Income Tax Returns', 'Accounting'],
  coaching: ['Math Classes', 'Science Coaching', 'Exam Preparation'],
  clinic: ['General Consultation', 'Pathology Tests', 'Health Checkup'],
  other: ['Service 1', 'Service 2', 'Service 3'],
}

/**
 * Default business names per type.
 */
export const defaultNames = {
  restaurant: 'Sharma Dhaba',
  salon: 'Priya Beauty Salon',
  retail: 'Sharma Electronics',
  ca: 'Mehta & Associates',
  coaching: 'Bright Future Classes',
  clinic: 'City Health Clinic',
  other: 'My Business',
}
