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
    
    // Add all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
  
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  };