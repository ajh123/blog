import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import * as fs from 'fs';
import * as path from 'path';
import CSL from 'citeproc';

const plugin: Plugin<[], Root> = () => (tree, file) => {
  const frontmatter = file.data?.astro?.frontmatter || {};
  const refsPath = frontmatter.references;
  if (!refsPath) return;

  // Load bibliography JSON
  const bibFile = path.resolve(path.dirname(file.path || ''), refsPath);
  if (!fs.existsSync(bibFile)) return;

  let rawBib: any;
  try {
    rawBib = JSON.parse(fs.readFileSync(bibFile, 'utf8'));
  } catch (e) {
    console.warn(`[remark-citation] Failed to parse bibliography JSON: ${bibFile}`, e);
    return;
  }

  const bibItems: any[] = Array.isArray(rawBib)
    ? rawBib
    : Array.isArray(rawBib?.items)
      ? rawBib.items
      : [];
  if (bibItems.length === 0) return;

  const bibMap = new Map<string, any>(
    bibItems
      .filter(it => it && (it.id !== undefined && it.id !== null))
      .map(it => [String(it.id), it])
  );

  // Load CSL style + locale
  const style = fs.readFileSync(
    path.join(process.cwd(), 'src', 'content', 'csl', 'harvard-newcastle-university.csl'),
    'utf8'
  );
  const locale = fs.readFileSync(
    path.join(process.cwd(), 'src', 'content', 'csl', 'locales-en-GB.xml'),
    'utf8'
  );

  const sys = {
    retrieveLocale: (_lang: string) => locale,
    retrieveItem: (id: string) => bibMap.get(String(id))
  };

  const processor = new CSL.Engine(sys as any, style);

  // Collect citation keys
  const citationKeys: Set<string> = new Set();
  const citePattern = /@cite\{([^}]+)\}/g;

  visit(tree, 'text', (node: any) => {
    if (typeof node.value !== 'string') return;
    let m;
    while ((m = citePattern.exec(node.value)) !== null) {
      m[1].split(',').map(s => s.trim()).forEach(k => {
        if (k) citationKeys.add(k);
      });
    }
  });

  const existingKeys = Array.from(citationKeys).filter(k => bibMap.has(k));
  if (existingKeys.length === 0) return;

  processor.updateItems(existingKeys);

  // Map citation keys to bibliography IDs
  const keyToId = new Map<string, string>();
  existingKeys.forEach((key, i) => keyToId.set(key, `ref-${i}`));

  let citationSeq = 0;

  // Replace inline citations with clickable links
  visit(tree, 'text', (node, index, parent) => {
    if (typeof node.value !== 'string') return;
    if (!parent || typeof index !== 'number' || !Array.isArray(parent.children)) return;

    const text = node.value;
    let lastIndex = 0;
    const parts: any[] = [];
    let match: RegExpExecArray | null;
    citePattern.lastIndex = 0;

    while ((match = citePattern.exec(text)) !== null) {
      const full = match[0];
      const rawKeys = match[1].split(',').map(s => s.trim()).filter(Boolean);

      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      }

      const valid = rawKeys.filter(k => bibMap.has(k));
      let citationText: string;

      if (valid.length === 0) {
        citationText = `[Citation ${rawKeys.join(', ')} not found]`;
        parts.push({ type: 'text', value: citationText });
      } else {
        try {
          const citation = processor.appendCitationCluster({
            citationID: `CIT-${citationSeq++}`,
            citationItems: valid.map(k => ({ id: k })),
            properties: { noteIndex: 0 }
          });

          // Render each key as a clickable link
          citationText = valid.map((k, idx) => {
            const rendered = citation?.[idx]?.[1] ?? `[${k}]`;
            const targetId = keyToId.get(k);
            return targetId ? `<a href="#${targetId}">${rendered}</a>` : rendered;
          }).join(', ');

          parts.push({ type: 'html', value: citationText }); // <- HTML node
        } catch (e) {
          console.warn('[remark-citation] Error rendering citation cluster', valid, e);
          parts.push({ type: 'text', value: `[Citation ${valid.join(', ')} error]` });
        }
      }

      lastIndex = match.index + full.length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', value: text.slice(lastIndex) });
    }

    if (parts.length) {
      parent.children.splice(index, 1, ...parts);
    }
  });

  // Append bibliography with IDs
  if (existingKeys.length > 0) {
    const bibResult = processor.makeBibliography();
    if (bibResult) {
      const [meta, entries] = bibResult;
      if (Array.isArray(entries) && entries.length > 0) {
        const bibEntries = entries.map((entry, i) => `<div id="ref-${i}" class="reference-item">${entry}</div>`);

        tree.children.push({
          type: 'heading',
          depth: 2,
          children: [{ type: 'text', value: 'References' }]
        });
        tree.children.push({
          type: 'html',
          value: `<div class="references">${bibEntries.join('\n')}</div>`
        });
      }
    }
  }
};

export default plugin;
