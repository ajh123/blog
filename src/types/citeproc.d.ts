// types/citeproc.d.ts

declare module 'citeproc' {
  // Minimal structural types for citeproc-js usage in this project

  export interface CSLItem {
    id: string;
    [key: string]: any;
  }

  export interface CitationItem {
    id: string;
    prefix?: string;
    suffix?: string;
    locator?: string;
    label?: string;
    'suppress-author'?: boolean;
    'author-only'?: boolean;
  }

  export interface CitationProperties {
    noteIndex?: number;
    mode?: string;
    [key: string]: any;
  }

  export interface Citation {
    citationID: string;
    citationItems: CitationItem[];
    properties?: CitationProperties;
  }

  export interface Sys {
    retrieveLocale(lang: string): string;
    retrieveItem(id: string): CSLItem | undefined;
  }

  export interface BibliographyMeta {
    bibstart?: string;
    bibend?: string;
    entryspacing?: number;
    linespacing?: number;
    maxoffset?: number;
    [key: string]: any;
  }

  // Engine result tuple forms:
  // appendCitationCluster / makeCitationCluster => Array<[number, string]>
  // makeBibliography => [meta, entryStrings]
  export class Engine {
    constructor(sys: Sys, style: string);

    updateItems(ids: string[]): void;

    makeCitationCluster(citationItems: CitationItem[]): Array<[number, string]>;

    appendCitationCluster(
      citation: Citation,
      citationsPre?: Citation[],
      citationsPost?: Citation[]
    ): Array<[number, string]>;

    makeBibliography(): [BibliographyMeta, string[]] | null;
  }

  const CSL: { Engine: typeof Engine };
  export default CSL;
}