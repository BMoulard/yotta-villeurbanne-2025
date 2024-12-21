interface AthleteFormData {
  firstName: string;
  lastName: string;
  club: string;
  email: string;
  swimTimeMinutes: number;
  swimTimeSeconds: number;
}

export const submitToNetlify = async (data: AthleteFormData) => {
  const formData = new FormData();
  formData.append('form-name', 'athlete-data');
  
  // Add all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    const response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    
    return response.ok;
  } catch (error) {
    console.error('Form submission error:', error);
    return false;
  }
};