export default function generateUniqueId(): string {
    // Create a unique ID based on the current timestamp and a random number
    const timestamp = Date.now().toString(16); // Convert timestamp to hexadecimal string
    const random = Math.random().toString(16).substr(2, 6); // Generate a random hexadecimal string
  
    // Concatenate timestamp and random number to create the unique ID
    const uniqueId = `${timestamp}${random}`;
  
    return uniqueId;
}