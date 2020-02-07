module.exports = {
    "presets": ["env"],
    "plugins": [
        ["transform-replace-object-assign", {"moduleSpecifier": "object.assign"}],
        "transform-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ],

};
