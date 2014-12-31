LegionUtils = {}; 

//Thanks to Filip Roseen for this cool trick
//http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
LegionUtils.extractUrlDomain = function (url) {
  var tempLink = document.createElement('a'); 
  tempLink.href = url;
  return tempLink.hostname; 
}
