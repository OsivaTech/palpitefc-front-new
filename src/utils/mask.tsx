export function onlyNumber(phoneNumber : string) {
    return phoneNumber.replace(/\D/g, '');
}
