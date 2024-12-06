export function validateArrivalDate(arrivalDate) {
    if (!arrivalDate) {
        return 'Please select an arrival date.';
    }
    return null;
}

export function validateDepartureDate(departureDate, arrivalDate) {
    if (!departureDate) {
        return 'Please select a departure date.';
    }
    if (new Date(departureDate) <= new Date(arrivalDate)) {
        return 'Departure date must be after the arrival date.';
    }
    return null;
}

export function validateGuestCount(guestAdultCount) {
    if (guestAdultCount <= 0) {
        return 'At least one adult guest is required.';
    }
    return null;
}
