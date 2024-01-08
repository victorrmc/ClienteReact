export const getRoleFromToken = ({ token }) => {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    const role = payloadObject.role?.[0].authority
    return role
}