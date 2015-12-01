
export default function GetText(lookup, mlarray) {
    lookup = lookup.toUpperCase();
    let tDictionary = JSON.parse(mlarray);
    let translation = tDictionary[lookup];

    if (translation) {
        return translation;

    } else {
        console.log("Warning: missing translation for: " + lookup);
        return lookup;
    }
}
