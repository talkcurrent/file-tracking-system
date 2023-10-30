import React from 'react';

export default function useFormHasError(form) {
    for (var key in form) {
        if (form[key] == "")
            return true;
    }
    return false;
}
