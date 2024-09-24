const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Array of file extensions for source and asset files
const sourceExtensions = ["js", "jsx", "json", "ts", "tsx", "cjs", "mjs"];
const assetExtensions = ["glb", "png", "gltf", "jpg"];

// Add source extensions (JS, TS, etc.) if they are not already present
sourceExtensions.forEach((ext) => {
  if (!config.resolver.sourceExts.includes(ext)) {
    config.resolver.sourceExts.push(ext);
  }
});

// Add asset extensions (glb, gltf, png, jpg) if they are not already present
assetExtensions.forEach((ext) => {
  if (!config.resolver.assetExts.includes(ext)) {
    config.resolver.assetExts.push(ext);
  }
});

module.exports = config;