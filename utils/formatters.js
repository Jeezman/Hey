/**
   * @param {{ text: string, charsPerSide: number }} params
   */
export function ellipsisSandwich(text, charsPerSide) {
    if (text.length <= charsPerSide * 2 + 3) {
        return text;
    }
    return `${text.slice(0, charsPerSide)}...${text.slice(
        text.length - charsPerSide,
        text.length,
    )}`;
}

/**
   * @param {{ text: string | number }} params
   */
export function commaify(text) {
    const pieces = text.toString().split('.');
    pieces[0] = pieces[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return pieces.join('.');
}