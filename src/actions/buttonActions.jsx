import { authenticateAdmin, authenticateDriver } from './authActions';
import { validateModalOpen, resetLoginForm } from './modalActions';

export const createButtonActions = (setters) => {
  const {
    setModalType,
    setIsModalOpen,
    setShowAdminModal,
    setOrgName,
    setPassword,
    setLoginError,
    setIsLoading,
    setIsAdminSignedIn,
    setAuthenticatedOrgName,
    setShowAdminDashboard,
    setShowDriverModal,
    setDriverAccessCode,
    setDriverError,
    setDriverVerified,
    setShowAssignmentModal,
    setAssignments,
    setAssignmentError,
  } = setters;

  // Generic
  
  const openModal = (type, selectedOrg) => {
    if (!validateModalOpen(selectedOrg)) return;
    setModalType(type);
    
    // If it's a driver registration, show driver verification first
    if (type === 'driver') {
      setShowDriverModal(true);
      // Reset driver states
      setDriverAccessCode('');
      setDriverError('');
      setDriverVerified(false);
    } else {
      // For passenger, go directly to form
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  // Driver actions
  
  const closeDriverModal = () => {
    setShowDriverModal(false);
    setDriverAccessCode('');
    setDriverError('');
    setDriverVerified(false);
    setModalType('');
  };

  const handleDriverVerification = async (accessCode) => {
    setDriverError('');
    setIsLoading(true);

    try {
      const result = await authenticateDriver(accessCode);
      
      if (result.success) {
        setDriverVerified(true);
        setShowDriverModal(false);
        setIsModalOpen(true);
      } else {
        setDriverError(result.error);
      }
    } catch (err) {
      console.error(err);
      setDriverError('Something went wrong. Please try again.');
    }
    
    setIsLoading(false);
  };


  const openAssignmentModal = async (selectedOrg) => {
    if (!validateModalOpen(selectedOrg)) return;
    
    setIsModalOpen(true);
    setAssignmentError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/assignments`);
      const data = await response.json();
      
      if (response.ok) {
        setAssignments(data.assignments || []);
      } else {
        setAssignmentError(data.error || 'Failed to load assignments');
      }
    } catch (err) {
      console.error(err);
      setAssignmentError('Failed to connect to server');
    }
    
    setIsLoading(false);
  };

  const closeAssignmentModal = () => {
    setShowAssignmentModal(false);
    setAssignments([]);
    setAssignmentError('');
  };


  const handleAdminSignInClick = () => {
    setShowAdminModal(true);
    const resetForm = resetLoginForm();
    setOrgName(resetForm.orgName);
    setPassword(resetForm.password);
    setLoginError(resetForm.loginError);
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    const resetForm = resetLoginForm();
    setOrgName(resetForm.orgName);
    setPassword(resetForm.password);
    setLoginError(resetForm.loginError);
  };

  const handleLogin = async (orgName, password) => {
    setLoginError('');
    setIsLoading(true);

    try {
      const result = await authenticateAdmin(orgName, password);
      
      if (result.success) {
        setIsAdminSignedIn(true);
        setAuthenticatedOrgName(result.orgName);
        setShowAdminDashboard(true);
        setShowAdminModal(false);
        const resetForm = resetLoginForm();
        setOrgName(resetForm.orgName);
        setPassword(resetForm.password);
      } else {
        setLoginError(result.error);
      }
    } catch (err) {
      console.error(err);
      setLoginError('Something went wrong. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleAdminSignOut = () => {
    setIsAdminSignedIn(false);
    setAuthenticatedOrgName('');
    setShowAdminDashboard(false);
  };

  const handleBackToMain = () => {
    setShowAdminDashboard(false);
  };

  return {
    openModal,
    closeModal,
    closeDriverModal,
    handleDriverVerification,
    openAssignmentModal,
    closeAssignmentModal,
    handleAdminSignInClick,
    closeAdminModal,
    handleLogin,
    handleAdminSignOut,
    handleBackToMain,
  };
};