(function (globalScope) {
  const FEATURE_FLAG_FILE_NAME = "feature-flags.json";
  const EMBEDDED_FALLBACK_CONFIG = Object.freeze({
    version: "embedded-fallback",
    flags: {
      "operators.percentage": true,
      "web.history": true,
    },
  });

  let cachedNodeConfig = null;

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function normalizeFlags(flags) {
    if (!isPlainObject(flags)) {
      return {};
    }

    return Object.entries(flags).reduce(
      (normalizedFlags, [flagName, value]) => {
        normalizedFlags[flagName] = Boolean(value);
        return normalizedFlags;
      },
      {},
    );
  }

  function normalizeFeatureFlagConfig(config) {
    const sourceConfig = isPlainObject(config)
      ? config
      : EMBEDDED_FALLBACK_CONFIG;

    return {
      version: String(sourceConfig.version || "unversioned"),
      flags: normalizeFlags(sourceConfig.flags),
    };
  }

  function createFeatureFlagClient(config, overrides = {}) {
    const normalizedConfig = normalizeFeatureFlagConfig(config);
    const normalizedOverrides = normalizeFlags(overrides);

    return {
      getVersion() {
        return normalizedConfig.version;
      },
      isEnabled(flagName) {
        if (
          Object.prototype.hasOwnProperty.call(normalizedOverrides, flagName)
        ) {
          return normalizedOverrides[flagName];
        }

        return Boolean(normalizedConfig.flags[flagName]);
      },
      getAllFlags() {
        return {
          ...normalizedConfig.flags,
          ...normalizedOverrides,
        };
      },
    };
  }

  function loadNodeFeatureFlagConfigSync(explicitFilePath) {
    if (cachedNodeConfig && !explicitFilePath) {
      return cachedNodeConfig;
    }

    try {
      const fs = require("fs");
      const path = require("path");
      const filePath =
        explicitFilePath || path.join(__dirname, FEATURE_FLAG_FILE_NAME);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const normalizedConfig = normalizeFeatureFlagConfig(
        JSON.parse(fileContents),
      );

      if (!explicitFilePath) {
        cachedNodeConfig = normalizedConfig;
      }

      return normalizedConfig;
    } catch (error) {
      return normalizeFeatureFlagConfig(EMBEDDED_FALLBACK_CONFIG);
    }
  }

  async function loadBrowserFeatureFlagConfig() {
    if (typeof globalScope.fetch !== "function") {
      return normalizeFeatureFlagConfig(EMBEDDED_FALLBACK_CONFIG);
    }

    try {
      const response = await globalScope.fetch(FEATURE_FLAG_FILE_NAME, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Unable to load ${FEATURE_FLAG_FILE_NAME}`);
      }

      return normalizeFeatureFlagConfig(await response.json());
    } catch (error) {
      return normalizeFeatureFlagConfig(EMBEDDED_FALLBACK_CONFIG);
    }
  }

  function loadDefaultFeatureFlagConfigSync() {
    if (typeof module !== "undefined" && module.exports) {
      return loadNodeFeatureFlagConfigSync();
    }

    return normalizeFeatureFlagConfig(EMBEDDED_FALLBACK_CONFIG);
  }

  async function loadDefaultFeatureFlagConfig() {
    if (typeof module !== "undefined" && module.exports) {
      return loadNodeFeatureFlagConfigSync();
    }

    return loadBrowserFeatureFlagConfig();
  }

  const api = {
    FEATURE_FLAG_FILE_NAME,
    createFeatureFlagClient,
    loadDefaultFeatureFlagConfig,
    loadDefaultFeatureFlagConfigSync,
    normalizeFeatureFlagConfig,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.featureFlags = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
