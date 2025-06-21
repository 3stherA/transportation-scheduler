export const validateModalOpen = (selectedOrg) => {
    if (!selectedOrg) {
      alert('Please select an organization first');
      return false;
    }
    return true;
  };
  
  export const resetLoginForm = () => ({
    orgName: '',
    password: '',
    loginError: '',
  });
