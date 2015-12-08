
export default function GetText(lookup, mlarray) {
    lookup = lookup.toUpperCase();
    let tDictionary = [];
    let translation = '';
    //console.log(mlarray);
    try{
        let tDictionary = JSON.parse(mlarray);
        let translation = tDictionary[lookup];
    }catch(e){
        console.log(e);
        translation = false;
    }

    if (translation) {
        return translation;

    } else {
        console.log("Warning: missing translation for: " + lookup);
        return lookup;
    }
}
