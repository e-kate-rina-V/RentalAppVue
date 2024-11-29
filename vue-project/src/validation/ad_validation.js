export function validateConveniences(conveniences) {
    if (!conveniences || conveniences.length === 0) {
        return 'Please, select at least one convenience'
    }
    return null;
}

export function validateDescription(description) {
    if (!description) {
        return 'The field is empty'
    } else if (description.length <= 5) {
        return 'The description must contain at least 5 characters'
    }
    return null;
}

export function validateTitle(title) {
    if (!title) {
        return 'The field is empty'
    } else if (title.length <= 5) {
        return 'The title must contain at least 5 characters'
    }
    return null;
}

export function validateMaterials(materials) {
    if (!materials || materials.length < 2) {
        return 'Please, select at least two files';
    } for (const file of materials) {
        if (file.size > 100 * 1024 * 1024) {
            return `The file  "${file.name}" is too large. Maximum size is 100MB`;
        }
    }
    return null;
}
