// Return the version if the app is built, else "dev"
export function getVersion(): string {
    return import.meta.env.DEV ? "dev" : import.meta.env.PACKAGE_VERSION;
}
