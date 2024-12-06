
export function validateAccommodationType(type) {
    if (!type) {
        return 'Please, select a type of accommodation.';
    }
    return null;
}

export function validateAccommodationMode(mode) {
    if (!mode) {
        return 'Please, select the mode of accommodation.';
    }
    return null;
}

export function validateGuestCount(guestCount) {
    if (!guestCount || guestCount < 1) {
        return 'The number of guests must be at least 1.';
    }
    return null;
}

export function validateConveniences(conveniences) {
    if (!conveniences || conveniences.length === 0) {
        return 'Please, select at least one convenience.';
    }
    return null;
}

export function validateDescription(description) {
    if (!description) {
        return 'The description field is empty.';
    } else if (description.length <= 4) {
        return 'The description must contain at least 5 characters.';
    }
    return null;
}

export function validateTitle(title) {
    if (!title) {
        return 'The title field is empty.';
    }
    return null;
}

export function validatePrice(price) {
    if (!price || price <= 0) {
        return 'The price must be a positive number.';
    }
    return null;
}

export function validateFiles(files) {
    if (!files || files.length < 2) {
        return 'Please, upload at least 2 photos.';
    }
    return null;
}
