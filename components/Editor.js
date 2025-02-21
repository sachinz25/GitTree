import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ClipBoard from 'clipboard';
import styles from '../styles/Home.module.css'; // Create this CSS file

new ClipBoard('.copy-button');

const onClickDownloadTree = useCallback(() => {
  const zip = new JSZip();
  const folders = [zip.folder(rootText)];

  treeContents.forEach((content, index) => {
    if (index !== 0) return;
    if (content.depth < treeContents[index - 1]?.depth) {
      folders.pop();

      if (treeContents[index - 1].text.indexOf('.') === -1) {
        folders.pop();
      }
    } else if (content.depth === treeContents[index - 1]?.depth) {
      if (treeContents[index - 1].text.indexOf('.') === -1) {
        folders.pop();
      }
    }

    if (content.text.indexOf('.') >= 0) {
      folders[folders.length - 1]?.file(content.text, '');
    } else {
      folders.push(folders[folders.length - 1]?.folder(content.text) ?? null);
    }
  });

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'project-tree.zip');
  });
}, [treeContents]);