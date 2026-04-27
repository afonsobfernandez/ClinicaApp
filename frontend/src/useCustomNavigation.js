import { useNavigate, useLocation } from 'react-router-dom';

export const useCustomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    navigate(path, { state: { from: location.pathname } });
  };

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // Fallback to browser history
    }
  };

  return { navigateTo, goBack };
};