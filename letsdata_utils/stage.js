export const Stage = Object.freeze({
    Test:   "Test",
    Prod:  "Prod"
});

export function stageFromString(str) {
    if (str == "Test") {return Stage.Test; }
    else if (str == "Prod") {return Stage.Prod; }
    else {
        throw new Error('Unexpected stage');
    }
}