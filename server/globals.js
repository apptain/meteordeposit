ProcessMode = {
    Prod: { url: Config.ProdDomain },
    Dev: { url: Config.DevDomain }
};

var CurrentProcessMode = {};
var CurrentDomain = {};
