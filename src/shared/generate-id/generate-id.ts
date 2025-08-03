export const generateId = (obj: { [key: string]: unknown }): string => {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('Object is not an object');
    }

    const str = JSON.stringify(obj);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
}