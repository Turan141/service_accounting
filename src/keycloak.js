//import { KeycloakClient } from '@react-keycloak/keycloak-ts'
//import type { KeycloakAdapter } from '@react-keycloak/keycloak-ts'
import Keycloak from 'keycloak-js'

const realm = process.env.KC_REALM
const clientId = process.env.KC_CLIENT_ID
const url = process.env.KC_URL

// console.log(realm)
// console.log(clientId)
// console.log(url)
console.log('hello')

const keycloak = new Keycloak({
    realm: "utg-group",
    url: process.env.KEYCLOAK_URL,
    clientId: "clients-front",
})

export default keycloak
