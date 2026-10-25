/**
 * `HabboWebTools.openWebPageAndMinimizeClient`: a web page in a new browser tab, the client left as
 * it is (a browser tab cannot minimise its window). An empty url opens nothing.
 */
export const openWebPage = (url: string) => {
    if (url.length) window.open(url, '_blank', 'noopener');
};

/**
 * `HabboWebTools.navigateToURL(url, "habboMain")` / `openWebPage(url, "habboMain")`: a page in the
 * hotel's own `habboMain` window, which every such link reuses. The page gets no handle back on the
 * client (`opener` cleared - `noopener` would cost the named window's reuse in some browsers). An
 * empty url opens nothing.
 */
export const openHabboMainPage = (url: string) => {
    if (!url.length) return;

    const opened = window.open(url, 'habboMain');

    if (opened) opened.opener = null;
};
