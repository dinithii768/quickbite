import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8180',
  realm: 'quickbite-realm',
  clientId: 'quickbite-frontend',
});

export default keycloak;