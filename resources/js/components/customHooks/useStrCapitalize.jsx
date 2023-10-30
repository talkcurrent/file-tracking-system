function useStrCapitalize(string) {
    const str = string.replace(/\s\s+/g, " ").split(" ");
    for (let index = 0; index < str.length; index++) {
        if (str[index][0] != undefined) {
            str[index] = str[index][0].toUpperCase() + str[index].substring(1);
        } else {
            str[index] = str[index][0];
        }
    }
    return str.join(" ");
};

export default useStrCapitalize;