import { createContext, useContext, useState, useEffect } from 'react';
import keycloak from '../keycloak';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setToken(keycloak.token);
          setUser({
            id: keycloak.subject,
            username: keycloak.tokenParsed?.preferred_username,
            email: keycloak.tokenParsed?.email,
            firstName: keycloak.tokenParsed?.given_name,
            lastName: keycloak.tokenParsed?.family_name,
            roles: keycloak.tokenParsed?.realm_access?.roles || [],
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Keycloak init error:', error);
        setLoading(false);
      });

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then((refreshed) => {
        if (refreshed) {
          setToken(keycloak.token);
        }
      });
    };
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout({ redirectUri: window.location.origin });

  const hasRole = (role) => {
    return keycloak.tokenParsed?.realm_access?.roles?.includes(role) || false;
  };

  const isAdmin = () => hasRole('ADMIN');
  const isCustomer = () => hasRole('CUSTOMER');

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        login,
        logout,
        hasRole,
        isAdmin,
        isCustomer,
        keycloak,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;