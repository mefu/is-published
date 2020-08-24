import npmConfigReader from 'libnpmconfig';
import { json as fetchJSON } from 'npm-registry-fetch';

const getPackageJSON = () => {
  try {
    const pkgJsonPath = `${process.cwd()}/package.json`;
    // eslint-disable-next-line global-require, import/no-unresolved, import/no-dynamic-require
    return require(pkgJsonPath);
  } catch (err) {
    return {};
  }
};

export const isPublished = async (pkg = {}) => {
  const pkgJSON = getPackageJSON();
  const name = typeof pkg.name === 'undefined' ? pkgJSON.name : pkg.name;
  const version = typeof pkg.version === 'undefined' ? pkgJSON.version : pkg.version;

  try {
    const npmConfig = Object.fromEntries(npmConfigReader.read().entries());
    delete npmConfig.cache;
    const pkgInfo = await fetchJSON(name, npmConfig);
    const publishedVersions = Object.keys(pkgInfo.versions);
    return publishedVersions.includes(version);
  } catch (error) {
    console.error(`Something went wrong. Package: { name: ${name}, version: ${version} }`);
    throw error;
  }
};
